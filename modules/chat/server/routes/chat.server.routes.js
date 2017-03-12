'use strict';

var mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  User = mongoose.model('User'),
  _ = require('lodash');

module.exports = function (app) {

  // Setting up the users profile api
  app.route('/api/messages').get(function(req, res) {
    var resultDocs = [];

    Message.find({}, function(err, docs) {
      if (!err && docs) {
        docs.forEach(function(item, i) {
          User.findById(item.owner, function(err, found) {
            if (!err && found) {
              item.profileImageURL = found.profileImageURL;
              item.username = found.username;
              resultDocs.unshift(item);
              if (i === docs.length - 1) {
                res.send(resultDocs);
              }
            }
          });
        });
      } else {
        res.send('error');
      }
    });
  });
  app.route('/api/messages').post(function(req, res) {
    var item = JSON.parse(req.query.message),
      someId = new mongoose.Types.ObjectId,
      msg = new Message(_.extend(item, { _someId: someId, owner: req.user._id }));
      
    console.log('send params', req.user._id);

    msg.save(function(err) {
      if (err) console.log('error', err);
      else console.log('ok');
    });
  });
};
