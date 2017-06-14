'use strict';

describe('Dire E2E Tests:', function () {
  describe('Test Dire page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/dire');
      expect(element.all(by.repeater('dire in dire')).count()).toEqual(0);
    });
  });
});
