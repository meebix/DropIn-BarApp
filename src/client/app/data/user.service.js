(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('userService', userService);

  userService.$inject = ['$cookieStore'];
  /* @ngInject */
  function userService($cookieStore) {
    var service = {
      getUserDataFromCookie: getUserDataFromCookie
    };

    return service;

    function getUserDataFromCookie() {
      var user = $cookieStore.get('user');

      return user;
    }
  }
})();
