'use strict';

angular.module('movieApp')
  .controller('FollowCtrl', 
       function ($scope, UsersService, $window, $routeParams,Auth) {

        $scope.currentUser = Auth.getCurrentUser();

        UsersService.getFollowUser($routeParams.user_id)
            .success(function(data) {
            $scope.user = data; 
        });

   		$scope.followTheUser = function(the_user, current_user) {
                var likeUser = {
                    userId: $routeParams.user_id,
                    follow: the_user,
                    follower: current_user
                };
                UsersService.followCurrentUser(likeUser)
                    .success(function(data) {
                        alert("Followed success!");
                        $window.location.reload(); 
                    })
                    .error(function(){

                    })
            }

        $scope.isFollowed = function(the_user, current_user) {

            var flag = false;
            var myFollowed = current_user.followed;

            if (myFollowed == null) { 
                return flag; 
            } else {
                angular.forEach(myFollowed, function(key) {
                    if (!flag) {
                        if (key.userId == $routeParams.user_id && key.follow != null) {
                           flag = true;
                        }      
                    }
                });
                return flag;
            }
        }

        $scope.cancelFollowUser= function(the_user, current_user) {

            var flag = $window.confirm('sure?');
            var cancelFollowedUser = {             
                userId : $routeParams.user_id,
                followed: the_user,
                follower: current_user
            };
            if (flag){
                UsersService.cancelFollow(cancelFollowedUser)
                    .success(function(cancelFollowedUser){
                      $window.alert("Canceled !");
                      $window.location.reload(); 
                    })
                    .error(function(){

                    })
            }
        }
  });
