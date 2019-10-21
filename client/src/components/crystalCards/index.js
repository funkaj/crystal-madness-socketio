import React from 'react';
import './style.css';

function CrystalCards(props) {
	const card = props.data.crystal;

	return (
		<div>
			<div className='card-layout' id={card.color} data={props.data.nums} name={props.data.name} onClick={e => props.data.handlePlayTurn(card.color)}>
				<div className='image-container'>
					<img src={`/${card.image}`} alt={card.title} />
				</div>
			</div>
		</div>
	);
}

export default CrystalCards;
