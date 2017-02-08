'use strict';

angular.module('movieApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $location) {
    $scope.errors = {};
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          alert("Password changed success!");
          $location.path('/users/me');
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
