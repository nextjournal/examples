'use strict';

module.exports = function(tx) {
  var body = tx.get('body');

  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: "Simulation temperature was "
  });
  body.show('p1');
};
