// Checklists service used to communicate Checklists REST endpoints
(function () {
  'use strict';

  angular
    .module('checklists')
    .factory('ChecklistsService', ChecklistsService);

  ChecklistsService.$inject = ['$resource'];

  function ChecklistsService($resource) {
    return $resource('api/checklists/:checklistId', {
      checklistId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
