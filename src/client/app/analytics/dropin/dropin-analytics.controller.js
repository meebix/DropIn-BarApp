(function () {
  'use strict';

  angular
    .module('app.analytics.user')
    .controller('DropinAnalyticsController', DropinAnalyticsController);

  DropinAnalyticsController.$inject = ['$q', '$filter', 'logger', 'analyticService'];
  /* @ngInject */
  function DropinAnalyticsController($q, $filter, logger, analyticService) {
    var vm = this;
    vm.title = 'User Analytics';
    vm.statsData = statsData;
    vm.chartGender = chartGender;
    vm.chartLoyaltyLevel = chartLoyaltyLevel;
    vm.chartAge = chartAge;
    // vm.chartActiveUsersByCredit = chartActiveUsersByCredit;
    vm.init = init;

    function statsData() {
      analyticService.userStats().then(function(results) {
        vm.userStats = results.data;
        vm.calcDate = $filter('date')(vm.userStats.calcDate.iso, 'MM/dd/yyyy');
        vm.barName = vm.userStats.barId.name;

        // Stats
        vm.activeUsersByCredit = vm.userStats.activeUsersByCredit;
      }).then(function() {
        return analyticService.singleDropinStats().then(function(results) {
          vm.singleDropinStats = results.data;

          // Stats
          vm.totalMales = vm.singleDropinStats.totalMales;
          vm.totalFemales = vm.singleDropinStats.totalFemales;
          vm.totalGuests = vm.singleDropinStats.totalGuests;
          vm.totalRegulars = vm.singleDropinStats.totalRegulars;
          vm.totalVips = vm.singleDropinStats.totalVips;
          vm.age2124 = vm.singleDropinStats.age2124;
          vm.age2529 = vm.singleDropinStats.age2529;
          vm.age3034 = vm.singleDropinStats.age3034;
          vm.age35Plus = vm.singleDropinStats.age35Plus;
          vm.totalActiveUsersByCredit = vm.singleDropinStats.totalActiveUsersByCredit;
        });
      }).then(function() {
        vm.chartGender();
        vm.chartLoyaltyLevel();
        vm.chartAge();
        // vm.chartActiveUsersByCredit();
      });
    }

    // Gender breakdown chart data
    function chartGender() {
      vm.labelsGender = ['Males', 'Females'];
      vm.coloursGender = ['#0B60F1', '#F44F72'];
      vm.chartOptionsGender = {
        // tooltipTemplate: '<%= value %>',
        // onAnimationComplete: function() {
        //   this.showTooltip(this.segments, true);
        // },
        // tooltipEvents: [],
        // tooltipFillColor: 'rgba(0, 0, 0, 0.75)',
        segmentStrokeColor: '#EAEAEA',
        showTooltips: false,
        // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><div class="chart-value" style="color: <%=segments[i].fillColor%>;"><%=segments[i].value%></div><%if(segments[i].label){%><div class="chart-label"><%=segments[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataGender = [vm.totalMales, vm.totalFemales];
    }

    // Loyalty level breakdown chart data
    function chartLoyaltyLevel() {
      vm.labelsLoyaltyLevels = [''];
      vm.seriesLoyaltyLevels = [''];
      vm.coloursLoyaltyLevels = ['#4C92FF', '#16A085', '#CCAC00'];
      vm.chartOptionsLoyaltyLevels = {
        showTooltips: false,
        // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><div class="chart-value" style="color: <%=datasets[i].strokeColor%>;"><%=datasets[i].bars[0].value%></div><%if(datasets[i].label){%><div class="chart-label"><%=datasets[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataLoyaltyLevels = [[vm.totalGuests], [vm.totalRegulars], [vm.totalVips]];
    }

    // Age breakdown chart data
    function chartAge() {
      vm.labelsAge = ['21-24', '25-29', '30-34', '35 plus'];
      vm.seriesAge = ['21-24', '25-29', '30-34', '35 plus'];
      vm.coloursAge = ['#FFAA98', '#DE7862', '#BB513A', '#97301A'];
      vm.chartOptionsAge = {
        segmentStrokeColor: '#EAEAEA',
        segmentStrokeWidth: 7,
        showTooltips: false,
        // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><div class="chart-value" style="color: <%=segments[i].fillColor%>;"><%=segments[i].value%></div><%if(segments[i].label){%><div class="chart-label"><%=segments[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataAge = [vm.age2124, vm.age2529, vm.age3034, vm.age35Plus];
    }

    // Active users by credit breakdown chart data
    // function chartActiveUsersByCredit() {
    //   vm.labelsActiveUsers = ['Over Past 30 Days'];
    //   vm.seriesActiveUsers = ['Drop In', vm.barName];
    //   vm.coloursActiveUsers = ['#27556C', '#AA7539'];
    //   vm.chartOptionsActiveUsers = {
    //     showTooltips: false,
    //     legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><div class="chart-value" style="color: <%=datasets[i].strokeColor%>;"><%=datasets[i].bars[0].value%></div><%if(datasets[i].label){%><div class="chart-label"><%=datasets[i].label%></div><%}%></li><%}%></ul>'
    //   };

    //   vm.dataActiveUsers = [[vm.totalActiveUsersByCredit], [vm.activeUsersByCredit]];
    // }

    function init() {
      vm.statsData();
    }

    vm.init();
  }
})();
