'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.title = 'Welcome to Project Light The Way';
    $scope.slogan = 'Find the resources you need, and discover ones you did not know about';
  }
]);
