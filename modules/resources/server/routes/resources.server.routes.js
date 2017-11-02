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

  app.route('/api/r/:id')
    .get(resources.byID);

  // new
  app.route('/api/resources/new')
    .get(resources.new);
  // feat
  app.route('/api/resources/feat')
    .get(resources.feat);
  // search
  app.route('/api/r/search/:query')
    .get(resources.search);
  app.route('/api/r/search/:query/:page')
    .get(resources.search);


  // Finish by binding the Resource middleware
  app.param('resourceId', resources.resourceByID);
};
