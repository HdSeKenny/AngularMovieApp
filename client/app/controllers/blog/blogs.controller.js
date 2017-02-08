'use strict';

angular.module('movieApp')
  .controller('BlogsCtrl', function($scope,Blog,Auth,$window,$routeParams,$location) {
        $scope.blogs = [];
        $scope.notice;
        $scope.current_user = Auth.getCurrentUser();

        Blog.getAllBlogs()
            .success(function(blogs) {
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
        
        $scope.addBlog = function(){  
            
            if ($scope.blog.title === '' && $scope.blog.body === ''){
                alert("Blog title and body are required !")
                return; 
            }else if ($scope.blog.title === '') { 
                alert("Blog title is required !")
                return; 
            }
            else if ($scope.blog.body === '') { 
                alert("Blog body is required !")
                return; 
            }  
            
            var dateNow = new Date();
            var blog = {
                title: $scope.blog.title,
                body: $scope.blog.body,
                write_by: Auth.getCurrentUser()._id,
                created_at:  dateNow                 
            }

            Blog.addBlog(blog)
                .success(function(blog) {
                    $scope.blogs.push(blog)
                    $scope.blog = {} ;
                    alert("success");
                    $location.path('/blogs');
                })
                .error(function(err) {
                    err = err.data;
                    $scope.errors = {};

                    angular.forEach(err.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        }

        $scope.incrementUpvotes = function(blog) {
           Blog.upvoteBlog(blog._id, blog.upvotes + 1 )
              .success(function(updated_blog) {
                  blog.upvotes = updated_blog.upvotes;
              })
              .error(function(err){

                
              })
        }


  });
