'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
		// .when('/', {
		//   templateUrl: 'app/main/main.html',
		//   controller: 'MainCtrl'
		// })
		.when('/home',{
			templateUrl: 'app/views/pages/home.html',
		controller: 'MainCtrl'
		})
		.when('/main',{
			templateUrl: 'app/views/pages/main.html',
		controller: 'MainCtrl'
		})
  });

