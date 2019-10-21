const db = require('../models');

module.exports = {
	signUp: function(req, res) {
		db.User.create(req.body)
			.then(data => res.json(data))
			.catch(err => res.status(400).json(err));
	},
};
