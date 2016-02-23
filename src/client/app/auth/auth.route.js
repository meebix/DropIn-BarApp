(function() {
  'use strict';

  angular
    .module('app.auth')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'ROLES'];
  /* @ngInject */
  function appRun(routerHelper, ROLES) {
    routerHelper.configureStates(getStates(ROLES));
  }

  function getStates(ROLES) {
    return [
      {
        state: 'login',
        config: {
          url: '/login',
          views: {
            'auth': {
              templateUrl: 'app/auth/login.html',
              controller: 'AuthController',
              controllerAs: 'vm'
            }
          },
          title: 'Login',
          data: {
            authorizedRoles: [
              ROLES.all,
              ROLES.admin,
              ROLES.bar,
              ROLES.uatAdmin,
              ROLES.uatBar
            ]
          }
        }
      },
      {
        state: 'resetPassword',
        config: {
          url: '/reset-password',
          views: {
            'auth': {
              templateUrl: 'app/auth/reset-password.html',
              controller: 'AuthController',
              controllerAs: 'vm'
            }
          },
          title: 'Reset Password',
          data: {
            authorizedRoles: [
              ROLES.all,
              ROLES.admin,
              ROLES.bar,
              ROLES.uatAdmin,
              ROLES.uatBar
            ]
          }
        }
      }
    ];
  }
})();
