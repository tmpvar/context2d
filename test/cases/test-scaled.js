var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var domino = require('domino');
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.scaled', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 50, 25);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#00f';
  ctx.fillRect(0, 0, 50, 25);
  ctx.fillStyle = '#0ff';
  ctx.fillRect(0, 0, 25, 10);

  t.end()
});

