(function () {
  'use strict';

  angular
    .module('dire')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Dire',
      state: 'dire',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'dire', {
      title: 'Dire',
      state: 'dire.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'dire', {
      title: 'Create Dire',
      state: 'dire.create',
      roles: ['user']
    });
  }
}());
