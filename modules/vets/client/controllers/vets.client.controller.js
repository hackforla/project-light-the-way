// (function () {
//   'use strict';
//
//   // Vets controller
//   angular
//     .module('vets')
//     .controller('VetsController', VetsController);
//
//   VetsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'vetResolve'];
//
//   function VetsController ($scope, $state, $window, Authentication, vet) {
//     var vm = this;
//
//     vm.authentication = Authentication;
//     vm.vet = vet;
//     vm.error = null;
//     vm.form = {};
//     vm.remove = remove;
//     vm.save = save;
//
//     // Remove existing Vet
//     function remove() {
//       if ($window.confirm('Are you sure you want to delete?')) {
//         vm.vet.$remove($state.go('vets.list'));
//       }
//     }
//
//     // Save Vet
//     function save(isValid) {
//       if (!isValid) {
//         $scope.$broadcast('show-errors-check-validity', 'vm.form.vetForm');
//         return false;
//       }
//
//       // TODO: move create/update logic to service
//       if (vm.vet._id) {
//         vm.vet.$update(successCallback, errorCallback);
//       } else {
//         vm.vet.$save(successCallback, errorCallback);
//       }
//
//       function successCallback(res) {
//         $state.go('vets.view', {
//           vetId: res._id
//         });
//       }
//
//       function errorCallback(res) {
//         vm.error = res.data.message;
//       }
//     }
//   }
// }());
