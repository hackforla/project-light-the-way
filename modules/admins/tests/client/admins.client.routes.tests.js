(function () {
  'use strict';

  describe('Admins Route Tests', function () {
    // Initialize global variables
    var $scope,
      AdminsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AdminsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AdminsService = _AdminsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('admins');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/admins');
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
          AdminsController,
          mockAdmin;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('admins.view');
          $templateCache.put('modules/admins/client/views/view-admin.client.view.html', '');

          // create mock Admin
          mockAdmin = new AdminsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Admin Name'
          });

          // Initialize Controller
          AdminsController = $controller('AdminsController as vm', {
            $scope: $scope,
            adminResolve: mockAdmin
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:adminId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.adminResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            adminId: 1
          })).toEqual('/admins/1');
        }));

        it('should attach an Admin to the controller scope', function () {
          expect($scope.vm.admin._id).toBe(mockAdmin._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/admins/client/views/view-admin.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AdminsController,
          mockAdmin;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admins.create');
          $templateCache.put('modules/admins/client/views/form-admin.client.view.html', '');

          // create mock Admin
          mockAdmin = new AdminsService();

          // Initialize Controller
          AdminsController = $controller('AdminsController as vm', {
            $scope: $scope,
            adminResolve: mockAdmin
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.adminResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admins/create');
        }));

        it('should attach an Admin to the controller scope', function () {
          expect($scope.vm.admin._id).toBe(mockAdmin._id);
          expect($scope.vm.admin._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/admins/client/views/form-admin.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AdminsController,
          mockAdmin;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admins.edit');
          $templateCache.put('modules/admins/client/views/form-admin.client.view.html', '');

          // create mock Admin
          mockAdmin = new AdminsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Admin Name'
          });

          // Initialize Controller
          AdminsController = $controller('AdminsController as vm', {
            $scope: $scope,
            adminResolve: mockAdmin
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:adminId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.adminResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            adminId: 1
          })).toEqual('/admins/1/edit');
        }));

        it('should attach an Admin to the controller scope', function () {
          expect($scope.vm.admin._id).toBe(mockAdmin._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/admins/client/views/form-admin.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
