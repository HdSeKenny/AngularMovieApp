'use strict';

angular.module('movieApp')
    .controller('MyBlogsCtrl', function($scope, Blog, $window, $location, socket, Auth, $routeParams) {
        $scope.errors = {};
        $scope.notice;
   //      $scope.blogs = [];
         $scope.current_user = Auth.getCurrentUser();
         Blog.getMyBlogs($routeParams.user_id)
               .success(function(blogs){
                   $scope.blogs = blogs;
                   
               })
               .error(function(error) {
                   $scope.notice = 'error ' + error.message;
               }); 

         $scope.checklogin = function(blog) {
               if (Auth.isLoggedIn() === false){                 
                   $location.path('/register');
               }else {
                   $location.path("/blogs/" + blog._id + "/comments");
               }
           }

        $scope.deleteBlog = function(myblog) {
            var flag = $window.confirm('sure?');
            if (flag){
               Blog.deleteBlog(myblog._id)
                   .success(function() {
                       $scope.notice = {
                           'message': 'Deleted blog!',
                           'display': true
                       };
                       for (var i = 0; i < $scope.blogs.length; i++) {
                           var blog = $scope.blogs[i];
                           if (blog._id === myblog._id) {
                               $scope.blogs.splice(i, 1);
                               break;
                           }
                       }

                   })
                   .error(function(err) {
                       $scope.notice = "delete failed: " + err.message;
                   });
             }
        };

        

   //      $scope.$on('$destroy', function() {
   //          socket.unsyncUpdates('blog');
   //      });


    });