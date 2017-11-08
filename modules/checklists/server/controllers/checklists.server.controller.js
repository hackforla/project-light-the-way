'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Checklist = mongoose.model('Checklist'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Checklist
 */
exports.create = function(req, res) {
  var checklist = new Checklist(req.body);
  checklist.user = req.user;

  checklist.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(checklist);
    }
  });
};

/**
 * Show the current Checklist
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var checklist = req.checklist ? req.checklist.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  checklist.isCurrentUserOwner = req.user && checklist.user && checklist.user._id.toString() === req.user._id.toString();

  res.jsonp(checklist);
};

/**
 * Update a Checklist
 */
exports.update = function(req, res) {
  var checklist = req.checklist;

  checklist = _.extend(checklist, req.body);

  checklist.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(checklist);
    }
  });
};

/**
 * Delete an Checklist
 */
exports.delete = function(req, res) {
  var checklist = req.checklist;

  checklist.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(checklist);
    }
  });
};

/**
 * List of Checklists
 */
exports.list = function(req, res) {
  Checklist.find().sort('-created').populate('user', 'displayName').exec(function(err, checklists) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(checklists);
    }
  });
};

/**
 * Checklist middleware
 */
exports.checklistByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Checklist is invalid'
    });
  }

  Checklist.findById(id).populate('user', 'displayName').exec(function (err, checklist) {
    if (err) {
      return next(err);
    } else if (!checklist) {
      return res.status(404).send({
        message: 'No Checklist with that identifier has been found'
      });
    }
    req.checklist = checklist;
    next();
  });
};
