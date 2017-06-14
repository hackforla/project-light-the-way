(function () {
  'use strict';

  angular
    .module('veterans')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Veterans',
      state: 'veterans',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'veterans', {
      title: 'Transitioning',
      state: 'veterans.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'veterans', {
      title: 'Dire',
      state: 'veterans.create',
      roles: ['user']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'transitions', {
      title: 'Test',
      state: 'transitions.list',
      roles: ['user']
    });
  }
}());
