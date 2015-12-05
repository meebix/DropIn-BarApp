(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'logger', 'userService', 'accessService'];
  /* @ngInject */
  function DashboardController($q, logger, userService, accessService) {
    var vm = this;
    vm.title = 'Dashboard';
    // vm.barData = barData;
    vm.init = init;

    // function barData() {
    //   var bar = userService.getUserDataFromCookie();

    //   vm.barId = bar.associatedBar;
    // }

    function init() {
      // vm.barData();
    }

    vm.init();
  }
})();
