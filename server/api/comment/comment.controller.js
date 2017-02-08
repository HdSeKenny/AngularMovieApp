

'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');
var Movie = require('../movie/movie.model');
var User = require('../user/user.model');
var Blog = require('../blog/blog.model');

// Get list of comments
exports.index = function(req, res) {
    Comment.find({})
    .populate('_comments', 'upvotes')
    .exec(function (err,comments){
      if(err) { return handleError(res, err); }
      return res.json(200, comments);
    });
};

//Get a single comment
exports.show = function(req, res) {
    Comment.findById(req.params.id, function (err, comment) {
      if(err) { return handleError(res, err); }
      if(!comment) { return res.send(404); }
      return res.json(comment);
    });
};


// Creates a new comment in the DB.
// exports.addMovieComment = function(req, res) {   
//     console.log(req.body)
//     // Comment.create(newComment, function(err, comment) {
//         Movie.findById(req.body.movie_id, function(err, movie){
//           if(movie != null){
//               var comment = {
//                   body:req.body.body,
//                   comment_by:req.body.comment_by,
//                   created_at: req.body.created_at,
//               }
//               movie.comments.push(comment._id);
//               movie.save(function (err) {
//                  if (err) { return handleError(res, err); }
//                     Comment.findById (comment._id)
//                       .populate('comment_by')
//                       .exec(function(err, comment){
//                           if (err) { return handleError(res, err); }

//                           return res.json(201, comment);
//                     })
                    
//               });
  
//           } else {
//               return res.send(404);
//           }
//         });
//     // });
// };
exports.addMovieComment = function(req, res) {
    Comment.create({
        body: req.body.body,
        comment_by: req.body.comment_by,
        created_at: req.body.created_at,

    }, function(err, comment) {
        if (err) {
            return handleError(res, err);
        }
        Movie.findById(req.body.movie_id, function(err, movie) {
            movie.comments.push(comment._id);
            movie.save(function(err) {
                if (err) { return handleError(res, err); }
            });
            var last = _.last(movie.comments)
            if (last != undefined) {
                Comment.findById(last)
                    .populate('comment_by')
                    .exec(function(err, comment) {
                        if (err) return handleError(err);
                        return res.json(comment);
                    });
            } else {
                return res.send(500, "Database error");
            }
        });
    });
};


// add blogComment.........
exports.addBlogComment = function(req, res) {
    Comment.create({
        body: req.body.body,
        comment_by: req.body.user_id,
        created_at: req.body.created_at,

    }, function(err, comment) {
        if (err) {
            return handleError(res, err);
        }
        Blog.findById(req.body.blog_id, function(err, blog) {
            blog._comments.push(comment._id);
            blog.save(function(err) {
                if (err) {
                    return handleError(res, err); }
            });
            var last = _.last(blog._comments)
            if (last != undefined) {
                Comment.findById(last)
                    .populate('comment_by')
                    .exec(function(err, comment) {
                        if (err) return handleError(err);
                        return res.json(comment);
                    });
            } else {
                return res.send(500, "Database error");
            }
        });
    });
};


exports.update_comment_upvotes = function(req, res) {       
    Comment.findById(req.params.comment_id, function (err, comment) {
      if (comment != null){
          comment.upvotes = req.body.upvotes
          comment.save(function(err){
              if (err) return handleError(err);
              return res.json(200, comment);
          })
      } else {
          return res.send(404);
      }

    })
};


exports.replyBlogComment = function (req,res) {
    Comment.findById (req.params.commentId, function(err, comment){
        if (comment != null){
            var feedBack = {
                commentId: req.params.commentId,
                replier: req.body.replier,
                body: req.body.body,
                created_at: req.body.created_at
            }
            comment.reply.push(feedBack);
            comment.save(function(err){
                if (err) return handleError(err);
                return res.json(201, feedBack);
            })

        } else {
            return res.send(404);
        }
    })
}

// Updates an existing comment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    var updated = _.merge(comment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, comment);
    });
  });
};

// Deletes a comment from the DB.
exports.destroy = function(req, res) {
  console.log(req.params.id);
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    comment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}