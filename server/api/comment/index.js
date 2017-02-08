'use strict';

var express = require('express');
var controller = require('./comment.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.post('/:blog_id/comments', controller.addBlogComment);
router.post('/:movie_id/addMovieComment', controller.addMovieComment);
router.post('/:comment_id/upvotes', controller.update_comment_upvotes);
router.post('/:commentId/replyBlogComment', controller.replyBlogComment);

module.exports = router;