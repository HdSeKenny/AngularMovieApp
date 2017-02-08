'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movies', {
        templateUrl: 'app/views/pages/movies.html',
        controller: 'MoviesCtrl',
        authenticate: true
      })
      .when('/movies/moviesUpdate/:id', {
        templateUrl: 'app/views/pages/moviesUpdate.html',
        controller: 'MoviesUpdateCtrl'
      }) 
      .when('/movieEdits', {
        templateUrl: 'app/views/pages/movieEdits.html',
        controller: 'MovieEditsCtrl'
      })
      .when('/movies/:movie_id/movieDetails', {
        templateUrl: 'app/views/pages/movieDetails.html',
        controller: 'MovieDetailsCtrl'
      });
  });