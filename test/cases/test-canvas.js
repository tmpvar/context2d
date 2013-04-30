var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.canvas.readonly',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var c = helpers.createCanvas(document);
  var d = ctx.canvas;
  helpers.assertNotEqual(t, c, d, "c", "d");
  try { ctx.canvas = c; } catch (e) {} // TODO: not sure whether this should throw or not...
  helpers.assertEqual(t, ctx.canvas, d, "ctx.canvas", "d");

  t.end()
});


test('2d.canvas.reference',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.canvas, canvas, "ctx.canvas", "canvas");

  t.end()
});

