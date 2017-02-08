'use strict';

angular.module('movieApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {

      getUser: function(id) {
          return $http.get('/api/users/' + id);
      },
      getFollowUser: function(user_id) {
          return $http.get('/api/users/' + user_id);
      },
      followCurrentUser: function(likeUser) {   
          return $http.put('api/users/'+ likeUser.userId +'/follows', likeUser)
      },
      cancelFollow: function(cancelFollowedUser) {
          return $http.put('api/users/'+ cancelFollowedUser.userId +'/cancelFollow', cancelFollowedUser)
      },
    
      uploadImage: function(logo, current_user) {
          var formData = new FormData();
          formData.append("file", logo);
          return $http.post('/api/users/'+ current_user._id, formData, {
              headers: { 'Content-Type': undefined },
              transformRequest: angular.identity
          });
      },

      updateUserInfo: function(user) {
          return $http.put('/api/users/'+ user._id + '/updateUser', user);
      },
      leaveUserMessage: function(msg) {
          return $http.post('/api/users/' + msg.userId + '/message', msg);
      },
      deleteMessage: function(message) {
          return $http.put('/api/users/' + message.userId + '/deleteMessage', message)
      },
      replyUserMessage: function(repliedMessage) {
          return $http.post('/api/users/' + repliedMessage.userId + 
            '/reply', repliedMessage);
      },

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },
      
      isUserLoggedIn: function(){
        return currentUser.role === 'user';
      },


      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
