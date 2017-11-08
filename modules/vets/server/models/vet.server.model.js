'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Vet Schema
 */
var VetSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Vet name',
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

mongoose.model('Vet', VetSchema);
