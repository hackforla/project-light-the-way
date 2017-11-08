'use strict';

describe('Checklists E2E Tests:', function () {
  describe('Test Checklists page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/checklists');
      expect(element.all(by.repeater('checklist in checklists')).count()).toEqual(0);
    });
  });
});
