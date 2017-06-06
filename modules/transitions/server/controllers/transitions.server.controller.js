'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Transition = mongoose.model('Transition'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Transition
 */
exports.create = function(req, res) {
  var transition = new Transition(req.body);
  transition.user = req.user;

  transition.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transition);
    }
  });
};

/**
 * Show the current Transition
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var transition = req.transition ? req.transition.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  transition.isCurrentUserOwner = req.user && transition.user && transition.user._id.toString() === req.user._id.toString();

  res.jsonp(transition);
};

/**
 * Update a Transition
 */
exports.update = function(req, res) {
  var transition = req.transition;

  transition = _.extend(transition, req.body);

  transition.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transition);
    }
  });
};

/**
 * Delete an Transition
 */
exports.delete = function(req, res) {
  var transition = req.transition;

  transition.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transition);
    }
  });
};

/**
 * List of Transitions
 */
exports.list = function(req, res) {
  Transition.find().sort('-created').populate('user', 'displayName').exec(function(err, transitions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(transitions);
    }
  });
};

/**
 * Transition middleware
 */
exports.transitionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Transition is invalid'
    });
  }

  Transition.findById(id).populate('user', 'displayName').exec(function (err, transition) {
    if (err) {
      return next(err);
    } else if (!transition) {
      return res.status(404).send({
        message: 'No Transition with that identifier has been found'
      });
    }
    req.transition = transition;
    next();
  });
};
