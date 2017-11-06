(function () {
  'use strict';

  // Resources controller
  angular
    .module('resources')
    .controller('ResourcesController', ResourcesController);

  ResourcesController.$inject = ['$location', '$state', '$window', 'ResourcesService', 'CategoriesService'];

  function ResourcesController ($location, $state, $window, resource, categories) {
    var vm = this;
    vm.error = null;
    vm.form = {};
    vm.form.reset = reset;
    vm.save = save;
    var d = 'delete';
    var id = $state.params.resourceId;

    categories.categories().get(function(d){
      vm.categories = d.data;
    },
    function(d){
      console.error(d);
    }
    );
    if(id){
      get();
    }

    function get(){
      resource.getResource(id).get(success, err);
    }

    function save(valid){
      if(valid){
        if(vm.resource._id){
          // update
          console.log('update');

          // resource.getResource(vm.resource._id).update(vm.resource, function(d){
          //   console.log(d);
          //   console.log('success update');
          // },
          // function(){
          //   console.log(d);
          //   console.log('failed');
          // }
          // );
        }else{
          // create
          console.log('creating');
          resource.create().save(vm.resource, updateurl, err);
        }
      }

    }

    function updateurl(d){
      $location.path('/r/form/'+d._id);
      vm.resource._id = d._id;
    }

    function success(d){
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
