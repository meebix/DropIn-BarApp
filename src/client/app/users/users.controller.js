(function () {
  'use strict';

  angular
    .module('app.profile')
    .controller('UserController', UserController);

  UserController.$inject = ['$q', 'logger', '$state', '$stateParams', 'userService', 'helperService'];
  /* @ngInject */
  function UserController($q, logger, $state, $stateParams, userService, helperService) {
    var vm = this;
    vm.title = 'Dashboard';
    vm.userId = $stateParams.id;
    vm.allUsers = allUsers;
    vm.createUser = createUser;
    vm.deleteUser = deleteUser;
    vm.getBars = getBars;
    vm.init = init;

    function allUsers() {
      userService.allUsers().then(function(results) {
        vm.allUsers = results.data;
      }, function(error) {
        // Error
      });
    }

    function createUser(userData) {
      userService.createUser(userData).then(function() {
        $state.go('users');
      }, function(error) {
        // Error
      });
    }

    function deleteUser(userId) {
      console.log(userId);
      userService.deleteUser(userId).then(function() {
        $state.reload();
      });
    }

    function getBars() {
      helperService.getBars().then(function(results) {
        vm.bars = results.data;
      });
    }

    function init() {
      vm.allUsers();
      vm.getBars();

      if ($stateParams.id) {
        vm.showUser();
      }
    }

    vm.init();
  }
})();
