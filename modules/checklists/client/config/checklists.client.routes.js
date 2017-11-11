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
      .state('checklist.list.results', {
        url: '/results',
        templateUrl: 'modules/checklists/client/views/results.client.view.html',
        controller: 'ChecklistResultController as vm',
        data: {
          pageTitle: 'Checklist Results'
        }
      })
      .state('checklist.view', {
        url: '/list-:checklistId',
        templateUrl: 'modules/checklists/client/views/checklist.client.view.html',
        controller: 'ChecklistController as vm',
        data: {
          pageTitle: 'Checklists List'
        }
      })
      .state('checklist.list.resource', {
        url: '/resource-:resourceId',
        templateUrl: 'modules/resources/client/views/clean-resource.client.view.html',
        controller: 'ResourceReadController as vm',
        data: {
          pageTitle: 'Resource'
        }
      });
  }

}());
