// // Vets service used to communicate Vets REST endpoints
// (function () {
//   'use strict';
//
//   angular
//     .module('vets')
//     .factory('VetsService', VetsService);
//
//   VetsService.$inject = ['$resource'];
//
//   function VetsService($resource) {
//     return $resource('api/vets/:vetId', {
//       vetId: '@_id'
//     }, {
//       update: {
//         method: 'PUT'
//       }
//     });
//   }
// }());
