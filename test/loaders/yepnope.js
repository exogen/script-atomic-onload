var yepnope = require('../vendor/yepnope-2.0.0');
module.exports = function(src, callback) {
  yepnope.injectJs(src, callback);
};
