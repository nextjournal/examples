'use strict';

var insertInlineNode = require('substance/model/transform/insertInlineNode')

var TangleMacro = {

  appliesTo: ['paragraph'],

  execute: function(props, context) {
    if (this.appliesTo.indexOf(props.node.type) === -1) {
      return false;
    }
    // this strategz only deals with the first occurrence
    var match = /\[([^\[]*)\]/.exec(props.text);
    if (match) {
      var surface = context.surfaceManager.getSurface(props.selection.surfaceId);
      var startOffset = match.index;
      var endOffset = startOffset + match[0].length;
      var fragments = match[1].split('=');
      // 
      if (fragments.length !== 2) {
        return false;
      }
      var number = parseFloat(fragments[1]);
      var node;
      if (!Number.isNaN(number)) {
        node = {
          type: 'constant',
          name: fragments[0].trim(),
          source: fragments[1].trim(),
          value: number
        }
      } else {
        node = {
          type: 'expression',
          name: fragments[0].trim(),
          source: fragments[1].trim()
        }
      }

      surface.transaction(function(tx) {
        var replaceSel = tx.createSelection(props.node.getTextPath(), startOffset, endOffset);
        return insertInlineNode(tx, {
          node: node,
          selection: replaceSel
        });
      });
      return true;
    }
  }

};

module.exports = TangleMacro;
