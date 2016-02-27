(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('accessService', accessService);

  accessService.$inject = ['$cookieStore', 'ROLES'];
  /* @ngInject */
  function accessService($cookieStore, ROLES) {
    var service = {
      getRole: getRole,
      isAuthorized: isAuthorized
    };

    return service;

    function getRole() {
      var user;
      var role;

      if ($cookieStore.get('user')) {
        // Check if there is a cookie with a role, if so use that
        user = $cookieStore.get('user');
        role = user.roleId.objectId;
      } else {
        // If no cookie was set yet, use a random value for all role
        role = '0000000000';
      }

      return role;
    }

    function isAuthorized(authorizedRoles) {
      return authorizedRoles.indexOf(getRole()) !== -1;
    }
  }
})();
