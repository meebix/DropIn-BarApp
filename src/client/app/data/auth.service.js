(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('authService', authService);

  authService.$inject = ['$http', '$q', 'logger'];
  /* @ngInject */
  function authService($http, $q, logger) {
    var service = {
      login: login,
      logout: logout,
      resetPassword: resetPassword,
      isAuthenticated: isAuthenticated
    };

    return service;

    function login(credentials) {
      return $http({
        method: 'POST',
        url: '/api/v1/auth/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: credentials
      }).then(function(response) {
        return response.data;
      });
    }

    function logout() {
      return $http({
        method: 'POST',
        url: '/api/v1/auth/logout',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        return response.data;
      });
    }

    function resetPassword(credentials) {
      return $http({
        method: 'POST',
        url: '/api/v1/auth/reset-password',
        headers: {
          'Content-Type': 'application/json'
        },
        data: credentials
      }).then(function(response) {
        return response.data;
      });
    }

    function isAuthenticated() {
      return $http({
        method: 'GET',
        url: '/api/v1/auth/is-authenticated',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.data;
      });
    }
  }
})();
