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
  // TODO: сделать эти 2 поля через зависимость от USER
  username: {
    type: String
  },
  profileImageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  //
  type: {
    type: String,
    enum: ['message', 'status'],
    default: 'message'
  },
  created: {
    type: Date
  }
});


/**
 * Find possible not used username
 */
MessageSchema.statics.findUniqueUsername = function (username, suffix, callback) {
  var _this = this;
  var possibleUsername = username.toLowerCase() + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function (err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

mongoose.model('Message', MessageSchema);
