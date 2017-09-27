(function() {
  'use strict';

  angular
    .module('searches')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('searches', {
        abstract: true,
        template: '<ui-view/>'
      })
      .state('searches.create', {
        url: '/search',
        templateUrl: 'modules/searches/client/views/search.client.view.html',
        controller: 'SearchesController',
        controllerAs: 'vm',
        resolve: {
          searchResolve: newSearch
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Search'
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
