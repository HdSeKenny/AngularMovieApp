'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MovieSchema = new Schema({
  name: String,
  actor: String,
  director: String,
  drama: String,
  imageurl: String,
  // comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  active: Boolean
});

module.exports = mongoose.model('Movie', MovieSchema);