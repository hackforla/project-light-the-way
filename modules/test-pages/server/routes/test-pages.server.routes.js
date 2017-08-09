'use strict';

/**
 * Module dependencies
 */
var testPagesPolicy = require('../policies/test-pages.server.policy'),
  testPages = require('../controllers/test-pages.server.controller');

module.exports = function(app) {
  // Test pages Routes
  app.route('/api/test-pages').all(testPagesPolicy.isAllowed)
    .get(testPages.list)
    .post(testPages.create);

  app.route('/api/test-pages/:testPageId').all(testPagesPolicy.isAllowed)
    .get(testPages.read)
    .put(testPages.update)
    .delete(testPages.delete);

  // Finish by binding the Test page middleware
  app.param('testPageId', testPages.testPageByID);
};
