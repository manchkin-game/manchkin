'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  Schema = mongoose.Schema,
  crypto = require('crypto');

/**
 * Message Schema
 */
var MessageSchema = new Schema({
  _someId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['message', 'status'],
    default: 'message'
  },
  created: {
    type: Date
  }
});

mongoose.model('Message', MessageSchema);
