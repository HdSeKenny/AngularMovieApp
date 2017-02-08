'use strict';
var _ = require('lodash');
var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var multer = require('multer');

var validationError = function(res, err) {
    return res.json(422, err);
};

exports.likeUsers = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, users);
    });
};

exports.followTheUser = function(req, res) {
    var currentUser = req.body.follower;
    var theUser = req.body.follow;  
    var userId = req.params.id; 

    User.findById(userId, function(err, user) {
        var to_follow = {
            userId: currentUser._id,
            follower: currentUser
        }
        if (user != null) {
            user.followed.push(to_follow);
            user.save(function(err) {
                if (err) return validationError(res, err);

                User.findById(currentUser._id, function(err, follow_user) {
                    var follow_me = {
                        userId: userId,
                        follow: theUser
                    }
                    if (follow_user != null) {
                        follow_user.followed.push(follow_me);
                        follow_user.save(function(err) {
                            if (err) return validationError(res, err);
                            res.send(200);
                        });
                    } else {
                        res.send(403);

                    }
                });
            });
        } else {
            res.send(403);
        }
    });
};

exports.cancelFollow = function(req, res) {
    
    var hisId = req.params.followedUserId; 
    var he = req.body.followed; 
    var me = req.body.follower; 
    var myId = me._id; 

    User.findById(hisId, function(err, user) {        
        if (user != null) {
            for (var i=0; i < user.followed.length; i++){
                var temp = user.followed[i];
                if(temp.userId == myId){                    
                    user.followed.remove(temp);
                    break;
                }  
            }
            user.save(function(err) {
                if (err) return validationError(res, err);
                User.findById(myId, function(err, current_user) {                   
                    if (current_user != null) {
                        for (var i=0; i < current_user.followed.length; i++){
                            var temp = current_user.followed[i];
                            if(temp.userId == hisId){                    
                                current_user.followed.remove(temp);
                                break;
                            }  
                        }
                        current_user.save(function(err) {
                            if (err) return validationError(res, err);
                            res.send(200);
                        });
                    } else {
                        res.send(403);
                    }
                });
            });
        } else {
            res.send(403);
        }

    });
};


/**
 * change user image
 */
exports.changeUserImage = function(req, res){

    var userId = req.params.userId;
    var storage = multer.diskStorage({ 
        destination: function (req, file, cb) {
            cb(null, './client/assets/uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var upload = multer({ storage: storage }).single('file');
    
    User.findById(userId, function (err, user) {
        if (user != null){
            upload(req, res, function (uploadError) {    
                if(uploadError) {
                    return res.status(400).send({
                      message: 'Error occurred while uploading profile picture'
                    });
                }else{             
                    var str = req.file.path;
                    user.imageUrl = str.substring(7);
                    user.save(function (saveError) {
                        if (saveError) {
                            return res.status(400).send({
                              message: errorHandler.getErrorMessage(saveError)
                            });
                        } else {
                            return res.json(user);
                        }
                    });                
                }              
            });
        }else{
            res.status(400).send({
              message: 'User is not signed in'
            });
        }
    });
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) return res.send(500, err);
        res.json(200, users);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
        res.json({ token: token });
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.send(500, err);
        return res.send(204);
    });
};


/**
 * update user Information
 * 
 */

exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    User.findById(req.params.id, function(err, user) {
        if (err) {
            return handleError(res, err); }
        if (!user) {
            return res.send(404); }
        var updated = _.merge(user, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err); }
            return res.json(200, user);
        });
    });
};


exports.leaveUserMessage = function(req, res) {

    var userId = req.params.userId;
    var newMsg = req.body;
    User.findById(userId, function(err, user) {
        if (user != null) {
            user.messages.push(newMsg);
            user.save(function(err) {
                if (err) return validationError(res, err);
                return res.json(201, newMsg);
            });
        } else {
            res.send(403);
        }
    });
};


exports.deleteUserMessage = function (req, res) {
    var userId = req.params.userId; 
    var deletedMsg = req.body;   
    User.findById(userId, function(err, user){
        if (user != null){
            user.messages.remove(deletedMsg);
            user.save(function(err, user){
                if (err) return validationError(res, err);
                return res.json(200, user);
            })
        }else {
            res.send(403);
        }
    });
};


exports.replyUserMessage = function (req, res) {
   
    // var replier = req.body.replier; 
    // var theMessage = req.body.theMessage;
    // User.findById(replier._id, function(err, user){
    //     if (user != null){

    //         var reply = {
    //             userId: req.params.userId,
    //             body: req.body.body,
    //             replier: replier,
    //             created_at: req.body.created_at
    //         }

    //         // var msg = {
    //         //     userId: theMessage.userId,
    //         //     sender: theMessage.sender,
    //         //     body: theMessage.body,
    //         //     created_at: theMessage.created_at
    //         // }


    //         // var message_index = _.findIndex(user.messages, 
    //         //    function(message) {
    //         //     console.log(message);
    //         //       return message === msg;
    //         //   });
    //         // console.log(message_index);
    //         // console.log("----------------------------------------")
    //         var messages = user.messages;
    //         for (var i = 0; i < messages.length; i++) {
    //             // console.log(user.messages[i]+"--------");
    //             // console.log(message);
    //             if(messages[i]._id == theMessage._id){
    //                 console.log("jin lai le---------------------");
    //                 // user.messages[i].reply.push(reply);
    //                 console.log(messages[i].reply);
    //                 messages[i].reply.push(reply);
    //                 break;
    //             }
                
    //         };

    //         user.save(function(err){
    //             if (err) return validationError(res, err);
    //             return res.json(200, user);
    //         })
    //     }else {
    //         res.send(403);
    //     }
    // });
};


/**
 * Change a users password
 */

exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};







