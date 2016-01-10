(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'logger'];
  /* @ngInject */
  function DashboardController($q, logger) {
    console.log('called');
    var vm = this;
    vm.title = 'Dashboard';
  }
})();
