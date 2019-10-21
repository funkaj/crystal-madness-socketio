import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	getProfileFetch,
	getAllUsers,
	getCrystal,
	getUserData,
	sockConnected,
} from './components/actions';
import Splash from './components/pages/Splash';
import GameLobby from './components/pages/GameLobby';
import Instructions from './components/pages/Instructions';
import Score from './components/pages/Score';
import Layout from './components/Layout';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import GameRoom from './components/pages/GameRoom';

import './App.css';
import { socket } from './index';

function APP() {
	const dispatch = useDispatch();
	const { room } = useSelector(state => ({
		room: state.room,
		socketId: state.socketId,
	}));

	useEffect(() => {
		if ((localStorage.token !== 'undefined' && localStorage.token) || localStorage.id_token) {
			dispatch(getProfileFetch());
			dispatch(getAllUsers());
			dispatch(getUserData());
			dispatch(getCrystal());
		}
	}, [dispatch]);

	useEffect(() => {
		socket.connect();
		socket.on('CONNECTED', data => {
			dispatch(sockConnected({ data: data.data }));
		});
		return () => {
			socket.off('CONNECTED');
		};
	});
	const App = () => (
		<div>
			<Layout />
			
			<div className='centered'>
				<div className='mainContainer'>
					<div className='outer'>
						<div className='inner'>
							<i className='top left' />
							<i className='top right' />
							<div className='content'>
								<Switch>
									<Route exact path='/' component={Splash} />
									<Route exact path='/login' component={Login} />
									<Route exact path='/signup' component={Signup} />
									{/* <Route exact path='/game' component={Game} /> */}
									<Route
										exact
										path='/game-room/:id'
										// data={this.props}
										render={() =>
											room === null ? <Redirect to={`/game`} /> : <GameRoom />
										}
									/>
									<Route
										exact
										path='/game'
										render={() =>
											room !== null ? (
												<Redirect to={`/game-room/${room}`} />
											) : (
												<GameLobby />
											)
										}
									/>
									<Route path='/score' component={Score} />
									<Route path='/instructions' component={Instructions} />
								</Switch>
							</div>
							<i className='bottom right' />
							<i className='bottom left' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
	return (
		<Switch>
			<App />
		</Switch>
	);
}
export default APP;
