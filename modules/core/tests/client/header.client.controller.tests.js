// 'use strict';
//
// (function () {
//   describe('HomePageController', function () {
//     //Initialize global variables
//     var scope,
//       vm,
//       $state,
//       Authentication;
//
//     // Load the main application module
//     beforeEach(module(ApplicationConfiguration.applicationModuleName));
//
//     beforeEach(inject(function ($controller, $rootScope, _$state_, _Authentication_) {
//       scope = $rootScope.$new();
//       $state = _$state_;
//       Authentication = _Authentication_;
//
//     // CHECK resources/tests/client/resources.client.controller.tests.js for solution 
//       vm = $controller('HomePageController');
//     }));
//
//     it('should expose the authentication service', function () {
//       expect(vm.authentication).toBe(Authentication);
//     });
//
//     it('should expose the $state service', function () {
//       expect(vm.$state).toBe($state);
//     });
//
//     it('should default menu to collapsed', function () {
//       expect(vm.isCollapsed).toBeFalsy();
//     });
//
//     describe('when toggleCollapsibleMenu', function () {
//       var defaultCollapse;
//       beforeEach(function () {
//         defaultCollapse = scope.isCollapsed;
//         scope.toggleCollapsibleMenu();
//       });
//
//       it('should toggle isCollapsed to non default value', function () {
//         expect(vm.isCollapsed).not.toBe(defaultCollapse);
//       });
//
//       it('should then toggle isCollapsed back to default value', function () {
//         scope.toggleCollapsibleMenu();
//         expect(vm.isCollapsed).toBe(defaultCollapse);
//       });
//     });
//
//     describe('when view state changes', function () {
//       beforeEach(function () {
//         vm.isCollapsed = true;
//         vm.$broadcast('$stateChangeSuccess');
//       });
//
//       it('should set isCollapsed to false', function () {
//         expect(scope.isCollapsed).toBeFalsy();
//       });
//     });
//   });
// })();
