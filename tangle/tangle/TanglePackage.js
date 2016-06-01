'use strict';

var Constant = require('./Constant');
var ConstantComponent = require('./ConstantComponent');
var Expression = require('./Expression');
var ExpressionComponent = require('./ExpressionComponent');
var TangleMacro = require('./TangleMacro');
// var InsertConstantCommand = require('./InsertConstantCommand');
// var InsertConstantTool = require('./InsertConstantTool');

module.exports = {
  name: 'tangle',
  configure: function(config) {
    config.addNode(Constant);
    config.addNode(Expression);
    config.addComponent(Constant.static.name, ConstantComponent);
    config.addComponent(Expression.static.name, ExpressionComponent);
    config.addMacro(TangleMacro);
  }
};
