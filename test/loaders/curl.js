/**
 * curl is an AMD loader like RequireJS. But it has ways to load any script,
 * and we can theoretically use this to find out if its callback behavior is
 * correct. The "legacy" loader is the recommended approach, but it doesn't
 * work. It throws a "duplicate define" error even if `window.define` is unset;
 * most likely it takes advantage of the CORS policy, downloads the content
 * of the script, and executes it in a wrapper where `define` is available even
 * even if globally unset. So just use the "js" loader even though it's not
 * recommended.
 */
require('../vendor/curl-with-js-domReady-legacy');
var curl = window.curl;
curl.config({
  // Never attempt to add .js to the end of filenames.
  dontAddFileExt: '',
  plugins: {
    js: {
      // Disable prefetch, which allows the loader to cheat depending on the
      // CORS policy.
      prefetch: false
    }
  }
});
module.exports = function(src, callback) {
  // Unset `define`, otherwise jQuery will use it and we'll get a
  // "duplicate define" error from curl, because there's no way to clear the
  // module cache. Using curl's `defineName` option doesn't work for this.
  window.define = void 0;
  curl(['js!' + src], callback);
};
