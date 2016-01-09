(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('LayoutController', LayoutController);

  LayoutController.$inject = ['$scope', '$location', '$state', '$cookieStore', 'helperService', 'authService', 'accessService', 'ROLES'];
  /* @ngInject */
  function LayoutController($scope, $location, $state, $cookieStore, helperService, authService, accessService, ROLES) {
    var vm = this;
    vm.isAuthPage = isAuthPage;
    vm.isActive = isActive;
    vm.isAnalyticPage = isAnalyticPage;
    vm.barName = barName;
    vm.logout = logout;
    vm.copyrightYear = new Date();
    vm.init = init;

    // TODO: Why are we using $scope here instead of vm??
    // Cannot set global vm
    // Can we at least move userRole and isAuthorized to vm?
    // This may be the global scope
    // None of this works on refresh, needs to be in state service

    // Scopes
    $scope.currentUser = null;
    $scope.userRoles = ROLES;

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };

    $scope.isAuthorized = function(role) {
      return accessService.isAuthorized(role);
    };
    // ---------------

    function isAuthPage(path) {
      var authPages = ['/login', '/reset-password'];

      if (authPages.indexOf($location.path()) !== -1) {
        return true;
      } else {
        return false;
      }
    }

    function isActive(viewLocation) {
      return viewLocation === $location.path();
    }

    function isAnalyticPage() {
      var whitelist = [
        '/analytics/user',
        '/analytics/traffic',
        '/analytics/reward',
        '/analytics/event'
      ];

      for (var i=0; i<whitelist.length; i++) {
        if ($location.path() === whitelist[i]) {
          return true;
        }
      }
    }

    function barName() {
      helperService.getCurrentUsersBar().then(function(result) {
        $scope.barName = result.data.name;
      });
    }

    function logout() {
      authService.logout().then(function() {
        $state.go('login');
      }, function() {
        // error broadcast
      });
    }

    function init() {
      vm.barName();
    }

    vm.init();
  }
})();
