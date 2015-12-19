require('../vendor/LABjs-2.0.3/LAB');
var $LAB = window.$LAB;
// As a completely generic script loader, LABjs is broken by default: if
// you load the same script URL twice, it won't be executed the second
// time. That means if multiple packages load jQuery from the same URL
// using the same instance of LABjs, and they are well-behaved and call
// `jQuery.noConflict(true)` to isolate their jQuery dependency and
// plugins, the second package won't get any jQuery instance at all
// because its jQuery dependency will never load.
// Setting `AllowDuplicates: true` fixes this.
$LAB.setGlobalDefaults({
  AllowDuplicates: true
});
module.exports = function(src, callback) {
  $LAB.script(src).wait(callback);
};
