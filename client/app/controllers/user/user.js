'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/users/:id', {
        templateUrl: 'app/views/pages/user.html',
        controller: 'UsersCtrl'
      })
      .when('/users/:user_id/follow', {
        templateUrl: 'app/views/pages/follow.html',
        controller: 'FollowCtrl'
      })
      .when('/users/:user_id/lover', {
        templateUrl: 'app/views/pages/lover.html',
        controller: 'FollowCtrl'
      })
      .when('/users/:id/messages', {
        templateUrl: 'app/views/pages/messages.html',
        controller: 'MessagesCtrl'
      })
      .when('/newMsg', {
        templateUrl: 'app/views/pages/newMsg.html',
        controller: 'MessagesCtrl'
      });
  });


