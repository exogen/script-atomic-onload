require('../vendor/lazyload');
var LazyLoad = window.LazyLoad;
module.exports = function(src, callback) {
  LazyLoad.js(src, callback);
};
