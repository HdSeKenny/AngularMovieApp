'use strict';

 angular.module('movieApp')
      .factory('Movie', ['$http', function($http){

      var api = {

          getMovies: function() {
              return $http.get('/api/movies')
          },
          getMovie: function(movie_id) {
              return $http.get('/api/movies/' + movie_id);
          },
          addMovie: function(movie) {
              return $http.post('/api/movies', movie)
          },
          deleteMovie: function(movie_id) {
              return $http.delete('/api/movies/' + movie_id)
          },

          updateMovie: function(movie_id, movie) {
              return $http.put('/api/movies/' + movie_id, movie)
          },
          addMovieComment: function(comment) {
              return $http.post('/api/comments/' + comment.movie_id + '/addMovieComment', comment)

          },
      }
      return api
      }

  ])

