(function () {
  'use strict';

  angular
    .module('app.profile')
    .controller('UserController', UserController);

  UserController.$inject = ['$q', 'logger', '$state', '$stateParams', 'userService', 'helperService'];
  /* @ngInject */
  function UserController($q, logger, $state, $stateParams, userService, helperService) {
    console.log('test');
    var vm = this;
    vm.title = 'Dashboard';
    vm.userId = $stateParams.id;
    vm.allUsers = allUsers;
    vm.createUser = createUser;
    vm.deleteUser = deleteUser;
    vm.getBars = getBars;
    vm.currentPage = 0;
    vm.init = init;

    function allUsers() {
      userService.allUsers(vm.currentPage).then(function(results) {
        vm.allUsers = results.data;

        vm.displayLimit = results.displayLimit;
        vm.count = results.count;
        vm.maxPage = Math.ceil(results.count / results.displayLimit) - 1;
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
      userService.deleteUser(userId).then(function() {
        $state.reload();
      });
    }

    function getBars() {
      helperService.getBars().then(function(results) {
        vm.bars = results.data;
      });
    }

    // Pagination
    vm.nextPage = function() {
      vm.currentPage++;
      allUsers();
    };

    vm.previousPage = function() {
      vm.currentPage--;
      allUsers();
    };

    vm.hideNextPage = function() {
      return vm.currentPage === vm.maxPage || vm.displayLimit === 0 || vm.maxPage < 0;
    };

    vm.hidePreviousPage = function() {
      return vm.currentPage > vm.maxPage || vm.currentPage === 0;
    };

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
