(function () {
  'use strict';

  angular
    .module('resources')
    .controller('ResourcePageController', ResourcePageController);

  // ResourcePageController.$inject = ['$state', ];

  function ResourcePageController() {
    var vm = this;

    vm.type = 'header-nav';


    // resources.getResource($state.params.resourceId).get(function(d){
    //   console.log(d.data);
    //   vm.resource = d.data;
    // });
  }
}());
