'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Checklist Schema
 */
var ChecklistSchema = new Schema({
  items: {
    type: [{
      type:Schema.ObjectId,
      ref:'Resource'
    }],
    default: [],
    required: 'Please add resources to checklist',
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

mongoose.model('Checklist', ChecklistSchema);
