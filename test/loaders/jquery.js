var jQuery = require('../vendor/jquery-1.11.3');
if (typeof window.jQuery !== "undefined") {
  // Make sure we loaded jQuery with noGlobal behavior.
  throw new Error("jQuery present on window");
}
jQuery.ajaxSetup({
  // Prevent jQuery from adding a timestamp to the URL, otherwise (1) we'll
  // never test any caching behavior and (2) the queue test won't work.
  cache: true
});
module.exports = function(src, callback) {
  return jQuery.getScript(src, callback);
};
