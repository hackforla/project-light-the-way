(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomePageController', HomePageController);

  HomePageController.$inject = ['Authentication', 'ContentService'];

  function HomePageController(Authentication, content) {
    var vm = this;
    // This provides Authentication context.
    vm.authentication = Authentication;
    vm.content = {};
    vm.content.aboutus = content.getAboutUs();
  }

}());



// (function () {
//   'use strict';
//
//   angular
//     .module('resources')
//     .controller('ResourcesListController', ResourcesListController);
//
//   ResourcesListController.$inject = ['ResourcesService'];
//
//   function ResourcesListController(ResourcesService) {
//     var vm = this;
//
//     vm.resources = ResourcesService.query();
//   }
// }());
