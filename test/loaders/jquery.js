module.exports = require('../vendor/jquery-1.11.3').getScript;
if (typeof jQuery !== "undefined") {
  // Make sure we loaded jQuery with noGlobal behavior.
  throw new Error("jQuery present on window");
}
