const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatsSchema = new Schema({
    user_id: {
		type: String,
		unique: true,
        required: true,
    },
	wins: {
		type: Number,
		required: false,
		trim: true,
	},
	losses: {
		type: Number,
		required: false,
		trim: true,
    },
    movesPlayed: {
        type: Number,
		required: false,
		trim: true,
    }, 
    perfects: {
        type: Number,
		required: false,
		trim: true,	
    },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Stats = mongoose.model('Stats', StatsSchema);

module.exports = Stats;