(function () {
  'use strict';

  describe('Admins Controller Tests', function () {
    // Initialize global variables
    var AdminsController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      AdminsService,
      mockAdmin;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _AdminsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      AdminsService = _AdminsService_;

      // create mock Admin
      mockAdmin = new AdminsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Admin Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Admins controller.
      AdminsController = $controller('AdminsController as vm', {
        $scope: $scope,
        adminResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleAdminPostData;

      beforeEach(function () {
        // Create a sample Admin object
        sampleAdminPostData = new AdminsService({
          name: 'Admin Name'
        });

        $scope.vm.admin = sampleAdminPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (AdminsService) {
        // Set POST response
        $httpBackend.expectPOST('api/admins', sampleAdminPostData).respond(mockAdmin);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Admin was created
        expect($state.go).toHaveBeenCalledWith('admins.view', {
          adminId: mockAdmin._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/admins', sampleAdminPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Admin in $scope
        $scope.vm.admin = mockAdmin;
      });

      it('should update a valid Admin', inject(function (AdminsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/admins\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('admins.view', {
          adminId: mockAdmin._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (AdminsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/admins\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Admins
        $scope.vm.admin = mockAdmin;
      });

      it('should delete the Admin and redirect to Admins', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/admins\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('admins.list');
      });

      it('should should not delete the Admin and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
