var loader = require('kist-loader');
module.exports = function(src, callback) {
  loader.loadAsync([src], callback);
};
