(function () {
  'use strict';

  angular
    .module('app.profile')
    .controller('UserController', UserController);

  UserController.$inject = ['$rootScope', '$q', 'logger', '$state', '$stateParams', 'userService', 'helperService'];
  /* @ngInject */
  function UserController($rootScope, $q, logger, $state, $stateParams, userService, helperService) {
    var vm = this;
    vm.title = 'Dashboard';
    vm.userId = $stateParams.id;
    vm.allUsers = allUsers;
    vm.createUser = createUser;
    vm.deleteUser = deleteUser;
    vm.getBars = getBars;
    vm.currentPage = 0;
    vm.errorMessage;
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
        $state.go('users').then(function() {
          $rootScope.$broadcast('alertMessage', {
            showAlert: true,
            alertStyle: 'alert-success',
            alertMessage: 'Successfully created new bar user'
          });
        });
      }, function(error) {
        vm.errorMessage = error.data.validationError;
      });
    }

    function deleteUser(userId) {
      userService.deleteUser(userId).then(function() {
        $state.reload().then(function() {
          $rootScope.$broadcast('alertMessage', {
            showAlert: true,
            alertStyle: 'alert-success',
            alertMessage: 'Successfully deleted bar user'
          });
        });
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

    vm.showNextPage = function() {
      return vm.currentPage < vm.maxPage;
    };

    vm.showPreviousPage = function() {
      return vm.currentPage !== 0;
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
