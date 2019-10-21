const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	username: {
		type: String,
		required: false,
		trim: true,
	},
	message: {
		type: String,
		required: false,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
