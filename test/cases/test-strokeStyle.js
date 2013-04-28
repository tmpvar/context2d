var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var Window = helpers.Window;
var Document = helpers.Document;
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.strokeStyle.default', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.strokeStyle, '#000000', "ctx.strokeStyle", "'#000000'");

  t.end()
});

