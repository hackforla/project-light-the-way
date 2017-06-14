(function () {
  'use strict';

  angular
    .module('transitions')
    .controller('TransitionsListController', TransitionsListController);

  TransitionsListController.$inject = ['TransitionsService', '$log'];

  function TransitionsListController(TransitionsService, $log) {
    var vm = this;

    vm.transitions = TransitionsService.query();

    var demo = {};
    demo.name = '';
    demo.link = 'lacity.org';
    demo.desc = 'This the description about the resources';
    vm.demos = [];

    var i;

    function Resource(r){
      this.name = 'Resource ' + r;
      this.link = 'lacity.org';
      this.desc = 'This the description about the resources';
    }

    for(i=1;i<16;i++){
      vm.demos.push(new Resource(i));
    }


    $log.log(vm.demos);



  }
}());
