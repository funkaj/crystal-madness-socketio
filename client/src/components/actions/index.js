/* eslint-disable array-callback-return */
import AuthService from '../AuthService';
import API from '../utils/API';

// get user profile and see if there is a token in local storage
export const getProfileFetch = () => {
	let id = getID();
	return dispatch => {
		const token = localStorage.id_token;
		if (token) {
			return fetch(`/api/user/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
				.then(res => res.json())
				.then(data => {
					if (data.message) {
						console.log(data.message);
					} else {
						localStorage.setItem('token', data.jwt);
						dispatch(loginUser(data));
					}
				});
		}
	};
};
export const getUserData = () => {
	let id = getID();

	return dispatch => {
		return fetch(`/api/stats`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => {
				if (data.message) {
					console.log(data.message);
				} else {
					data.map(x => {
						if (x.user_id === id) {
							dispatch(loadStats(x));
						}
					});
				}
			});
	};
};
export const getAllUsers = () => {
	return dispatch => {
		return fetch('/api/user/all-users', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => {
				dispatch(allUsers(data));
			});
	};
};
export const getCrystal = () => {
	return dispatch => {
		return fetch('/api/getCrystal')
			.then(res => res.json())
			.then(crystals => dispatch({ type: 'CRYSTALS', payload: crystals }));
	};
};

export const postStats = data => {
	return dispatch => {
		API.postNewStats(
			data.user_id,
			data.movesPlayed,
			data.perfects,
			data.win,
			data.wins,
			data.losses
		)
			.then(res => {
				console.log('stats sent');
			})
			.catch(err => alert(err));
	};
};
////////////////////////// Game Page actions ////////////////////////////////////
export const sockConnected = data => ({
	type: 'SOCK_CONNECTED',
	payload: data,
});
export const updateRoomTicker = data => ({
	type: 'UPDATE_ROOM_TICKER',
	payload: data,
});
export const createGameRoom = (socket, data, roomName) => {
	return dipatch => {
		socket.emit('CREATE', {
			socket: socket.id,
			name: data,
			roomName: roomName,
		});
	};
};
export const reRouteGameRoom = data => ({
	type: 'RE_ROUTE_TO_GAME_ROOM',
	payload: data,
});
export const updateGameState = data => ({
	type: 'UPDATE_GAME_STATE',
	payload: data,
});

export const joinGameRoom = (socket, data, roomID) => {
	return dispatch => {
		socket.emit('JOIN_GAME', { name: data, room: roomID });
	};
};
export const playTurn = (socket, data, room, name, player) => {
	return dispatch => {
		socket.emit('PLAY_TURN', {
			total: data,
			room: room,
			name: name,
			player: player,
		});
	};
};
export const leaveGameRoom = (socket, data, roomID) => {
	return dispatch => {
		socket.emit('LEAVE_GAME', { name: data, room: roomID });
	};
};
export const leave = data => ({
	type: 'LEAVE_ROOM',
	payload: data,
});
export const oppJoined = (socket, data, game) => {
	return dispatch => {
		socket.emit('GAME_ROOM', {
			player2: data.name,
			room: game.room,
			roomName: data.roomName,
			targetNumber: game.targetNumber,
			secretNumbers: game.secretNumbers,
		});
	};
};

///////////////////////////////////////////////////////////////////////////////////////
export const getOnlineUsers = userObj => ({
	type: 'ONLINE_USERS',
	payload: userObj,
});

const allUsers = userObj => ({
	type: 'ALL_USERS',
	payload: userObj,
});

const getID = () => {
	const Auth = new AuthService();
	let currentProfile = Auth.getProfile();
	return currentProfile.id;
};

const loginUser = userObj => ({
	type: 'LOGIN_USER',
	payload: userObj,
});

export const incrementTotal = data => ({
	type: 'PLAY_TURN',
	payload: data,
});
const loadStats = userObj => ({
	type: 'LOAD_STATS',
	payload: userObj,
});
