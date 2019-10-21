const db = require('../models');

let allUsers = [];
module.exports = {
	//Get all Usernames to display
	getAllUsers: function(req, res) {
		allUsers = [];
			db.User.find({}).then(function(dbUser) {
				dbUser.map(x => {
					allUsers.push(x.username);
				});
				res.json(allUsers);
			});
		
	},

	isAuthenticated: function(req, res) {
		res.send('You are authenticated'); //Sending some response when authenticated
	},

	getUser: function(req, res) {
		db.User.findById(req.params.id)
			.then(data => {
				if (data) {
					res.json(data);
				} else {
					res.status(404).send({ success: false, message: 'No user found' });
				}
			})
			.catch(err => res.status(400).send(err));
	},
};
