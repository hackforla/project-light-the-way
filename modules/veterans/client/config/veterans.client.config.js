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
      title: 'List Veterans',
      state: 'veterans.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'veterans', {
      title: 'Create Veteran',
      state: 'veterans.create',
      roles: ['user']
    });
  }
}());
