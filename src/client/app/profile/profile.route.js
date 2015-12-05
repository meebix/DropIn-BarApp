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
        state: 'profiles',
        config: {
          url: '/profiles',
          templateUrl: 'app/profile/list.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          title: 'Profiles',
          data: {
            authorizedRoles: [ROLES.admin]
          }
        }
      },
      {
        state: 'profile-new',
        config: {
          url: '/profile/new',
          templateUrl: 'app/profile/new.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          title: 'profile',
          data: {
            authorizedRoles: [ROLES.admin]
          }
        }
      },
      {
        state: 'profile-show',
        config: {
          url: '/profile/:id',
          templateUrl: 'app/profile/show.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          title: 'profile',
          data: {
            authorizedRoles: [ROLES.admin]
          }
        }
      },
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
