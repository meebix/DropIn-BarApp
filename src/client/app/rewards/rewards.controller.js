(function () {
  'use strict';

  angular
    .module('app.rewards')
    .controller('RewardsController', RewardsController);

  RewardsController.$inject = ['$q', 'logger'];
  /* @ngInject */
  function RewardsController($q, logger) {
    var vm = this;
    vm.title = 'Dashboard';
  }
})();
