var TEST_LOADER = require('./test/loader-env');

module.exports = function(config) {
  require("./karma.conf")(config);
  config.set({
    customLaunchers: {
      SL_Chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '46',
        platform: 'OS X 10.11'
      },
      SL_Firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '42',
        platform: 'Windows 10'
      },
      SL_Safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        version: '9',
        platform: 'OS X 10.11'
      },
      SL_Safari_iPhone: {
        base: 'SauceLabs',
        browserName: 'iphone',
        version: '9.2',
        platform: 'OS X 10.10',
        deviceName: 'iPhone 6',
        deviceOrientation: 'portrait'
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
      'SL_Safari_iPhone',
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
    captureTimeout: 0,
    browserDisconnectTimeout: 180000,
    browserDisconnectTolerance: 5,
    browserNoActivityTimeout: 180000
  });
};
