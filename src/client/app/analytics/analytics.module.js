(function() {
  'use strict';

  angular.module('app.analytics', [
    'app.core',
    // Analytics
    'app.analytics.user',
    'app.analytics.traffic',
    'app.analytics.reward',
    'app.analytics.event',
    // Third party
    'chart.js'
    ]);
})();
