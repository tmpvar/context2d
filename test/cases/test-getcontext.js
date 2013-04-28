var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var Window = helpers.Window;
var Document = helpers.Document;
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.getcontext.exists', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertNotEqual(t, canvas.getContext('2d'), null, "canvas.getContext('2d')", "null");

  t.end()
});


test('2d.getcontext.shared', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var ctx2 = canvas.getContext('2d');
  ctx.fillStyle = '#f00';
  ctx2.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.getcontext.unique', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, canvas.getContext('2d'), canvas.getContext('2d'), "canvas.getContext('2d')", "canvas.getContext('2d')");

  t.end()
});

