(function() {
  'use strict';

  angular
    .module('app.analytics.user')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'ROLES'];
  /* @ngInject */
  function appRun(routerHelper, ROLES) {
    routerHelper.configureStates(getStates(ROLES));
  }

  function getStates(ROLES) {
    return [
      {
        state: 'analytics-dropin',
        config: {
          url: '/analytics/dropin',
          views: {
            'main': {
              templateUrl: 'app/analytics/dropin/dropin-analytics.html',
              controller: 'DropinAnalyticsController',
              controllerAs: 'vm'
            }
          },
          title: 'Drop In Analytics',
          data: {
            authorizedRoles: [ROLES.admin, ROLES.bar]
          }
        }
      }
    ];
  }
})();
