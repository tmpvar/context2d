var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.canvas.readonly',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  var c = helpers.createCanvas(t, document);
  var d = ctx.canvas;
  helpers.assertNotEqual(t, c, d, "c", "d");
  try { ctx.canvas = c; } catch (e) {} // TODO: not sure whether this should throw or not...
  helpers.assertEqual(t, ctx.canvas, d, "ctx.canvas", "d");

  t.done()
});


test(module, '2d.canvas.reference',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.canvas, canvas, "ctx.canvas", "canvas");

  t.done()
});

