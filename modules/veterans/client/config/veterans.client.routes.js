(function () {
  'use strict';

  angular
    .module('veterans')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('veterans', {
        abstract: true,
        url: '/veterans',
        template: '<ui-view/>'
      })
      .state('veterans.list', {
        url: '',
        templateUrl: 'modules/veterans/client/views/list-veterans.client.view.html',
        controller: 'VeteransListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Veterans List'
        }
      })
      .state('veterans.create', {
        url: '/create',
        templateUrl: 'modules/veterans/client/views/form-veteran.client.view.html',
        controller: 'VeteransController',
        controllerAs: 'vm',
        resolve: {
          veteranResolve: newVeteran
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Veterans Create'
        }
      })
      .state('veterans.edit', {
        url: '/:veteranId/edit',
        templateUrl: 'modules/veterans/client/views/form-veteran.client.view.html',
        controller: 'VeteransController',
        controllerAs: 'vm',
        resolve: {
          veteranResolve: getVeteran
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Veteran {{ veteranResolve.name }}'
        }
      })
      .state('veterans.view', {
        url: '/:veteranId',
        templateUrl: 'modules/veterans/client/views/view-veteran.client.view.html',
        controller: 'VeteransController',
        controllerAs: 'vm',
        resolve: {
          veteranResolve: getVeteran
        },
        data: {
          pageTitle: 'Veteran {{ veteranResolve.name }}'
        }
      });
  }

  getVeteran.$inject = ['$stateParams', 'VeteransService'];

  function getVeteran($stateParams, VeteransService) {
    return VeteransService.get({
      veteranId: $stateParams.veteranId
    }).$promise;
  }

  newVeteran.$inject = ['VeteransService'];

  function newVeteran(VeteransService) {
    return new VeteransService();
  }
}());
