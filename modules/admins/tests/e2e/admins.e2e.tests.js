'use strict';

describe('Admins E2E Tests:', function () {
  describe('Test Admins page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/admins');
      expect(element.all(by.repeater('admin in admins')).count()).toEqual(0);
    });
  });
});
