(function () {
  'use strict';

  angular
    .module('dires')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Dires',
      state: 'dires',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'dires', {
      title: 'List Dires',
      state: 'dires.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'dires', {
      title: 'Create Dire',
      state: 'dires.create',
      roles: ['user']
    });
  }
}());
