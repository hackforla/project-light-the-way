'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Veteran = mongoose.model('Veteran'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Veteran
 */
exports.create = function(req, res) {
  var veteran = new Veteran(req.body);
  veteran.user = req.user;

  veteran.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(veteran);
    }
  });
};

/**
 * Show the current Veteran
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var veteran = req.veteran ? req.veteran.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  veteran.isCurrentUserOwner = req.user && veteran.user && veteran.user._id.toString() === req.user._id.toString();

  res.jsonp(veteran);
};

/**
 * Update a Veteran
 */
exports.update = function(req, res) {
  var veteran = req.veteran;

  veteran = _.extend(veteran, req.body);

  veteran.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(veteran);
    }
  });
};

/**
 * Delete an Veteran
 */
exports.delete = function(req, res) {
  var veteran = req.veteran;

  veteran.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(veteran);
    }
  });
};

/**
 * List of Veterans
 */
exports.list = function(req, res) {
  Veteran.find().sort('-created').populate('user', 'displayName').exec(function(err, veterans) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(veterans);
    }
  });
};

/**
 * Veteran middleware
 */
exports.veteranByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Veteran is invalid'
    });
  }

  Veteran.findById(id).populate('user', 'displayName').exec(function (err, veteran) {
    if (err) {
      return next(err);
    } else if (!veteran) {
      return res.status(404).send({
        message: 'No Veteran with that identifier has been found'
      });
    }
    req.veteran = veteran;
    next();
  });
};
