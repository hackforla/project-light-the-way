(function () {
  'use strict';

  angular
    .module('test-pages')
    .controller('TestPagesListController', TestPagesListController);

  TestPagesListController.$inject = ['TestPagesService'];

  function TestPagesListController(TestPagesService) {
    var vm = this;

    vm.testPages = TestPagesService.query();
  }
}());
