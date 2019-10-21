import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CrystalCard from '../../crystalCards';
import './style.css';

function Instructions() {
	const { crystals } = useSelector(state => ({
		crystals: state.crystals,
	}));
	return (
		<Container style={{paddingLeft: '0px'}}>
			<Row>
				<Col xs={12}>
					<h1>How To Play</h1>
				</Col>
			</Row>
			{/* // set up hide on small screens */}
			{/* <Row>
				{crystals.map(crystal => {
					return (
						<Col xs={12} lg={3} key={crystals.indexOf(crystal)}>
							<CrystalCard data={{ crystal }} />
						</Col>
					);
				})}
			</Row> */}
			<Row>
				<Col xs={12}>
					<ul>
						<li>Each player takes turns selecting crystals.</li>
						<li>
							Each crystal conatians a secret number (these will not change, but
							will remain hidden)
						</li>
						<li>That number will add to the total.</li>
						<li>
							When a player breaks the Target Number. The Game ends and that
							player loses.
						</li>
						<li>
							The game will also end when a player meets the Target Number
							exactly. They will recieve a Perfect Victory.
						</li>
					</ul>
				</Col>
			</Row>
		</Container>
	);
}

export default Instructions;
