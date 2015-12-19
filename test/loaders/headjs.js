require('../vendor/head.load');
var head = window.head;
module.exports = function(src, callback) {
  head.load(src, callback);
};
