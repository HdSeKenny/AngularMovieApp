'use strict';

var express = require('express');
var controller = require('./blog.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);

router.put('/:id', controller.update);

router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/:user_id/myBlogs', controller.listMyBlogs);

router.post('/:blog_id/upvotes', controller.update_upvotes);

// router.post('/:userId/userName', controller.followUser);
module.exports = router;