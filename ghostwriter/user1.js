'use strict';

var exampleDoc = require('./exampleDoc');
var Editor = require('../simple/Editor');
var IFrameSocket = require('./IFrameSocket');

window.onload = function() {
  var doc = exampleDoc;
  var socket = new IFrameSocket();
  Editor.static.mount({
    doc: doc,
    socket: socket
  }, 'body');
};
