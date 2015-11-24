// RequireJS is by far the most difficult to get working as a generic script
// loader; it's not really designed for this use case. But we can trick it
// into behaving as expected for arbitrary scripts.
var requirejs = require('../vendor/require');
// Make sure our webpack loaders did the right thing.
if (typeof requirejs !== "function") {
  throw new Error("requirejs not exported");
}
var counter = 0;
module.exports = function(src, callback) {
  // RequireJS treats URLs similar to modules in that the same URL is cached
  // and its exports returned. That means if we actually want to load the same
  // URL again, we need to load with a new context.
  var id = (++counter).toString();
  var shim = {};
  shim[src] = { deps: [], exports: "window" };
  var _requirejs = requirejs.config({ context: id, shim: shim });
  _requirejs([src], callback);
};
