'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
	title: String,
	body: String,
	write_by:{ type: Schema.Types.ObjectId, ref: 'User' },
	_comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
	created_at: Date,
	upvotes: {
		type: Number,
		default: '0'
	},
	active: Boolean
});


module.exports = mongoose.model('Blog', BlogSchema);