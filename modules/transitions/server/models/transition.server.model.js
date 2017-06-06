'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Transition Schema
 */
var TransitionSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Transition name',
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

mongoose.model('Transition', TransitionSchema);
