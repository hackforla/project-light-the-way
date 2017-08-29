'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
/**
 * Resource Schema
 */
var ResourceSchema = new Schema({
  org: {
    type: String,
    default: '',
    required: 'Please fill organization name',
    trim: true
  },
  desc: {
    type: String,
    default: '',
    required: 'Please fill description',
    trim: true
  },
  web: {
    type: String,
    default: '',
    required: 'Please fill website',
    trim: true
  },
  addr: {
    type: String,
    default: '',
    required: 'Please fill street',
    trim: true
  },
  city: {
    type: String,
    default: '',
    required: 'Please fill city',
    trim: true
  },
  state: {
    type: String,
    default: '',
    required: 'Please fill state',
    trim: true
  },
  zip: {
    type: String,
    default: '',
    required: 'Please fill zip',
    trim: true
  },
  poc_name: {
    type: String,
    default: '',
    required: 'Please fill point of contact name',
    trim: true
  },
  poc_email: {
    type: String,
    default: '',
    required: 'Please fill point of contact email',
    trim: true
  },
  poc_line: {
    type: String,
    default: '',
    required: 'Please fill point of contact line',
    trim: true
  },
  tags: {
    type: String,
    default: '',
    required: 'Please fill at least one tag',
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
ResourceSchema.index({
  '$**': 'text'
});
mongoose.model('Resource', ResourceSchema);
