'use strict';

var oo = require('substance/util/oo');

function IFrameSocket() {
  window.addEventListener("message", this._onMessage.bind(this), false);
}

IFrameSocket.Prototype = function() {

  this.send = function() {
    window.top.postMessage.apply(window.top, arguments);
  };

  this._onMessage = function(evt) {
    var args = JSON.parse(evt.data);
    this.onMessage.apply(this, args);
  };

  this.onMessage = function() {
    console.log('You should override this method to receive messages.', arguments);
  };

};

oo.initClass(IFrameSocket);

module.exports = IFrameSocket;