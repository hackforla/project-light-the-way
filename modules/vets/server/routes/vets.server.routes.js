'use strict';

/**
 * Module dependencies
 */
var vetsPolicy = require('../policies/vets.server.policy'),
  vets = require('../controllers/vets.server.controller');

module.exports = function(app) {
  // Vets Routes
  app.route('/api/vets').all(vetsPolicy.isAllowed)
    .get(vets.list)
    .post(vets.create);

  app.route('/api/vets/:vetId').all(vetsPolicy.isAllowed)
    .get(vets.read)
    .put(vets.update)
    .delete(vets.delete);

  // Finish by binding the Vet middleware
  app.param('vetId', vets.vetByID);
};
