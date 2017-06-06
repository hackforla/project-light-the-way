// Veterans service used to communicate Veterans REST endpoints
(function () {
  'use strict';

  angular
    .module('veterans')
    .factory('VeteransService', VeteransService);

  VeteransService.$inject = ['$resource'];

  function VeteransService($resource) {
    return $resource('api/veterans/:veteranId', {
      veteranId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
