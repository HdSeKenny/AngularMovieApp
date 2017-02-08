
'use strict';

angular.module('movieApp')
    .controller('MoviesUpdateCtrl', ['$scope', 'Movie','$window','$location','$routeParams',
          function($scope, Movie,$window,$location,$routeParams) {
       
        Movie.getMovie($routeParams.id)
            .success(function(movie) {
             $scope.newMovie = movie;
        });

        $scope.updateMovie = function(id){
            var movie = {
                name: $scope.newMovie.name,
                actor: $scope.newMovie.actor,
                director: $scope.newMovie.director,
                drama: $scope.newMovie.drama,
            }

            Movie.updateMovie($scope.newMovie._id, movie)  
                .success(function(movie) {
                
                $scope.newMovie ={};
                console.log("success")
                var addMovie = $window.confirm('Create success!');
                
                $location.path("/movieEdits");
              });
        }
}]);






    

