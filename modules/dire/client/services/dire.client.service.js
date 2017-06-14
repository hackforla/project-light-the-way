// Dire service used to communicate Dire REST endpoints
(function () {
  'use strict';

  angular
    .module('dire')
    .factory('DireService', DireService);

  DireService.$inject = ['$resource'];

  function DireService($resource) {
    return $resource('api/dire/:direId', {
      direId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
