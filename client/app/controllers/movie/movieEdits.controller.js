'use strict';

  angular.module('movieApp')
    .controller('MovieEditsCtrl', 
        ['$scope', 'Movie','$window','$location','$routeParams',
          function($scope, Movie,$window,$location,$routeParams) {

  
         Movie.getMovies().success(function(data) {
                   $scope.movies = data
                 });

        $scope.addMovie = function(){
        var movie = {
            name: $scope.newMovie.name,
            actor: $scope.newMovie.actor,
            director: $scope.newMovie.director,
            drama: $scope.newMovie.drama,
            }
          Movie.addMovie(movie)
          .success(function(added_movie) {
             $scope.movies.push(added_movie);
             $scope.newMovie = { }
             var addMovie = $window.confirm('Create success!');
             $location.path('/movieEdits')
          })};


    $scope.deleteMovie = function(movie){
      var deleteMovie = $window.confirm('sure?');
             if (deleteMovie){
              Movie.deleteMovie(movie._id)
              .success(function(deleteMovie) {
          angular.forEach($scope.movies, function (item, key) {
                if (item._id === movie._id) {
                   console.log(key)
                $scope.movies.splice(key, 1);
                  return;
                }
            });

                $scope.newmovie = { }

         $window.alert('Delete success!');
       
        })

          }  };

     

       

}])


    

      
    // $scope.updateFilm = function () {
    //  SimpleFactory.updateFilm($scope.film.index, 
    //                          $scope.film.detail )
    //  var updateFilm = $window.confirm('Click OK to confirm!');
    //  if(updateFilm){
    //   $window.alert('Update successfully!');
    //   $location.path('/admin')
    //    }

    // }



//delete movie
         

/*
        $scope.deleteMovie = function(movie) {
              movie.state = "deleted";
    
        };
        
        $scope.confirmDelete = function(Movie,index) {
      
         var deMovie = $window.confirm('Are you absolutely sure you want to delete?');
        if (deMovie){
         $window.alert('Delete success!');
         $scope.movies.splice($scope.movies.indexOf(movie), 1);  
        }
         };

         */
       



//update movie
        
      




