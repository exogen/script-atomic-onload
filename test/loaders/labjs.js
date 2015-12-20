var $LAB = require('../vendor/LABjs-2.0.3/LAB');
$LAB.setGlobalDefaults({
  // By default, LABjs doesn't allow the same script to be run twice. That
  // means it's broken as a completely generic script loader, unless you
  // set `AllowDuplicates`.
  AllowDuplicates: true
});
module.exports = function(src, callback) {
  // It's unclear whether multiple calls to `$LAB.script` share a queue or not.
  // We could use `$LAB.sandbox` to ensure a completely new queue, but it
  // doesn't appear to change the behavior in tests. Somehow, LABjs fails the
  // parallel load test in most browsers either way.
  $LAB.script(src).wait(callback);
};
