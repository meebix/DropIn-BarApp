(function () {
  'use strict';

  angular
    .module('app.analytics.user')
    .controller('UserAnalyticsController', UserAnalyticsController);

  UserAnalyticsController.$inject = ['$q', '$filter', 'logger', 'analyticService'];
  /* @ngInject */
  function UserAnalyticsController($q, $filter, logger, analyticService) {
    var vm = this;
    vm.title = 'User Analytics';
    vm.statsData = statsData;
    vm.chartGender = chartGender;
    vm.chartLoyaltyLevel = chartLoyaltyLevel;
    vm.chartAge = chartAge;
    vm.chartActiveUsersByCredit = chartActiveUsersByCredit;
    vm.init = init;

    function statsData() {
      analyticService.userStats().then(function(results) {
        vm.userStats = results.data;
        vm.calcDate = $filter('date')(vm.userStats.calcDate.iso, 'MM/dd/yyyy');
        vm.barName = vm.userStats.barId.name;

        // Stats
        vm.activeUsersByCredit = vm.userStats.activeUsersByCredit;
      }).then(function() {
        return analyticService.dropinStats().then(function(results) {
          vm.dropinStats = results.data;

          // Stats
          vm.totalMales = vm.dropinStats.totalMales;
          vm.totalFemales = vm.dropinStats.totalFemales;
          vm.totalGuests = vm.dropinStats.totalGuests;
          vm.totalRegulars = vm.dropinStats.totalRegulars;
          vm.totalVips = vm.dropinStats.totalVips;
          vm.age2124 = vm.dropinStats.age2124;
          vm.age2529 = vm.dropinStats.age2529;
          vm.age3034 = vm.dropinStats.age3034;
          vm.age35Plus = vm.dropinStats.age35Plus;
          vm.totalActiveUsersByCredit = vm.dropinStats.totalActiveUsersByCredit;
        });
      }).then(function() {
        vm.chartGender();
        vm.chartLoyaltyLevel();
        vm.chartAge();
        vm.chartActiveUsersByCredit();
      });
    }

    // Gender breakdown chart data
    function chartGender() {
      vm.labelsGender = ['Males', 'Females'];
      vm.coloursGender = ['#4670C4', '#C76475'];
      vm.chartOptionsGender = {
        tooltipTemplate: '<%= value %>',
        // onAnimationComplete: function() {
        //   this.showTooltip(this.segments, true);
        // },
        // tooltipEvents: [],
        tooltipFillColor: 'rgba(0, 0, 0, 0.75)',
        // showTooltips: true
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><div class="chart-value" style="color: <%=segments[i].fillColor%>;"><%=segments[i].value%></div><%if(segments[i].label){%><div class="chart-label"><%=segments[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataGender = [vm.totalMales, vm.totalFemales];
    }

    // Loyalty level breakdown chart data
    function chartLoyaltyLevel() {
      vm.labelsLoyaltyLevel = ['Guest', 'Regular', 'VIP'];
      vm.seriesLoyaltyLevel = ['Guest', 'Regular', 'VIP'];
      vm.coloursLoyaltyLevel = ['#ABDD93', '#7AB85C', '#519331'];
      vm.chartOptionsLoyaltyLevel = {
        tooltipTemplate: '<%= value %>',
        tooltipFillColor: 'rgba(0, 0, 0, 0.75)',
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><div class="chart-value" style="color: <%=segments[i].fillColor%>;"><%=segments[i].value%></div><%if(segments[i].label){%><div class="chart-label"><%=segments[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataLoyaltyLevel = [vm.totalGuests, vm.totalRegulars, vm.totalVips];
    }

    // Age breakdown chart data
    function chartAge() {
      vm.labelsAge = ['21-24', '25-29', '30-34', '35 plus'];
      vm.seriesAge = ['21-24', '25-29', '30-34', '35 plus'];
      vm.coloursAge = ['#998E8E', '#897A7A', '#7B6868', '#6C5656'];
      vm.chartOptionsAge = {
        tooltipTemplate: '<%= value %>',
        tooltipFillColor: 'rgba(0, 0, 0, 0.75)',
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><div class="chart-value" style="color: <%=segments[i].fillColor%>;"><%=segments[i].value%></div><%if(segments[i].label){%><div class="chart-label"><%=segments[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataAge = [vm.age2124, vm.age2529, vm.age3034, vm.age35Plus];
    }

    // Active users by credit breakdown chart data
    function chartActiveUsersByCredit() {
      vm.labelsActiveUsers = ['Over Past 30 Days'];
      vm.seriesActiveUsers = ['Drop In', vm.barName];
      vm.coloursActiveUsers = ['#27556C', '#AA7539'];
      vm.chartOptionsActiveUsers = {
        multiTooltipTemplate: '<%= value %>',
        multiTooltipFillColor: 'rgba(0, 0, 0, 0.75)',
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><div class="chart-value" style="color: <%=datasets[i].strokeColor%>;"><%=datasets[i].bars[0].value%></div><%if(datasets[i].label){%><div class="chart-label"><%=datasets[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataActiveUsers = [[vm.totalActiveUsersByCredit], [vm.activeUsersByCredit]];
    }

    function init() {
      vm.statsData();
    }

    vm.init();
  }
})();
