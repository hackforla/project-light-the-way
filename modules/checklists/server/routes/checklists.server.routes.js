'use strict';

/**
 * Module dependencies
 */
var checklistsPolicy = require('../policies/checklists.server.policy'),
  checklists = require('../controllers/checklists.server.controller');

module.exports = function(app) {
  // Checklists Routes
  app.route('/api/checklists').all(checklistsPolicy.isAllowed)
    .get(checklists.list)
    .post(checklists.create);

  app.route('/api/checklists/mail').all(checklistsPolicy.isAllowed)
    .get(checklists.online)
    .post(checklists.sendChecklist);

  app.route('/api/checklist/:checklistId').all(checklistsPolicy.isAllowed)
    .get(checklists.read)
    .put(checklists.update)
    .delete(checklists.delete);

  // Finish by binding the Checklist middleware
  app.param('checklistId', checklists.checklistByID);
};
