var yepnope = require('../vendor/yepnope-2.0.0');
if (!yepnope) {
  throw new Error("yepnope not exported");
}
if (typeof yepnope.injectJs !== "function") {
  throw new Error("yepnope.injectJs not found");
}
module.exports = function(src, callback) {
  yepnope.injectJs(src, callback);
};
