// Choose a loader based on the environment variable TEST_LOADER.
// Possible values are:
//  - script-atomic-onload
//  - headjs (uses `head.load(src, callback)`)
//  - jquery (uses `jQuery.getScript(src, callback)`)
//  - labjs (uses `$LAB.script(src).wait(callback)`)
//  - requirejs (uses `require([src], callback)`)
//  - scriptload (uses `scriptload([src], callback)`)

// Don't require `./loader-env` here; it needs to be a simple expression that
// webpack can evaluate.
module.exports = require("./loaders/" + process.env.TEST_LOADER);
