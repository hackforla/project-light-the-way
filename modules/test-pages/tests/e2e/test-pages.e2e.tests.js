'use strict';

describe('Test pages E2E Tests:', function () {
  describe('Test Test pages page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/test-pages');
      expect(element.all(by.repeater('test-page in test-pages')).count()).toEqual(0);
    });
  });
});
