'use strict';

angular.module('movieApp')
    .controller('UpdateBlogsCtrl', function($scope, Blog, $window, $location, socket, Auth, $routeParams) {
        $scope.errors = {};
        
        $scope.current_user = Auth.getCurrentUser();

       

        Blog.getBlog($routeParams.blog_id)
            .success(function(blog){
                 $scope.theBlog= blog;
               
            })
            .error(function(error) {
            $scope.notice = 'error ' + error.message;
        }); 

        $scope.updateBlog = function(blog_id){
            
            var dataNow = new Date();
        
            var blog = {
                title: $scope.theBlog.title,
                body: $scope.theBlog.body,
                created_at: dataNow,
            }
            if (blog.title === '') { return; }
            if (blog.body === '') { return; }

            var flag = $window.confirm('Sure to update?'); 

            if(flag){
                Blog.updateBlog($scope.theBlog._id, blog)  
                    .success(function(blog) {
                    
                    $scope.theBlog ={};                      
                    $location.path('/'+Auth.getCurrentUser()._id+'/myBlogs'); 
                });
            }
        }




    });