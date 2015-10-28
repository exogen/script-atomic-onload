# script-atomic-onload

```bash
npm install script-atomic-onload
```

## An asynchronous script loader with atomic/synchronous `onload` behavior everywhere

Yes, calling `onload` *immediately* (aka synchronously or atomically) after a
`<script>` has executed is the correct and officially defined behavior. So
what’s the problem? **Internet Explorer.** Below version 10, getting this
behavior requires you jump through some hoops, and *many* script loaders get it
wrong or just don’t care. Even [jQuery’s `getScript`](https://api.jquery.com/jquery.getscript/)
does not make this guarantee, documenting that “The callback is fired once the
script has been loaded but not necessarily executed.”

If you haven’t designed for it by bundling all your code or using a system
like AMD, having other code run in between your script and its `onload`
callback can be potentially disastrous. For instance, let’s say you make a
widget people can load on their site, and it relies on jQuery. You want to load
jQuery from one of the many CDNs that publish it. But since your widget might
be used on sites that already use jQuery, you need to use `jQuery.noConflict` to
keep yours isolated. The problem comes when you load your version of jQuery,
and before its `onload` callback gets called, other code on the site can see it
and, mistaking it for a different instance of jQuery, start attaching plugins
and such to it. Eventually your `noConflict` gets called, but it’s too late –
the plugins are attached to the wrong instance.

**There may be other script loading libraries that already do this!**
[Sorin Iclanzan’s scriptload](https://github.com/RealGeeks/scriptload) looks
promising, for instance. But this particular implementation has been
battle-tested on many high-traffic, script-laden sites in production. Just
because you’ve never had an issue with your script loader, doesn’t mean it’s
correct! One particular issue that this loader resolved for us was
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
