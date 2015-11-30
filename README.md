[![Build Status][trav_img]][trav_site]

Your script loader probably doesn’t have the callback behavior you want.
We test some competing loaders for atomic `onload` behavior in our build matrix.

Using a popular library?

[![HeadJS Status][headjs_img]][trav_site]
[![jQuery Status][jquery_img]][trav_site]
[![LABjs Status][labjs_img]][trav_site]
[![RequireJS Status][requirejs_img]][trav_site]
[![yepnope Status][yepnope_img]][trav_site]

Or perhaps one of these lesser-known packages?

[![getscript Status][getscript_img]][trav_site]
[![kist-loader Status][kist-loader_img]][trav_site]
[![load-script Status][load-script_img]][trav_site]
[![loads-js Status][loads-js_img]][trav_site]
[![script-load Status][script-load_img]][trav_site]
[![scriptload Status][scriptload_img]][trav_site]

Sorry.

Introducing…

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

**There may be other script loading libraries that already do this, but I’ve
never found one.** If I did, I’d add it to the CI build matrix and you’d see
its results above. This particular implementation may not be widely adopted,
but it has been battle-tested on many high-traffic, script-laden sites in
production. Just because you’ve never had an issue with your script loader,
doesn’t mean it’s correct! One particular issue that this loader resolved was
only ever seen on one site, and only sometimes (when certain race conditions
were met).

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

## I don’t support old IE anyway, am I safe?

Maybe! Have a look at the results from our build matrix:

Library | Browser Status
------: | --------------
:trophy: **script-atomic-onload** | ![script-atomic-onload Browser Status][script-atomic-onload_browsers_img]
HeadJS | ![HeadJS Browser Status][headjs_browsers_img]
jQuery | ![jQuery Browser Status][jquery_browsers_img]
LABjs | ![LABjs Browser Status][labjs_browsers_img]
RequireJS | ![RequireJS Browser Status][requirejs_browsers_img]
yepnope | ![yepnope Browser Status][yepnope_browsers_img]
getscript | ![getscript Browser Status][getscript_browsers_img]
kist-loader | ![kist-loader Browser Status][kist-loader_browsers_img]
load-script | ![load-script Browser Status][load-script_browsers_img]
loads-js | ![loads-js Browser Status][loads-js_browsers_img]
script-load | ![script-load Browser Status][script-load_browsers_img]
scriptload | ![scriptload Browser Status][scriptload_browsers_img]

[trav_img]: https://img.shields.io/travis/exogen/script-atomic-onload/master.svg
[getscript_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=getscript&label=getscript
[headjs_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=headjs&label=HeadJS
[jquery_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=jquery&label=jQuery
[kist-loader_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=kist-loader&label=kist-loader
[labjs_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=labjs&label=LABjs
[load-script_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=load-script&label=load-script
[loads-js_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=loads-js&label=loads-js
[requirejs_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=requirejs&label=RequireJS
[scriptload_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=scriptload&label=scriptload
[script-load_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=script-load&label=script-load
[yepnope_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=yepnope&label=yepnope
[trav_site]: https://travis-ci.org/exogen/script-atomic-onload

[script-atomic-onload_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=script-atomic-onload
[headjs_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=headjs
[jquery_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=jquery
[labjs_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=labjs
[requirejs_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=requirejs
[yepnope_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=yepnope
[getscript_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=getscript
[kist-loader_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=kist-loader
[load-script_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=load-script
[loads-js_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=loads-js
[script-load_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=script-load
[scriptload_browsers_img]: http://travis-matrix.herokuapp.com/exogen/script-atomic-onload/sauce/script-atomic-onload?name=scriptload
