'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Veteran Schema
 */
var VeteranSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Veteran name',
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

mongoose.model('Veteran', VeteranSchema);
