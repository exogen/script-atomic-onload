require('../vendor/l');
var ljs = window.ljs;
module.exports = function(src, callback) {
  ljs.load(src, callback);
};
