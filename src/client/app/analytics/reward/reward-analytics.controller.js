(function () {
  'use strict';

  angular
    .module('app.analytics.reward')
    .controller('RewardAnalyticsController', RewardAnalyticsController);

  RewardAnalyticsController.$inject = ['$q', '$filter', 'logger', 'analyticService', 'helperService'];
  /* @ngInject */
  function RewardAnalyticsController($q, $filter, logger, analyticService, helperService) {
    var vm = this;
    vm.title = 'Reward Analytics';
    vm.statsData = statsData;
    vm.chartRewards = chartRewards;
    vm.getBarReward = getBarReward;
    vm.init = init;

    function statsData() {
      analyticService.rewardStats().then(function(results) {
        vm.rewardStats = results.data;

        // Stats
        vm.barRewardsRedeemed = vm.rewardStats[0].slice(0, vm.rewardStats[0].length-1);
        vm.calcDates = vm.rewardStats[1].slice(0, vm.rewardStats[1].length-1);
        vm.barName = vm.rewardStats[2][0];
      }).then(function() {
        return analyticService.multipleDropinStats().then(function(results) {
          vm.multipleDropinStats = results.data;

          // Stats
          vm.dropinRewardsRedeemed = vm.multipleDropinStats[1].slice(0, vm.multipleDropinStats[1].length-1);
        });
      }).then(function() {
        vm.chartRewards();
      });
    }

    // Traffic breakdown chart data
    function chartRewards() {
      vm.labelsRewards = [vm.calcDates[0], vm.calcDates[1], vm.calcDates[2], vm.calcDates[3], vm.calcDates[4], vm.calcDates[5], vm.calcDates[6]];
      vm.seriesRewards = ['Drop In', vm.barName];
      vm.coloursRewards = ['#0084C1', '#00A447'];
      vm.chartOptionsRewards = {
        multiTooltipTemplate: '<%= value %>',
        showTooltips: true,
        bezierCurve: false
        // legendTemplate : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li class="chart-label-inline"><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
      };

      vm.dataRewards = [vm.dropinRewardsRedeemed, vm.barRewardsRedeemed];
    }

    function getBarReward() {
      helperService.getCurrentUsersBar().then(function(results) {
        vm.barReward = results.data.reward;
      });
    }

    function init() {
      vm.statsData();
      vm.getBarReward();
    }

    vm.init();
  }
})();
