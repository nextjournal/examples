var ProseEditor = require('substance/packages/prose-editor/ProseEditor');
var extend = require('lodash/extend');
var TangleManager = require('./TangleManager');

function TangleEditor() {
  TangleEditor.super.apply(this, arguments);
}

TangleEditor.Prototype = function() {

  var _super = TangleEditor.super.prototype;

  this._initialize = function() {
    _super._initialize.apply(this, arguments);
    this.tangleManager = new TangleManager(this.documentSession);
  }

  this.getChildContext = function() {
    var context = _super.getChildContext.call(this);

    return extend(context, {
      tangleManager: this.tangleManager
    });
  };
}

ProseEditor.extend(TangleEditor);

module.exports = TangleEditor;