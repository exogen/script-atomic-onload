var scriptload = require('scriptload');
module.exports = function(src, callback) {
  scriptload([src], callback);
};
