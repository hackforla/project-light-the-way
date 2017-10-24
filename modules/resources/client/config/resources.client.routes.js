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
        url: '/r',
        template: '<ui-view/>'
      })
      .state('resources.list', {
        url: '',
        templateUrl: 'modules/resources/client/views/list-resources.client.view.html',
        controller: 'ResourcesListController as vm',
        data: {
          pageTitle: 'Resources List'
        }
      })
      .state('resources.search', {
        url: '/search/:query',
        templateUrl: 'modules/resources/client/views/search-resource.client.view.html',
        controller: 'ResourcesSearchController as vm',
        data: {
          pageTitle: 'Resources Search'
        }
      })
      .state('resources.create', {
        url: '/create',
        templateUrl: 'modules/resources/client/views/form-resource.client.view.html',
        controller: 'ResourcesController as vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Resources Create'
        }
      })
      .state('resources.edit', {
        url: '/:resourceId/edit',
        templateUrl: 'modules/resources/client/views/form-resource.client.view.html',
        controller: 'ResourcesController as vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Resource {{ resourceResolve.name }}'
        }
      })
      .state('resources.view', {
        url: '/:resourceId',
        templateUrl: 'modules/resources/client/views/view-resource.client.view.html',
        controller: 'ResourcesController as vm',
        data: {
          pageTitle: 'Resource {{ resourceResolve.name }}'
        }
      });
  }
}());
