'use strict';

      angular.module('movieApp')
        .controller('MovieDetailsCtrl', ['$scope', 'Movie','Auth','$routeParams',
          function ($scope,Movie,Auth,$routeParams) {

            $scope.current_user = Auth.getCurrentUser();

            Movie.getMovie($routeParams.movie_id)
                .success(function(movie){
                    $scope.movie = movie;
                    $scope.comments = movie.comments
                })
                 .error(function(err){

                })

            $scope.incrementUpvotes = function(comment) {
               Movie.upvotePostComment($scope.comment._id , 
                        comment.upvotes + 1 )
                  .success(function(updated_comment) {
                      comment.upvotes = updated_comment.upvotes
                  })
            }
     
            $scope.addComment = function(){      
                if($scope.comment.body === '') {
                    alert("Comment can't be empty"); 
                    return; 
                }
                var dateNow = new Date();
                var comment = {
                    body: $scope.comment.body,
                    comment_by: $scope.current_user._id,
                    movie_id: $routeParams.movie_id,
                    created_at: dateNow
                }

                Movie.addMovieComment(comment)
                    .success(function(comment) {
                        $scope.comments.push(comment)
                        $scope.comment = {} ;   
                    })
                    .error(function(err){

                    }); 
            }
  }]);
