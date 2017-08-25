// Searches service used to communicate Searches REST endpoints
(function () {
  'use strict';

  angular
    .module('searches')
    .factory('SearchesService', SearchesService);

  SearchesService.$inject = ['$resource'];

  function SearchesService($resource) {
    return $resource('api/searches/:searchId', {
      searchId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
