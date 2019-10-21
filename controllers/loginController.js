const db = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
	login: function(req, res) {
		db.User.findOne({
			email: req.body.email,
		})
			.then(user => {
				user.verifyPassword(req.body.password, (err, isMatch) => {
					if (isMatch && !err) {
						let token = jwt.sign(
							{ id: user._id, email: user.email },
							'all sorts of code up in here',
							{ expiresIn: 129600 }
						); // Sigining the token
						res.json({
							success: true,
							message: 'Token Issued!',
							token: token,
							user: user,
						});
					} else {
						res.status(401).json({
							success: false,
							message: 'Authentication failed. Wrong password.',
						});
					}
				});
			})
			.catch(err =>
				res
					.status(404)
					.json({ success: false, message: 'User not found', error: err })
			);
	},
};
