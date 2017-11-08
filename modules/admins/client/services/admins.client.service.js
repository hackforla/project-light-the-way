// Admins service used to communicate Admins REST endpoints
(function () {
  'use strict';

  angular
    .module('admins')
    .factory('AdminsService', AdminsService);

  AdminsService.$inject = ['$resource'];

  function AdminsService($resource) {
    return $resource('api/admins/:adminId', {
      adminId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
