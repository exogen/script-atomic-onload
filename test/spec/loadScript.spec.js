var loadScript = require('../loader');

describe('loadScript', function() {
  /**
   * Load 10 instances of jQuery in parallel. (There won't actually be 10
   * in-flight requests due to the browser's per-domain connection limit, but
   * the point is just to have several scripts loading at the same time.) Load
   * the same URL multiple times so we see cache effects. In the callback for
   * each script, check that we're seeing the expect jQuery instance. If we're
   * not, it means either (a) the callback was called too soon (before our
   * expected instance of jQuery is actually on the page), or (b) the callback
   * was called too late (after some other script callback has seen and
   * modified our instance of jQuery).
   */
  function jQueryTest(done) {
    var count = 0;
    function checkDone(version) {
      // Need the try/catch because we're in an async callback and any assertion
      // errors thrown won't be caught by Mocha; it'll time out instead.
      try {
        // jQuery must exist.
        expect(typeof window.jQuery).toEqual('function');
        // Remove the global.
        var jQuery = window.jQuery.noConflict(true);
        // Shouldn't be an instance we've previously loaded and marked.
        expect(jQuery.FOO).toBeUndefined();
        // Should be the expected version.
        expect(jQuery.fn.jquery).toEqual(version);
        // Mark the instance with a flag.
        jQuery.FOO = true;
        if (++count === 10) {
          done();
        }
      } catch(err) {
        done(err);
      }
    }
    loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js', function() {
      checkDone('1.11.3');
    });
    loadScript('http://code.jquery.com/jquery-1.11.3.min.js', function() {
      checkDone('1.11.3');
    });
    loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js', function() {
      checkDone('1.11.2');
    });
    loadScript('http://code.jquery.com/jquery-1.11.2.min.js', function() {
      checkDone('1.11.2');
    });
    loadScript('http://code.jquery.com/jquery-1.7.2.min.js', function() {
      checkDone('1.7.2');
    });
    loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js', function() {
      checkDone('1.11.1');
    });
    loadScript('http://code.jquery.com/jquery-1.11.1.min.js', function() {
      checkDone('1.11.1');
    });
    loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
      checkDone('1.7.2');
    });
    loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js', function() {
      checkDone('1.11.3');
    });
    loadScript('http://code.jquery.com/jquery-1.11.3.min.js', function() {
      checkDone('1.11.3');
    });
  }

  it('atomically fires the callback after execution', jQueryTest, 180000);
  // OK, now do the same thing again. Should be cool, right?
  it('runs the exact same test again for good measure', jQueryTest, 180000);

  /**
   * Checks for serial script loading behavior. Some loaders are able to pass
   * the above tests not because they have the correct atomic `onload`
   * behavior, but because they don't actually load scripts in parallel.
   * Instead, they add scripts to a queue and load them serially, which is
   * totally cheating.
   */
  it('loads scripts in parallel / does not queue', function(done) {
    var order = [];
    function checkDone(version) {
      order.push(version);
      if (order.length === 2) {
        try {
          expect(order[0]).toEqual('1.7.2');
          expect(order[1]).toEqual('1.8.3');
          done();
        } catch(err) {
          done(err);
        }
      }
    }
    loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
      // OK, the cache should be primed with this version. Now load an uncached
      // version and then this version again. If the uncached version loads
      // first, the loader must be queuing, not loading in parallel.

      // Bust cache just in case this version was used in another test.
      loadScript('http://code.jquery.com/jquery-1.8.3.js?bustin=makesmefeelgood', function() {
        checkDone('1.8.3');
      });
      loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
        checkDone('1.7.2');
      });
    });
  }, 180000);
});
