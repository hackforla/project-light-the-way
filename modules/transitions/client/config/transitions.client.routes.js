(function () {
  'use strict';

  angular
    .module('transitions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('transitions', {
        abstract: true,
        url: '/transitions',
        template: '<ui-view/>'
      })
      .state('transitions.list', {
        url: '',
        templateUrl: 'modules/transitions/client/views/list-transitions.client.view.html',
        controller: 'TransitionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Transitions List'
        }
      })
      .state('transitions.create', {
        url: '/create',
        templateUrl: 'modules/transitions/client/views/form-transition.client.view.html',
        controller: 'TransitionsController',
        controllerAs: 'vm',
        resolve: {
          transitionResolve: newTransition
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Transitions Create'
        }
      })
      .state('transitions.edit', {
        url: '/:transitionId/edit',
        templateUrl: 'modules/transitions/client/views/form-transition.client.view.html',
        controller: 'TransitionsController',
        controllerAs: 'vm',
        resolve: {
          transitionResolve: getTransition
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Transition {{ transitionResolve.name }}'
        }
      })
      .state('transitions.view', {
        url: '/:transitionId',
        templateUrl: 'modules/transitions/client/views/view-transition.client.view.html',
        controller: 'TransitionsController',
        controllerAs: 'vm',
        resolve: {
          transitionResolve: getTransition
        },
        data: {
          pageTitle: 'Transition {{ transitionResolve.name }}'
        }
      });
  }

  getTransition.$inject = ['$stateParams', 'TransitionsService'];

  function getTransition($stateParams, TransitionsService) {
    return TransitionsService.get({
      transitionId: $stateParams.transitionId
    }).$promise;
  }

  newTransition.$inject = ['TransitionsService'];

  function newTransition(TransitionsService) {
    return new TransitionsService();
  }
}());
