(function () {
  'use strict';

  describe('Dire Route Tests', function () {
    // Initialize global variables
    var $scope,
      DireService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DireService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DireService = _DireService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('dire');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/dire');
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
          DireController,
          mockDire;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('dire.view');
          $templateCache.put('modules/dire/client/views/view-dire.client.view.html', '');

          // create mock Dire
          mockDire = new DireService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Dire Name'
          });

          // Initialize Controller
          DireController = $controller('DireController as vm', {
            $scope: $scope,
            direResolve: mockDire
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:direId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.direResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            direId: 1
          })).toEqual('/dire/1');
        }));

        it('should attach an Dire to the controller scope', function () {
          expect($scope.vm.dire._id).toBe(mockDire._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/dire/client/views/view-dire.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DireController,
          mockDire;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('dire.create');
          $templateCache.put('modules/dire/client/views/form-dire.client.view.html', '');

          // create mock Dire
          mockDire = new DireService();

          // Initialize Controller
          DireController = $controller('DireController as vm', {
            $scope: $scope,
            direResolve: mockDire
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.direResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/dire/create');
        }));

        it('should attach an Dire to the controller scope', function () {
          expect($scope.vm.dire._id).toBe(mockDire._id);
          expect($scope.vm.dire._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/dire/client/views/form-dire.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DireController,
          mockDire;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('dire.edit');
          $templateCache.put('modules/dire/client/views/form-dire.client.view.html', '');

          // create mock Dire
          mockDire = new DireService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Dire Name'
          });

          // Initialize Controller
          DireController = $controller('DireController as vm', {
            $scope: $scope,
            direResolve: mockDire
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:direId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.direResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            direId: 1
          })).toEqual('/dire/1/edit');
        }));

        it('should attach an Dire to the controller scope', function () {
          expect($scope.vm.dire._id).toBe(mockDire._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/dire/client/views/form-dire.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
