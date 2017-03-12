'use strict';

var mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  _ = require('lodash');

module.exports = function (app) {

  // Setting up the users profile api
  app.route('/api/messages').get(function(req, res) {
  	Message.find({}, function(err, docs) {
  		if(!err && docs) {
  			res.send(docs);
  		} else {
  			res.status(404).send('error');
  		}
  	});
  });
  app.route('/api/messages').post(function(req, res) {
  	var item = JSON.parse(req.query.message),
  	  someId = new mongoose.Types.ObjectId,
  	  msg = new Message(_.extend(item, { _someId: someId }));

    msg.save(function(err) {
    	if(err) console.log('error', err);
    	else console.log('ok');
    });
    console.log('send params', JSON.parse(req.query.message));
  });
};
