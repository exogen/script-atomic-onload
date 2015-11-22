var expect = require("expect.js");
var loadScript = require("../loader");

describe("loadScript", function() {
  it("runs the callback after execution", function(done) {
    this.timeout(300000);
    var count = 0;
    function checkDone() {
      if (++count === 10) {
        done();
      }
    }
    function assertIsolatedLoad(version) {
      // Need the try/catch because we're in an async callback and any assertion
      // errors thrown won't be caught by Mocha; it'll time out instead.
      try {
        // jQuery must exist.
        expect(window.jQuery).to.be.a('function');
        // Remove the global.
        var jQuery = window.jQuery.noConflict(true);
        // Shouldn't be an instance we've previously loaded.
        expect(jQuery.FOO).to.be(undefined);
        // Should be the expected version.
        expect(jQuery.fn.jquery).to.equal(version);
        // Mark the instance with a flag.
        jQuery.FOO = true;
        checkDone();
      } catch(err) {
        done(err);
      }
    }
    loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js", function() {
      assertIsolatedLoad("1.11.3");
    });
    loadScript("http://code.jquery.com/jquery-1.11.3.min.js", function() {
      assertIsolatedLoad("1.11.3");
    });
    loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js", function() {
      assertIsolatedLoad("1.11.2");
    });
    loadScript("http://code.jquery.com/jquery-1.11.2.min.js", function() {
      assertIsolatedLoad("1.11.2");
    });
    loadScript("http://code.jquery.com/jquery-1.7.2.min.js", function() {
      assertIsolatedLoad("1.7.2");
    });
    loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js", function() {
      assertIsolatedLoad("1.11.1");
    });
    loadScript("http://code.jquery.com/jquery-1.11.1.min.js", function() {
      assertIsolatedLoad("1.11.1");
    });
    loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js", function() {
      assertIsolatedLoad("1.7.2");
    });
    loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js", function() {
      assertIsolatedLoad("1.11.3");
    });
    loadScript("http://code.jquery.com/jquery-1.11.3.min.js", function() {
      assertIsolatedLoad("1.11.3");
    });
  });
});
