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
        state: 'rewards-new',
        config: {
          url: '/rewards/new',
          templateUrl: 'app/rewards/new.html',
          controller: 'RewardsController',
          controllerAs: 'vm',
          title: 'Rewards',
          data: {
            authorizedRoles: [ROLES.admin]
          }
        }
      }
    ];
  }
})();
