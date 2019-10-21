// require express
const express = require('express');
const routes = require('./routes');
const exjwt = require('express-jwt');
const mongoose = require('mongoose');
const morgan = require('morgan'); // used to see requests
// Socket.io requires
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
	next();
});
//log all requests to the console
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));
// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/appDB', {
	useNewUrlParser: true,
});
mongoose.set('useCreateIndex', true);

// // Init the express-jwt middleware
const isAuthenticated = exjwt({
	secret: 'all sorts of code up in here',
});

let game;
let rooms = 0;
const playerRooms = [];
// Set the currentTurn for player to turn and update UI to reflect the same.
io.on('connection', socket => {
	updateRoomsArray = () => {
		io.emit('ROOM_DATA', { data: playerRooms });
	}
	console.log(`New user connected: ${socket.id}`);
	socket.emit('CONNECTED', { data: socket.id });
	updateRoomsArray()
	// emit rooms availible to join every 1 second

	// create a room for the game
	socket.on('CREATE', data => {
		// creator joins room
		socket.join('room-' + ++rooms);
		let player1 = {
			room: 'room-' + rooms,
			name: data.name,
			roomName: data.roomName,
		};
		playerRooms.push(player1);
		updateRoomsArray()
		socket.emit('GAME_CREATED', {
			socket: data.socket,
			name: data.name,
			message: `Started a game in [room-${rooms}]`,
			room: `room-${rooms}`,
			roomName: data.roomName,
		});
	});

	socket.on('JOIN_GAME', data => {
		const room = io.nsps['/'].adapter.rooms[data.room];
		let player1;
		let roomName;
		playerRooms.forEach((x, i) => {
			if (x.room === data.room) {
				player1 = x.name;
				roomName = x.roomName;
				playerRooms.splice(i, 1);
				updateRoomsArray();
			}
		});
		if (room && room.length == 1) {
			socket.join(data.room);

			socket.broadcast.to(data.room).emit('P1', { player2: data.name });
			socket.emit('P2', {
				name: data.name,
				room: data.room,
				player1: player1,
				roomName,
			});
		} else {
			socket.emit('err', { message: 'Sorry, The room is full!' });
		}
	});

	socket.on('GAME_ROOM', data => {
		socket.broadcast.to(data.room).emit('P1', {
			room: data.room,
			player2: data.name,
			roomName: data.roomName,
			targetNumber: data.targetNumber,
			secretNumbers: data.secretNumbers,
		});
	});

	// take inputed game room and join player2
	// Add user selection to total, emit back to room
	socket.on('PLAY_TURN', data => {
		socket.broadcast.to(data.room).emit('PLAY_TURN', data);
	});
	// player can forfiet and leave room
	socket.on('LEAVE_GAME', function(data) {
		io.in(data.room).emit('GAME_OVER', data);
		playerRooms.forEach((x, i) => {
			if (x === data.room) {
				playerRooms.slice(i, 1);
			}
		})
		updateRoomsArray()
		socket.leave(data.room);
	});
	
	// User disconnect
	socket.on('disconnect', () => {
		console.log(`User ${socket.id} disconnected`);
	});
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.get(
	'/',
	isAuthenticated /* Using the express jwt MW here */,
	(req, res) => {
		res.send('You are authenticated'); //Sending some response when authenticated
	}
);

// Error handling
app.use(function(err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		// Send the error rather than to show it on the console
		res.status(401).send(err);
	} else {
		next(err);
	}
});

app.use(routes);

server.listen(PORT, function() {
	console.log(`App is listening on port: ${PORT}`);
});
