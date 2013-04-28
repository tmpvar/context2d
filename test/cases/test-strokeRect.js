var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var Window = helpers.Window;
var Document = helpers.Document;
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.strokeRect.basic', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.strokeRect(25, 24, 50, 2);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.strokeRect.clip', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.strokeRect.globalalpha', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalAlpha = 0;
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.strokeRect(25, 24, 50, 2);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.end()
});


test('2d.strokeRect.globalcomposite', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'source-in';
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.strokeRect(25, 24, 50, 2);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.end()
});


test('2d.strokeRect.negative', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.strokeRect.nonfinite', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.strokeRect.path', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.beginPath();
  ctx.rect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, 16, 16);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.strokeRect.shadow', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.strokeRect.transform', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.scale(10, 10);
  ctx.translate(0, 5);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 5;
  ctx.strokeRect(2.5, -2.6, 5, 0.2);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.strokeRect.zero.1', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 250;
  ctx.strokeRect(50, 25, 0, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.end()
});


test('2d.strokeRect.zero.2', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 250;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeRect(50, 25, 0, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.end()
});


test('2d.strokeRect.zero.3', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.strokeRect(0, 25, 100, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.strokeRect.zero.4', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 250;
  ctx.lineCap = 'round';
  ctx.strokeRect(100, 25, 100, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.end()
});


test('2d.strokeRect.zero.5', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 250;
  ctx.lineJoin = 'round';
  ctx.strokeRect(100, 25, 100, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});

