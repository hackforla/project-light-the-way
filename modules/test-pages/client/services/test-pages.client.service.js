// Test pages service used to communicate Test pages REST endpoints
(function () {
  'use strict';

  angular
    .module('test-pages')
    .factory('TestPagesService', TestPagesService);

  TestPagesService.$inject = ['$resource'];

  function TestPagesService($resource) {
    return $resource('api/test-pages/:testPageId', {
      testPageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
