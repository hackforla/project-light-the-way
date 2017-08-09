'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  TestPage = mongoose.model('TestPage'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Test page
 */
exports.create = function(req, res) {
  var testPage = new TestPage(req.body);
  testPage.user = req.user;

  testPage.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(testPage);
    }
  });
};

/**
 * Show the current Test page
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var testPage = req.testPage ? req.testPage.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  testPage.isCurrentUserOwner = req.user && testPage.user && testPage.user._id.toString() === req.user._id.toString();

  res.jsonp(testPage);
};

/**
 * Update a Test page
 */
exports.update = function(req, res) {
  var testPage = req.testPage;

  testPage = _.extend(testPage, req.body);

  testPage.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(testPage);
    }
  });
};

/**
 * Delete an Test page
 */
exports.delete = function(req, res) {
  var testPage = req.testPage;

  testPage.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(testPage);
    }
  });
};

/**
 * List of Test pages
 */
exports.list = function(req, res) {
  TestPage.find().sort('-created').populate('user', 'displayName').exec(function(err, testPages) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(testPages);
    }
  });
};

/**
 * Test page middleware
 */
exports.testPageByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Test page is invalid'
    });
  }

  TestPage.findById(id).populate('user', 'displayName').exec(function (err, testPage) {
    if (err) {
      return next(err);
    } else if (!testPage) {
      return res.status(404).send({
        message: 'No Test page with that identifier has been found'
      });
    }
    req.testPage = testPage;
    next();
  });
};
