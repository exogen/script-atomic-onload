[![Build Status][script-atomic-onload_img]][travis]

Your script loader probably doesn’t have the callback behavior you want.

Using a popular library?

[![curl.js Status][curl_img]][travis]
[![HeadJS Status][headjs_img]][travis]
[![jQuery Status][jquery_img]][travis]
[![LABjs Status][labjs_img]][travis]
[![RequireJS Status][requirejs_img]][travis]
[![$script.js Status][scriptjs_img]][travis]
[![yepnope Status][yepnope_img]][travis]
[![YUI Status][yui_img]][travis]

Or perhaps one of these lesser-known packages?

[![getscript Status][getscript_img]][travis]
[![JSL Status][jsl_img]][travis]
[![kist-loader Status][kist-loader_img]][travis]
[![l.js Status][ljs_img]][travis]
[![LazyLoad Status][lazyload_img]][travis]
[![load-script Status][load-script_img]][travis]
[![loadrunner Status][loadrunner_img]][travis]
[![loads-js Status][loads-js_img]][travis]
[![NBL Status][nbl_img]][travis]
[![script-load Status][script-load_img]][travis]
[![scriptinclude Status][scriptinclude_img]][travis]
[![scriptload Status][scriptload_img]][travis]
[![toast Status][toast_img]][travis]

Sorry.

Introducing…

# script-atomic-onload

A build matrix of every script loader ever made.

This project tests script loaders for atomic `onload` support, which is the
only correct behavior. It also contains a reference implementation, which has
been adopted in the production-ready [little-loader][little-loader] module.

[![little-loader Status][little-loader_img]][travis]

:trophy: **[little-loader][little-loader] is the only correct script loader ever made.**


### The only correct behavior…

Yes, calling `onload` *immediately* (aka synchronously or atomically) after a
`<script>` has executed is the correct and officially defined behavior. So
what’s the problem? **Internet Explorer.** Below version 10, getting this
behavior requires you jump through some hoops. **[Even if you don’t support
Internet Explorer](#i-dont-support-old-ie-anyway-am-i-safe), your script
loader may be breaking your code in compliant browsers due to its faulty
`onload` workarounds.** Some script loaders just don’t try; for example,
[jQuery’s `getScript`][jquery] does not make this guarantee, documenting that
“The callback is fired once the script has been loaded but not necessarily
executed.” Those that do try often try *very hard* and end up being too clever
and still incorrect. In giving IE a pass on this behavior, many loaders have
left other browsers broken as well.

If you haven’t designed for it by bundling all your code or using a system
like AMD, having other code run in between your script and its `onload`
callback can be potentially disastrous. For instance, let’s say you make a
widget people can load on their site, and it relies on jQuery. You want to load
jQuery from a CDN. But since your widget might be used on sites that already
use jQuery, you need to use `jQuery.noConflict` to keep yours isolated. When
you load your version of jQuery in IE, it’s possible other code on the page can
see it before your `onload` callback fires. Any code can then modify your
instance of jQuery, adding plugins and such (most likely mistaking it for a
different instance of jQuery). Eventually your `noConflict` gets called, but
it’s too late – the plugins are attached to the wrong jQuery instance. This is
not a problem with jQuery, but with the script loader.

This particular implementation may not be widely adopted, but it has been
battle-tested on many high-traffic, script-laden sites in production. Just
because you’ve never had an issue with your script loader, doesn’t mean it’s
correct! One particular issue that this loader resolved was only ever seen on
one site, and only sometimes (when certain race conditions were triggered).

## Reference Implementation

### Install

```sh
npm install script-atomic-onload
```

### Usage

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

### Examples

```javascript
var loadScript = require("script-atomic-onload");

loadScript("https://code.jquery.com/jquery-1.11.3.min.js", function() {
  var jQuery = window.jQuery.noConflict(true);
  // We’re guaranteed to have an instance of jQuery that no other script on the
  // page has extended or modified.
});
```

## I don’t support old IE anyway, am I safe?

Maybe! Have a look at the results from our build matrix:

Library | Browser Status
------: | --------------
:trophy: **[little-loader][]** | [![little-loader Browser Status][little-loader_browsers_img]][travis]
[curl.js][curl] | [![curl.js Browser Status][curl_browsers_img]][travis]
[HeadJS][headjs] | [![HeadJS Browser Status][headjs_browsers_img]][travis]
[jQuery][jquery] | [![jQuery Browser Status][jquery_browsers_img]][travis]
[LABjs][labjs] | [![LABjs Browser Status][labjs_browsers_img]][travis]
[RequireJS][requirejs] | [![RequireJS Browser Status][requirejs_browsers_img]][travis]
[$script.js][scriptjs] | [![$script.js Browser Status][scriptjs_browsers_img]][travis]
[yepnope][] | [![yepnope Browser Status][yepnope_browsers_img]][travis]
[YUI][yui] | [![YUI Browser Status][yui_browsers_img]][travis]
[getscript][] | [![getscript Browser Status][getscript_browsers_img]][travis]
[JSL][jsl] | [![JSL Browser Status][jsl_browsers_img]][travis]
[kist-loader][] | [![kist-loader Browser Status][kist-loader_browsers_img]][travis]
[l.js][ljs] | [![l.js Browser Status][ljs_browsers_img]][travis]
[LazyLoad][lazyload] | [![LazyLoad Browser Status][lazyload_browsers_img]][travis]
[load-script][] | [![load-script Browser Status][load-script_browsers_img]][travis]
[loadrunner][] | [![loadrunner Browser Status][loadrunner_browsers_img]][travis]
[loads-js][] | [![loads-js Browser Status][loads-js_browsers_img]][travis]
[NBL][nbl] | [![NBL Browser Status][nbl_browsers_img]][travis]
[script-load][] | [![script-load Browser Status][script-load_browsers_img]][travis]
[scriptinclude][] | [![scriptinclude Browser Status][scriptinclude_browsers_img]][travis]
[scriptload][] | [![scriptload Browser Status][scriptload_browsers_img]][travis]
[toast][] | [![toast Browser Status][toast_browsers_img]][travis]

[script-atomic-onload_img]: https://img.shields.io/travis/exogen/script-atomic-onload/master.svg
[curl_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=curl&label=curl.js
[getscript_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=getscript&label=getscript
[headjs_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=headjs&label=HeadJS
[jquery_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=jquery&label=jQuery
[jsl_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=jsl&label=JSL
[kist-loader_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=kist-loader&label=kist-loader
[labjs_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=labjs&label=LABjs
[lazyload_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=lazyload&label=LazyLoad
[little-loader_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=little-loader&label=little-loader
[ljs_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=ljs&label=l.js
[load-script_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=load-script&label=load-script
[loadrunner_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=loadrunner&label=loadrunner
[loads-js_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=loads-js&label=loads-js
[nbl_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=nbl&label=NBL
[requirejs_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=requirejs&label=RequireJS
[script-load_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=script-load&label=script-load
[scriptinclude_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=scriptinclude&label=ScriptInclude
[scriptjs_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=scriptjs&label=$script.js
[scriptload_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=scriptload&label=scriptload
[toast_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=toast&label=toast
[yepnope_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=yepnope&label=yepnope
[yui_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload?branch=master&env=TEST_LOADER=yui&label=YUI

[script-atomic-onload_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=script-atomic-onload
[curl_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=curl
[getscript_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=getscript
[headjs_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=headjs
[jquery_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=jquery
[jsl_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=jsl
[kist-loader_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=kist-loader
[labjs_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=labjs
[lazyload_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=lazyload
[little-loader_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=little-loader
[ljs_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=ljs
[load-script_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=load-script
[loadrunner_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=loadrunner
[loads-js_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=loads-js
[nbl_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=nbl
[requirejs_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=requirejs
[script-load_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=script-load
[scriptinclude_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=scriptinclude
[scriptjs_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=scriptjs
[scriptload_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=scriptload
[toast_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=toast
[yepnope_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=yepnope
[yui_browsers_img]: http://badges.herokuapp.com/travis/exogen/script-atomic-onload/sauce/script-atomic-onload?name=yui

[travis]: https://travis-ci.org/exogen/script-atomic-onload

[curl]: https://github.com/cujojs/curl
[getscript]: https://www.npmjs.com/package/getscript
[headjs]: http://headjs.com/
[jquery]: https://api.jquery.com/jquery.getscript
[jsl]: http://www.andresvidal.com/jsl
[kist-loader]: https://www.npmjs.com/package/kist-loader
[labjs]: http://labjs.com/
[lazyload]: https://github.com/rgrove/lazyload
[little-loader]: https://github.com/walmartlabs/little-loader
[ljs]: http://malko.github.io/l.js/
[load-script]: https://www.npmjs.com/package/load-script
[loadrunner]: https://github.com/danwrong/loadrunner
[loads-js]: https://www.npmjs.com/package/loads-js
[nbl]: http://berklee.github.io/nbl/
[requirejs]: http://requirejs.org/
[scriptjs]: https://github.com/ded/script.js
[scriptload]: https://www.npmjs.com/package/scriptload
[script-load]: https://www.npmjs.com/package/script-load
[scriptinclude]: https://www.npmjs.com/package/scriptinclude
[toast]: https://www.npmjs.com/package/pyrsmk-toast
[yepnope]: https://github.com/SlexAxton/yepnope.js
[yui]: http://yuilibrary.com/yui/docs/get/
