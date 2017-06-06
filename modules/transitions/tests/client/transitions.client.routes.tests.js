(function () {
  'use strict';

  describe('Transitions Route Tests', function () {
    // Initialize global variables
    var $scope,
      TransitionsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TransitionsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TransitionsService = _TransitionsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('transitions');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/transitions');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          TransitionsController,
          mockTransition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('transitions.view');
          $templateCache.put('modules/transitions/client/views/view-transition.client.view.html', '');

          // create mock Transition
          mockTransition = new TransitionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Transition Name'
          });

          // Initialize Controller
          TransitionsController = $controller('TransitionsController as vm', {
            $scope: $scope,
            transitionResolve: mockTransition
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:transitionId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.transitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            transitionId: 1
          })).toEqual('/transitions/1');
        }));

        it('should attach an Transition to the controller scope', function () {
          expect($scope.vm.transition._id).toBe(mockTransition._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/transitions/client/views/view-transition.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TransitionsController,
          mockTransition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('transitions.create');
          $templateCache.put('modules/transitions/client/views/form-transition.client.view.html', '');

          // create mock Transition
          mockTransition = new TransitionsService();

          // Initialize Controller
          TransitionsController = $controller('TransitionsController as vm', {
            $scope: $scope,
            transitionResolve: mockTransition
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.transitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/transitions/create');
        }));

        it('should attach an Transition to the controller scope', function () {
          expect($scope.vm.transition._id).toBe(mockTransition._id);
          expect($scope.vm.transition._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/transitions/client/views/form-transition.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TransitionsController,
          mockTransition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('transitions.edit');
          $templateCache.put('modules/transitions/client/views/form-transition.client.view.html', '');

          // create mock Transition
          mockTransition = new TransitionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Transition Name'
          });

          // Initialize Controller
          TransitionsController = $controller('TransitionsController as vm', {
            $scope: $scope,
            transitionResolve: mockTransition
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:transitionId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.transitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            transitionId: 1
          })).toEqual('/transitions/1/edit');
        }));

        it('should attach an Transition to the controller scope', function () {
          expect($scope.vm.transition._id).toBe(mockTransition._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/transitions/client/views/form-transition.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
