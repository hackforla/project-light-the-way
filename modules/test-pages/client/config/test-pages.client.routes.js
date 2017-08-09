(function () {
  'use strict';

  angular
    .module('test-pages')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('test-pages', {
        abstract: true,
        url: '/test-pages',
        template: '<ui-view/>'
      })
      .state('test-pages.list', {
        url: '',
        templateUrl: 'modules/test-pages/client/views/list-test-pages.client.view.html',
        controller: 'TestPagesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Test pages List'
        }
      })
      .state('test-pages.create', {
        url: '/create',
        templateUrl: 'modules/test-pages/client/views/form-test-page.client.view.html',
        controller: 'TestPagesController',
        controllerAs: 'vm',
        resolve: {
          test-pageResolve: newTestPage
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Test pages Create'
        }
      })
      .state('test-pages.edit', {
        url: '/:testPageId/edit',
        templateUrl: 'modules/test-pages/client/views/form-test-page.client.view.html',
        controller: 'TestPagesController',
        controllerAs: 'vm',
        resolve: {
          test-pageResolve: getTestPage
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Test page {{ test-pageResolve.name }}'
        }
      })
      .state('test-pages.view', {
        url: '/:testPageId',
        templateUrl: 'modules/test-pages/client/views/view-test-page.client.view.html',
        controller: 'TestPagesController',
        controllerAs: 'vm',
        resolve: {
          test-pageResolve: getTestPage
        },
        data: {
          pageTitle: 'Test page {{ test-pageResolve.name }}'
        }
      });
  }

  getTestPage.$inject = ['$stateParams', 'TestPagesService'];

  function getTestPage($stateParams, TestPagesService) {
    return TestPagesService.get({
      testPageId: $stateParams.testPageId
    }).$promise;
  }

  newTestPage.$inject = ['TestPagesService'];

  function newTestPage(TestPagesService) {
    return new TestPagesService();
  }
}());
