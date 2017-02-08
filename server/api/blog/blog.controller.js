    'use strict';

    var _ = require('lodash');
    var Blog = require('./blog.model');
    var User = require('../user/user.model') 

    // Get list of blogs
    exports.index = function(req, res) {     
        Blog.find()
            .populate('write_by','name')
            .exec(function (err, blogs) {
              if(err) { return handleError(res, err); }
              return res.json(200, blogs);
          });
    };

    // Get list of my blogs
    exports.listMyBlogs = function(req, res) {
        Blog.find({
            write_by: req.params.user_id
        })
        .populate('write_by','name')
        .exec(function(err, blogs) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, blogs);
        });
    };


    // Get a single blog
    exports.show = function(req, res) {
      Blog.findById(req.params.id)
        .lean()
        .populate('_comments')
        .populate('write_by','name')
        .exec(function(err, docs) {
            var options = {
                path: '_comments.comment_by',
                model: 'User'
            };
            if (err) return res.json(500);
            Blog.populate(docs, options, function(err, blog) {
                res.json(200, blog);
            });
        });
    };

    // Creates a new blog in the DB.
    exports.create = function(req, res) {
        Blog.create(req.body, function(err, blog) {
         var newBlog={
            body:req.body.body,
            title:req.body.title,
            write_by:req.body.write_by,
            created_at:req.body.created_at, 
          }
          if(err) { return handleError(res, err); }
          Blog.findById(blog._id)
          .populate('write_by','name')
          .exec(function(err,blog){
           if(err) { return handleError(res, err); }
            return res.json(blog);
          });        
      });
    };

    // Updates an existing blog in the DB.
    exports.update = function(req, res) {
      if(req.body._id) { delete req.body._id; }
      Blog.findById(req.params.id, function (err, blog) {
        if (err) { return handleError(res, err); }
        if(!blog) { return res.send(404); }
        var updated = _.merge(blog, req.body);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, blog);
        });
      });
    };

    // Deletes a blog from the DB.
    exports.destroy = function(req, res) {
      Blog.findById(req.params.id, function (err, blog) {
        if(err) { return handleError(res, err); }
        if(!blog) { return res.send(404); }
        blog.remove(function(err) {
          if(err) { return handleError(res, err); }
          return res.send(204);
        });
      });
    };

    // Upvotes a comment in the DB
    exports.update_upvotes = function(req, res) {
        Blog.findById(req.params.blog_id, function (err, blog) {
            blog.upvotes = req.body.upvotes
            blog.save(function (err) {
                if(err) { return handleError(res, err); }
                return res.json(200, blog);
            });
        });
    };

    function handleError(res, err) {
        return res.send(500, err);
    }