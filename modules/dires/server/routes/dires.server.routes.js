'use strict';

/**
 * Module dependencies
 */
var diresPolicy = require('../policies/dires.server.policy'),
  dires = require('../controllers/dires.server.controller');

module.exports = function(app) {
  // Dires Routes
  app.route('/api/dires').all(diresPolicy.isAllowed)
    .get(dires.list)
    .post(dires.create);

  app.route('/api/dires/:direId').all(diresPolicy.isAllowed)
    .get(dires.read)
    .put(dires.update)
    .delete(dires.delete);

  // Finish by binding the Dire middleware
  app.param('direId', dires.direByID);
};
