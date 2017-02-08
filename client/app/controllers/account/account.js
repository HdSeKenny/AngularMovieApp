'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/',{
        templateUrl: 'app/views/pages/register.html',
        controller: 'SignupCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/views/pages/signup.html',
        controller: 'SignupCtrl'
      })
      
      .when('/settings', {
        templateUrl: 'app/views/pages/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/login', {
        templateUrl: 'app/views/pages/login.html',
        controller: 'LoginCtrl'
      })
      .when('/admin', {
        templateUrl: 'app/views/pages/admin.html',
        controller: 'AdminCtrl',
        authenticate: true
      });
  });