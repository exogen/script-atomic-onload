// Choose a loader based on the environment variable TEST_LOADER.
// Don't require `./loader-env` here; it needs to be a simple expression that
// webpack can evaluate.
module.exports = require('./loaders/' + process.env.TEST_LOADER);
