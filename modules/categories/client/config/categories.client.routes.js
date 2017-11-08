(function () {
  'use strict';

  angular
    .module('categories')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('categories', {
        abstract: true,
        url: '/categories',
        template: '<ui-view/>'
      })
      .state('categories.list', {
        url: '',
        templateUrl: 'modules/categories/client/views/categories.client.view.html',
        controller: 'CategoriesListController as vm',
        data: {
          pageTitle: 'Categories List'
        }
      })
      .state('c', {
        abstract: true,
        url: '/c',
        template: '<ui-view/>'
      })
      .state('c.form', {
        url: '/form',
        templateUrl: 'modules/categories/client/views/form.client.view.html',
        controller: 'CategoriesController as vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Categories Create'
        }
      })
      .state('c.form.edit', {
        url: '/:id',
        templateUrl: 'modules/categories/client/views/form.client.view.html',
        controller: 'CategoriesController as vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Category {{ categoryResolve.name }}'
        }
      });
  }

  getCategory.$inject = ['$stateParams', 'CategoriesService'];

  function getCategory($stateParams, CategoriesService) {
    return CategoriesService.get({
      categoryId: $stateParams.categoryId
    }).$promise;
  }

  newCategory.$inject = ['CategoriesService'];

  function newCategory(CategoriesService) {
    return new CategoriesService();
  }
}());
