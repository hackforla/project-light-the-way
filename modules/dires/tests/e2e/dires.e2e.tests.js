'use strict';

describe('Dires E2E Tests:', function () {
  describe('Test Dires page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/dires');
      expect(element.all(by.repeater('dire in dires')).count()).toEqual(0);
    });
  });
});
