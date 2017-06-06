(function () {
  'use strict';

  angular
    .module('dires')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('dires', {
        abstract: true,
        url: '/dires',
        template: '<ui-view/>'
      })
      .state('dires.list', {
        url: '',
        templateUrl: 'modules/dires/client/views/list-dires.client.view.html',
        controller: 'DiresListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Dires List'
        }
      })
      .state('dires.create', {
        url: '/create',
        templateUrl: 'modules/dires/client/views/form-dire.client.view.html',
        controller: 'DiresController',
        controllerAs: 'vm',
        resolve: {
          direResolve: newDire
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Dires Create'
        }
      })
      .state('dires.edit', {
        url: '/:direId/edit',
        templateUrl: 'modules/dires/client/views/form-dire.client.view.html',
        controller: 'DiresController',
        controllerAs: 'vm',
        resolve: {
          direResolve: getDire
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Dire {{ direResolve.name }}'
        }
      })
      .state('dires.view', {
        url: '/:direId',
        templateUrl: 'modules/dires/client/views/view-dire.client.view.html',
        controller: 'DiresController',
        controllerAs: 'vm',
        resolve: {
          direResolve: getDire
        },
        data: {
          pageTitle: 'Dire {{ direResolve.name }}'
        }
      });
  }

  getDire.$inject = ['$stateParams', 'DiresService'];

  function getDire($stateParams, DiresService) {
    return DiresService.get({
      direId: $stateParams.direId
    }).$promise;
  }

  newDire.$inject = ['DiresService'];

  function newDire(DiresService) {
    return new DiresService();
  }
}());
