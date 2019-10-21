/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
	reRouteGameRoom,
	createGameRoom,
	joinGameRoom,
	oppJoined,
	getUserData,
	sendGameNumbers
} from '../../actions';
import Game from '../../../game/game';

import { getACrystal } from '../../../name/index';
import withAuth from '../../withAuth';
import Container from 'react-bootstrap/Container';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import { socket } from '../../../index';
import { useSelector, useDispatch } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let game;
let player;
function GameLobby() {
	// eslint-disable-next-line no-unused-vars
	const { name, roomID, opp } = useSelector(state => ({
		name: state.name,
		roomID: state.room,
		opp: state.opponents,
		game: game,
	}));
	const dispatch = useDispatch();
	useEffect(() => {
		socket.connect();

		socket.on('GAME_CREATED', data => {
			game = new Game(data.room);
			game.addRoom(socket, data);
		});
		return () => {
			socket.off('GAME_CREATED');
		};
	});

	useEffect(() => {
		socket.connect();
		socket.on('P1', data => {
			game.addPlayer(this, data);
			if (data.targetNumber) {
				game.updateComponents(data);
				dispatch(reRouteGameRoom({ data, game }));
			}
		});
		return () => {
			socket.off('P1');
		};
	});
	useEffect(() => {
		socket.connect();
		socket.on('P2', data => {
			let player2 = name;
			data = {
				...data,
				player2: player2,
			};
			// Create game for player 2
			game = new Game(data.room);
			game.joinRoom(socket, data);
			dispatch(oppJoined(socket, data, game));
			dispatch(reRouteGameRoom({ data, game }));
			dispatch(getUserData());
		});
		return () => {
			socket.off('P2');
		};
	});

	let handleCreate = data => {
		if (name !== null) {
			let roomName = getACrystal();
			dispatch(createGameRoom(socket, name, roomName));
		}
	};
	let handleJoin = data => {
		let roomID = document.getElementById('room').value;

		if (name === null || !roomID) {
			alert('enter roomID');
		} else {
			dispatch(joinGameRoom(socket, name, roomID));
		}
	};

	return (
	
			<Container>
				<Row><Col xs={12}><h1>Game Lobby</h1></Col></Row>
				<Row>
					<Col xs={12}>
						<section>
							<ul>
								<li>
									To Create a new game, click the Create Game button and wait for an opponent.
								</li>
								
								<li>
									To Join a game by entering one of the availible room numbers above. (i.e. room-2) and click the Join Game button. 
								</li>
							</ul>
						</section>
					</Col>
				</Row>
			
				<Row>
					<Col xs={12}>
						<input type='text' name='room' id='room' placeholder='Enter Room #' />
					</Col>
						<Col xs={12}>
							<button className='btn create' onClick={handleCreate}>
								Create Game
							</button>
						</Col>
						<Col xs={12}>
								<button className='btn join' onClick={handleJoin}>
									Join Game
								</button>
						</Col>
				</Row>
			</Container>
	
	);
};
export default withAuth(GameLobby);
