var TEST_LOADER = require('./test/loader-env');

module.exports = function(config) {
  require("./karma.conf")(config);
  config.set({
    customLaunchers: {
      SL_Chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '35'
      },
      SL_Firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '30'
      },
      SL_Safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        version: '9'
      },
      SL_IE8: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '8',
        platform: 'Windows XP'
      },
      SL_IE9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '9',
        platform: 'Windows 7'
      },
      SL_IE10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '10',
        platform: 'Windows 8'
      },
      SL_IE11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '11',
        platform: 'Windows 10'
      },
      SL_Edge: {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
        version: '20.10240',
        platform: 'Windows 10'
      }
    },
    browsers: [
      'SL_Chrome',
      'SL_Firefox',
      'SL_Safari',
      'SL_IE8',
      'SL_IE9',
      'SL_IE10',
      'SL_IE11',
      'SL_Edge'
    ],
    sauceLabs: {
      testName: 'Script Loader Tests: ' + TEST_LOADER,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      startConnect: process.env.TRAVIS !== "true",
      tags: ["TEST_LOADER=" + TEST_LOADER]
    },
    captureTimeout: 120000,
    browserNoActivityTimeout: 300000
  });
};
