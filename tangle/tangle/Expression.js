'use strict';

var InlineNode = require('substance/model/InlineNode');

function Expression() {
  Expression.super.apply(this, arguments);
  this._volatileValue = undefined;
}

Expression.Prototype = function() {
  this.getDisplayValue = function() {
    if (this._volatileValue === undefined) {
      return this.value;
    } else {
      return this._volatileValue;
    }
  }
}

InlineNode.extend(Expression);

Expression.static.name = 'expression';

Expression.static.defineSchema({
  name: { type: 'string', optional: true },
  source: { type: 'string', default: '' },
  value: { type: 'string', optional: true }
});

module.exports = Expression;
