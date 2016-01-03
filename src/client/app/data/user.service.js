(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('userService', userService);

  userService.$inject = ['$http', '$q', 'logger', '$cookieStore'];
  /* @ngInject */
  function userService($http, $q, logger, $cookieStore) {
    var service = {
      allUsers: allUsers,
      createUser: createUser,
      deleteUser: deleteUser,
      getUserDataFromCookie: getUserDataFromCookie
    };

    return service;

    function allUsers(page) {
      return $http({
        method: 'GET',
        url: '/api/v1/users',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          page: page
        }
      }).then(function(response) {
        return response.data;
      });
    }

    function createUser(userObj) {
      return $http({
        method: 'POST',
        url: '/api/v1/users',
        headers: {
          'Content-Type': 'application/json'
        },
        data: userObj
      }).then(function(response) {
        return response.data;
      });
    }

    function deleteUser(userId) {
      return $http({
        method: 'DELETE',
        url: '/api/v1/users/' + userId,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }

    function getUserDataFromCookie() {
      var user = $cookieStore.get('user');

      return user;
    }
  }
})();
