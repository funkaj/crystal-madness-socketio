/* eslint-disable no-useless-concat */
import React, { useEffect } from 'react';
import { socket } from '../../index';
// get and listen to items in the store replaces connect
import { useSelector, useDispatch } from 'react-redux';
import { updateRoomTicker } from '../actions';
import './style.css';
import Ticker from 'react-ticker';

const GetAvailibleRooms = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		socket.connect();

		socket.on('ROOM_DATA', data => {
			dispatch(updateRoomTicker(data));
		});
		return () => {
			socket.off('ROOM_DATA');
		};
	});

	const { roomTicker } = useSelector(state => ({
		roomTicker: state.roomTicker,
	}));

	// A placeholder is needed, to tell react-ticker, that width and height might have changed
	// It uses MutationObserver internally
	return roomTicker !== undefined && roomTicker.length > 0 ? (
		<div style={{ whiteSdivace: 'nowrap' }}>
			{roomTicker.map(x => {
				return 'Player: ' + x.name + ': ' + 'Room: ' + x.room + ' | ';
			})}
		</div>
	) : (
		<p style={{ whiteSdivace: 'nowrap' }}>
			{'All Rooms Are Currently Empty! Start A New Game! ' + ' | '}
		</p>
	);
};
function RoomTicker() {
	return (
		<div id='ticker-word'>
			<Ticker offset='run-in' speed={8}>
				{() => <GetAvailibleRooms />}
			</Ticker>
		</div>
	);
}

export default RoomTicker;
