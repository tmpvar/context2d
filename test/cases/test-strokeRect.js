var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.strokeRect.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.strokeRect(25, 24, 50, 2);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.strokeRect.clip','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.beginPath();
  ctx.rect(0, 0, 16, 16);
  ctx.clip();

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.strokeRect(0, 0, 100, 50);

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 16, 16);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.strokeRect.globalalpha','clear-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalAlpha = 0;
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.strokeRect(25, 24, 50, 2);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.strokeRect.globalcomposite','clear-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'source-in';
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.strokeRect(25, 24, 50, 2);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.strokeRect.negative','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 25;
  ctx.strokeRect(12, 12, 26, 1);
  ctx.strokeRect(88, 12, -26, 1);
  ctx.strokeRect(12, 38, 26, -1);
  ctx.strokeRect(88, 38, -26, -1);
  helpers.assertPixel(t, canvas, 25,12, 0,255,0,255, "25,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,12, 0,255,0,255, "75,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,37, 0,255,0,255, "25,37", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,37, 0,255,0,255, "75,37", "0,255,0,255");

  t.done()
});


test(module, '2d.strokeRect.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 150;
  ctx.strokeRect(Infinity, 0, 100, 50);
  ctx.strokeRect(-Infinity, 0, 100, 50);
  ctx.strokeRect(NaN, 0, 100, 50);
  ctx.strokeRect(0, Infinity, 100, 50);
  ctx.strokeRect(0, -Infinity, 100, 50);
  ctx.strokeRect(0, NaN, 100, 50);
  ctx.strokeRect(0, 0, Infinity, 50);
  ctx.strokeRect(0, 0, -Infinity, 50);
  ctx.strokeRect(0, 0, NaN, 50);
  ctx.strokeRect(0, 0, 100, Infinity);
  ctx.strokeRect(0, 0, 100, -Infinity);
  ctx.strokeRect(0, 0, 100, NaN);
  ctx.strokeRect(Infinity, Infinity, 100, 50);
  ctx.strokeRect(Infinity, Infinity, Infinity, 50);
  ctx.strokeRect(Infinity, Infinity, Infinity, Infinity);
  ctx.strokeRect(Infinity, Infinity, 100, Infinity);
  ctx.strokeRect(Infinity, 0, Infinity, 50);
  ctx.strokeRect(Infinity, 0, Infinity, Infinity);
  ctx.strokeRect(Infinity, 0, 100, Infinity);
  ctx.strokeRect(0, Infinity, Infinity, 50);
  ctx.strokeRect(0, Infinity, Infinity, Infinity);
  ctx.strokeRect(0, Infinity, 100, Infinity);
  ctx.strokeRect(0, 0, Infinity, Infinity);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.strokeRect.path','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.beginPath();
  ctx.rect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, 16, 16);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.strokeRect.shadow','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.shadowColor = '#0f0';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 50;
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.strokeRect(0, -75, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.strokeRect.transform','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.scale(10, 10);
  ctx.translate(0, 5);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 5;
  ctx.strokeRect(2.5, -2.6, 5, 0.2);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.strokeRect.zero.1','clear-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 250;
  ctx.strokeRect(50, 25, 0, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.strokeRect.zero.2','clear-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 250;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeRect(50, 25, 0, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.strokeRect.zero.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.strokeRect(0, 25, 100, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.strokeRect.zero.4','clear-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 250;
  ctx.lineCap = 'round';
  ctx.strokeRect(100, 25, 100, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.strokeRect.zero.5','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 250;
  ctx.lineJoin = 'round';
  ctx.strokeRect(100, 25, 100, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});

