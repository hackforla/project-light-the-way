'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Resource = mongoose.model('Resource'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Resource
 */
exports.create = function(req, res) {
  var resource = new Resource(req.body);
  resource.user = req.user;

  resource.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(resource);
    }
  });
};

/**
 * Show the current Resource
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var resource = req.resource ? req.resource.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  resource.isCurrentUserOwner = req.user && resource.user && resource.user._id.toString() === req.user._id.toString();

  res.jsonp(resource);
};

/**
 * Update a Resource
 */
exports.update = function(req, res) {
  var resource = req.resource;

  resource = _.extend(resource, req.body);

  resource.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(resource);
    }
  });
};

/**
 * Delete an Resource
 */
exports.delete = function(req, res) {
  var resource = req.resource;

  resource.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(resource);
    }
  });
};

/**
 * List of Resources
 */
exports.list = function(req, res) {
  Resource.find().sort('-created').populate('user', 'displayName').exec(function(err, resources) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(resources);
    }
  });
};

/**
 * Resource middleware
 */
exports.resourceByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Resource is invalid'
    });
  }

  Resource.findById(id).populate('user', 'displayName').exec(function (err, resource) {
    if (err) {
      return next(err);
    } else if (!resource) {
      return res.status(404).send({
        message: 'No Resource with that identifier has been found'
      });
    }
    req.resource = resource;
    next();
  });
};
