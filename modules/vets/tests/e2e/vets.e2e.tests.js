'use strict';

describe('Vets E2E Tests:', function () {
  describe('Test Vets page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/vets');
      expect(element.all(by.repeater('vet in vets')).count()).toEqual(0);
    });
  });
});
