(function () {
  'use strict';

  angular
    .module('app.analytics.reward')
    .controller('RewardAnalyticsController', RewardAnalyticsController);

  RewardAnalyticsController.$inject = ['$q', 'logger'];
  /* @ngInject */
  function RewardAnalyticsController($q, logger) {
    var vm = this;
    vm.title = 'Reward Analytics';
  }
})();
