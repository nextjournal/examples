'use strict';

var Component = require('substance/ui/Component');

function ExpressionComponent() {
  ExpressionComponent.super.apply(this, arguments);
}

ExpressionComponent.Prototype = function() {

  this.render = function($$) {
    var el = $$('span')
      .addClass('sc-tangle-expression')
      .html(this.props.node.getDisplayValue());

    return el;
  }

};

Component.extend(ExpressionComponent);

module.exports = ExpressionComponent;
