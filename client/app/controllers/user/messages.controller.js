'use strict';

angular.module('movieApp')
  .controller('MessagesCtrl', function (Auth, $window, $routeParams, ModalService, $scope) {
    	$scope.current_user = Auth.getCurrentUser();

    	Auth.getUser($routeParams.id)
        .success(function(user) {
        	 $scope.messages = user.messages;
           $scope.user = user;
        })
        .error(function(){

        });	

      $scope.leaveMessage = function(user, current_user) {
          var dateNow = new Date();
          var msg = {
            userId: user._id,
            sender: current_user,
            body: $scope.message.body,
            created_at: dateNow
          };

          Auth.leaveUserMessage(msg)
          	.success(function(msg){   
          		alert("success!") 
          		$scope.message = {};      		
      		    $scope.messages.push(msg);
                  
          	})
          	.error(function(){

          	})
      };

      $scope.deleteMessage = function(message) {
          var flag = $window.confirm('sure?');
          if (flag){
              Auth.deleteMessage(message)
                 .success(function(data) {
                     alert("success !");
                     $scope.messages = data.messages;

                 })
                 .error(function(err) {
                     $scope.notice = "delete failed: " + err.message;
                 });
           }
      };

      $scope.replyMessage = function(message, current_user){
          var dateNow = new Date();
          var repliedMessage = {
              userId: message.sender._id,
              theMessage: message,
              body: message.reply.body,
              replier: current_user,
              created_at: dateNow
          }

          Auth.replyUserMessage(repliedMessage)
              .success(function(){

              })
              .error(function(){


              });
      };



  });






