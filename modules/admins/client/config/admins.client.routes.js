(function () {
  'use strict';

  angular
    .module('admins')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admins', {
        abstract: true,
        url: '/admins',
        template: '<ui-view/>'
      })
      .state('admins.list', {
        url: '',
        templateUrl: 'modules/admins/client/views/list-admins.client.view.html',
        controller: 'AdminsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Admins List'
        }
      })
      .state('admins.create', {
        url: '/create',
        templateUrl: 'modules/admins/client/views/form-admin.client.view.html',
        controller: 'AdminsController',
        controllerAs: 'vm',
        resolve: {
          adminResolve: newAdmin
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Admins Create'
        }
      })
      .state('admins.edit', {
        url: '/:adminId/edit',
        templateUrl: 'modules/admins/client/views/form-admin.client.view.html',
        controller: 'AdminsController',
        controllerAs: 'vm',
        resolve: {
          adminResolve: getAdmin
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Admin {{ adminResolve.name }}'
        }
      })
      .state('admins.view', {
        url: '/:adminId',
        templateUrl: 'modules/admins/client/views/view-admin.client.view.html',
        controller: 'AdminsController',
        controllerAs: 'vm',
        resolve: {
          adminResolve: getAdmin
        },
        data: {
          pageTitle: 'Admin {{ adminResolve.name }}'
        }
      });
  }

  getAdmin.$inject = ['$stateParams', 'AdminsService'];

  function getAdmin($stateParams, AdminsService) {
    return AdminsService.get({
      adminId: $stateParams.adminId
    }).$promise;
  }

  newAdmin.$inject = ['AdminsService'];

  function newAdmin(AdminsService) {
    return new AdminsService();
  }
}());
