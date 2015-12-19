require('../vendor/yepnope-2.0.0');
var yepnope = window.yepnope;
module.exports = function(src, callback) {
  yepnope.injectJs(src, callback);
};
