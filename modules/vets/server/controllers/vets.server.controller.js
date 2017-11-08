'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Vet = mongoose.model('Vet'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Vet
 */
exports.create = function(req, res) {
  var vet = new Vet(req.body);
  vet.user = req.user;

  vet.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vet);
    }
  });
};

/**
 * Show the current Vet
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var vet = req.vet ? req.vet.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  vet.isCurrentUserOwner = req.user && vet.user && vet.user._id.toString() === req.user._id.toString();

  res.jsonp(vet);
};

/**
 * Update a Vet
 */
exports.update = function(req, res) {
  var vet = req.vet;

  vet = _.extend(vet, req.body);

  vet.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vet);
    }
  });
};

/**
 * Delete an Vet
 */
exports.delete = function(req, res) {
  var vet = req.vet;

  vet.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vet);
    }
  });
};

/**
 * List of Vets
 */
exports.list = function(req, res) {
  Vet.find().sort('-created').populate('user', 'displayName').exec(function(err, vets) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vets);
    }
  });
};

/**
 * Vet middleware
 */
exports.vetByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Vet is invalid'
    });
  }

  Vet.findById(id).populate('user', 'displayName').exec(function (err, vet) {
    if (err) {
      return next(err);
    } else if (!vet) {
      return res.status(404).send({
        message: 'No Vet with that identifier has been found'
      });
    }
    req.vet = vet;
    next();
  });
};
