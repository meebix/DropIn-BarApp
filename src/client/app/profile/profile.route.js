(function() {
  'use strict';

  angular
    .module('app.profile')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'ROLES'];
  /* @ngInject */
  function appRun(routerHelper, ROLES) {
    routerHelper.configureStates(getStates(ROLES));
  }

  function getStates(ROLES) {
    return [
      {
        state: 'profile-edit',
        config: {
          url: '/profile/:id/edit',
          templateUrl: 'app/profile/edit.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          title: 'Profile',
          data: {
            authorizedRoles: [ROLES.admin]
          }
        }
      }
    ];
  }
})();
