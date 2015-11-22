(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$scope', '$q', 'toastr', 'logger', '$state', 'authService'];
  /* @ngInject */
  function AuthController($scope, $q, toastr, logger, $state, authService) {
    var vm = this;
    vm.title = 'Login';
    vm.login = login;
    vm.resetPassword = resetPassword;

    function login(credentials) {
      authService.login(credentials).then(function(user) {
        $scope.setCurrentUser(user);
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
  }
})();
