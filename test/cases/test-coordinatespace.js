var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.coordinatespace','2d.coordinatespace.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#00f';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0ff';
  ctx.fillRect(0, 0, 50, 25);
  helpers.assertPixel(t, canvas, 25,12, 0,255,255,255, "25,12", "0,255,255,255");
  helpers.assertPixel(t, canvas, 75,12, 0,0,255,255, "75,12", "0,0,255,255");
  helpers.assertPixel(t, canvas, 25,37, 0,0,255,255, "25,37", "0,0,255,255");
  helpers.assertPixel(t, canvas, 75,37, 0,0,255,255, "75,37", "0,0,255,255");
  _requireManualCheck(); // because we can't tell that getPixelData isn't using the wrong coordinate space too

  t.end()
});

