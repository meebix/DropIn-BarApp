(function() {
  'use strict';

  angular
    .module('app.rewards')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'ROLES'];
  /* @ngInject */
  function appRun(routerHelper, ROLES) {
    routerHelper.configureStates(getStates(ROLES));
  }

  function getStates(ROLES) {
    return [
      {
        state: 'rewards',
        config: {
          url: '/rewards',
          views: {
            'main': {
              templateUrl: 'app/rewards/list.html',
              controller: 'RewardsController',
              controllerAs: 'vm'
            }
          },
          title: 'Bar Rewards',
          data: {
            authorizedRoles: [
              ROLES.admin,
              ROLES.uatAdmin
            ]
          }
        }
      },
      {
        state: 'reward-edit',
        config: {
          url: '/rewards/:id/edit',
          views: {
            'main': {
              templateUrl: 'app/rewards/edit.html',
              controller: 'RewardsController',
              controllerAs: 'vm'
            }
          },
          title: 'Edit Bar Reward',
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
