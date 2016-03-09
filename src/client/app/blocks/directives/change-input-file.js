(function() {
  'use strict';

  angular
    .module('blocks.directives')
    .directive('changeInputFile', function () {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var onChangeHandler = scope.$eval(attrs.changeInputFile);
          element.bind('change', onChangeHandler);
        }
      };
    });
})();
