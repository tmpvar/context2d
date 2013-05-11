var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.getcontext.exists',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertNotEqual(t, canvas.getContext('2d'), null, "canvas.getContext('2d')", "null");

  t.done()
});


test(module, '2d.getcontext.shared','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  var ctx2 = canvas.getContext('2d');
  ctx.fillStyle = '#f00';
  ctx2.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.getcontext.unique',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, canvas.getContext('2d'), canvas.getContext('2d'), "canvas.getContext('2d')", "canvas.getContext('2d')");

  t.done()
});

