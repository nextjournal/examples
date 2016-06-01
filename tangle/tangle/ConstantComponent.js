'use strict';

var Component = require('substance/ui/Component');
var DefaultDOMElement = require('substance/ui/DefaultDOMElement');

function ConstantComponent() {
  ConstantComponent.super.apply(this, arguments);
}

ConstantComponent.Prototype = function() {

  this.didMount = function() {
    this.props.node.on('value:changed', this.rerender, this);
    this.context.tangleManager.register(this.props.node.id, {
      node: this.props.node,
      component: this
    });
  }

  this.dispose = function() {
    this.props.node.off(this);
  }

  this.render = function($$) {
    var el = $$('span')
      .addClass('sc-tangle-constant')
      .html(this.props.node.name + ' = ' + this.props.node.getDisplayValue())
      .on('mousedown', this.handleMouseDown)
      .on('mouseup', this.handleMouseUp);

    return el;
  }

  this.handleMouseDown = function(event) {
    event.stopPropagation();
    DefaultDOMElement.wrapNativeElement(window.document)
      .on('mouseup', this.handleMouseUp, this, {
        once: true
      });
    DefaultDOMElement.wrapNativeElement(window.document)
      .on('mousemove', this.handleMouseMove, this);
    this._startX = event.clientX;
  }

  this.handleMouseMove = function(event) {
    var node = this.props.node;
    var deltaX = event.clientX - this._startX;
    var newSource = node.source + deltaX;
    var factor = 1; // TODO: Use better scale factor.
    
    newSource = factor * newSource;
    newSource = Math.max(node.range[0], newSource);
    newSource = Math.min(node.range[1], newSource);

    this.context.tangleManager.setSource(node.id, node.name, newSource, 'volatile');
  }

  this.handleMouseUp = function(event) {
    event.stopPropagation();
    var node = this.props.node;
    DefaultDOMElement.wrapNativeElement(window.document).off('mousemove', this.handleMouseMove);
    this.context.tangleManager.setSource(node.id, node.name, node.source);
    this._preliminaryValue = undefined;
    this._startX = undefined;
  }

};

Component.extend(ConstantComponent);

module.exports = ConstantComponent;
