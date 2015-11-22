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
        state: 'analytics-user',
        config: {
          url: '/analytics/user',
          templateUrl: 'app/analytics/user/user-analytics.html',
          controller: 'UserAnalyticsController',
          controllerAs: 'vm',
          title: 'User Analytics',
          data: {
            authorizedRoles: [ROLES.admin, ROLES.bar]
          }
        }
      }
    ];
  }
})();
