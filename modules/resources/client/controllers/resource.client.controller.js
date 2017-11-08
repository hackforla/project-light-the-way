(function () {
  'use strict';

  angular
    .module('resources')
    .controller('ResourceReadController', ResourceReadController);

  ResourceReadController.$inject = ['$state', 'ResourcesService'];

  function ResourceReadController($state, resources) {
    var vm = this;


    resources.getResource($state.params.resourceId).get(function(d){
      console.log(d.data);
      vm.resource = d.data;
    });
  }
}());
