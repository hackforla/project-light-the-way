'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Search = mongoose.model('Search'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Search
 */
exports.create = function(req, res) {
  var search = new Search(req.body);
  search.user = req.user;

  search.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(search);
    }
  });
};

/**
 * Show the current Search
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var search = req.search ? req.search.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  search.isCurrentUserOwner = req.user && search.user && search.user._id.toString() === req.user._id.toString();

  res.jsonp(search);
};

/**
 * Update a Search
 */
exports.update = function(req, res) {
  var search = req.search;

  search = _.extend(search, req.body);

  search.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(search);
    }
  });
};

/**
 * Delete an Search
 */
exports.delete = function(req, res) {
  var search = req.search;

  search.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(search);
    }
  });
};

/**
 * List of Searches
 */
exports.list = function(req, res) {
  Search.find().sort('-created').populate('user', 'displayName').exec(function(err, searches) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(searches);
    }
  });
};

/**
 * Search middleware
 */
exports.searchByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Search is invalid'
    });
  }

  Search.findById(id).populate('user', 'displayName').exec(function (err, search) {
    if (err) {
      return next(err);
    } else if (!search) {
      return res.status(404).send({
        message: 'No Search with that identifier has been found'
      });
    }
    req.search = search;
    next();
  });
};
