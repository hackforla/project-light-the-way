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
      res.jsonp({ _id:resource._id });
    }
  });
};

exports.byID = function(req, res){
  Resource.findById(req.params.id).exec(function(err, resource){
    res.jsonp({ data:resource });
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
// exports.update = function(req, res) {
// var oldresource = new Resource(req.body);
// Resource.findById(req.body._id, function(err, resource){
//   if (err) {
//     return res.status(400).send({
//       message: errorHandler.getErrorMessage(err)
//     });
//   }
//   resource.set(oldresource);
//   resource.save(function(err){
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.jsonp(resource);
//     }
//   });
// });



//   Resource.update(
//     { _id: req.body._id },
//     { $push: {
//       resource: req.body
//     }
//     }
//   ).exec(function(err, data){
//     console.log(err || data);
//     res.jsonp({ msg:'ok' });
//   });
// };

/**
 * Delete an Resource
 */
exports.delete = function(req, res) {
  var resource = req.params.name;
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
  Resource.find({ status:'public' }).select().sort('-created').exec(function(err, resources) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp({ data: resources });
    }
  });
};

exports.new = function(req, res) {
  Resource.find({ status:'public' }).select('-status -created').limit(10).sort('-created').exec(function(err, data) {
    res.jsonp({ data: data });
  });
};
exports.feat = function(req, res) {
  Resource.find({ status:'public' }).select('-status -created').limit(2).sort('-created').exec(function(err, data) {
    res.jsonp({ data: data });
  });
};


exports.categories = function(req, res){
  if(!req.body){
    Resource
      .find(
        { $text: { $search: 'female veteran' } },
        { score: { $meta: 'textScore' } }
      )
      .where('status').equals('public')
      .sort({ score: { $meta:'textScore' } })
      .exec(function(err, doc){
        if(err){ res.status(404).send({ message: 'List required' });}
        res.jsonp({ data:doc });
      });
  }else{
    var c = req.body.categories[0];
    Resource
      .find(
        { $text: { $search: c } },
        { score: { $meta: 'textScore' } }
      )
      .where('status').equals('public')
      .sort({ score: { $meta:'textScore' } })
      .exec(function(err, doc){
        if(err){ res.status(404).send({ message: 'List required' });}
        res.jsonp({ data:doc });
      });
  }
};

// TEMP: SEARCH PIVOT
// exports.categories = function(req, res){
//   var arr = [];
//   function Status(item){
//     return { catg:item, status:'public' };
//   }
//
//   if(req.body.categories){
//     req.body.categories.forEach(function(c){
//       arr.push(new Status(c));
//     });
//
//     Resource.find({ $or: arr }).exec(function(err, docs){
//       if(err){ res.status(404).send({ message: 'No resources found' });}
//       // console.log(docs);
//       console.log(req.body.categories[0] + ': ' + docs.length);
//     });
//
//   }else{
//     res.status(404).send({
//       message: 'List required'
//     });
//   }
//   res.jsonp({ msg:'ok' });
// };

exports.search = function(req, res) {
  var query = unwind(req.params.query);
  function unwind(s){
    return s.split('+').join(' ');
  }

  if(query.toLowerCase() === 'recent'){
    Resource.find({ status:'public' }).select('-status -created').limit(10).sort('-created').exec(function(err, data) {
      res.jsonp({ data: data });
    });
  }else{
    Resource
      .find(
        { $text: { $search: query } },
        { score: { $meta: 'textScore' } }
      )
      .limit(10)
      .sort(
        { score: { $meta:'textScore' } }
      )
      .select(
        'org desc web _id'
      )
      .exec(function(err,data){
        if(!data.length){
          res.status(404).send({
            msg: 'No results found'
          });
        }else{
          res.jsonp({ data:data });
        }
      });
  }

};
exports.category = function(req, res) {
  // Resource.find().sort('-created').populate('user', 'displayName').exec(function(err, resources) {});
  res.jsonp('All good');
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

  Resource.findById(id).exec(function (err, resource) {
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
