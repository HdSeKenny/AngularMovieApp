'use strict';

angular.module('movieApp')
  .factory('Comment', ['$http', function ($http) {
    var api = {
        upvoteBlogComment : function(comment_id, new_upvote_count) {
			      return $http.post( '/api/comments/' + comment_id + '/upvotes', 
                   {upvotes: new_upvote_count })
        }, 
        replyBlogComment : function(feedBack){
            return $http.post('/api/comments/' + feedBack.commentId + '/replyBlogComment', feedBack);
        }, 
        getComment : function (comment_id) {
            return $http.get('/api/comments/' + comment_id);
        },
        deleteComment: function(id) {
            return $http.delete('/api/comments/' + id);
        },  
      }
      return api
  }]);
