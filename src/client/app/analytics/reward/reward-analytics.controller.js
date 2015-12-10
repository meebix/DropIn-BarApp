(function () {
  'use strict';

  angular
    .module('app.analytics.reward')
    .controller('RewardAnalyticsController', RewardAnalyticsController);

  RewardAnalyticsController.$inject = ['$q', '$filter', 'logger', 'analyticService'];
  /* @ngInject */
  function RewardAnalyticsController($q, $filter, logger, analyticService) {
    var vm = this;
    vm.title = 'Reward Analytics';
    vm.statsData = statsData;
    vm.chartRewards = chartRewards;
    vm.init = init;

    function statsData() {
      analyticService.rewardStats().then(function(results) {
        vm.rewardStats = results.data;
        vm.calcDate = $filter('date')(vm.rewardStats.calcDate.iso, 'MM/dd/yyyy');
        vm.barName = vm.rewardStats.barId.name;

        // Stats
        vm.rewardsRedeemed = vm.rewardStats.rewardsRedeemed;
      }).then(function() {
        return analyticService.dropinStats().then(function(results) {
          vm.dropinStats = results.data;

          // Stats
          vm.totalRewardsRedeemed = vm.dropinStats.totalRewardsRedeemed;
        });
      }).then(function() {
        vm.chartRewards();
      });
    }

    // Traffic breakdown chart data
    function chartRewards() {
      vm.labelsRewards = ['Traffic'];
      vm.seriesRewards = ['Drop In', 'Bar'];
      vm.coloursRewards = ['#00CC2D', '#3611BE'];
      vm.chartOptionsRewards = {
        multiTooltipTemplate: '<%= value %>',
        tooltipFillColor: 'rgba(0, 0, 0, 0.75)',
      };

      vm.dataRewards = [[vm.totalRewardsRedeemed], [vm.rewardsRedeemed]];
    }

    function init() {
      vm.statsData();
    }

    vm.init();
  }
})();
