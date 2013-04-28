var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var domino = require('domino');
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.line.cap.butt', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineCap = 'butt';
  ctx.lineWidth = 20;
  
  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  ctx.fillRect(15, 15, 20, 20);
  ctx.beginPath();
  ctx.moveTo(25, 15);
  ctx.lineTo(25, 35);
  ctx.stroke();
  
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(75, 15);
  ctx.lineTo(75, 35);
  ctx.stroke();
  ctx.fillRect(65, 15, 20, 20);
  
  helpers.assertPixel(t, canvas, 25,14, 0,255,0,255, "25,14", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,15, 0,255,0,255, "25,15", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,16, 0,255,0,255, "25,16", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,34, 0,255,0,255, "25,34", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,35, 0,255,0,255, "25,35", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,36, 0,255,0,255, "25,36", "0,255,0,255");
  
  helpers.assertPixel(t, canvas, 75,14, 0,255,0,255, "75,14", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,15, 0,255,0,255, "75,15", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,16, 0,255,0,255, "75,16", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,34, 0,255,0,255, "75,34", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,35, 0,255,0,255, "75,35", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,36, 0,255,0,255, "75,36", "0,255,0,255");

  t.end()
});


test('2d.line.cap.closed', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineJoin = 'bevel';
  ctx.lineCap = 'square';
  ctx.lineWidth = 400;
  
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(200, 1000);
  ctx.lineTo(1000, 1000);
  ctx.lineTo(1000, 200);
  ctx.closePath();
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.cap.invalid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.lineCap = 'butt'
  helpers.assertEqual(t, ctx.lineCap, 'butt', "ctx.lineCap", "'butt'");
  
  ctx.lineCap = 'butt';
  ctx.lineCap = 'invalid';
  helpers.assertEqual(t, ctx.lineCap, 'butt', "ctx.lineCap", "'butt'");
  
  ctx.lineCap = 'butt';
  ctx.lineCap = 'ROUND';
  helpers.assertEqual(t, ctx.lineCap, 'butt', "ctx.lineCap", "'butt'");
  
  ctx.lineCap = 'butt';
  ctx.lineCap = 'round\0';
  helpers.assertEqual(t, ctx.lineCap, 'butt', "ctx.lineCap", "'butt'");
  
  ctx.lineCap = 'butt';
  ctx.lineCap = 'round ';
  helpers.assertEqual(t, ctx.lineCap, 'butt', "ctx.lineCap", "'butt'");
  
  ctx.lineCap = 'butt';
  ctx.lineCap = "";
  helpers.assertEqual(t, ctx.lineCap, 'butt', "ctx.lineCap", "'butt'");
  
  ctx.lineCap = 'butt';
  ctx.lineCap = 'bevel';
  helpers.assertEqual(t, ctx.lineCap, 'butt', "ctx.lineCap", "'butt'");

  t.end()
});


test('2d.line.cap.open', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineJoin = 'bevel';
  ctx.lineCap = 'square';
  ctx.lineWidth = 400;
  
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(200, 1000);
  ctx.lineTo(1000, 1000);
  ctx.lineTo(1000, 200);
  ctx.lineTo(200, 200);
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.cap.round', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  var tol = 1; // tolerance to avoid antialiasing artifacts
  
  ctx.lineCap = 'round';
  ctx.lineWidth = 20;
  
  
  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  
  ctx.beginPath();
  ctx.moveTo(35-tol, 15);
  ctx.arc(25, 15, 10-tol, 0, Math.PI, true);
  ctx.arc(25, 35, 10-tol, Math.PI, 0, true);
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(25, 15);
  ctx.lineTo(25, 35);
  ctx.stroke();
  
  
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  
  ctx.beginPath();
  ctx.moveTo(75, 15);
  ctx.lineTo(75, 35);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(85+tol, 15);
  ctx.arc(75, 15, 10+tol, 0, Math.PI, true);
  ctx.arc(75, 35, 10+tol, Math.PI, 0, true);
  ctx.fill();
  
  helpers.assertPixel(t, canvas, 17,6, 0,255,0,255, "17,6", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,6, 0,255,0,255, "25,6", "0,255,0,255");
  helpers.assertPixel(t, canvas, 32,6, 0,255,0,255, "32,6", "0,255,0,255");
  helpers.assertPixel(t, canvas, 17,43, 0,255,0,255, "17,43", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,43, 0,255,0,255, "25,43", "0,255,0,255");
  helpers.assertPixel(t, canvas, 32,43, 0,255,0,255, "32,43", "0,255,0,255");
  
  helpers.assertPixel(t, canvas, 67,6, 0,255,0,255, "67,6", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,6, 0,255,0,255, "75,6", "0,255,0,255");
  helpers.assertPixel(t, canvas, 82,6, 0,255,0,255, "82,6", "0,255,0,255");
  helpers.assertPixel(t, canvas, 67,43, 0,255,0,255, "67,43", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,43, 0,255,0,255, "75,43", "0,255,0,255");
  helpers.assertPixel(t, canvas, 82,43, 0,255,0,255, "82,43", "0,255,0,255");

  t.end()
});


test('2d.line.cap.square', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineCap = 'square';
  ctx.lineWidth = 20;
  
  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  ctx.fillRect(15, 5, 20, 40);
  ctx.beginPath();
  ctx.moveTo(25, 15);
  ctx.lineTo(25, 35);
  ctx.stroke();
  
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(75, 15);
  ctx.lineTo(75, 35);
  ctx.stroke();
  ctx.fillRect(65, 5, 20, 40);
  
  helpers.assertPixel(t, canvas, 25,4, 0,255,0,255, "25,4", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,5, 0,255,0,255, "25,5", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,6, 0,255,0,255, "25,6", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,44, 0,255,0,255, "25,44", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,45, 0,255,0,255, "25,45", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,46, 0,255,0,255, "25,46", "0,255,0,255");
  
  helpers.assertPixel(t, canvas, 75,4, 0,255,0,255, "75,4", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,5, 0,255,0,255, "75,5", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,6, 0,255,0,255, "75,6", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,44, 0,255,0,255, "75,44", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,45, 0,255,0,255, "75,45", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,46, 0,255,0,255, "75,46", "0,255,0,255");

  t.end()
});


test('2d.line.cap.valid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.lineCap = 'butt'
  helpers.assertEqual(t, ctx.lineCap, 'butt', "ctx.lineCap", "'butt'");
  
  ctx.lineCap = 'round';
  helpers.assertEqual(t, ctx.lineCap, 'round', "ctx.lineCap", "'round'");
  
  ctx.lineCap = 'square';
  helpers.assertEqual(t, ctx.lineCap, 'square', "ctx.lineCap", "'square'");

  t.end()
});


test('2d.line.cross', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineWidth = 200;
  ctx.lineJoin = 'bevel';
  
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(110, 50);
  ctx.lineTo(110, 60);
  ctx.lineTo(100, 60);
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.defaults', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.lineWidth, 1, "ctx.lineWidth", "1");
  helpers.assertEqual(t, ctx.lineCap, 'butt', "ctx.lineCap", "'butt'");
  helpers.assertEqual(t, ctx.lineJoin, 'miter', "ctx.lineJoin", "'miter'");
  helpers.assertEqual(t, ctx.miterLimit, 10, "ctx.miterLimit", "10");

  t.end()
});


test('2d.line.join.bevel', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  var tol = 1; // tolerance to avoid antialiasing artifacts
  
  ctx.lineJoin = 'bevel';
  ctx.lineWidth = 20;
  
  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  
  ctx.fillRect(10, 10, 20, 20);
  ctx.fillRect(20, 20, 20, 20);
  ctx.beginPath();
  ctx.moveTo(30, 20);
  ctx.lineTo(40-tol, 20);
  ctx.lineTo(30, 10+tol);
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(10, 20);
  ctx.lineTo(30, 20);
  ctx.lineTo(30, 40);
  ctx.stroke();
  
  
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  
  ctx.beginPath();
  ctx.moveTo(60, 20);
  ctx.lineTo(80, 20);
  ctx.lineTo(80, 40);
  ctx.stroke();
  
  ctx.fillRect(60, 10, 20, 20);
  ctx.fillRect(70, 20, 20, 20);
  ctx.beginPath();
  ctx.moveTo(80, 20);
  ctx.lineTo(90+tol, 20);
  ctx.lineTo(80, 10-tol);
  ctx.fill();
  
  helpers.assertPixel(t, canvas, 34,16, 0,255,0,255, "34,16", "0,255,0,255");
  helpers.assertPixel(t, canvas, 34,15, 0,255,0,255, "34,15", "0,255,0,255");
  helpers.assertPixel(t, canvas, 35,15, 0,255,0,255, "35,15", "0,255,0,255");
  helpers.assertPixel(t, canvas, 36,15, 0,255,0,255, "36,15", "0,255,0,255");
  helpers.assertPixel(t, canvas, 36,14, 0,255,0,255, "36,14", "0,255,0,255");
  
  helpers.assertPixel(t, canvas, 84,16, 0,255,0,255, "84,16", "0,255,0,255");
  helpers.assertPixel(t, canvas, 84,15, 0,255,0,255, "84,15", "0,255,0,255");
  helpers.assertPixel(t, canvas, 85,15, 0,255,0,255, "85,15", "0,255,0,255");
  helpers.assertPixel(t, canvas, 86,15, 0,255,0,255, "86,15", "0,255,0,255");
  helpers.assertPixel(t, canvas, 86,14, 0,255,0,255, "86,14", "0,255,0,255");

  t.end()
});


test('2d.line.join.closed', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineJoin = 'miter';
  ctx.lineWidth = 200;
  
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(100, 1000);
  ctx.lineTo(1000, 1000);
  ctx.lineTo(1000, 50);
  ctx.closePath();
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.join.invalid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.lineJoin = 'bevel'
  helpers.assertEqual(t, ctx.lineJoin, 'bevel', "ctx.lineJoin", "'bevel'");
  
  ctx.lineJoin = 'bevel';
  ctx.lineJoin = 'invalid';
  helpers.assertEqual(t, ctx.lineJoin, 'bevel', "ctx.lineJoin", "'bevel'");
  
  ctx.lineJoin = 'bevel';
  ctx.lineJoin = 'ROUND';
  helpers.assertEqual(t, ctx.lineJoin, 'bevel', "ctx.lineJoin", "'bevel'");
  
  ctx.lineJoin = 'bevel';
  ctx.lineJoin = 'round\0';
  helpers.assertEqual(t, ctx.lineJoin, 'bevel', "ctx.lineJoin", "'bevel'");
  
  ctx.lineJoin = 'bevel';
  ctx.lineJoin = 'round ';
  helpers.assertEqual(t, ctx.lineJoin, 'bevel', "ctx.lineJoin", "'bevel'");
  
  ctx.lineJoin = 'bevel';
  ctx.lineJoin = "";
  helpers.assertEqual(t, ctx.lineJoin, 'bevel', "ctx.lineJoin", "'bevel'");
  
  ctx.lineJoin = 'bevel';
  ctx.lineJoin = 'butt';
  helpers.assertEqual(t, ctx.lineJoin, 'bevel', "ctx.lineJoin", "'bevel'");

  t.end()
});


test('2d.line.join.miter', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineJoin = 'miter';
  ctx.lineWidth = 20;
  
  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  
  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  
  ctx.fillRect(10, 10, 30, 20);
  ctx.fillRect(20, 10, 20, 30);
  
  ctx.beginPath();
  ctx.moveTo(10, 20);
  ctx.lineTo(30, 20);
  ctx.lineTo(30, 40);
  ctx.stroke();
  
  
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  
  ctx.beginPath();
  ctx.moveTo(60, 20);
  ctx.lineTo(80, 20);
  ctx.lineTo(80, 40);
  ctx.stroke();
  
  ctx.fillRect(60, 10, 30, 20);
  ctx.fillRect(70, 10, 20, 30);
  
  helpers.assertPixel(t, canvas, 38,12, 0,255,0,255, "38,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 39,11, 0,255,0,255, "39,11", "0,255,0,255");
  helpers.assertPixel(t, canvas, 40,10, 0,255,0,255, "40,10", "0,255,0,255");
  helpers.assertPixel(t, canvas, 41,9, 0,255,0,255, "41,9", "0,255,0,255");
  helpers.assertPixel(t, canvas, 42,8, 0,255,0,255, "42,8", "0,255,0,255");
  
  helpers.assertPixel(t, canvas, 88,12, 0,255,0,255, "88,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 89,11, 0,255,0,255, "89,11", "0,255,0,255");
  helpers.assertPixel(t, canvas, 90,10, 0,255,0,255, "90,10", "0,255,0,255");
  helpers.assertPixel(t, canvas, 91,9, 0,255,0,255, "91,9", "0,255,0,255");
  helpers.assertPixel(t, canvas, 92,8, 0,255,0,255, "92,8", "0,255,0,255");

  t.end()
});


test('2d.line.join.open', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineJoin = 'miter';
  ctx.lineWidth = 200;
  
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(100, 1000);
  ctx.lineTo(1000, 1000);
  ctx.lineTo(1000, 50);
  ctx.lineTo(100, 50);
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.join.parallel', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 300;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(-100, 25);
  ctx.lineTo(0, 25);
  ctx.lineTo(-100, 25);
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.join.round', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  var tol = 1; // tolerance to avoid antialiasing artifacts
  
  ctx.lineJoin = 'round';
  ctx.lineWidth = 20;
  
  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  
  ctx.fillRect(10, 10, 20, 20);
  ctx.fillRect(20, 20, 20, 20);
  ctx.beginPath();
  ctx.moveTo(30, 20);
  ctx.arc(30, 20, 10-tol, 0, 2*Math.PI, true);
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(10, 20);
  ctx.lineTo(30, 20);
  ctx.lineTo(30, 40);
  ctx.stroke();
  
  
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  
  ctx.beginPath();
  ctx.moveTo(60, 20);
  ctx.lineTo(80, 20);
  ctx.lineTo(80, 40);
  ctx.stroke();
  
  ctx.fillRect(60, 10, 20, 20);
  ctx.fillRect(70, 20, 20, 20);
  ctx.beginPath();
  ctx.moveTo(80, 20);
  ctx.arc(80, 20, 10+tol, 0, 2*Math.PI, true);
  ctx.fill();
  
  helpers.assertPixel(t, canvas, 36,14, 0,255,0,255, "36,14", "0,255,0,255");
  helpers.assertPixel(t, canvas, 36,13, 0,255,0,255, "36,13", "0,255,0,255");
  helpers.assertPixel(t, canvas, 37,13, 0,255,0,255, "37,13", "0,255,0,255");
  helpers.assertPixel(t, canvas, 38,13, 0,255,0,255, "38,13", "0,255,0,255");
  helpers.assertPixel(t, canvas, 38,12, 0,255,0,255, "38,12", "0,255,0,255");
  
  helpers.assertPixel(t, canvas, 86,14, 0,255,0,255, "86,14", "0,255,0,255");
  helpers.assertPixel(t, canvas, 86,13, 0,255,0,255, "86,13", "0,255,0,255");
  helpers.assertPixel(t, canvas, 87,13, 0,255,0,255, "87,13", "0,255,0,255");
  helpers.assertPixel(t, canvas, 88,13, 0,255,0,255, "88,13", "0,255,0,255");
  helpers.assertPixel(t, canvas, 88,12, 0,255,0,255, "88,12", "0,255,0,255");

  t.end()
});


test('2d.line.join.valid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.lineJoin = 'bevel'
  helpers.assertEqual(t, ctx.lineJoin, 'bevel', "ctx.lineJoin", "'bevel'");
  
  ctx.lineJoin = 'round';
  helpers.assertEqual(t, ctx.lineJoin, 'round', "ctx.lineJoin", "'round'");
  
  ctx.lineJoin = 'miter';
  helpers.assertEqual(t, ctx.lineJoin, 'miter', "ctx.lineJoin", "'miter'");

  t.end()
});


test('2d.line.miter.acute', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineWidth = 200;
  ctx.lineJoin = 'miter';
  
  ctx.strokeStyle = '#0f0';
  ctx.miterLimit = 2.614;
  ctx.beginPath();
  ctx.moveTo(100, 1000);
  ctx.lineTo(100, 100);
  ctx.lineTo(1000, 1000);
  ctx.stroke();
  
  ctx.strokeStyle = '#f00';
  ctx.miterLimit = 2.613;
  ctx.beginPath();
  ctx.moveTo(100, 1000);
  ctx.lineTo(100, 100);
  ctx.lineTo(1000, 1000);
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.miter.exceeded', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineWidth = 400;
  ctx.lineJoin = 'miter';
  
  ctx.strokeStyle = '#f00';
  ctx.miterLimit = 1.414;
  ctx.beginPath();
  ctx.moveTo(200, 1000);
  ctx.lineTo(200, 200);
  ctx.lineTo(1000, 201); // slightly non-right-angle to avoid being a special case
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.miter.invalid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.miterLimit = 1.5;
  helpers.assertEqual(t, ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");
  
  ctx.miterLimit = 1.5;
  ctx.miterLimit = 0;
  helpers.assertEqual(t, ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");
  
  ctx.miterLimit = 1.5;
  ctx.miterLimit = -1;
  helpers.assertEqual(t, ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");
  
  ctx.miterLimit = 1.5;
  ctx.miterLimit = Infinity;
  helpers.assertEqual(t, ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");
  
  ctx.miterLimit = 1.5;
  ctx.miterLimit = -Infinity;
  helpers.assertEqual(t, ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");
  
  ctx.miterLimit = 1.5;
  ctx.miterLimit = NaN;
  helpers.assertEqual(t, ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");

  t.end()
});


test('2d.line.miter.lineedge', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineWidth = 200;
  ctx.lineJoin = 'miter';
  
  ctx.strokeStyle = '#f00';
  ctx.miterLimit = 1.414;
  ctx.beginPath();
  ctx.strokeRect(100, 25, 200, 0);
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.miter.obtuse', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineWidth = 1600;
  ctx.lineJoin = 'miter';
  
  ctx.strokeStyle = '#0f0';
  ctx.miterLimit = 1.083;
  ctx.beginPath();
  ctx.moveTo(800, 10000);
  ctx.lineTo(800, 300);
  ctx.lineTo(10000, -8900);
  ctx.stroke();
  
  ctx.strokeStyle = '#f00';
  ctx.miterLimit = 1.082;
  ctx.beginPath();
  ctx.moveTo(800, 10000);
  ctx.lineTo(800, 300);
  ctx.lineTo(10000, -8900);
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.miter.rightangle', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineWidth = 400;
  ctx.lineJoin = 'miter';
  
  ctx.strokeStyle = '#f00';
  ctx.miterLimit = 1.414;
  ctx.beginPath();
  ctx.moveTo(200, 1000);
  ctx.lineTo(200, 200);
  ctx.lineTo(1000, 200);
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.miter.valid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.miterLimit = 1.5;
  helpers.assertEqual(t, ctx.miterLimit, 1.5, "ctx.miterLimit", "1.5");
  
  ctx.miterLimit = "1e1";
  helpers.assertEqual(t, ctx.miterLimit, 10, "ctx.miterLimit", "10");
  
  ctx.miterLimit = 1/1024;
  helpers.assertEqual(t, ctx.miterLimit, 1/1024, "ctx.miterLimit", "1/1024");
  
  ctx.miterLimit = 1000;
  helpers.assertEqual(t, ctx.miterLimit, 1000, "ctx.miterLimit", "1000");

  t.end()
});


test('2d.line.miter.within', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineWidth = 400;
  ctx.lineJoin = 'miter';
  
  ctx.strokeStyle = '#0f0';
  ctx.miterLimit = 1.416;
  ctx.beginPath();
  ctx.moveTo(200, 1000);
  ctx.lineTo(200, 200);
  ctx.lineTo(1000, 201);
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");

  t.end()
});


test('2d.line.union', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineWidth = 100;
  ctx.lineCap = 'round';
  
  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 24);
  ctx.lineTo(100, 25);
  ctx.lineTo(0, 26);
  ctx.closePath();
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,1, 0,255,0,255, "25,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,1, 0,255,0,255, "25,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");

  t.end()
});


test('2d.line.width.basic', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineWidth = 20;
  // Draw a green line over a red box, to check the line is not too small
  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  ctx.fillRect(15, 15, 20, 20);
  ctx.beginPath();
  ctx.moveTo(25, 15);
  ctx.lineTo(25, 35);
  ctx.stroke();
  
  // Draw a green box over a red line, to check the line is not too large
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(75, 15);
  ctx.lineTo(75, 35);
  ctx.stroke();
  ctx.fillRect(65, 15, 20, 20);
  
  helpers.assertPixel(t, canvas, 14,25, 0,255,0,255, "14,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 15,25, 0,255,0,255, "15,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 16,25, 0,255,0,255, "16,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 34,25, 0,255,0,255, "34,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 35,25, 0,255,0,255, "35,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 36,25, 0,255,0,255, "36,25", "0,255,0,255");
  
  helpers.assertPixel(t, canvas, 64,25, 0,255,0,255, "64,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 65,25, 0,255,0,255, "65,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 66,25, 0,255,0,255, "66,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 84,25, 0,255,0,255, "84,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 85,25, 0,255,0,255, "85,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 86,25, 0,255,0,255, "86,25", "0,255,0,255");

  t.end()
});


test('2d.line.width.invalid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.lineWidth = 1.5;
  helpers.assertEqual(t, ctx.lineWidth, 1.5, "ctx.lineWidth", "1.5");
  
  ctx.lineWidth = 1.5;
  ctx.lineWidth = 0;
  helpers.assertEqual(t, ctx.lineWidth, 1.5, "ctx.lineWidth", "1.5");
  
  ctx.lineWidth = 1.5;
  ctx.lineWidth = -1;
  helpers.assertEqual(t, ctx.lineWidth, 1.5, "ctx.lineWidth", "1.5");
  
  ctx.lineWidth = 1.5;
  ctx.lineWidth = Infinity;
  helpers.assertEqual(t, ctx.lineWidth, 1.5, "ctx.lineWidth", "1.5");
  
  ctx.lineWidth = 1.5;
  ctx.lineWidth = -Infinity;
  helpers.assertEqual(t, ctx.lineWidth, 1.5, "ctx.lineWidth", "1.5");
  
  ctx.lineWidth = 1.5;
  ctx.lineWidth = NaN;
  helpers.assertEqual(t, ctx.lineWidth, 1.5, "ctx.lineWidth", "1.5");

  t.end()
});


test('2d.line.width.scaledefault', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.scale(50, 50);
  ctx.strokeStyle = '#0f0';
  ctx.moveTo(0, 0.5);
  ctx.lineTo(2, 0.5);
  ctx.stroke();
  
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,5, 0,255,0,255, "50,5", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,45, 0,255,0,255, "50,45", "0,255,0,255");

  t.end()
});


test('2d.line.width.transformed', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.lineWidth = 4;
  // Draw a green line over a red box, to check the line is not too small
  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  ctx.fillRect(15, 15, 20, 20);
  ctx.save();
   ctx.scale(5, 1);
   ctx.beginPath();
   ctx.moveTo(5, 15);
   ctx.lineTo(5, 35);
   ctx.stroke();
  ctx.restore();
  
  // Draw a green box over a red line, to check the line is not too large
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  ctx.save();
   ctx.scale(-5, 1);
   ctx.beginPath();
   ctx.moveTo(-15, 15);
   ctx.lineTo(-15, 35);
   ctx.stroke();
  ctx.restore();
  ctx.fillRect(65, 15, 20, 20);
  
  helpers.assertPixel(t, canvas, 14,25, 0,255,0,255, "14,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 15,25, 0,255,0,255, "15,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 16,25, 0,255,0,255, "16,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 34,25, 0,255,0,255, "34,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 35,25, 0,255,0,255, "35,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 36,25, 0,255,0,255, "36,25", "0,255,0,255");
  
  helpers.assertPixel(t, canvas, 64,25, 0,255,0,255, "64,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 65,25, 0,255,0,255, "65,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 66,25, 0,255,0,255, "66,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 84,25, 0,255,0,255, "84,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 85,25, 0,255,0,255, "85,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 86,25, 0,255,0,255, "86,25", "0,255,0,255");

  t.end()
});


test('2d.line.width.valid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.lineWidth = 1.5;
  helpers.assertEqual(t, ctx.lineWidth, 1.5, "ctx.lineWidth", "1.5");
  
  ctx.lineWidth = "1e1";
  helpers.assertEqual(t, ctx.lineWidth, 10, "ctx.lineWidth", "10");
  
  ctx.lineWidth = 1/1024;
  helpers.assertEqual(t, ctx.lineWidth, 1/1024, "ctx.lineWidth", "1/1024");
  
  ctx.lineWidth = 1000;
  helpers.assertEqual(t, ctx.lineWidth, 1000, "ctx.lineWidth", "1000");

  t.end()
});

