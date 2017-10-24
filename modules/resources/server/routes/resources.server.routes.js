'use strict';

/**
 * Module dependencies
 */
var resourcesPolicy = require('../policies/resources.server.policy'),
  resources = require('../controllers/resources.server.controller');

module.exports = function(app) {
  // Resources Routes
  app.route('/api/r')
    .get(resources.list)
    .post(resources.create);

  // new
  app.route('/api/r/new')
    .get(resources.new);
  // feat
  app.route('/api/r/feat')
    .get(resources.feat);
  // search
  app.route('/api/r/search/:query')
    .get(resources.search);
  app.route('/api/r/search/:query/:page')
    .get(resources.search);
  // category
  app.route('/api/r/category')
    .get(resources.category);


  // Finish by binding the Resource middleware
  app.param('resourceId', resources.resourceByID);
};
