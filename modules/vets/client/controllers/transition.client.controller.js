// OFF
// (function () {
//   'use strict';
//
//   angular
//     .module('vets')
//     .controller('VetsTransitionController', VetsTransitionController);
//
//   VetsTransitionController.$inject = ['CategoriesService', 'LocateService'];
//
//   function VetsTransitionController(categories, location) {
//     var vm = this;
//     vm.fn = {};
//     vm.fn.locate = locate;
//
//     categories.categories().get(function(d){
//       vm.categories = d.data;
//     });
// 
//     function locate(){
//       if ('geolocation' in navigator){
//
//         navigator.geolocation.getCurrentPosition(function(pos){
//
//           location.latlng(pos.coords.latitude, pos.coords.longitude).then(function(d){
//             console.log(d);
//           });
//           console.log('Location found');
//         });
//       }else{
//         console.log('Unable to locate');
//       }
//     }
//
//   }
// }());
