import React from 'react';
import withAuth from '../../withAuth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './style.css';

// display splash page
function Splash() {

	return (
		<Container>
			<Row className='contain'>
				<Col xs={6} md={12}>
					<div id='title'>
						<p id="neon">Crystal Madness!</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default withAuth(Splash);
