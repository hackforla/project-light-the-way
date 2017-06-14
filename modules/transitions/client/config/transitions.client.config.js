(function() {
  'use strict';

  angular
    .module('transitions')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Transition',
      state: 'transitions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'transitions', {
      title: 'Go to page',
      state: 'transitions.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'transitions', {
      title: 'Create Transition',
      state: 'transitions.create',
      roles: ['user']
    });
  }
}());
