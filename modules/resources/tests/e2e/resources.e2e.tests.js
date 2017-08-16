'use strict';

describe('Resources E2E Tests:', function () {
  describe('Test Resources page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/resources');
      expect(element.all(by.repeater('resource in resources')).count()).toEqual(0);
    });
  });
});
