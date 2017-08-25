(function () {
  'use strict';

  angular
    .module('searches')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('searches', {
        abstract: true,
        url: '/searches',
        template: '<ui-view/>'
      })
      .state('searches.list', {
        url: '',
        templateUrl: 'modules/searches/client/views/list-searches.client.view.html',
        controller: 'SearchesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Searches List'
        }
      })
      .state('searches.create', {
        url: '/create',
        templateUrl: 'modules/searches/client/views/form-search.client.view.html',
        controller: 'SearchesController',
        controllerAs: 'vm',
        resolve: {
          searchResolve: newSearch
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Searches Create'
        }
      })
      .state('searches.edit', {
        url: '/:searchId/edit',
        templateUrl: 'modules/searches/client/views/form-search.client.view.html',
        controller: 'SearchesController',
        controllerAs: 'vm',
        resolve: {
          searchResolve: getSearch
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Search {{ searchResolve.name }}'
        }
      })
      .state('searches.view', {
        url: '/:searchId',
        templateUrl: 'modules/searches/client/views/view-search.client.view.html',
        controller: 'SearchesController',
        controllerAs: 'vm',
        resolve: {
          searchResolve: getSearch
        },
        data: {
          pageTitle: 'Search {{ searchResolve.name }}'
        }
      });
  }

  getSearch.$inject = ['$stateParams', 'SearchesService'];

  function getSearch($stateParams, SearchesService) {
    return SearchesService.get({
      searchId: $stateParams.searchId
    }).$promise;
  }

  newSearch.$inject = ['SearchesService'];

  function newSearch(SearchesService) {
    return new SearchesService();
  }
}());
