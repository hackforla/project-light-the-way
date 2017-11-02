(function () {
  'use strict';

  // Resources controller
  angular
    .module('resources')
    .controller('ResourcesController', ResourcesController);

  ResourcesController.$inject = ['$location', '$state', '$window', 'ResourcesService'];

  function ResourcesController ($location, $state, $window, resource) {
    var vm = this;
    vm.error = null;
    vm.form = {};
    vm.form.reset = reset;
    vm.save = save;
    var d = 'delete';
    var id = $state.params.resourceId;
    if(id){
      get();
    }

    function get(){
      resource.getResource(id).get(success, err);
    }

    function save(valid){
      if(valid){
        resource.create().save(vm.resource, updateurl, err);
      }
      function updateurl(d){
        $location.path('/r/form/'+d._id);
        vm.resource._id = d._id;
      }
    }

    function success(d){
      console.log(d);
      vm.resource = d.data;
    }

    function err(e){
      vm.error = e;
    }

    function reset(){
      vm.resource ={};
      $location.path('/r/form');
    }

  }
}());
