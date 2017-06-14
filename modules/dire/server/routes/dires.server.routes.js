'use strict';

/**
 * Module dependencies
 */
var direPolicy = require('../policies/dire.server.policy'),
  dire = require('../controllers/dire.server.controller');

module.exports = function(app) {
  // Dire Routes
  app.route('/api/dire').all(direPolicy.isAllowed)
    .get(dire.list)
    .post(dire.create);

  app.route('/api/dire/:direId').all(direPolicy.isAllowed)
    .get(dire.read)
    .put(dire.update)
    .delete(dire.delete);

  // Finish by binding the Dire middleware
  app.param('direId', dire.direByID);
};
