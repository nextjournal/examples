'use strict';

var createDocumentFactory = require('substance/model/createDocumentFactory');
var ProseArticle = require('substance/packages/prose-editor/ProseArticle');

module.exports = createDocumentFactory(ProseArticle, function(tx) {
  var body = tx.get('body');
  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: 'Welcome to commander test app!'
  });
  body.show('p1');

  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: 'Let\'s test commander capabilities.'
  });
  body.show('p2');

  tx.create({
    id: 'p3',
    type: 'paragraph',
    content: 'To test single key shortcut just type "/" symbol.'
  });
  body.show('p3');

  tx.create({
    id: 'p4',
    type: 'paragraph',
    content: 'To test combo shortcut press "alt", "shift" and "c" together please.'
  });
  body.show('p4');

  tx.create({
    id: 'p5',
    type: 'paragraph',
    content: 'To test sequence type "hello".'
  });
  body.show('p5');

  tx.create({
    id: 'p6',
    type: 'paragraph',
    content: 'Sequences could also contains combos, type "test" and "meta+alt+t" afterwards.'
  });
  body.show('p6');
});
