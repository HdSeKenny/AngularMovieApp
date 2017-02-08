'use strict';


    angular.module('movieApp')
      .controller('MoviesCtrl', 
        ['$scope', 'Movie','$window','$location','$routeParams',
          function($scope, Movie,$window,$location,$routeParams) {

           Movie.getMovies().success(function(data) {
                   $scope.movies = data
                 })
//get movie        
         
          }])

