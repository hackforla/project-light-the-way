'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Dire = mongoose.model('Dire'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Dire
 */
exports.create = function(req, res) {
  var dire = new Dire(req.body);
  dire.user = req.user;

  dire.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dire);
    }
  });
};

/**
 * Show the current Dire
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var dire = req.dire ? req.dire.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  dire.isCurrentUserOwner = req.user && dire.user && dire.user._id.toString() === req.user._id.toString();

  res.jsonp(dire);
};

/**
 * Update a Dire
 */
exports.update = function(req, res) {
  var dire = req.dire;

  dire = _.extend(dire, req.body);

  dire.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dire);
    }
  });
};

/**
 * Delete an Dire
 */
exports.delete = function(req, res) {
  var dire = req.dire;

  dire.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dire);
    }
  });
};

/**
 * List of Dire
 */
exports.list = function(req, res) {
  Dire.find().sort('-created').populate('user', 'displayName').exec(function(err, dire) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dire);
    }
  });
};

/**
 * Dire middleware
 */
exports.direByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Dire is invalid'
    });
  }

  Dire.findById(id).populate('user', 'displayName').exec(function (err, dire) {
    if (err) {
      return next(err);
    } else if (!dire) {
      return res.status(404).send({
        message: 'No Dire with that identifier has been found'
      });
    }
    req.dire = dire;
    next();
  });
};
