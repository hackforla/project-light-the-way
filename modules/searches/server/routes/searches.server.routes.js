'use strict';

/**
 * Module dependencies
 */
var searchesPolicy = require('../policies/searches.server.policy'),
  searches = require('../controllers/searches.server.controller');

module.exports = function(app) {
  // Searches Routes
  app.route('/api/searches').all(searchesPolicy.isAllowed)
    .get(searches.list)
    .post(searches.create);

  app.route('/api/searches/:searchId').all(searchesPolicy.isAllowed)
    .get(searches.read)
    .put(searches.update)
    .delete(searches.delete);

  // Finish by binding the Search middleware
  app.param('searchId', searches.searchByID);
};
