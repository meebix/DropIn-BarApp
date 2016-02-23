(function() {
  'use strict';

  angular
    .module('app.help')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'ROLES'];
  /* @ngInject */
  function appRun(routerHelper, ROLES) {
    routerHelper.configureStates(getStates(ROLES));
  }

  function getStates(ROLES) {
    return [
      {
        state: 'help',
        config: {
          url: '/help',
          views: {
            'main': {
              templateUrl: 'app/help/help.html',
              controller: 'HelpController',
              controllerAs: 'vm'
            }
          },
          title: 'Help',
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
