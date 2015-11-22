(function () {
  'use strict';

  angular.module('app', [
    'app.core',
    'app.data',
    'app.widgets',
    'app.layout',
    // Pages
    'app.auth',
    'app.dashboard',
    'app.analytics',
    'app.rewards',
    'app.events',
    'app.profile'
  ])
  .run(appRun);

  appRun.$inject = ['$state', '$rootScope', 'toastr', 'authService', 'accessService'];
  /* @ngInject */

  function appRun($state, $rootScope, toastr, authService, accessService) {
    // Check for authentication and authorization when app loads
    authService.isAuthenticated().then(function(result) {
      // result contains json authorized: false if not authenticated, blank otherwise
      if (result) {
        $state.go('login');
      } else {
        $state.go('dashboard');
      }
    });

    // Check for authorization on every route change
    $rootScope.$on('$stateChangeStart', function (event, next) {
      var authorizedRoles = next.data.authorizedRoles;

      if (!accessService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        toastr.error('You do not have access to this page');
      }
    });
  }
})();
