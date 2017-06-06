'use strict';

describe('Veterans E2E Tests:', function () {
  describe('Test Veterans page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/veterans');
      expect(element.all(by.repeater('veteran in veterans')).count()).toEqual(0);
    });
  });
});
