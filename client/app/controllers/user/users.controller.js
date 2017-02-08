'use strict';

angular.module('movieApp')
    .controller('UsersCtrl',
        function($scope, User, Upload, $window, $http, $location, $routeParams, Auth) {
    
            var toggle = true;
            $scope.currentUser = Auth.getCurrentUser();

            Auth.getUser($routeParams.id)
                .success(function(data) {
                    $scope.user = data;
                    $scope.imageUrl = data.imageUrl;                
                });

    
            $scope.$watch('toggle', function(){
                $scope.toggleText = $scope.toggle ? 'Follow' : 'Followed';

            })
            $scope.myFunction = function(){
                if(toggle) {
                    $scope.toggleText = 1;

                }else {
                    $scope.toggleText = 2;
                }

                toggle = !toggle;
            }
            $scope.followTheUser = function(the_user, current_user) {
                var likeUser = {
                    userId: $routeParams.id,
                    follow: the_user,
                    follower: current_user
                };
                Auth.followCurrentUser(likeUser)
                    .success(function(data) {
                        alert("Followed success!");
                        $scope.toggleText = "Followed";
                    })
                    .error(function(){

                    })
            }

            $scope.isFollowed = function(the_user, current_user) {

                var flag = false;
                var myFollowed = current_user.followed;

                if (current_user._id == $routeParams.id || myFollowed == null) { 
                    return flag; 
                } else {
                    angular.forEach(myFollowed, function(key) {
                        if (!flag) {
                            if (key.userId == $routeParams.id && key.follow != null) {
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
                    userId : $routeParams.id,
                    followed: the_user,
                    follower: current_user
                };
                if (flag){
                    Auth.cancelFollow(cancelFollowedUser)
                        .success(function(cancelFollowedUser){
                          $window.alert("Canceled !");
                          $scope.toggleText = "Follow";
                        })
                        .error(function(){

                        })
                }
            }
              
            $scope.uploadImage = function(logoFile, currentUser) {
                if(logoFile == null){
                    alert("choose a photo first!");
                }else{
                  Auth.uploadImage(logoFile, currentUser)
                      .success(function (response) {                                         
                          alert("success!!");
                          $scope.imageUrl = response.imageUrl;
                      })
                      .error(function (error) {
                          // Handle error from server
                          console.log(error);
                      });
                }
            };

              $scope.checkName = function(data) {
                  // if (data !== 'awesome' && data !== 'error') {
                  //     return "Username should be `awesome` or `error`";
                  // }
              };

              $scope.saveUser = function(current_user) {
                console.log(current_user._id);
                  // $scope.user already updated!
                  var user = {
                      _id: current_user._id,
                      username: $scope.user.username,
                      name: $scope.user.name,
                      gender: $scope.user.gender,
                      email: $scope.user.email,
                      birthDay: $scope.user.birthDay,
                      phoneNo: $scope.user.phoneNo
                  }

                  Auth.updateUserInfo(user)
                      .success(function(){

                      })
                      .error(function(){

                          if (err.field && err.msg) {
                              // err like {field: "name", msg: "Server-side error for this username!"} 
                              $scope.editableForm.$setError(err.field, err.msg);
                          } else {
                              $scope.editableForm.$setError('name', 'Unknown error!');
                          }

                      });
                };
    });




