'use strict';

var InlineNode = require('substance/model/InlineNode');

function Constant() {
  Constant.super.apply(this, arguments);
  this._volatileValue = undefined;
}

Constant.Prototype = function() {
  this.getDisplayValue = function() {
    if (this._volatileValue === undefined) {
      return this.value;
    } else {
      return this._volatileValue;
    }
  }
}

InlineNode.extend(Constant);

Constant.static.name = 'constant';

Constant.static.defineSchema({
  name: 'string',
  source: 'string',
  value: 'number',
  range: { type: ['number'], default: [-100, 100] }
});

module.exports = Constant;
