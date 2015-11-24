[![Build Status][trav_img]][trav_site]

Your script loader probably doesn’t have the callback behavior you’re expecting.
We test some competing loaders for atomic `onload` behavior in our build matrix:

[![HeadJS Status][headjs_img]][trav_site]
[![jQuery Status][jquery_img]][trav_site]
[![LABjs Status][labjs_img]][trav_site]
[![RequireJS Status][requirejs_img]][trav_site]

# script-atomic-onload

```bash
npm install script-atomic-onload
```

## An asynchronous script loader with atomic/synchronous `onload` behavior everywhere

Yes, calling `onload` *immediately* (aka synchronously or atomically) after a
`<script>` has executed is the correct and officially defined behavior. So
what’s the problem? **Internet Explorer.** Below version 10, getting this
behavior requires you jump through some hoops, and *many* script loaders get it
wrong or just don’t try. Even [jQuery’s `getScript`](https://api.jquery.com/jquery.getscript/)
does not make this guarantee, documenting that “The callback is fired once the
script has been loaded but not necessarily executed.”

If you haven’t designed for it by bundling all your code or using a system
like AMD, having other code run in between your script and its `onload`
callback can be potentially disastrous. For instance, let’s say you make a
widget people can load on their site, and it relies on jQuery. You want to load
jQuery from one of the many CDNs that publish it. But since your widget might
be used on sites that already use jQuery, you need to use `jQuery.noConflict` to
keep yours isolated. The problem comes when you load your version of jQuery in
IE, and before its `onload` callback fires, other code on the site can see it
and, mistaking it for a different instance of jQuery, start attaching plugins
and such to it. Eventually your `noConflict` gets called, but it’s too late –
the plugins are attached to the wrong jQuery instance.

**There may be other script loading libraries that already do this!**
[Sorin Iclanzan’s scriptload](https://github.com/RealGeeks/scriptload) and
[RequireJS](http://requirejs.org/) have implementations that appear similar, for
instance. But this particular implementation has been battle-tested on many
high-traffic, script-laden sites in production. Just because you’ve never had
an issue with your script loader, doesn’t mean it’s correct! One particular
issue that this loader resolved for us was only ever seen on one site, and only
sometimes (when certain race conditions were met).

## Usage

```javascript
loadScript(src[, callback, thisValue])
```

Arguments:

* `src`: The URL of the script to load.
* `callback`: The function to call immediately after the script has executed. It
  will be called with no arguments, but we reserve the right to pass an `err`
  parameter in future versions. (Load errors can be difficult to detect on
  cross-domain scripts in older versions of IE anyway.)
* `thisValue`: The `this` value that your `callback` will receive.

## Examples

```javascript
var loadScript = require('script-atomic-onload');

loadScript('https://code.jquery.com/jquery-1.11.3.min.js', function() {
  var jQuery = window.jQuery.noConflict(true);
  // We’re guaranteed to have an instance of jQuery that no other script on the
  // page has extended or modified.
});
```

[trav_img]: https://img.shields.io/travis/exogen/script-atomic-onload/master.svg
[headjs_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=jquery&label=HeadJS&bust=1
[jquery_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=headjs&label=jQuery&bust=1
[labjs_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=labjs&label=LABjs&bust=1
[requirejs_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=requirejs&label=RequireJS&bust=1
[trav_site]: https://travis-ci.org/exogen/script-atomic-onload
