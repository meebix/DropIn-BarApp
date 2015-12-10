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
      vm.seriesGender = ['Males', 'Females'];
      vm.coloursGender = ['#4670C4', '#FFC049'];
      vm.chartOptionsGender = {
        tooltipTemplate: '<%= value %>',
        // onAnimationComplete: function() {
        //   this.showTooltip(this.segments, true);
        // },
        // tooltipEvents: [],
        tooltipFillColor: 'rgba(0, 0, 0, 0.75)',
        // showTooltips: true
      };

      vm.dataGender = [vm.totalMales, vm.totalFemales];
    }

    // Loyalty level breakdown chart data
    function chartLoyaltyLevel() {
      vm.labelsLoyaltyLevel = ['Guest', 'Regular', 'VIP'];
      vm.seriesLoyaltyLevel = ['Guest', 'Regular', 'VIP'];
      vm.coloursLoyaltyLevel = ['#16A085', '#BDC3C7', '#CCAC00'];
      vm.chartOptionsLoyaltyLevel = {
        tooltipTemplate: '<%= value %>',
        tooltipFillColor: 'rgba(0, 0, 0, 0.75)',
      };

      vm.dataLoyaltyLevel = [vm.totalGuests, vm.totalRegulars, vm.totalVips];
    }

    // Age breakdown chart data
    function chartAge() {
      vm.labelsAge = ['21-24', '25-29', '30-34', '35 plus'];
      vm.seriesAge = ['21-24', '25-29', '30-34', '35 plus'];
      vm.coloursAge = ['#00CC2D', '#3611BE', '#FFD100', '#FF1800'];
      vm.chartOptionsAge = {
        tooltipTemplate: '<%= value %>',
        tooltipFillColor: 'rgba(0, 0, 0, 0.75)',
      };

      vm.dataAge = [vm.age2124, vm.age2529, vm.age3034, vm.age35Plus];
    }

    // Active users by credit breakdown chart data
    function chartActiveUsersByCredit() {
      vm.labelsActiveUsers = ['Users'];
      vm.seriesActiveUsers = ['Drop In', 'Bar'];
      vm.coloursActiveUsers = ['#00CC2D', '#3611BE'];
      vm.chartOptionsActiveUsers = {
        multiTooltipTemplate: '<%= value %>',
        multiTooltipFillColor: 'rgba(0, 0, 0, 0.75)',
      };

      vm.dataActiveUsers = [[vm.totalActiveUsersByCredit], [vm.activeUsersByCredit]];
    }

    function init() {
      vm.statsData();
    }

    vm.init();
  }
})();
