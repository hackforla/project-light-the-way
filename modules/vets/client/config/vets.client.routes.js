(function () {
  'use strict';

  angular
    .module('vets')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('vet', {
        abstract: true,
        url: '/',
        template: '<ui-view/>'
      })
      .state('vet.dire', {
        url: 'dire',
        templateUrl: 'modules/vets/client/views/dire.client.view.html',
        controller: 'VetsListController as vm',
        data: {
          pageTitle: 'Dire'
        }
      })
      .state('vet.transition', {
        url: 'transition',
        templateUrl: 'modules/vets/client/views/transition.client.view.html',
        controller: 'VetsController as vm',
        data: {
          pageTitle: 'Transitioning'
        }
      })
      .state('vet.vet', {
        url: 'veteran',
        templateUrl: 'modules/vets/client/views/veteran.client.view.html',
        controller: 'VetsController as vm',
        data: {
          pageTitle: 'Veteran'
        }
      });
  }
}());
