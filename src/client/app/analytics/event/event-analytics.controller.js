(function () {
  'use strict';

  angular
    .module('app.analytics.event')
    .controller('EventAnalyticsController', EventAnalyticsController);

  EventAnalyticsController.$inject = ['$q', 'logger', 'analyticService', 'eventService'];
  /* @ngInject */
  function EventAnalyticsController($q, logger, analyticService, eventService) {
    var vm = this;
    vm.title = 'Event Analytics';
    vm.allEvents = allEvents;
    vm.populateEvent = populateEvent;
    vm.statsData = statsData;
    vm.chartEvent = chartEvent;
    vm.init = init;

    function statsData(eventId) {
      analyticService.eventStats(eventId).then(function(results) {
        vm.eventStats = results.data;

        // Stats
        vm.usersSentTo = vm.eventStats.usersSentTo;
        vm.creditsEarned = vm.eventStats.creditsEarned;
        vm.calcDates = vm.eventStats.calcDate.iso;
        vm.eventName = vm.eventStats.eventId.name;
      })
      .then(function() {
        vm.chartEvent();
      });
    }

    // Event chart data
    function chartEvent() {
      vm.labelsEvent = '';
      vm.seriesEvent = ['Users Sent To', 'Credits Earned'];
      vm.coloursEvent = ['#27556C', '#AA7539'];
      vm.chartOptionsEvent = {
        showTooltips: false,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><div class="chart-value" style="color: <%=datasets[i].strokeColor%>;"><%=datasets[i].bars[0].value%></div><%if(datasets[i].label){%><div class="chart-label"><%=datasets[i].label%></div><%}%></li><%}%></ul>'
      };

      vm.dataEvent = [[vm.usersSentTo], [vm.creditsEarned]];
    }

    function allEvents() {
      eventService.allEvents({ limitByDate: false }).then(function(results) {
        vm.allEvents = results.data;
      }, function(error) {
        // Error
      });
    }

    function populateEvent(eventId) {
      eventService.showEvent(eventId).then(function(results) {
        vm.eventData = results.data;
      });

      // Populate chart
      statsData(eventId);
    }

    function init() {
      vm.allEvents();
    }

    vm.init();
  }
})();
