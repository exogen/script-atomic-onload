// Choose a loader based on the environment variable TEST_LOADER.
// Possible values are:
//  - script-atomic-onload
//  - getscript
//  - headjs (uses `head.load(src, callback)`)
//  - jquery (uses `jQuery.getScript(src, callback)`)
//  - kist-loader (uses `loader.loadScript([src], callback)`)
//  - labjs (uses `$LAB.script(src).wait(callback)`)
//  - load-script
//  - loads-js
//  - requirejs (uses `require([src], callback)`)
//  - script-load
//  - scriptload (uses `scriptload([src], callback)`)

// Don't require `./loader-env` here; it needs to be a simple expression that
// webpack can evaluate.
module.exports = require("./loaders/" + process.env.TEST_LOADER);
