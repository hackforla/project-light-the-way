'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Search Schema
 */
var SearchSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Search name',
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

mongoose.model('Search', SearchSchema);
