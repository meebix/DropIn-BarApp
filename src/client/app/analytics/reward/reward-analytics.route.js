(function() {
  'use strict';

  angular
    .module('app.analytics.reward')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'ROLES'];
  /* @ngInject */
  function appRun(routerHelper, ROLES) {
    routerHelper.configureStates(getStates(ROLES));
  }

  function getStates(ROLES) {
    return [
      {
        state: 'analytics-reward',
        config: {
          url: '/analytics/reward',
          views: {
            'main': {
              templateUrl: 'app/analytics/reward/reward-analytics.html',
              controller: 'RewardAnalyticsController',
              controllerAs: 'vm'
            }
          },
          title: 'Reward Analytics',
          data: {
            authorizedRoles: [ROLES.admin, ROLES.bar]
          }
        }
      }
    ];
  }
})();
