(function () {
  'use strict';

  angular
    .module('checklists')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('checklist', {
        abstract: true,
        url: '/checklist',
        template: '<ui-view/>'
      })
      .state('checklist.list', {
        url: '',
        templateUrl: 'modules/checklists/client/views/checklists.client.view.html',
        controller: 'ChecklistsController as vm',
        data: {
          pageTitle: 'Checklists List'
        }
      })
      .state('checklist.list.view', {
        url: '/:checklistId',
        templateUrl: 'modules/checklists/client/views/checklist.client.view.html',
        controller: 'ChecklistController as vm',
        data: {
          pageTitle: 'Checklists List'
        }
      });
  }

}());
