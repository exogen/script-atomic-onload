var TEST_LOADER = require('./test/loader-env');

module.exports = function(config) {
  require("./karma.conf")(config);
  config.set({
    customLaunchers: {
      SL_Chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '57.0',
        platform: 'macOS 10.12'
      },
      SL_Firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '52.0',
        platform: 'Windows 10'
      },
      SL_Safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        version: '10.0',
        platform: 'macOS 10.12'
      },
      SL_Safari_iPhone: {
        base: 'SauceLabs',
        browserName: 'Safari',
        appiumVersion: '1.6.4',
        deviceName: 'iPhone Simulator',
        deviceOrientation: 'portrait',
        platformVersion: '10.2',
        platformName: 'iOS'
      },
      SL_IE8: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '8.0',
        platform: 'Windows 7'
      },
      SL_IE9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '9.0',
        platform: 'Windows 7'
      },
      SL_IE10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '10.0',
        platform: 'Windows 8'
      },
      SL_IE11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '11.103',
        platform: 'Windows 10'
      },
      SL_Edge: {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
        version: '14.14393',
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
