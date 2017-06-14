(function () {
  'use strict';

  angular
    .module('dire')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('dire', {
        abstract: true,
        url: '/dire',
        template: '<ui-view/>'
      })
      .state('dire.list', {
        url: '',
        templateUrl: 'modules/dire/client/views/list-dire.client.view.html',
        controller: 'DireListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Dire List'
        }
      })
      .state('dire.create', {
        url: '/create',
        templateUrl: 'modules/dire/client/views/form-dire.client.view.html',
        controller: 'DireController',
        controllerAs: 'vm',
        resolve: {
          direResolve: newDire
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Dire Create'
        }
      })
      .state('dire.edit', {
        url: '/:direId/edit',
        templateUrl: 'modules/dire/client/views/form-dire.client.view.html',
        controller: 'DireController',
        controllerAs: 'vm',
        resolve: {
          direResolve: getDire
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Dire {{ direResolve.name }}'
        }
      })
      .state('dire.view', {
        url: '/:direId',
        templateUrl: 'modules/dire/client/views/view-dire.client.view.html',
        controller: 'DireController',
        controllerAs: 'vm',
        resolve: {
          direResolve: getDire
        },
        data: {
          pageTitle: 'Dire {{ direResolve.name }}'
        }
      });
  }

  getDire.$inject = ['$stateParams', 'DireService'];

  function getDire($stateParams, DireService) {
    return DireService.get({
      direId: $stateParams.direId
    }).$promise;
  }

  newDire.$inject = ['DireService'];

  function newDire(DireService) {
    return new DireService();
  }
}());
