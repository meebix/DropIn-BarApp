(function() {
  'use strict';

  angular.module('app.analytics', [
    'app.core',
    'app.widgets',
    // Analytics
    'app.analytics.user',
    'app.analytics.traffic',
    'app.analytics.reward',
    'app.analytics.event'
    ]);
})();
