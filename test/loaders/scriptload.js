// Don't vendor scriptload because it's intended to be used from npm and
// doesn't provide a dist file.
var scriptload = require('scriptload');
module.exports = function(src, callback) {
  scriptload([src], callback);
};
