(function () {
  'use strict';

  // Resources controller
  angular
    .module('resources')
    .controller('ResourcesController', ResourcesController);

  ResourcesController.$inject = ['$location', '$state', '$window', 'Authentication', 'ResourcesService'];

  function ResourcesController ($location, $state, $window, Authentication, resource) {
    var vm = this;

    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.form.reset = reset;
    // vm.remove = remove;
    vm.save = save;
    var d = 'delete';
    var id = $state.params.resourceId;
    if(id){
      get();
    }
    // else{
    //   vm.resource = {
    //     org: d,
    //     desc: d,
    //     web:'www.'+d+'.com',
    //     poc_name: d,
    //     poc_email: d+'@'+d+'.com',
    //     poc_line: '1231231234',
    //     tags:d,
    //     city:d,
    //     state:'ca',
    //     zip:'00000',
    //     addr:'123 Main St'
    //   };
    // }


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
      vm.resource = d;
      vm.resource = d;
    }

    function err(e){
      vm.error = e;
    }

    function reset(){
      vm.resource ={};
      $location.path('/r/form');
    }



    // Remove existing Resource
    // function remove() {
    //   if ($window.confirm('Are you sure you want to delete?')) {
    //     vm.resource.$remove($state.go('resources.list'));
    //   }
    // }

    // Save Resource
    // function save(isValid) {
    //   console.log(isValid);
    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'vm.form.resourceForm');
    //     return false;
    //   }
    //
    //   // TODO: move create/update logic to service
    //   if (vm.resource._id) {
    //     vm.resource.$update(successCallback, errorCallback);
    //   } else {
    //     vm.resource.$save(successCallback, errorCallback);
    //   }
    //
    //   function successCallback(res) {
    //     $state.go('resources.edit', {
    //       resourceId: res._id
    //     });
    //   }
    //
    //   function errorCallback(res) {
    //     vm.error = res.data.message;
    //   }
    // }
  }
}());
