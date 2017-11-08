'use strict';

/**
 * Module dependencies
 */
var categoriesPolicy = require('../policies/categories.server.policy'),
  categories = require('../controllers/categories.server.controller');

module.exports = function(app) {
  // Categories Routes
  app.route('/api/c').all(categoriesPolicy.isAllowed)
    .get(categories.list)
    .post(categories.create);

  app.route('/api/c/:name').all(categoriesPolicy.isAllowed)
    .get(categories.getByName)
    .put(categories.update)
    .delete(categories.delete);

  // Finish by binding the Category middleware
  app.param('categoryId', categories.categoryByID);
};
