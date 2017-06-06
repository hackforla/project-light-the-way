'use strict';

/**
 * Module dependencies
 */
var veteransPolicy = require('../policies/veterans.server.policy'),
  veterans = require('../controllers/veterans.server.controller');

module.exports = function(app) {
  // Veterans Routes
  app.route('/api/veterans').all(veteransPolicy.isAllowed)
    .get(veterans.list)
    .post(veterans.create);

  app.route('/api/veterans/:veteranId').all(veteransPolicy.isAllowed)
    .get(veterans.read)
    .put(veterans.update)
    .delete(veterans.delete);

  // Finish by binding the Veteran middleware
  app.param('veteranId', veterans.veteranByID);
};
