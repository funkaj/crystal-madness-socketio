const db = require('../models');

module.exports = {
	//Get all Usernames to display
	getStats: function(req, res) {
			db.Stats.find({}).then(function(dbStats) {
				res.json(dbStats);
			});
	},
	postNewStats: function(req, res) {
		let data = req.body
		let filter = data.user_id
		if (data.win === true) {
			data.wins += 1;
		} else data.losses += 1;
		console.log("stat data")
		console.log(data)
		db.Stats.updateMany({user_id: filter}, data, { upsert: true })
			.then(data => res.json(data))
			.catch(err => res.status(400).json(err));
	},
	isAuthenticated: function(req, res) {
		res.send('You are authenticated'); //Sending some response when authenticated
	},
};