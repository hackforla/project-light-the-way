'use strict';

describe('Transitions E2E Tests:', function () {
  describe('Test Transitions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/transitions');
      expect(element.all(by.repeater('transition in transitions')).count()).toEqual(0);
    });
  });
});
