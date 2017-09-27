'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  sanitize = require('mongo-sanitize'),
  Search = mongoose.model('Search'),
  Resources = mongoose.model('Resource'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Search
 */
exports.create = function(req, res) {
  var timeNow = new Date(Date.now());
  var search = new Search(req.body);
  var query = sanitize(search.query);
  search.user = req.user;



  search.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {

      var data = {};
      var sendResponse = function(err, searches){
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          var timeEnd = new Date(Date.now());
          var tTotal = (timeEnd - timeNow)/1000;
          res.jsonp({
            results: searches,
            query: query,
            tTotalMS: tTotal + ' seconds'
          });
        }
      };
      var queryDB = Resources
        .find(
          { $text: { $search: query } },
          { score: { $meta: 'textScore' } }
        )
        // .explain(
        //   'executionStats'
        // )
        .sort(
          { score: { $meta:'textScore' } }
        )
        .select(
          'org desc web _id'
        )
        .exec(sendResponse);



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

  Search.findById(id).populate('user', 'displayName').exec(function(err, search) {
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
