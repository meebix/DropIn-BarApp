(function() {
  'use strict';

  angular
    .module('app.analytics.event')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'ROLES'];
  /* @ngInject */
  function appRun(routerHelper, ROLES) {
    routerHelper.configureStates(getStates(ROLES));
  }

  function getStates(ROLES) {
    return [
      {
        state: 'analytics-event',
        config: {
          url: '/analytics/event',
          templateUrl: 'app/analytics/event/event-analytics.html',
          controller: 'EventAnalyticsController',
          controllerAs: 'vm',
          title: 'Event Analytics',
          data: {
            authorizedRoles: [ROLES.admin, ROLES.bar]
          }
        }
      }
    ];
  }
})();
