'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  sanitize = require('mongo-sanitize'),
  Checklist = mongoose.model('Checklist'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  mailgun = require('mailgun-js')({ domain: process.env.MAIL_DOMAIN, apiKey: process.env.MAIL_KEY });



/**
 * Create a Checklist
 */
exports.create = function(req, res) {
  var checklist = new Checklist(req.body);
  checklist.user = req.user;

  checklist.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(checklist);
    }
  });
};

exports.online = function(req, res){
  // service to alert if email service is down
  res.jsonp({ status:'200' });
};

exports.sendChecklist = function(req, res){
  var body = sanitize(req.body);

  var list = body.checklist.split(',');
  var arr = [];

  list.forEach(function(item){
    if(mongoose.Types.ObjectId.isValid(item)){
      arr.push(mongoose.Types.ObjectId(item));
    }
  });
  if(list){createList(list);
  }else{
    return res.status(400).send({
      message: 'Checklist IDs Invalid.'
    });
  }
  function createList(list){
    var checklist = new Checklist({ items:list });
    checklist.save(function(err, list) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        return res.jsonp({
          _id:list._id
        });
      }
    });
  }


};

exports.send = function(req, res){
  var to = req.body.to;

  if(!to.email){
    return res.status(400).send({
      message: 'Email is required'
    });
  }else if (!to._id) {
    return res.status(400).send({
      message: 'Id is required'
    });
  }else{
    sendChecklist(to._id, to.email);
  }
  // from: 'Light The Way <me@samples.mailgun.org>', //sandbox only only 1 email sent to
  function sendChecklist(id, email){
    var data = {
      from: 'Light The Way <checklist@ltw.helloimjag.com>',
      to: email,
      subject: 'Your Resource Checklist',
      html: 'Hello,<br>' +
      'This is the link for your resource checklist:<br>' +
      '<a href="https://lighttheway.herokuapp.com/checklist/list-'+id+'">View Resource Checklist</a> <br><br><br>' +
      'If you can\'t view the link copy from here:<br>'+
      'https://lighttheway.herokuapp.com/checklist/list-'+id
    };
    mailgun.messages().send(data, function (err, body) {
      if(err){
        res.jsonp({ msg:'something went wrong' });
      }
      res.jsonp({ msg:'Checklist Sent' });
    });
  }

};

/**
 * Show the current Checklist
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var checklist = req.checklist ? req.checklist.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  checklist.isCurrentUserOwner = req.user && checklist.user && checklist.user._id.toString() === req.user._id.toString();

  res.jsonp(checklist);
};

/**
 * Update a Checklist
 */
exports.update = function(req, res) {
  var checklist = req.checklist;

  checklist = _.extend(checklist, req.body);

  checklist.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(checklist);
    }
  });
};

/**
 * Delete an Checklist
 */
exports.delete = function(req, res) {
  var checklist = req.checklist;

  checklist.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(checklist);
    }
  });
};

/**
 * List of Checklists
 */
exports.list = function(req, res) {
  Checklist.find().sort('-created').populate('user', 'displayName').exec(function(err, checklists) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(checklists);
    }
  });
};

/**
 * Checklist middleware
 */
exports.checklistByID = function(req, res, next, id) {
  id = req.params.checklistId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Checklist is invalid'
    });
  }

  Checklist.findById(id).populate('items').exec(function (err, checklist) {
    if (err) {
      return next(err);
    } else if (!checklist) {
      return res.status(404).send({
        message: 'No Checklist with that identifier has been found'
      });
    }
    req.checklist = checklist;
    next();
  });
};
