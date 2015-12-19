require('../vendor/nbl');
var nbl = window.nbl;
module.exports = function(src, callback) {
  nbl.l([src, callback]);
};
