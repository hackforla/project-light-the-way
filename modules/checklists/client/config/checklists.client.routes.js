(function () {
  'use strict';

  angular
    .module('checklists')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('checklists', {
        abstract: true,
        url: '/checklists',
        template: '<ui-view/>'
      })
      .state('checklists.list', {
        url: '',
        templateUrl: 'modules/checklists/client/views/list-checklists.client.view.html',
        controller: 'ChecklistsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Checklists List'
        }
      })
      .state('checklists.create', {
        url: '/create',
        templateUrl: 'modules/checklists/client/views/form-checklist.client.view.html',
        controller: 'ChecklistsController',
        controllerAs: 'vm',
        resolve: {
          checklistResolve: newChecklist
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Checklists Create'
        }
      })
      .state('checklists.edit', {
        url: '/:checklistId/edit',
        templateUrl: 'modules/checklists/client/views/form-checklist.client.view.html',
        controller: 'ChecklistsController',
        controllerAs: 'vm',
        resolve: {
          checklistResolve: getChecklist
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Checklist {{ checklistResolve.name }}'
        }
      })
      .state('checklists.view', {
        url: '/:checklistId',
        templateUrl: 'modules/checklists/client/views/view-checklist.client.view.html',
        controller: 'ChecklistsController',
        controllerAs: 'vm',
        resolve: {
          checklistResolve: getChecklist
        },
        data: {
          pageTitle: 'Checklist {{ checklistResolve.name }}'
        }
      });
  }

  getChecklist.$inject = ['$stateParams', 'ChecklistsService'];

  function getChecklist($stateParams, ChecklistsService) {
    return ChecklistsService.get({
      checklistId: $stateParams.checklistId
    }).$promise;
  }

  newChecklist.$inject = ['ChecklistsService'];

  function newChecklist(ChecklistsService) {
    return new ChecklistsService();
  }
}());
