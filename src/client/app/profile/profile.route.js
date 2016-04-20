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
          views: {
            'main': {
              templateUrl: 'app/profile/list.html',
              controller: 'ProfileController',
              controllerAs: 'vm'
            }
          },
          title: 'Bar Profiles',
          data: {
            authorizedRoles: [
              ROLES.admin,
              ROLES.uatAdmin
            ]
          }
        }
      },
      {
        state: 'profile-new',
        config: {
          url: '/profile/new',
          views: {
            'main': {
              templateUrl: 'app/profile/new.html',
              controller: 'ProfileController',
              controllerAs: 'vm'
            }
          },
          title: 'Create Bar Profile',
          data: {
            authorizedRoles: [
              ROLES.admin,
              ROLES.uatAdmin
            ]
          }
        }
      },
      {
        state: 'profile-show',
        config: {
          url: '/profile/:id',
          views: {
            'main': {
              templateUrl: 'app/profile/show.html',
              controller: 'ProfileController',
              controllerAs: 'vm'
            }
          },
          title: 'Bar Profile',
          data: {
            authorizedRoles: [
              ROLES.admin,
              ROLES.uatAdmin
            ]
          }
        }
      },
      {
        state: 'profile-edit',
        config: {
          url: '/profile/:id/edit',
          views: {
            'main': {
              templateUrl: 'app/profile/edit.html',
              controller: 'ProfileController',
              controllerAs: 'vm'
            }
          },
          title: 'Edit Bar Profile',
          data: {
            authorizedRoles: [
              ROLES.admin,
              ROLES.uatAdmin
            ]
          }
        }
      }
    ];
  }
})();
