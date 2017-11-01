'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Admin Schema
 */
var AdminSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Admin name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Admin', AdminSchema);
