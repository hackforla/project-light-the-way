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
        url: '',
        template: '<ui-view/>'
      })
      .state('resources.list', {
        url: '/resources',
        templateUrl: 'modules/resources/client/views/list-resources.client.view.html',
        controller: 'ResourcesListController as vm',
        data: {
          pageTitle: 'Resources List'
        }
      })
      .state('resources.search', {
        url: '/resources/search',
        templateUrl: 'modules/resources/client/views/search.client.view.html',
        controller: 'ResourcesSearchController as vm',
        data: {
          pageTitle: 'Resources Search'
        }
      })
      .state('resources.query', {
        url: '/r/search/:query',
        templateUrl: 'modules/resources/client/views/search-resource.client.view.html',
        controller: 'ResourcesSearchController as vm',
        data: {
          pageTitle: 'Resources Search'
        }
      })
      .state('resources.form', {
        url: '/r/form',
        templateUrl: 'modules/resources/client/views/form-resource.client.view.html',
        controller: 'ResourcesController as vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Resources Create'
        }
      })
      .state('resources.form.edit', {
        url: '/:resourceId',
        templateUrl: 'modules/resources/client/views/form-resource.client.view.html',
        controller: 'ResourcesController as vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Resources Create'
        }
      });
  }
}());
