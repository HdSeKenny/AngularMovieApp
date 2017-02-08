'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
	userId: String,
	sender: {type: Schema.Types.ObjectId, ref: 'User'},
	body: { type: String, required: true },
	created_at: Date,
	reply: [ReplySchema],
	active: Boolean
});

var ReplySchema = new Schema();

ReplySchema.add({
    userId: String,
    body: { type: String, required: true },
    replier: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: Date
});

module.exports = mongoose.model('Message', MessageSchema);


    
