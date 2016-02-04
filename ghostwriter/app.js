/* globals Worker */
'use strict';

var exampleDoc = require('./exampleDoc');
var Component = require('substance/ui/Component');
var SplitPane = require('substance/ui/SplitPane');
var $$ = Component.$$;

function GhostWriterApp() {
  GhostWriterApp.super.apply(this, arguments);

  window.onmessage = this.onMessage.bind(this);

  this.hub = new Worker('hub.js');
  window.app = this;
}

GhostWriterApp.Prototype = function() {

  this.render = function() {
    var el = $$('div').addClass('sc-two-editors');
    el.append(
      $$(SplitPane, {
          splitType: 'vertical',
          sizeA: '50%'
        }).append(
        $$('iframe').attr('src', 'user1.html').ref('user1'),
        $$('iframe').attr('src', 'user2.html').ref('user2')
      )
    );
    return el;
  };

  this.onMessage = function() {
    var receiver = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    switch(receiver) {
      case 'hub':
        this.hub.postMessage(args);
        break;
      case 'user1':
        this.refs.user1.el.contentWindow.postMessage(JSON.stringify(args), '*');
        break;
      case 'user2':
        this.refs.user2.el.contentWindow.postMessage(JSON.stringify(args), '*');
        break;
    }
  };

  this.sendMessage = this.onMessage;

};

Component.extend(GhostWriterApp);

window.onload = function() {
  var doc = exampleDoc;
  GhostWriterApp.static.mount({
    doc: doc
  }, 'body');
};
