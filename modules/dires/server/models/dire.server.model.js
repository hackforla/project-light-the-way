'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Dire Schema
 */
var DireSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Dire name',
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

mongoose.model('Dire', DireSchema);
