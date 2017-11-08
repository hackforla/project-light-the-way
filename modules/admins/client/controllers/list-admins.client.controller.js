(function () {
  'use strict';

  angular
    .module('admins')
    .controller('AdminsListController', AdminsListController);

  AdminsListController.$inject = ['AdminsService'];

  function AdminsListController(AdminsService) {
    var vm = this;

    vm.admins = AdminsService.query();
  }
}());
