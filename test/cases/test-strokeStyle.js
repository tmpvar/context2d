var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.strokeStyle.default',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.strokeStyle, '#000000', "ctx.strokeStyle", "'#000000'");

  t.done()
});

