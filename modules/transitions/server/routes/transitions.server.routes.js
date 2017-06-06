'use strict';

/**
 * Module dependencies
 */
var transitionsPolicy = require('../policies/transitions.server.policy'),
  transitions = require('../controllers/transitions.server.controller');

module.exports = function(app) {
  // Transitions Routes
  app.route('/api/transitions').all(transitionsPolicy.isAllowed)
    .get(transitions.list)
    .post(transitions.create);

  app.route('/api/transitions/:transitionId').all(transitionsPolicy.isAllowed)
    .get(transitions.read)
    .put(transitions.update)
    .delete(transitions.delete);

  // Finish by binding the Transition middleware
  app.param('transitionId', transitions.transitionByID);
};
