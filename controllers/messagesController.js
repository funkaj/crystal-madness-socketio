const db = require('../models');

module.exports = {
	// Store user messages
	postMessages: function(req, res) {
		db.Message.create(req.body)
			.then(data => res.json(data))
			.catch(err => res.status(400).json(err));
	},
};
