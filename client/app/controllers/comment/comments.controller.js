'use strict';


angular.module('movieApp')
      .controller('CommentsCtrl', function ($scope, $window, Comment, Blog, Auth, $http,$routeParams) {

        $scope.current_user = Auth.getCurrentUser();

        Blog.getBlog($routeParams.blog_id)
            .success(function(blog) {
                $scope.comments = blog._comments;
                $scope.blog = blog;
            })
            .error(function(error) {
                $scope.notice = 'error ' + error.message;
            });

        $scope.incrementUpvotes = function(comment) {      
            Comment.upvoteBlogComment(comment._id , 
                    comment.upvotes + 1 )
              .success(function(updated_comment) {
                  comment.upvotes = updated_comment.upvotes
                  console.log(comment.upvotes);
              })
        }

        $scope.addComment = function() {
            var current_user = Auth.getCurrentUser;
            var dateNow = new Date();
            if ($scope.comment.body === '') {  return;  }
            var comment = {
                body: $scope.comment.body,
                user_id: current_user()._id,
                blog_id: $routeParams.blog_id,
                created_at: dateNow
            }
            
            $http.post('/api/comments/' + current_user()._id + '/comments', comment)
                .success(function(comment) {
                $scope.comments.push(comment);

                })
                .error(function(error) {
                 $scope.notice = 'error ' + error.message;
                });
                
                $scope.comment = {};
        };   

        $scope.replyComment = function(comment, current_user){
            var dateNow = new Date();
            var feedBack = {
                commentId: comment._id,
                replier: current_user,
                body: comment.reply.body,
                created_at: dateNow
            };

            Comment.replyBlogComment(feedBack)
                .success(function(data){
                    alert("Reply success!")
                    $scope.comment.reply.push(data);
                    comment.reply.body = {};
                })
                .error(function(){

                })
        };

         $scope.deleteComment = function(myComment) {
            var flag = $window.confirm('sure?');
            if (flag){
                Comment.deleteComment(myComment._id)
                   .success(function() {
                    alert("success!")
                       $scope.notice = {
                           'message': 'Deleted comment!',
                           'display': true
                       };
                       for (var i = 0; i < $scope.comments.length; i++) {
                           var comment = $scope.comments[i];
                           if (comment._id === myComment._id) {
                               $scope.comments.splice(i, 1);
                               break;
                           }
                       }

                   })
                   .error(function(err) {
                       $scope.notice = "delete failed: " + err.message;
                   });
             }
        };

        $scope.deleteCommentReply = function(reply) {
            // var flag = $window.confirm('sure?');
            // if (flag){
            //     Comment.deleteCommentReply(reply)
            //        .success(function() {
            //         alert("success!")
            //            $scope.notice = {
            //                'message': 'Deleted comment!',
            //                'display': true
            //            };
            //            for (var i = 0; i < $scope.comments.length; i++) {
            //                var comment = $scope.comments[i];
            //                if (comment._id === myComment._id) {
            //                    $scope.comments.splice(i, 1);
            //                    break;
            //                }
            //            }

            //        })
            //        .error(function(err) {
            //            $scope.notice = "delete failed: " + err.message;
            //        });
            //  }
        };


  });









