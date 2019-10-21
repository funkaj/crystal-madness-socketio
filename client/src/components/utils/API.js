import axios from 'axios';
export default {
	// Gets a single user by id
	getUser: id => {
		return axios.get(`/api/user/${id}`);
	},
	// sign up a user to our service
	signUpUser: (username, email, password) => {
		return axios.post('api/signup', {
			username: username,
			email: email,
			password: password,
		});
	},
	saveMessages: data => {
		return axios.post('/api/message', data);
	},
	postNewStats: (user_id, movesPlayed, perfects, win, wins, losses) => {
		return axios.post('/api/stats', {
			user_id: user_id,
			movesPlayed: movesPlayed,
			perfects: perfects,
			win: win,
			wins: wins,
			losses: losses
		});
	}
};
