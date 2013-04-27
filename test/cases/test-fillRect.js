var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Window = helpers.Window;
var Document = helpers.Document;

test('2d.fillRect.basic', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.fillRect.clip', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.beginPath();
  ctx.rect(0, 0, 16, 16);
  ctx.clip();
  
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 16, 16);
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.fillRect.negative', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 50, 25);
  ctx.fillRect(100, 0, -50, 25);
  ctx.fillRect(0, 50, 50, -25);
  ctx.fillRect(100, 50, -50, -25);
  helpers.assertPixel(t, canvas, 25,12, 0,255,0,255, "25,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,12, 0,255,0,255, "75,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,37, 0,255,0,255, "25,37", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,37, 0,255,0,255, "75,37", "0,255,0,255");

  t.end()
});


test('2d.fillRect.nonfinite', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.fillStyle = '#f00';
  ctx.fillRect(Infinity, 0, 100, 50);
  ctx.fillRect(-Infinity, 0, 100, 50);
  ctx.fillRect(NaN, 0, 100, 50);
  ctx.fillRect(0, Infinity, 100, 50);
  ctx.fillRect(0, -Infinity, 100, 50);
  ctx.fillRect(0, NaN, 100, 50);
  ctx.fillRect(0, 0, Infinity, 50);
  ctx.fillRect(0, 0, -Infinity, 50);
  ctx.fillRect(0, 0, NaN, 50);
  ctx.fillRect(0, 0, 100, Infinity);
  ctx.fillRect(0, 0, 100, -Infinity);
  ctx.fillRect(0, 0, 100, NaN);
  ctx.fillRect(Infinity, Infinity, 100, 50);
  ctx.fillRect(Infinity, Infinity, Infinity, 50);
  ctx.fillRect(Infinity, Infinity, Infinity, Infinity);
  ctx.fillRect(Infinity, Infinity, 100, Infinity);
  ctx.fillRect(Infinity, 0, Infinity, 50);
  ctx.fillRect(Infinity, 0, Infinity, Infinity);
  ctx.fillRect(Infinity, 0, 100, Infinity);
  ctx.fillRect(0, Infinity, Infinity, 50);
  ctx.fillRect(0, Infinity, Infinity, Infinity);
  ctx.fillRect(0, Infinity, 100, Infinity);
  ctx.fillRect(0, 0, Infinity, Infinity);
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.fillRect.path', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.beginPath();
  ctx.rect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 16, 16);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.fillRect.shadow', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = '#0f0';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 50;
  ctx.fillRect(0, -50, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.fillRect.transform', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.scale(10, 10);
  ctx.translate(0, 5);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, -5, 10, 5);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.fillRect.zero', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 0);
  ctx.fillRect(0, 0, 0, 50);
  ctx.fillRect(0, 0, 0, 0);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});

