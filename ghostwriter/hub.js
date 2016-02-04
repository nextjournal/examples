'use strict';

var oo = require('substance/util/oo');
var map = require('lodash/collection/map');

function Hub() {
}

Hub.Prototype = function() {

  this.onMessage = function() {
    console.log('Hub received message', arguments);
  };

};

oo.initClass(Hub);

var hub = new Hub();

onmessage = function(evt) {
  hub.onMessage.apply(hub, map(evt.data));
};

console.log('Started Hub');
