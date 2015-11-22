// Choose a loader based on the environment variable TEST_LOADER.
// Possible values are:
//  - script-atomic-onload
//  - jquery (uses `jQuery.getScript(src, callback)`)
//  - labjs (uses `$LAB.script(src).wait(callback)`)
module.exports = require("./loaders/" + process.env.TEST_LOADER);
