(function () {
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular
    .module('chat.services')
    .factory('MessagesService', MessagesService);

  MessagesService.$inject = ['$resource'];

  function MessagesService($resource) {
    return $resource('/api/messages/:message', {}, {
      getMessages: {
        method: 'GET',
        url: '/api/messages',
        isArray: true
      },

      sendMessage: {
        method: 'POST',
        url: '/api/messages',
        params: {
          message: '@message'
        }
      }
    });
  }

}());
