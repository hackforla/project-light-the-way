'use strict';

describe('Searches E2E Tests:', function () {
  describe('Test Searches page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/searches');
      expect(element.all(by.repeater('search in searches')).count()).toEqual(0);
    });
  });
});
