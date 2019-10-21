import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import thunk from 'redux-thunk';
import reducer from './components/reducer/reducer';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './components/utils/FontLibrary';


export const socket = io('https://crystal-madness.herokuapp.com/');
// export const socket = io('http://localhost:5000');

const store = createStore(reducer, applyMiddleware(thunk));

//console log any changes to the store
// store.subscribe(() => {
// 	console.log('new client state', store.getState());
// });


if (localStorage.getItem('id_token')) {
	axios.defaults.headers.common[
		'Authorization'
	] = `Bearer ${localStorage.getItem('id_token')}`;
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.register();
