var oo = require('substance/util/oo');

function TangleManager(documentSession) {
  this.documentSession = documentSession;
}

TangleManager.Prototype = function() {
  this.sources = {};
  this.components = {};
  this.sourcesByName = {};

  this.register = function(nodeId, props) {
    this.components[nodeId] = props.component;
    this.sources[nodeId] = {
      source: props.node.source,
      name: props.node.name
    };
    this.sourcesByName[props.node.name] = props.node.source;
    this.updateValue(props.node, props.node.source, true);
  }

  this.getNode = function(nodeId) {
    return this.documentSession.getDocument().get(nodeId);
  }

  this.setSource = function(nodeId, name, source, isVolatile) {
    var node = this.getNode(nodeId);
    console.log(source);

    this.sources[nodeId] = {
      source: source,
      name: name
    };
    this.sourcesByName[name] = source;

    this.updateValue(node, source, isVolatile);
  }

  this.evaluate = function(node, source) {
    if (node.type === 'constant') {
      return parseFloat(source);
    } else {
      return 'foo';
    }
  }

  this.updateValue = function(node, source, isVolatile) {
    var newValue = this.evaluate(node, source);
    node._volatileValue = newValue;

    if (!isVolatile) {
      this.documentSession.transaction(function(tx) {
        node._volatileValue = undefined;
        tx.set([node.id, 'source'], source);
        tx.set([node.id, 'value'], newValue);
      }.bind(this));
    }
    this.components[node.id].rerender();
  }
}

oo.initClass(TangleManager);

module.exports = TangleManager;
