(function () {
  'use strict';

  angular
    .module('resources')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('resources', {
        abstract: true,
        url: '/resources',
        template: '<ui-view/>'
      })
      .state('resources.list', {
        url: '',
        templateUrl: 'modules/resources/client/views/list-resources.client.view.html',
        controller: 'ResourcesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Resources List'
        }
      })
      .state('resources.create', {
        url: '/create',
        templateUrl: 'modules/resources/client/views/form-resource.client.view.html',
        controller: 'ResourcesController',
        controllerAs: 'vm',
        resolve: {
          resourceResolve: newResource
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Resources Create'
        }
      })
      .state('resources.edit', {
        url: '/:resourceId/edit',
        templateUrl: 'modules/resources/client/views/form-resource.client.view.html',
        controller: 'ResourcesController',
        controllerAs: 'vm',
        resolve: {
          resourceResolve: getResource
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Resource {{ resourceResolve.name }}'
        }
      })
      .state('resources.view', {
        url: '/:resourceId',
        templateUrl: 'modules/resources/client/views/view-resource.client.view.html',
        controller: 'ResourcesController',
        controllerAs: 'vm',
        resolve: {
          resourceResolve: getResource
        },
        data: {
          pageTitle: 'Resource {{ resourceResolve.name }}'
        }
      });
  }

  getResource.$inject = ['$stateParams', 'ResourcesService'];

  function getResource($stateParams, ResourcesService) {
    return ResourcesService.get({
      resourceId: $stateParams.resourceId
    }).$promise;
  }

  newResource.$inject = ['ResourcesService'];

  function newResource(ResourcesService) {
    return new ResourcesService();
  }
}());
