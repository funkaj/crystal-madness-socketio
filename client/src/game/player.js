class Player {
	constructor(player, name) {
		this.player = player;
		this.name = name;
		this.currentTurn = true;
		this.movesPlayed = 0;
		this.message = 'Your turn';
		this.score = 0;	
		this.win = true;
		this.perfect = 0;
	}

	// Set the currentTurn for player to turn and update UI to reflect the same.
    setCurrentTurn(turn){
		this.currentTurn = turn;
		this.message = turn ? 'Your turn' : 'Waiting for Opponent';
	}
	getCurrentTurn() {
		return this.currentTurn;
	}
	updateMovesPlayed() {
		this.movesPlayed++
	}
	updateScore(add) {
		this.score = this.score + add
	}
	gameOver() {
		this.player = '';
		this.name = '';
		this.currentTurn = true;
		this.movesPlayed = 0;
		this.message = '';
		this.score = 0;	
		this.win = true;
		this.perfect = 0;
	}
}
export default Player;