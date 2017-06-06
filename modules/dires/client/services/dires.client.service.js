// Dires service used to communicate Dires REST endpoints
(function () {
  'use strict';

  angular
    .module('dires')
    .factory('DiresService', DiresService);

  DiresService.$inject = ['$resource'];

  function DiresService($resource) {
    return $resource('api/dires/:direId', {
      direId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
