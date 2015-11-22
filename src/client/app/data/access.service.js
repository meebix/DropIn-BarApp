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
        // If no cookie was set yet, use * for all role
        role = '*';
      }

      return role;
    }

    function isAuthorized(authorizedRoles) {
      return authorizedRoles.indexOf(getRole()) !== -1;
    }
  }
})();
