var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.clearRect.basic','clear-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.clearRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.clearRect.clip','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.beginPath();
  ctx.rect(0, 0, 16, 16);
  ctx.clip();

  ctx.clearRect(0, 0, 100, 50);

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 16, 16);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.clearRect.globalalpha','clear-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalAlpha = 0.1;
  ctx.clearRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.clearRect.globalcomposite','clear-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-atop';
  ctx.clearRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.clearRect.negative','clear-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.clearRect(0, 0, 50, 25);
  ctx.clearRect(100, 0, -50, 25);
  ctx.clearRect(0, 50, 50, -25);
  ctx.clearRect(100, 50, -50, -25);
  helpers.assertPixel(t, canvas, 25,12, 0,0,0,0, "25,12", "0,0,0,0");
  helpers.assertPixel(t, canvas, 75,12, 0,0,0,0, "75,12", "0,0,0,0");
  helpers.assertPixel(t, canvas, 25,37, 0,0,0,0, "25,37", "0,0,0,0");
  helpers.assertPixel(t, canvas, 75,37, 0,0,0,0, "75,37", "0,0,0,0");

  t.done()
});


test(module, '2d.clearRect.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.clearRect(Infinity, 0, 100, 50);
  ctx.clearRect(-Infinity, 0, 100, 50);
  ctx.clearRect(NaN, 0, 100, 50);
  ctx.clearRect(0, Infinity, 100, 50);
  ctx.clearRect(0, -Infinity, 100, 50);
  ctx.clearRect(0, NaN, 100, 50);
  ctx.clearRect(0, 0, Infinity, 50);
  ctx.clearRect(0, 0, -Infinity, 50);
  ctx.clearRect(0, 0, NaN, 50);
  ctx.clearRect(0, 0, 100, Infinity);
  ctx.clearRect(0, 0, 100, -Infinity);
  ctx.clearRect(0, 0, 100, NaN);
  ctx.clearRect(Infinity, Infinity, 100, 50);
  ctx.clearRect(Infinity, Infinity, Infinity, 50);
  ctx.clearRect(Infinity, Infinity, Infinity, Infinity);
  ctx.clearRect(Infinity, Infinity, 100, Infinity);
  ctx.clearRect(Infinity, 0, Infinity, 50);
  ctx.clearRect(Infinity, 0, Infinity, Infinity);
  ctx.clearRect(Infinity, 0, 100, Infinity);
  ctx.clearRect(0, Infinity, Infinity, 50);
  ctx.clearRect(0, Infinity, Infinity, Infinity);
  ctx.clearRect(0, Infinity, 100, Infinity);
  ctx.clearRect(0, 0, Infinity, Infinity);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.clearRect.path','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.beginPath();
  ctx.rect(0, 0, 100, 50);
  ctx.clearRect(0, 0, 16, 16);
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.clearRect.shadow','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = '#f00';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 50;
  ctx.clearRect(0, -50, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.clearRect.transform','clear-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.scale(10, 10);
  ctx.translate(0, 5);
  ctx.clearRect(0, -5, 10, 5);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.clearRect.zero','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.clearRect(0, 0, 100, 0);
  ctx.clearRect(0, 0, 0, 50);
  ctx.clearRect(0, 0, 0, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});

