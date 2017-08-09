(function () {
  'use strict';

  describe('Test pages Controller Tests', function () {
    // Initialize global variables
    var TestPagesController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      TestPagesService,
      mockTestPage;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _TestPagesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      TestPagesService = _TestPagesService_;

      // create mock Test page
      mockTestPage = new TestPagesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Test page Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Test pages controller.
      TestPagesController = $controller('Test pagesController as vm', {
        $scope: $scope,
        testPageResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleTestPagePostData;

      beforeEach(function () {
        // Create a sample Test page object
        sampleTestPagePostData = new TestPagesService({
          name: 'Test page Name'
        });

        $scope.vm.testPage = sampleTestPagePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (TestPagesService) {
        // Set POST response
        $httpBackend.expectPOST('api/test-pages', sampleTestPagePostData).respond(mockTestPage);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Test page was created
        expect($state.go).toHaveBeenCalledWith('test-pages.view', {
          testPageId: mockTestPage._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/test-pages', sampleTestPagePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Test page in $scope
        $scope.vm.testPage = mockTestPage;
      });

      it('should update a valid Test page', inject(function (TestPagesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/test-pages\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('test-pages.view', {
          testPageId: mockTestPage._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (TestPagesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/test-pages\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Test pages
        $scope.vm.testPage = mockTestPage;
      });

      it('should delete the Test page and redirect to Test pages', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/test-pages\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('test-pages.list');
      });

      it('should should not delete the Test page and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
