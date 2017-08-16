(function () {
  'use strict';

  describe('Resources Route Tests', function () {
    // Initialize global variables
    var $scope,
      ResourcesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ResourcesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ResourcesService = _ResourcesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('resources');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/resources');
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
          ResourcesController,
          mockResource;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('resources.view');
          $templateCache.put('modules/resources/client/views/view-resource.client.view.html', '');

          // create mock Resource
          mockResource = new ResourcesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Resource Name'
          });

          // Initialize Controller
          ResourcesController = $controller('ResourcesController as vm', {
            $scope: $scope,
            resourceResolve: mockResource
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:resourceId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.resourceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            resourceId: 1
          })).toEqual('/resources/1');
        }));

        it('should attach an Resource to the controller scope', function () {
          expect($scope.vm.resource._id).toBe(mockResource._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/resources/client/views/view-resource.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ResourcesController,
          mockResource;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('resources.create');
          $templateCache.put('modules/resources/client/views/form-resource.client.view.html', '');

          // create mock Resource
          mockResource = new ResourcesService();

          // Initialize Controller
          ResourcesController = $controller('ResourcesController as vm', {
            $scope: $scope,
            resourceResolve: mockResource
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.resourceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/resources/create');
        }));

        it('should attach an Resource to the controller scope', function () {
          expect($scope.vm.resource._id).toBe(mockResource._id);
          expect($scope.vm.resource._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/resources/client/views/form-resource.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ResourcesController,
          mockResource;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('resources.edit');
          $templateCache.put('modules/resources/client/views/form-resource.client.view.html', '');

          // create mock Resource
          mockResource = new ResourcesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Resource Name'
          });

          // Initialize Controller
          ResourcesController = $controller('ResourcesController as vm', {
            $scope: $scope,
            resourceResolve: mockResource
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:resourceId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.resourceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            resourceId: 1
          })).toEqual('/resources/1/edit');
        }));

        it('should attach an Resource to the controller scope', function () {
          expect($scope.vm.resource._id).toBe(mockResource._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/resources/client/views/form-resource.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
