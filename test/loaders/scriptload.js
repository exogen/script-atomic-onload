// Don't vendor scriptload because it's intended to be used from npm.
// Also it depends on lodash, yikes.
var scriptload = require('scriptload');
module.exports = function(src, callback) {
  scriptload([src], callback);
};
