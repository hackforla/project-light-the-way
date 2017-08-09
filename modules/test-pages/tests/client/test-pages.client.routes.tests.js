(function () {
  'use strict';

  describe('Test pages Route Tests', function () {
    // Initialize global variables
    var $scope,
      TestPagesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TestPagesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TestPagesService = _TestPagesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('test-pages');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/test-pages');
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
          TestPagesController,
          mockTestPage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('test-pages.view');
          $templateCache.put('modules/test-pages/client/views/view-test-page.client.view.html', '');

          // create mock Test page
          mockTestPage = new TestPagesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Test page Name'
          });

          // Initialize Controller
          TestPagesController = $controller('TestPagesController as vm', {
            $scope: $scope,
            testPageResolve: mockTestPage
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:testPageId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.testPageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            testPageId: 1
          })).toEqual('/test-pages/1');
        }));

        it('should attach an Test page to the controller scope', function () {
          expect($scope.vm.testPage._id).toBe(mockTestPage._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/test-pages/client/views/view-test-page.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TestPagesController,
          mockTestPage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('test-pages.create');
          $templateCache.put('modules/test-pages/client/views/form-test-page.client.view.html', '');

          // create mock Test page
          mockTestPage = new TestPagesService();

          // Initialize Controller
          TestPagesController = $controller('TestPagesController as vm', {
            $scope: $scope,
            testPageResolve: mockTestPage
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.testPageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/test-pages/create');
        }));

        it('should attach an Test page to the controller scope', function () {
          expect($scope.vm.testPage._id).toBe(mockTestPage._id);
          expect($scope.vm.testPage._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/test-pages/client/views/form-test-page.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TestPagesController,
          mockTestPage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('test-pages.edit');
          $templateCache.put('modules/test-pages/client/views/form-test-page.client.view.html', '');

          // create mock Test page
          mockTestPage = new TestPagesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Test page Name'
          });

          // Initialize Controller
          TestPagesController = $controller('TestPagesController as vm', {
            $scope: $scope,
            testPageResolve: mockTestPage
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:testPageId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.testPageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            testPageId: 1
          })).toEqual('/test-pages/1/edit');
        }));

        it('should attach an Test page to the controller scope', function () {
          expect($scope.vm.testPage._id).toBe(mockTestPage._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/test-pages/client/views/form-testPage.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
