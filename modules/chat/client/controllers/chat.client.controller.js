(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$state', '$q', 'Authentication', 'Socket', 'MessagesService'];

  function ChatController($scope, $state, $q, Authentication, Socket, MessagesService) {
    var vm = this,
      currentUsername = Authentication.user.username;

    vm.messages = [];
    vm.messageText = '';
    vm.sendMessage = sendMessage;

    init();

    MessagesService.getMessages().$promise.then(function(data) {
      data.forEach(function(item) {
        var msg = {};
        msg.text = item.text;
        msg.username = item.owner.username;
        msg.profileImageURL = item.owner.profileImageURL;
        msg.type = item.type;
        msg.created = item.created;
        msg._someId = item._someId;
        vm.messages.unshift(msg);
      });
    }).catch(function(err) {
      console.log('error');
    });

    function init() {
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      // Add an event listener to the 'chatMessage' event
      Socket.on('chatMessage', function (message) {
        vm.messages.unshift(message);
        message.type !== 'status' && message.username === currentUsername && MessagesService.sendMessage({ 
          message: message
        }).$promise.then(function(data) {}).catch(function(err) {
          console.log('err');
        });
      });

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        Socket.removeListener('chatMessage');
      });
    }

    // Create a controller method for sending messages
    function sendMessage() {
      // Create a new message object
      var message = {
        text: vm.messageText
      };

      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      // Clear the message text
      vm.messageText = '';
    }
  }
}());
