'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/blogs', {
        templateUrl: 'app/views/pages/blogs.html',
        controller: 'BlogsCtrl',
        authenticate: true   
      })
      .when('/newBlog',{
    	  templateUrl: 'app/views/pages/newBlog.html',
        controller: 'BlogsCtrl',
        authenticate: true
      })
      .when('/:user_id/myBlogs',{
        templateUrl: 'app/views/pages/myBlogs.html',
        controller: 'MyBlogsCtrl'
      })
      .when('/blogs/update/:blog_id',{
        templateUrl: 'app/views/pages/updateBlog.html',
        controller: 'UpdateBlogsCtrl'
      });
  });