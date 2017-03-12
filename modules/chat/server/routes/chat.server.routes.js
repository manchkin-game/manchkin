'use strict';

var mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  _ = require('lodash');

module.exports = function (app) {

  // Setting up the users profile api
  app.route('/api/messages').get(function(req, res) {
    Message.find({}, function(err, docs) {
      if (!err && docs) {
        res.send(docs);
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
