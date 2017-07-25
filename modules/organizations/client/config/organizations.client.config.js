(function () {
  'use strict';

  angular
    .module('organizations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Organizations',
      state: 'organizations',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'organizations', {
      title: 'List Organizations',
      state: 'organizations.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'organizations', {
      title: 'Create Organization',
      state: 'organizations.create',
      roles: ['user']
    });
  }
}());
