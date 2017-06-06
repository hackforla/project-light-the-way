// Transitions service used to communicate Transitions REST endpoints
(function () {
  'use strict';

  angular
    .module('transitions')
    .factory('TransitionsService', TransitionsService);

  TransitionsService.$inject = ['$resource'];

  function TransitionsService($resource) {
    return $resource('api/transitions/:transitionId', {
      transitionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
