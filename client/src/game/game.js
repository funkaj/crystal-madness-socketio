/* eslint-disable array-callback-return */
import Player from './player'

class Game {
	constructor(socketID) {
		this.players = [];
		this.roomId = socketID;
		this.room = '';
		this.roomName = '';
		this.secretNumbers = [];
		this.sockets = {};
		this.targetNumber = 0;
		this.total = 0;
	}
	addRoom(socket, data, socketId) {
		this.roomName = data.roomName;
		this.room = data.room;
		data = {
			...data,
			player1: data.name,
		};
		this.addPlayer(this, data);
	}
	joinRoom(socket, data) {
		this.room = data.room;
		this.roomName = data.roomName;
		this.addPlayer(this, data);
		this.addCrystals();
	}
	addCrystals(data) {
		if (data) {
			this.targetNumber = data.targetNumber;
			this.secretNumbers = data.setNumbers;
		} else {this.targetNumber = Math.floor(19 + Math.random() * 101);

		while (this.secretNumbers.length < 4) {
			let randomNum = Math.floor(1 + Math.random() * 11);
			if (!this.secretNumbers.includes(randomNum)) {
				this.secretNumbers.push(Number(randomNum));
			}
		}}
	}
	addPlayer(socket, data) {
		let P1;
		let P2;

		if (data.player2) {
			P2 = new Player('P2', data.player2);
			this.players.push(P2);
			P2.setCurrentTurn(false);
		}
		if (data.player1) {
			P1 = new Player('P1', data.player1);
			this.players.push(P1);
		}
	}
	// update game and player object each turn
	playTurn(data) {
		let user;
		let opp;
		this.players.map(x => {
			if (x.name === data.name) {
				user = x;
			}
			if (x.name !== data.name) {
				opp = x;
			}
		});
		// client player
		if (user.name === data.name) {
			user.setCurrentTurn(false);
			user.updateScore(data.total);
			user.updateMovesPlayed();
			this.updateTotal(data.total);
			this.checkWin(user);
		}
		// not client player
		if (opp.name !== data.name) {
			opp.setCurrentTurn(true);
		}
	}
	checkWin(data) {
		if (this.total > this.targetNumber) {
			data.win = false;
		}
	}
	updateComponents(data) {
		this.targetNumber = data.targetNumber;
		this.secretNumbers = data.secretNumbers;
	}

	updateTotal(add) {
		this.total = this.total + add;
	}
}
export default Game;
