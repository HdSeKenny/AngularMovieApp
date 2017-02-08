'use strict';

angular.module('movieApp')
  .factory('Blog', ['$http', function($http){
    var api = {
        getAllBlogs: function() {
            return $http.get('/api/blogs');
        },
        addBlog: function(blog) {
            return $http.post('/api/blogs', blog);
        },
        getBlog: function(blog_id) {
            return $http.get('/api/blogs/' + blog_id);
        },
        getMyBlogs: function(user_id) {
            return $http.get('/api/blogs/' + user_id + '/myBlogs');
        },
        deleteBlog: function(id) {
            return $http.delete('/api/blogs' + '/' + id);
        },
        updateBlog: function(blog_id, blog) {
            return $http.put('/api/blogs/' + blog_id, blog);
        },
        upvoteBlog: function(blog_id, new_upvote_count) {
            return $http.post('/api/blogs/' + blog_id + '/upvotes', { upvotes: new_upvote_count })
        },

    }
    return api
}])

