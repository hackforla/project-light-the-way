'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Category = mongoose.model('Category'),
  Resource = mongoose.model('Resource'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Category
 */
exports.create = function(req, res) {
  var category = new Category(req.body);
  category.user = req.user;

  category.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(category);
    }
  });
};

/**
 * Show the current Category
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var category = req.category ? req.category.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  category.isCurrentUserOwner = req.user && category.user && category.user._id.toString() === req.user._id.toString();

  res.jsonp(category);
};

/**
 * Update a Category
 */
exports.update = function(req, res) {
  var category = req.category;

  category = _.extend(category, req.body);

  category.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(category);
    }
  });
};

/**
 * Delete an Category
 */
exports.delete = function(req, res) {

  console.log(req);

  function urldecode(s){
    return s.split('+').join(' ');
  }

  Category.findOneAndRemove({name: urldecode(req.params.name)})
  .exec(function(err, success){
    if(err){
      return res.status(400).send({
        msg: error.getErrorMessage(err)
      });
    }else{
      res.jsonp({
        removed: true
      })
    }

  })
  ;
  // var category = new Category({name: urldecode(req.params.name)});

  // category.remove(function(err) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.jsonp(category);
  //   }
  // });
};

/**
 * List of Categories
 */
exports.list = function(req, res) {
  Category.find().sort('name').select('name -_id').exec(function(err, categories) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var result = categories.map(function(d) {
        return d.name;
      });
      res.jsonp({ data: result });
    }
  });
};

exports.getByName = function(req, res) {
  var name = req.params.name;
  Resource.find({
    category: name
  })
    .select('org desc web')
    .exec(function(err, data) {
      if(!data.length){
        res.status(404).send({
          message: 'No results found'
        });
      }else{
        res.jsonp({
          data: data
        });
      }
    });
};

/**
 * Category middleware
 */
exports.categoryByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Category is invalid'
    });
  }

  Category.findById(id).exec(function(err, category) {
    if (err) {
      return next(err);
    } else if (!category) {
      return res.status(404).send({
        message: 'No Category with that identifier has been found'
      });
    }
    req.category = category;
    next();
  });
};
