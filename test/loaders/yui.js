require('../vendor/yui');
var YUI = window.YUI;
var sandbox = YUI(); // YUI instances are called sandboxes.
var Y;

function loadScript(src, callback) {
  var options = { async: true }; // Is false by default.
  var tx = Y.Get.js(src, options, callback);
  // This is the most important bit. Each call is a transaction, and
  // transactions are processed serially. That means you can't actually load
  // scripts in parallel if you use Get multiple times. Calling `execute` will
  // ensure that we fetch right away, in parallel with any other transactions.
  tx.execute();
}

module.exports = function(src, callback) {
  if (Y) {
    loadScript(src, callback);
  } else {
    sandbox.use('get', function(instance) {
      Y = instance; // Save Y instance so we don't have to do this every time.
      loadScript(src, callback);
    });
  }
};
