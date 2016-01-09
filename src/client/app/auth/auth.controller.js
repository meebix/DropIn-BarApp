(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$rootScope', '$q', 'toastr', 'logger', '$state', 'authService', 'helperService'];
  /* @ngInject */
  function AuthController($rootScope, $q, toastr, logger, $state, authService, helperService) {
    var vm = this;
    vm.title = 'Login';
    vm.login = login;
    vm.resetPassword = resetPassword;
    vm.setBarName = setBarName;

    function login(credentials) {
      authService.login(credentials).then(function(user) {
        vm.setBarName();
        $state.go('dashboard');
      }, function(error) {
        toastr.error('Invalid email address or password');
      });
    }

    function resetPassword(credentials) {
      authService.resetPassword(credentials).then(function() {
        // success
      }, function() {
        toastr.error('Please try again');
      });
    }

    function setBarName() {
      helperService.getCurrentUsersBar().then(function(result) {
        $rootScope.barName = result.data ? result.data.name : '';
      });
    }
  }
})();
