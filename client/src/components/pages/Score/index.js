import React from 'react';
import { useSelector } from 'react-redux';
import withAuth from '../../withAuth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'
function Score() {
	// const dispatch = useDispatch();
	const { name, wins, perfectGames, movesCount, losses } = useSelector(
		state => ({
			name: state.name,
			wins: state.wins,
			perfectGames: state.perfectGames,
			movesCount: state.movesPlayed,
			losses: state.losses,
		})
	);
	return (
		<Container>
			<Row>
				<Col xs={12}><h1>{name}'s High Score!</h1></Col>
			</Row>
			<Row>
				<Col xs={12} id="score-display">
					<h3> {wins} - Wins</h3>
					<h3>{losses} - Losses</h3>
					<h3>{movesCount} turns - Quickest victory</h3>
					<h3>{perfectGames} - Perfect Victories</h3>
				</Col>
			</Row>
		</Container>
	);
}

export default withAuth(Score);
