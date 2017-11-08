(function () {
  'use strict';

  angular
    .module('resources')
    .controller('ResourcesListController', ResourcesListController);

  ResourcesListController.$inject = ['ResourcesService'];

  function ResourcesListController(resources) {
    var vm = this;

    // resources.resources().get(function(d){
    //   vm.resources = d.data;
    // });

    vm.type = 'header-nav';

    vm.resources = [
      {
        name:'test',
        resources:[
          {
            '_id':'0',
            org: 'Org Name 0',
            name: 'Resource Name'
          },
          {
            '_id':'1',
            org: 'Org Name 1',
            name: 'Resource Name'
          },
          {
            '_id':'2',
            org: 'Org Name 2',
            name: 'Resource Name'
          },
          {
            '_id':'3',
            org: 'Org Name 3',
            name: 'Resource Name'
          }
        ]
      },
      {
        name:'education',
        resources:[
          {
            _id:'21',
            org: 'Org Name 21',
            name: 'Resource Name'
          },
          {
            '_id':'22',
            org: 'Org Name 22',
            name: 'Resource Name'
          },
        ]
      },
      {
        name:'another',
        resources:[
          {
            _id:'21',
            org: 'Org Name 21',
            name: 'Resource Name'
          },
          {
            '_id':'22',
            org: 'Org Name 22',
            name: 'Resource Name'
          },
        ]
      },
      {
        name:'jobs',
        resources:[
          {
            _id:'21',
            org: 'Org Name 21',
            name: 'Resource Name'
          },
          {
            '_id':'22',
            org: 'Org Name 22',
            name: 'Resource Name'
          },
        ]
      },
      {
        name:'female vets',
        resources:[
          {
            _id:'21',
            org: 'Org Name 21',
            name: 'Resource Name'
          },
          {
            '_id':'22',
            org: 'Org Name 22',
            name: 'Resource Name'
          },
        ]
      }
    ];

  }
}());
