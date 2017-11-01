'use strict';

/**
 * Module dependencies
 */
var adminsPolicy = require('../policies/admins.server.policy'),
  admins = require('../controllers/admins.server.controller');

module.exports = function(app) {
  // Admins Routes
  app.route('/api/admins').all(adminsPolicy.isAllowed)
    .get(admins.list)
    .post(admins.create);

  app.route('/api/admins/:adminId').all(adminsPolicy.isAllowed)
    .get(admins.read)
    .put(admins.update)
    .delete(admins.delete);

  // Finish by binding the Admin middleware
  app.param('adminId', admins.adminByID);
};
