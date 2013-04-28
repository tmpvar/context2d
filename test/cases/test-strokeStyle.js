var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var domino = require('domino');
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.strokeStyle.default', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.strokeStyle, '#000000', "ctx.strokeStyle", "'#000000'");

  t.end()
});

