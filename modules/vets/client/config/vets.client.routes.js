(function () {
  'use strict';

  angular
    .module('vets')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('vets', {
        abstract: true,
        url: '/vets',
        template: '<ui-view/>'
      })
      .state('vets.list', {
        url: '',
        templateUrl: 'modules/vets/client/views/list-vets.client.view.html',
        controller: 'VetsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Vets List'
        }
      })
      .state('vets.create', {
        url: '/create',
        templateUrl: 'modules/vets/client/views/form-vet.client.view.html',
        controller: 'VetsController',
        controllerAs: 'vm',
        resolve: {
          vetResolve: newVet
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Vets Create'
        }
      })
      .state('vets.edit', {
        url: '/:vetId/edit',
        templateUrl: 'modules/vets/client/views/form-vet.client.view.html',
        controller: 'VetsController',
        controllerAs: 'vm',
        resolve: {
          vetResolve: getVet
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Vet {{ vetResolve.name }}'
        }
      })
      .state('vets.view', {
        url: '/:vetId',
        templateUrl: 'modules/vets/client/views/view-vet.client.view.html',
        controller: 'VetsController',
        controllerAs: 'vm',
        resolve: {
          vetResolve: getVet
        },
        data: {
          pageTitle: 'Vet {{ vetResolve.name }}'
        }
      });
  }

  getVet.$inject = ['$stateParams', 'VetsService'];

  function getVet($stateParams, VetsService) {
    return VetsService.get({
      vetId: $stateParams.vetId
    }).$promise;
  }

  newVet.$inject = ['VetsService'];

  function newVet(VetsService) {
    return new VetsService();
  }
}());
