// Resources service used to communicate Resources REST endpoints
(function () {
  'use strict';

  angular
    .module('resources')
    .factory('ResourcesService', ResourcesService);

  ResourcesService.$inject = ['$resource'];

  function ResourcesService($resource) {
    return $resource('api/resources/:resourceId', {
      resourceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
