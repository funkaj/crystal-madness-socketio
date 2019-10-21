/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
	leaveGameRoom,
	playTurn,
	incrementTotal,
	leave,
	updateGameState,
	postStats,
} from '../../actions';
import API from '../../utils/API';
import withAuth from '../../withAuth';
import { socket } from '../../../index';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CrystalCard from '../../crystalCards';

function Game() {
	const dispatch = useDispatch();
	const { name, roomID, crystals, game, id, wins, losses } = useSelector(
		state => ({
			id: state.id,
			name: state.name,
			crystals: state.crystals,
			roomID: state.room,
			game: state.game,
			wins: state.wins,
			losses: state.losses,
		})
	);
	// listen for errors then console err
	useEffect(() => {
		socket.connect();
		socket.on('err', data => {
			console.log(data);
		});
		return () => {
			socket.off('err');
		};
	});

	useEffect(() => {
		socket.connect();
		socket.on('END_GAME', data => {
			let loser;
			let thisPlayer;
			let newWin = wins;
			let newLoss = losses;
			// eslint-disable-next-line array-callback-return
			data.player.map(x => {
				if (x.name === name) {
					thisPlayer = x;
				}
				if (!x.win) {
					loser = x.name;
				} else return null;
			});
			const stats = {
				user_id: id,
				wins: newWin,
				losses: newLoss,
				movesPlayed: thisPlayer.movesPlayed,
				perfects: thisPlayer.perfect,
				gameWin: thisPlayer.win,
			};
			dispatch(incrementTotal(data));
			API.postNewStats(
				stats.user_id,
				stats.wins,
				stats.losses,
				stats.movesPlayed,
				stats.perfects,
				stats.gameWin
			)
				.then(res => {
					console.log('stats sent');
				})
				.catch(err => alert(err));
			handleLeave();

			return alert('Game Over ' + loser + ' loses');
		});
		// Turn off the socket.on listener. This will prevent the listener from compounding
		return () => {
			socket.off('END_GAME');
		};
	});

	useEffect(() => {
		socket.connect();
		socket.on('LEFT_ROOM', data => {
			dispatch(leave(data));
		});
		// Turn off the socket.on listener. This will prevent the listener from compounding
		return () => {
			socket.off('LEFT_ROOM');
		};
	});
	// Listen for opponents play from server and dispatch action
	useEffect(() => {
		socket.connect();
		socket.on('PLAY_TURN', data => {
			data = {
				...data,
				game: game,
			};
			game.playTurn(data);
			if (game.total > game.targetNumber) {
				gameOver();
			}
			dispatch(updateGameState(data));
		});
		// Turn off the socket.on listener. This will prevent the listener from compounding
		return () => {
			socket.off('PLAY_TURN');
		};
	});
	// Listen for opponents play from server and dispatch action
	useEffect(() => {
		socket.connect();
		socket.on('GAME_OVER', data => {
			dispatch(leave(data))
		});
		// Turn off the socket.on listener. This will prevent the listener from compounding
		return () => {
			socket.off('GAME_OVER');
		};
	});
	let handleLeave = data => {
		dispatch(leaveGameRoom(socket, name, roomID));
	};
	// click handler to capture user click, then dispatch actions to update store and send play to server
	let turn;
	let player = game.players;
	let handlePlayTurn = id => {
		let user = document.getElementById(id).getAttribute('name');
		// if it is not the users turn return text and do nothing
		if (name === user && turn) {
			let userSelect = parseInt(
				document.getElementById(id).getAttribute('data')
			);
			let room = roomID;
			let data = {
				total: userSelect,
				room: room,
				name: user,
				game: game,
			};
			// update game construct
			game.playTurn(data);
			if (game.total > game.targetNumber) {
				dispatch(updateGameState(data));
				dispatch(playTurn(socket, userSelect, room, name));
				return gameOver();
			}
			dispatch(updateGameState(data));
			dispatch(playTurn(socket, userSelect, room, name));
		} else return alert('Waiting on Opponents Turn...');
	};
	let gameOver = () => {
		game.players.map((x, i) => {
			let data = {
				user_id: id,
				wins: wins,
				room: roomID,
				game: game,
			};

			if (x.win === true && x.name === name) {
				let stats = {
					user_id: id,
					movesPlayed: x.movesPlayed,
					perfects: x.perfect,
					win: true,
					wins: wins,
					losses: losses
				};
				alert('YOU WON!!!');
				dispatch(postStats(stats));
				dispatch(leave(data));
			}
			if (x.win === false && x.name === name) {
				let stats = {
					user_id: id,
					movesPlayed: x.movesPlayed,
					perfects: x.perfect,
					win: false,
					wins: wins,
					losses: losses
				};
				alert('YOU LOST!!!!');
				dispatch(postStats(stats));
				dispatch(leave(data));
			}
		});
	};
	// eslint-disable-next-line no-unused-vars
	return (
		<Container>
			<h3 className='room-display'> The {game.roomName} Room</h3>
			<h4 className='target-number'>
				Target Number: {game.targetNumber} / Total: {game.total}
			</h4>
			{player != null && player.length > 1 ? (
				<div>
					<div>
						{// eslint-disable-next-line array-callback-return
						player.map(x => {
							if (x.currentTurn && x.name === name) {
								turn = true;
								return <h2 key={x.message}>{x.message}</h2>;
							}
							if (!x.currentTurn && x.name === name) {
								turn = false;
								return <h2 key={x.message}>{x.message}</h2>;
							}
						})
						// opp.currentTurn ? opp[0].message : opp[1].message
						}
					</div>
					<h5 className='player-display'>
						{player[0].name} / Score: {player[0].score}
					</h5>
					<h5 className='player-display'>
						{player[1].name} / Score: {player[1].score}
					</h5>
				</div>
			) : null}

			{crystals.length > 0 ? (
				
					<Row className='contain'>
						{crystals.map((crystal, i) => {
							let nums = game.length !== 0 ? game.secretNumbers[i] : 0;
							return (
								<Col xs={6} lg={3} key={crystals.indexOf(crystal)}>
									<div>
										<CrystalCard
											data={{ name, crystal, nums, handlePlayTurn }}
										/>
									</div>
								</Col>
							);
						})}
					</Row>
				
			) : null}
			<button className='btn create' onClick={handleLeave}>
				Forfeit
			</button>
		</Container>
	);
}
export default withAuth(Game);
