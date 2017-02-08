'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
	body: String,
	comment_by:{ 
		type: Schema.Types.ObjectId, 
		ref: 'User' 
	},
	created_at: Date,
	upvotes: {
		type: Number,
		default: '0'
	},
	reply: [ReplySchema],
	active: Boolean
});

var ReplySchema = new Schema({
	commentId: String,
	replier: { 
		type: Schema.Types.ObjectId, 
		ref: 'User' 
	},
    body: { 
    	type: String, 
    	required: true 
    },
    created_at: Date
}); 

module.exports = mongoose.model('Comment', CommentSchema);