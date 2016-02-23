(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'ROLES'];
  /* @ngInject */
  function appRun(routerHelper, ROLES) {
    routerHelper.configureStates(getStates(ROLES));
  }

  function getStates(ROLES) {
    return [
      {
        state: 'dashboard',
        config: {
          url: '/',
          views: {
            'main': {
              templateUrl: 'app/dashboard/dashboard.html',
              controller: 'DashboardController',
              controllerAs: 'vm'
            }
          },
          title: 'Dashboard',
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
