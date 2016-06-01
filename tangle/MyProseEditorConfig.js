var ProseEditorPackage = require('substance/packages/prose-editor/ProseEditorPackage');
var TanglePackage = require('./tangle/TanglePackage');

module.exports = {
  name: 'my-prose-editor',
  configure: function(config) {
    config.import(ProseEditorPackage);
    config.import(TanglePackage);
  }
};
