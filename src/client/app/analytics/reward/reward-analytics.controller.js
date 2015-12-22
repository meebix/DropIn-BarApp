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

        // Stats
        vm.barRewardsRedeemed = vm.rewardStats[0];
        vm.calcDates = vm.rewardStats[1];
        vm.barName = vm.rewardStats[2];
      }).then(function() {
        return analyticService.multipleDropinStats().then(function(results) {
          vm.multipleDropinStats = results.data;

          // Stats
          vm.dropinRewardsRedeemed = vm.multipleDropinStats[1];
        });
      }).then(function() {
        vm.chartRewards();
      });
    }

    // Traffic breakdown chart data
    function chartRewards() {
      vm.labelsRewards = [vm.calcDates[0], vm.calcDates[1], vm.calcDates[2], vm.calcDates[3], vm.calcDates[4], vm.calcDates[5]];
      vm.seriesRewards = ['Drop In', vm.barName];
      vm.coloursRewards = ['#00CC2D', '#9C344C'];
      vm.chartOptionsRewards = {
        multiTooltipTemplate: '<%= value %>',
        showTooltips: true,
        legendTemplate : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li class="chart-label-inline"><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
      };

      vm.dataRewards = [vm.dropinRewardsRedeemed, vm.barRewardsRedeemed];
    }

    function init() {
      vm.statsData();
    }

    vm.init();
  }
})();
