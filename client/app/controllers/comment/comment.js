'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/posts/:post_id/comments', {
        templateUrl: 'app/comments/comments.html',
        controller: 'CommentsCtrl'
      })
      .when('/blogs/:blog_id/comments', {
        templateUrl: 'app/comments/comments.html',
        controller: 'CommentsCtrl'
      });  
  });
