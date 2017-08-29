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
  query: {
    type: String,
    default: '',
    required: 'Add something to search',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

mongoose.model('Search', SearchSchema);
