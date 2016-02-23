(function() {
  'use strict';

  angular
    .module('app.analytics.traffic')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'ROLES'];
  /* @ngInject */
  function appRun(routerHelper, ROLES) {
    routerHelper.configureStates(getStates(ROLES));
  }

  function getStates(ROLES) {
    return [
      {
        state: 'analytics-traffic',
        config: {
          url: '/analytics/traffic',
          views: {
            'main': {
              templateUrl: 'app/analytics/traffic/traffic-analytics.html',
              controller: 'TrafficAnalyticsController',
              controllerAs: 'vm'
            }
          },
          title: 'Traffic Analytics',
          data: {
            authorizedRoles: [
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
