'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Test page Schema
 */
var TestPageSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Test page name',
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

mongoose.model('TestPage', TestPageSchema);
