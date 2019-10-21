const crystal = require('../crystal/crystal');

module.exports = {
	getCrystals: function(req, res) {
		const crystals = crystal;
		res.json(crystals);
	},
};
