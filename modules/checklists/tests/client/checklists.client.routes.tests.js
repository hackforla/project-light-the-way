(function () {
  'use strict';

  describe('Checklists Route Tests', function () {
    // Initialize global variables
    var $scope,
      ChecklistsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ChecklistsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ChecklistsService = _ChecklistsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('checklists');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/checklists');
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
          ChecklistsController,
          mockChecklist;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('checklists.view');
          $templateCache.put('modules/checklists/client/views/view-checklist.client.view.html', '');

          // create mock Checklist
          mockChecklist = new ChecklistsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Checklist Name'
          });

          // Initialize Controller
          ChecklistsController = $controller('ChecklistsController as vm', {
            $scope: $scope,
            checklistResolve: mockChecklist
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:checklistId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.checklistResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            checklistId: 1
          })).toEqual('/checklists/1');
        }));

        it('should attach an Checklist to the controller scope', function () {
          expect($scope.vm.checklist._id).toBe(mockChecklist._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/checklists/client/views/view-checklist.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ChecklistsController,
          mockChecklist;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('checklists.create');
          $templateCache.put('modules/checklists/client/views/form-checklist.client.view.html', '');

          // create mock Checklist
          mockChecklist = new ChecklistsService();

          // Initialize Controller
          ChecklistsController = $controller('ChecklistsController as vm', {
            $scope: $scope,
            checklistResolve: mockChecklist
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.checklistResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/checklists/create');
        }));

        it('should attach an Checklist to the controller scope', function () {
          expect($scope.vm.checklist._id).toBe(mockChecklist._id);
          expect($scope.vm.checklist._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/checklists/client/views/form-checklist.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ChecklistsController,
          mockChecklist;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('checklists.edit');
          $templateCache.put('modules/checklists/client/views/form-checklist.client.view.html', '');

          // create mock Checklist
          mockChecklist = new ChecklistsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Checklist Name'
          });

          // Initialize Controller
          ChecklistsController = $controller('ChecklistsController as vm', {
            $scope: $scope,
            checklistResolve: mockChecklist
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:checklistId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.checklistResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            checklistId: 1
          })).toEqual('/checklists/1/edit');
        }));

        it('should attach an Checklist to the controller scope', function () {
          expect($scope.vm.checklist._id).toBe(mockChecklist._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/checklists/client/views/form-checklist.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
