var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.path.arc.angle.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.arc(100, 0, 150, Math.PI/2, -Math.PI, true);
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.angle.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.arc(100, 0, 150, -3*Math.PI/2, -Math.PI, true);
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.angle.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.arc(100, 0, 150, (512+1/2)*Math.PI, (1024-1)*Math.PI, true);
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.angle.4','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.arc(50, 25, 60, (512+1/2)*Math.PI, (1024-1)*Math.PI, false);
  ctx.fill();
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.angle.5','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.arc(100, 0, 150, (1024-1)*Math.PI, (512+1/2)*Math.PI, false);
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.angle.6','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.arc(50, 25, 60, (1024-1)*Math.PI, (512+1/2)*Math.PI, true);
  ctx.fill();
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.empty','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.arc(200, 25, 5, 0, 2*Math.PI, true);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.end','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;
  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(-100, 0);
  ctx.arc(-100, 0, 25, -Math.PI/2, Math.PI/2, true);
  ctx.lineTo(100, 25);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.negative',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.arc(0, 0, -1, 0, 0, true);
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.arc(0, 0, -1, 0, 0, true)"); }

  t.done()
});


test(module, '2d.path.arc.nonempty','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;
  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.arc(200, 25, 5, 0, 2*Math.PI, true);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.arc(Infinity, 0, 50, 0, 2*Math.PI, true);
  ctx.arc(-Infinity, 0, 50, 0, 2*Math.PI, true);
  ctx.arc(NaN, 0, 50, 0, 2*Math.PI, true);
  ctx.arc(0, Infinity, 50, 0, 2*Math.PI, true);
  ctx.arc(0, -Infinity, 50, 0, 2*Math.PI, true);
  ctx.arc(0, NaN, 50, 0, 2*Math.PI, true);
  ctx.arc(0, 0, Infinity, 0, 2*Math.PI, true);
  ctx.arc(0, 0, -Infinity, 0, 2*Math.PI, true);
  ctx.arc(0, 0, NaN, 0, 2*Math.PI, true);
  ctx.arc(0, 0, 50, Infinity, 2*Math.PI, true);
  ctx.arc(0, 0, 50, -Infinity, 2*Math.PI, true);
  ctx.arc(0, 0, 50, NaN, 2*Math.PI, true);
  ctx.arc(0, 0, 50, 0, Infinity, true);
  ctx.arc(0, 0, 50, 0, -Infinity, true);
  ctx.arc(0, 0, 50, 0, NaN, true);
  ctx.arc(Infinity, Infinity, 50, 0, 2*Math.PI, true);
  ctx.arc(Infinity, Infinity, Infinity, 0, 2*Math.PI, true);
  ctx.arc(Infinity, Infinity, Infinity, Infinity, 2*Math.PI, true);
  ctx.arc(Infinity, Infinity, Infinity, Infinity, Infinity, true);
  ctx.arc(Infinity, Infinity, Infinity, 0, Infinity, true);
  ctx.arc(Infinity, Infinity, 50, Infinity, 2*Math.PI, true);
  ctx.arc(Infinity, Infinity, 50, Infinity, Infinity, true);
  ctx.arc(Infinity, Infinity, 50, 0, Infinity, true);
  ctx.arc(Infinity, 0, Infinity, 0, 2*Math.PI, true);
  ctx.arc(Infinity, 0, Infinity, Infinity, 2*Math.PI, true);
  ctx.arc(Infinity, 0, Infinity, Infinity, Infinity, true);
  ctx.arc(Infinity, 0, Infinity, 0, Infinity, true);
  ctx.arc(Infinity, 0, 50, Infinity, 2*Math.PI, true);
  ctx.arc(Infinity, 0, 50, Infinity, Infinity, true);
  ctx.arc(Infinity, 0, 50, 0, Infinity, true);
  ctx.arc(0, Infinity, Infinity, 0, 2*Math.PI, true);
  ctx.arc(0, Infinity, Infinity, Infinity, 2*Math.PI, true);
  ctx.arc(0, Infinity, Infinity, Infinity, Infinity, true);
  ctx.arc(0, Infinity, Infinity, 0, Infinity, true);
  ctx.arc(0, Infinity, 50, Infinity, 2*Math.PI, true);
  ctx.arc(0, Infinity, 50, Infinity, Infinity, true);
  ctx.arc(0, Infinity, 50, 0, Infinity, true);
  ctx.arc(0, 0, Infinity, Infinity, 2*Math.PI, true);
  ctx.arc(0, 0, Infinity, Infinity, Infinity, true);
  ctx.arc(0, 0, Infinity, 0, Infinity, true);
  ctx.arc(0, 0, 50, Infinity, Infinity, true);
  ctx.lineTo(100, 50);
  ctx.lineTo(0, 50);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 90,45, 0,255,0,255, "90,45", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.scale.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.scale(2, 0.5);
  ctx.fillStyle = '#0f0';
  ctx.beginPath();
  ctx.arc(25, 50, 56, 0, 2*Math.PI, false);
  ctx.fill();
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(-25, 50);
  ctx.arc(-25, 50, 24, 0, 2*Math.PI, false);
  ctx.moveTo(75, 50);
  ctx.arc(75, 50, 24, 0, 2*Math.PI, false);
  ctx.moveTo(25, -25);
  ctx.arc(25, -25, 24, 0, 2*Math.PI, false);
  ctx.moveTo(25, 125);
  ctx.arc(25, 125, 24, 0, 2*Math.PI, false);
  ctx.fill();

  helpers.assertPixel(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,0, 0,255,0,255, "50,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,25, 0,255,0,255, "0,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,25, 0,255,0,255, "99,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,49, 0,255,0,255, "50,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.scale.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.scale(100, 100);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(0, 0, 0.6, 0, Math.PI/2, false);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,1, 0,255,0,255, "50,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,25, 0,255,0,255, "1,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,25, 0,255,0,255, "98,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,48, 0,255,0,255, "50,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.selfintersect.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 200;
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.arc(100, 50, 25, 0, -Math.PI/2, true);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 25, 0, -Math.PI/2, true);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.selfintersect.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 180;
  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.arc(-50, 50, 25, 0, -Math.PI/2, true);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(100, 0, 25, 0, -Math.PI/2, true);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 90,10, 0,255,0,255, "90,10", "0,255,0,255");
  helpers.assertPixel(t, canvas, 97,1, 0,255,0,255, "97,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 97,2, 0,255,0,255, "97,2", "0,255,0,255");
  helpers.assertPixel(t, canvas, 97,3, 0,255,0,255, "97,3", "0,255,0,255");
  helpers.assertPixel(t, canvas, 2,48, 0,255,0,255, "2,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.shape.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.arc(50, 50, 50, 0, Math.PI, false);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 20,48, 0,255,0,255, "20,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.shape.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 100;
  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.arc(50, 50, 50, 0, Math.PI, true);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 20,48, 0,255,0,255, "20,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.shape.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 100;
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.arc(0, 50, 50, 0, -Math.PI/2, false);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.shape.4','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 150;
  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.arc(-50, 50, 100, 0, -Math.PI/2, true);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.shape.5','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 200;
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.arc(300, 0, 100, 0, 5*Math.PI, false);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.twopie.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 100;
  ctx.beginPath();
  ctx.arc(50, 25, 50, 0, 2*Math.PI - 1e-4, true);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,20, 0,255,0,255, "50,20", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.twopie.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 100;
  ctx.beginPath();
  ctx.arc(50, 25, 50, 0, 2*Math.PI - 1e-4, false);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,20, 0,255,0,255, "50,20", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.twopie.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 100;
  ctx.beginPath();
  ctx.arc(50, 25, 50, 0, 2*Math.PI + 1e-4, true);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,20, 0,255,0,255, "50,20", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.twopie.4','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 100;
  ctx.beginPath();
  ctx.arc(50, 25, 50, 0, 2*Math.PI + 1e-4, false);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,20, 0,255,0,255, "50,20", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.zero.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 100;
  ctx.beginPath();
  ctx.arc(50, 25, 50, 0, 0, true);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,20, 0,255,0,255, "50,20", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.zero.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 100;
  ctx.beginPath();
  ctx.arc(50, 25, 50, 0, 0, false);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,20, 0,255,0,255, "50,20", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arc.zeroradius','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00'
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;
  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.arc(200, 25, 0, 0, Math.PI, true);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.coincide.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;

  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.arcTo(0, 25, 50, 1000, 1);
  ctx.lineTo(100, 25);
  ctx.stroke();

  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.arcTo(50, 25, 100, 25, 1);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,1, 0,255,0,255, "50,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,48, 0,255,0,255, "50,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.coincide.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;
  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.arcTo(100, 25, 100, 25, 1);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.collinear.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;

  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.arcTo(100, 25, 200, 25, 1);
  ctx.stroke();

  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(-100, 25);
  ctx.arcTo(0, 25, 100, 25, 1);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.collinear.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;

  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.arcTo(100, 25, 10, 25, 1);
  ctx.stroke();

  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(100, 25);
  ctx.arcTo(200, 25, 110, 25, 1);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.collinear.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;

  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.arcTo(100, 25, -100, 25, 1);
  ctx.stroke();

  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(100, 25);
  ctx.arcTo(200, 25, 0, 25, 1);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-100, 25);
  ctx.arcTo(0, 25, -200, 25, 1);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.ensuresubpath.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;
  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.arcTo(100, 50, 200, 50, 0.1);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.ensuresubpath.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;
  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.arcTo(0, 25, 50, 250, 0.1); // adds (x1,y1), draws nothing
  ctx.lineTo(100, 25);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.negative',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.arcTo(0, 0, 0, 0, -1);
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.arcTo(0, 0, 0, 0, -1)"); }

  t.done()
});


test(module, '2d.path.arcTo.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.arcTo(Infinity, 50, 0, 50, 0);
  ctx.arcTo(-Infinity, 50, 0, 50, 0);
  ctx.arcTo(NaN, 50, 0, 50, 0);
  ctx.arcTo(0, Infinity, 0, 50, 0);
  ctx.arcTo(0, -Infinity, 0, 50, 0);
  ctx.arcTo(0, NaN, 0, 50, 0);
  ctx.arcTo(0, 50, Infinity, 50, 0);
  ctx.arcTo(0, 50, -Infinity, 50, 0);
  ctx.arcTo(0, 50, NaN, 50, 0);
  ctx.arcTo(0, 50, 0, Infinity, 0);
  ctx.arcTo(0, 50, 0, -Infinity, 0);
  ctx.arcTo(0, 50, 0, NaN, 0);
  ctx.arcTo(0, 50, 0, 50, Infinity);
  ctx.arcTo(0, 50, 0, 50, -Infinity);
  ctx.arcTo(0, 50, 0, 50, NaN);
  ctx.arcTo(Infinity, Infinity, 0, 50, 0);
  ctx.arcTo(Infinity, Infinity, Infinity, 50, 0);
  ctx.arcTo(Infinity, Infinity, Infinity, Infinity, 0);
  ctx.arcTo(Infinity, Infinity, Infinity, Infinity, Infinity);
  ctx.arcTo(Infinity, Infinity, Infinity, 50, Infinity);
  ctx.arcTo(Infinity, Infinity, 0, Infinity, 0);
  ctx.arcTo(Infinity, Infinity, 0, Infinity, Infinity);
  ctx.arcTo(Infinity, Infinity, 0, 50, Infinity);
  ctx.arcTo(Infinity, 50, Infinity, 50, 0);
  ctx.arcTo(Infinity, 50, Infinity, Infinity, 0);
  ctx.arcTo(Infinity, 50, Infinity, Infinity, Infinity);
  ctx.arcTo(Infinity, 50, Infinity, 50, Infinity);
  ctx.arcTo(Infinity, 50, 0, Infinity, 0);
  ctx.arcTo(Infinity, 50, 0, Infinity, Infinity);
  ctx.arcTo(Infinity, 50, 0, 50, Infinity);
  ctx.arcTo(0, Infinity, Infinity, 50, 0);
  ctx.arcTo(0, Infinity, Infinity, Infinity, 0);
  ctx.arcTo(0, Infinity, Infinity, Infinity, Infinity);
  ctx.arcTo(0, Infinity, Infinity, 50, Infinity);
  ctx.arcTo(0, Infinity, 0, Infinity, 0);
  ctx.arcTo(0, Infinity, 0, Infinity, Infinity);
  ctx.arcTo(0, Infinity, 0, 50, Infinity);
  ctx.arcTo(0, 50, Infinity, Infinity, 0);
  ctx.arcTo(0, 50, Infinity, Infinity, Infinity);
  ctx.arcTo(0, 50, Infinity, 50, Infinity);
  ctx.arcTo(0, 50, 0, Infinity, Infinity);
  ctx.lineTo(100, 50);
  ctx.lineTo(0, 50);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 90,45, 0,255,0,255, "90,45", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.scale','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 50);
  ctx.translate(100, 0);
  ctx.scale(0.1, 1);
  ctx.arcTo(50, 50, 50, 0, 50);
  ctx.lineTo(-1000, 0);
  ctx.fill();

  helpers.assertPixel(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,0, 0,255,0,255, "50,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,25, 0,255,0,255, "0,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,25, 0,255,0,255, "99,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,49, 0,255,0,255, "50,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.shape.curve1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Skia antialiasing on fills causes a ~.4% deviation on opacity
  // resulting in 254 instead of 255.  The following was changed
  // from 1.5 to 1.75 to account for this minor issue.

  var tol = 1.75; // tolerance to avoid antialiasing artifacts

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(10, 25);
  ctx.arcTo(75, 25, 75, 60, 20);
  ctx.stroke();

  ctx.fillStyle = '#0f0';
  ctx.beginPath();
  ctx.rect(10, 20, 45, 10);
  ctx.moveTo(80, 45);
  ctx.arc(55, 45, 25+tol, 0, -Math.PI/2, true);
  ctx.arc(55, 45, 15-tol, -Math.PI/2, 0, false);
  ctx.fill();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 55,19, 0,255,0,255, "55,19", "0,255,0,255");
  helpers.assertPixel(t, canvas, 55,20, 0,255,0,255, "55,20", "0,255,0,255");
  helpers.assertPixel(t, canvas, 55,21, 0,255,0,255, "55,21", "0,255,0,255");
  helpers.assertPixel(t, canvas, 64,22, 0,255,0,255, "64,22", "0,255,0,255");
  helpers.assertPixel(t, canvas, 65,21, 0,255,0,255, "65,21", "0,255,0,255");
  helpers.assertPixel(t, canvas, 72,28, 0,255,0,255, "72,28", "0,255,0,255");
  helpers.assertPixel(t, canvas, 73,27, 0,255,0,255, "73,27", "0,255,0,255");
  helpers.assertPixel(t, canvas, 78,36, 0,255,0,255, "78,36", "0,255,0,255");
  helpers.assertPixel(t, canvas, 79,35, 0,255,0,255, "79,35", "0,255,0,255");
  helpers.assertPixel(t, canvas, 80,44, 0,255,0,255, "80,44", "0,255,0,255");
  helpers.assertPixel(t, canvas, 80,45, 0,255,0,255, "80,45", "0,255,0,255");
  helpers.assertPixel(t, canvas, 80,46, 0,255,0,255, "80,46", "0,255,0,255");
  helpers.assertPixel(t, canvas, 65,45, 0,255,0,255, "65,45", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.shape.curve2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  var tol = 1.5; // tolerance to avoid antialiasing artifacts

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.rect(10, 20, 45, 10);
  ctx.moveTo(80, 45);
  ctx.arc(55, 45, 25-tol, 0, -Math.PI/2, true);
  ctx.arc(55, 45, 15+tol, -Math.PI/2, 0, false);
  ctx.fill();

  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(10, 25);
  ctx.arcTo(75, 25, 75, 60, 20);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 55,19, 0,255,0,255, "55,19", "0,255,0,255");
  helpers.assertPixel(t, canvas, 55,20, 0,255,0,255, "55,20", "0,255,0,255");
  helpers.assertPixel(t, canvas, 55,21, 0,255,0,255, "55,21", "0,255,0,255");
  helpers.assertPixel(t, canvas, 64,22, 0,255,0,255, "64,22", "0,255,0,255");
  helpers.assertPixel(t, canvas, 65,21, 0,255,0,255, "65,21", "0,255,0,255");
  helpers.assertPixel(t, canvas, 72,28, 0,255,0,255, "72,28", "0,255,0,255");
  helpers.assertPixel(t, canvas, 73,27, 0,255,0,255, "73,27", "0,255,0,255");
  helpers.assertPixel(t, canvas, 78,36, 0,255,0,255, "78,36", "0,255,0,255");
  helpers.assertPixel(t, canvas, 79,35, 0,255,0,255, "79,35", "0,255,0,255");
  helpers.assertPixel(t, canvas, 80,44, 0,255,0,255, "80,44", "0,255,0,255");
  helpers.assertPixel(t, canvas, 80,45, 0,255,0,255, "80,45", "0,255,0,255");
  helpers.assertPixel(t, canvas, 80,46, 0,255,0,255, "80,46", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.shape.end','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.moveTo(-100, -100);
  ctx.arcTo(-100, 25, 200, 25, 10);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.shape.start','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.arcTo(200, 25, 200, 50, 10);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.transformation','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 50);
  ctx.translate(100, 0);
  ctx.arcTo(50, 50, 50, 0, 50);
  ctx.lineTo(-100, 0);
  ctx.fill();

  helpers.assertPixel(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,0, 0,255,0,255, "50,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,25, 0,255,0,255, "0,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,25, 0,255,0,255, "99,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,49, 0,255,0,255, "50,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.zero.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;

  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.arcTo(100, 25, 100, 100, 0);
  ctx.stroke();

  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(0, -25);
  ctx.arcTo(50, -25, 50, 50, 0);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.arcTo.zero.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.lineWidth = 50;

  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.arcTo(100, 25, -100, 25, 0);
  ctx.stroke();

  ctx.strokeStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(100, 25);
  ctx.arcTo(200, 25, 50, 25, 0);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.beginPath','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.rect(0, 0, 100, 50);
  ctx.beginPath();
  ctx.fillStyle = '#f00';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.bezierCurveTo.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.bezierCurveTo(100, 25, 100, 25, 100, 25);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.bezierCurveTo.ensuresubpath.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.bezierCurveTo(100, 50, 200, 50, 200, 50);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255");

  t.done()
});


test(module, '2d.path.bezierCurveTo.ensuresubpath.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.bezierCurveTo(0, 25, 100, 25, 100, 25);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255");

  t.done()
});


test(module, '2d.path.bezierCurveTo.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.bezierCurveTo(Infinity, 50, 0, 50, 0, 50);
  ctx.bezierCurveTo(-Infinity, 50, 0, 50, 0, 50);
  ctx.bezierCurveTo(NaN, 50, 0, 50, 0, 50);
  ctx.bezierCurveTo(0, Infinity, 0, 50, 0, 50);
  ctx.bezierCurveTo(0, -Infinity, 0, 50, 0, 50);
  ctx.bezierCurveTo(0, NaN, 0, 50, 0, 50);
  ctx.bezierCurveTo(0, 50, Infinity, 50, 0, 50);
  ctx.bezierCurveTo(0, 50, -Infinity, 50, 0, 50);
  ctx.bezierCurveTo(0, 50, NaN, 50, 0, 50);
  ctx.bezierCurveTo(0, 50, 0, Infinity, 0, 50);
  ctx.bezierCurveTo(0, 50, 0, -Infinity, 0, 50);
  ctx.bezierCurveTo(0, 50, 0, NaN, 0, 50);
  ctx.bezierCurveTo(0, 50, 0, 50, Infinity, 50);
  ctx.bezierCurveTo(0, 50, 0, 50, -Infinity, 50);
  ctx.bezierCurveTo(0, 50, 0, 50, NaN, 50);
  ctx.bezierCurveTo(0, 50, 0, 50, 0, Infinity);
  ctx.bezierCurveTo(0, 50, 0, 50, 0, -Infinity);
  ctx.bezierCurveTo(0, 50, 0, 50, 0, NaN);
  ctx.bezierCurveTo(Infinity, Infinity, 0, 50, 0, 50);
  ctx.bezierCurveTo(Infinity, Infinity, Infinity, 50, 0, 50);
  ctx.bezierCurveTo(Infinity, Infinity, Infinity, Infinity, 0, 50);
  ctx.bezierCurveTo(Infinity, Infinity, Infinity, Infinity, Infinity, 50);
  ctx.bezierCurveTo(Infinity, Infinity, Infinity, Infinity, Infinity, Infinity);
  ctx.bezierCurveTo(Infinity, Infinity, Infinity, Infinity, 0, Infinity);
  ctx.bezierCurveTo(Infinity, Infinity, Infinity, 50, Infinity, 50);
  ctx.bezierCurveTo(Infinity, Infinity, Infinity, 50, Infinity, Infinity);
  ctx.bezierCurveTo(Infinity, Infinity, Infinity, 50, 0, Infinity);
  ctx.bezierCurveTo(Infinity, Infinity, 0, Infinity, 0, 50);
  ctx.bezierCurveTo(Infinity, Infinity, 0, Infinity, Infinity, 50);
  ctx.bezierCurveTo(Infinity, Infinity, 0, Infinity, Infinity, Infinity);
  ctx.bezierCurveTo(Infinity, Infinity, 0, Infinity, 0, Infinity);
  ctx.bezierCurveTo(Infinity, Infinity, 0, 50, Infinity, 50);
  ctx.bezierCurveTo(Infinity, Infinity, 0, 50, Infinity, Infinity);
  ctx.bezierCurveTo(Infinity, Infinity, 0, 50, 0, Infinity);
  ctx.bezierCurveTo(Infinity, 50, Infinity, 50, 0, 50);
  ctx.bezierCurveTo(Infinity, 50, Infinity, Infinity, 0, 50);
  ctx.bezierCurveTo(Infinity, 50, Infinity, Infinity, Infinity, 50);
  ctx.bezierCurveTo(Infinity, 50, Infinity, Infinity, Infinity, Infinity);
  ctx.bezierCurveTo(Infinity, 50, Infinity, Infinity, 0, Infinity);
  ctx.bezierCurveTo(Infinity, 50, Infinity, 50, Infinity, 50);
  ctx.bezierCurveTo(Infinity, 50, Infinity, 50, Infinity, Infinity);
  ctx.bezierCurveTo(Infinity, 50, Infinity, 50, 0, Infinity);
  ctx.bezierCurveTo(Infinity, 50, 0, Infinity, 0, 50);
  ctx.bezierCurveTo(Infinity, 50, 0, Infinity, Infinity, 50);
  ctx.bezierCurveTo(Infinity, 50, 0, Infinity, Infinity, Infinity);
  ctx.bezierCurveTo(Infinity, 50, 0, Infinity, 0, Infinity);
  ctx.bezierCurveTo(Infinity, 50, 0, 50, Infinity, 50);
  ctx.bezierCurveTo(Infinity, 50, 0, 50, Infinity, Infinity);
  ctx.bezierCurveTo(Infinity, 50, 0, 50, 0, Infinity);
  ctx.bezierCurveTo(0, Infinity, Infinity, 50, 0, 50);
  ctx.bezierCurveTo(0, Infinity, Infinity, Infinity, 0, 50);
  ctx.bezierCurveTo(0, Infinity, Infinity, Infinity, Infinity, 50);
  ctx.bezierCurveTo(0, Infinity, Infinity, Infinity, Infinity, Infinity);
  ctx.bezierCurveTo(0, Infinity, Infinity, Infinity, 0, Infinity);
  ctx.bezierCurveTo(0, Infinity, Infinity, 50, Infinity, 50);
  ctx.bezierCurveTo(0, Infinity, Infinity, 50, Infinity, Infinity);
  ctx.bezierCurveTo(0, Infinity, Infinity, 50, 0, Infinity);
  ctx.bezierCurveTo(0, Infinity, 0, Infinity, 0, 50);
  ctx.bezierCurveTo(0, Infinity, 0, Infinity, Infinity, 50);
  ctx.bezierCurveTo(0, Infinity, 0, Infinity, Infinity, Infinity);
  ctx.bezierCurveTo(0, Infinity, 0, Infinity, 0, Infinity);
  ctx.bezierCurveTo(0, Infinity, 0, 50, Infinity, 50);
  ctx.bezierCurveTo(0, Infinity, 0, 50, Infinity, Infinity);
  ctx.bezierCurveTo(0, Infinity, 0, 50, 0, Infinity);
  ctx.bezierCurveTo(0, 50, Infinity, Infinity, 0, 50);
  ctx.bezierCurveTo(0, 50, Infinity, Infinity, Infinity, 50);
  ctx.bezierCurveTo(0, 50, Infinity, Infinity, Infinity, Infinity);
  ctx.bezierCurveTo(0, 50, Infinity, Infinity, 0, Infinity);
  ctx.bezierCurveTo(0, 50, Infinity, 50, Infinity, 50);
  ctx.bezierCurveTo(0, 50, Infinity, 50, Infinity, Infinity);
  ctx.bezierCurveTo(0, 50, Infinity, 50, 0, Infinity);
  ctx.bezierCurveTo(0, 50, 0, Infinity, Infinity, 50);
  ctx.bezierCurveTo(0, 50, 0, Infinity, Infinity, Infinity);
  ctx.bezierCurveTo(0, 50, 0, Infinity, 0, Infinity);
  ctx.bezierCurveTo(0, 50, 0, 50, Infinity, Infinity);
  ctx.lineTo(100, 50);
  ctx.lineTo(0, 50);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 90,45, 0,255,0,255, "90,45", "0,255,0,255");

  t.done()
});


test(module, '2d.path.bezierCurveTo.scaled','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.scale(1000, 1000);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 0.055;
  ctx.beginPath();
  ctx.moveTo(-2, 3.1);
  ctx.bezierCurveTo(-2, -1, 2.1, -1, 2.1, 3.1);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.bezierCurveTo.shape','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 55;
  ctx.beginPath();
  ctx.moveTo(-2000, 3100);
  ctx.bezierCurveTo(-2000, -1000, 2100, -1000, 2100, 3100);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.clip.basic.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.beginPath();
  ctx.rect(0, 0, 100, 50);
  ctx.clip();

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.clip.basic.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.beginPath();
  ctx.rect(-100, 0, 100, 50);
  ctx.clip();

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.clip.empty','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.beginPath();
  ctx.clip();

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.clip.intersect','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.beginPath();
  ctx.rect(0, 0, 50, 50);
  ctx.clip();
  ctx.beginPath();
  ctx.rect(50, 0, 50, 50)
  ctx.clip();

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.clip.unaffected','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#0f0';

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 50);
  ctx.lineTo(100, 50);
  ctx.lineTo(100, 0);
  ctx.clip();

  ctx.lineTo(0, 0);
  ctx.fill();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.clip.winding.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.beginPath();
  ctx.moveTo(-10, -10);
  ctx.lineTo(110, -10);
  ctx.lineTo(110, 60);
  ctx.lineTo(-10, 60);
  ctx.lineTo(-10, -10);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, 50);
  ctx.lineTo(100, 50);
  ctx.lineTo(100, 0);
  ctx.clip();

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.clip.winding.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.beginPath();
  ctx.moveTo(-10, -10);
  ctx.lineTo(110, -10);
  ctx.lineTo(110, 60);
  ctx.lineTo(-10, 60);
  ctx.lineTo(-10, -10);
  ctx.clip();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 50);
  ctx.lineTo(100, 50);
  ctx.lineTo(100, 0);
  ctx.lineTo(0, 0);
  ctx.clip();

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.closePath.empty','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.closePath();
  ctx.fillStyle = '#f00';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.closePath.newline','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.moveTo(-100, 25);
  ctx.lineTo(-100, -100);
  ctx.lineTo(200, -100);
  ctx.lineTo(200, 25);
  ctx.closePath();
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.closePath.nextpoint','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.moveTo(-100, 25);
  ctx.lineTo(-100, -1000);
  ctx.closePath();
  ctx.lineTo(1000, 25);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.fill.closed.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#0f0';
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.lineTo(100, 50);
  ctx.lineTo(0, 50);
  ctx.fill();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.fill.closed.unaffected','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#00f';
  ctx.fillRect(0, 0, 100, 50);

  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.lineTo(100, 50);
  ctx.fillStyle = '#f00';
  ctx.fill();
  ctx.lineTo(0, 50);
  ctx.fillStyle = '#0f0';
  ctx.fill();

  helpers.assertPixel(t, canvas, 90,10, 0,255,0,255, "90,10", "0,255,0,255");
  helpers.assertPixel(t, canvas, 10,40, 0,255,0,255, "10,40", "0,255,0,255");

  t.done()
});


test(module, '2d.path.fill.overlap','2d.path.fill.overlap.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.rect(0, 0, 100, 50);
  ctx.closePath();
  ctx.rect(10, 10, 80, 30);
  ctx.fill();

  helpers.assertPixelApprox(t, canvas, 50,25, 0,127,0,255, "50,25", "0,127,0,255", 1);

  t.done()
});


test(module, '2d.path.fill.winding.add','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#0f0';
  ctx.moveTo(-10, -10);
  ctx.lineTo(110, -10);
  ctx.lineTo(110, 60);
  ctx.lineTo(-10, 60);
  ctx.lineTo(-10, -10);
  ctx.lineTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.lineTo(100, 50);
  ctx.lineTo(0, 50);
  ctx.fill();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.fill.winding.subtract.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#f00';
  ctx.moveTo(-10, -10);
  ctx.lineTo(110, -10);
  ctx.lineTo(110, 60);
  ctx.lineTo(-10, 60);
  ctx.lineTo(-10, -10);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, 50);
  ctx.lineTo(100, 50);
  ctx.lineTo(100, 0);
  ctx.fill();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.fill.winding.subtract.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#f00';
  ctx.moveTo(-10, -10);
  ctx.lineTo(110, -10);
  ctx.lineTo(110, 60);
  ctx.lineTo(-10, 60);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 50);
  ctx.lineTo(100, 50);
  ctx.lineTo(100, 0);
  ctx.fill();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.fill.winding.subtract.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#0f0';
  ctx.moveTo(-10, -10);
  ctx.lineTo(110, -10);
  ctx.lineTo(110, 60);
  ctx.lineTo(-10, 60);
  ctx.lineTo(-10, -10);
  ctx.lineTo(-20, -20);
  ctx.lineTo(120, -20);
  ctx.lineTo(120, 70);
  ctx.lineTo(-20, 70);
  ctx.lineTo(-20, -20);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, 50);
  ctx.lineTo(100, 50);
  ctx.lineTo(100, 0);
  ctx.fill();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.initial','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.closePath();
  ctx.fillStyle = '#f00';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.isPointInPath.arc',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.arc(50, 25, 10, 0, Math.PI, false);
  helpers.assertEqual(t, ctx.isPointInPath(50, 10), false, "ctx.isPointInPath(50, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(50, 20), false, "ctx.isPointInPath(50, 20)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(50, 30), true, "ctx.isPointInPath(50, 30)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(50, 40), false, "ctx.isPointInPath(50, 40)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(30, 20), false, "ctx.isPointInPath(30, 20)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(70, 20), false, "ctx.isPointInPath(70, 20)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(30, 30), false, "ctx.isPointInPath(30, 30)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(70, 30), false, "ctx.isPointInPath(70, 30)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.basic.1',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.rect(0, 0, 20, 20);
  helpers.assertEqual(t, ctx.isPointInPath(10, 10), true, "ctx.isPointInPath(10, 10)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(30, 10), false, "ctx.isPointInPath(30, 10)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.basic.2',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.rect(20, 0, 20, 20);
  helpers.assertEqual(t, ctx.isPointInPath(10, 10), false, "ctx.isPointInPath(10, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(30, 10), true, "ctx.isPointInPath(30, 10)", "true");

  t.done()
});


test(module, '2d.path.isPointInPath.bezier',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.moveTo(25, 25);
  ctx.bezierCurveTo(50, -50, 50, 100, 75, 25);
  helpers.assertEqual(t, ctx.isPointInPath(25, 20), false, "ctx.isPointInPath(25, 20)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(25, 30), false, "ctx.isPointInPath(25, 30)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(30, 20), true, "ctx.isPointInPath(30, 20)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(30, 30), false, "ctx.isPointInPath(30, 30)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(40, 2), false, "ctx.isPointInPath(40, 2)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(40, 20), true, "ctx.isPointInPath(40, 20)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(40, 30), false, "ctx.isPointInPath(40, 30)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(40, 47), false, "ctx.isPointInPath(40, 47)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(45, 20), true, "ctx.isPointInPath(45, 20)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(45, 30), false, "ctx.isPointInPath(45, 30)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(55, 20), false, "ctx.isPointInPath(55, 20)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(55, 30), true, "ctx.isPointInPath(55, 30)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(60, 2), false, "ctx.isPointInPath(60, 2)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(60, 20), false, "ctx.isPointInPath(60, 20)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(60, 30), true, "ctx.isPointInPath(60, 30)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(60, 47), false, "ctx.isPointInPath(60, 47)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(70, 20), false, "ctx.isPointInPath(70, 20)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(70, 30), true, "ctx.isPointInPath(70, 30)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(75, 20), false, "ctx.isPointInPath(75, 20)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(75, 30), false, "ctx.isPointInPath(75, 30)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.bigarc',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.arc(50, 25, 10, 0, 7, false);
  helpers.assertEqual(t, ctx.isPointInPath(50, 10), false, "ctx.isPointInPath(50, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(50, 20), true, "ctx.isPointInPath(50, 20)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(50, 30), true, "ctx.isPointInPath(50, 30)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(50, 40), false, "ctx.isPointInPath(50, 40)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(30, 20), false, "ctx.isPointInPath(30, 20)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(70, 20), false, "ctx.isPointInPath(70, 20)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(30, 30), false, "ctx.isPointInPath(30, 30)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(70, 30), false, "ctx.isPointInPath(70, 30)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.edge',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.rect(0, 0, 20, 20);
  helpers.assertEqual(t, ctx.isPointInPath(0, 0), true, "ctx.isPointInPath(0, 0)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(10, 0), true, "ctx.isPointInPath(10, 0)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(20, 0), true, "ctx.isPointInPath(20, 0)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(20, 10), true, "ctx.isPointInPath(20, 10)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(20, 20), true, "ctx.isPointInPath(20, 20)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(10, 20), true, "ctx.isPointInPath(10, 20)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(0, 20), true, "ctx.isPointInPath(0, 20)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(0, 10), true, "ctx.isPointInPath(0, 10)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(10, -0.01), false, "ctx.isPointInPath(10, -0.01)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(10, 20.01), false, "ctx.isPointInPath(10, 20.01)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(-0.01, 10), false, "ctx.isPointInPath(-0.01, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(20.01, 10), false, "ctx.isPointInPath(20.01, 10)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.empty',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.isPointInPath(0, 0), false, "ctx.isPointInPath(0, 0)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.nonfinite',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.rect(-100, -50, 200, 100);
  helpers.assertEqual(t, ctx.isPointInPath(Infinity, 0), false, "ctx.isPointInPath(Infinity, 0)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(-Infinity, 0), false, "ctx.isPointInPath(-Infinity, 0)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(NaN, 0), false, "ctx.isPointInPath(NaN, 0)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(0, Infinity), false, "ctx.isPointInPath(0, Infinity)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(0, -Infinity), false, "ctx.isPointInPath(0, -Infinity)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(0, NaN), false, "ctx.isPointInPath(0, NaN)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(NaN, NaN), false, "ctx.isPointInPath(NaN, NaN)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.outside',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.rect(0, -100, 20, 20);
  ctx.rect(20, -10, 20, 20);
  helpers.assertEqual(t, ctx.isPointInPath(10, -110), false, "ctx.isPointInPath(10, -110)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(10, -90), true, "ctx.isPointInPath(10, -90)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(10, -70), false, "ctx.isPointInPath(10, -70)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(30, -20), false, "ctx.isPointInPath(30, -20)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(30, 0), true, "ctx.isPointInPath(30, 0)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(30, 20), false, "ctx.isPointInPath(30, 20)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.subpath',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.rect(0, 0, 20, 20);
  ctx.beginPath();
  ctx.rect(20, 0, 20, 20);
  ctx.closePath();
  ctx.rect(40, 0, 20, 20);
  helpers.assertEqual(t, ctx.isPointInPath(10, 10), false, "ctx.isPointInPath(10, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(30, 10), true, "ctx.isPointInPath(30, 10)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(50, 10), true, "ctx.isPointInPath(50, 10)", "true");

  t.done()
});


test(module, '2d.path.isPointInPath.transform.1',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.translate(50, 0);
  ctx.rect(0, 0, 20, 20);
  helpers.assertEqual(t, ctx.isPointInPath(-40, 10), false, "ctx.isPointInPath(-40, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(10, 10), false, "ctx.isPointInPath(10, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(49, 10), false, "ctx.isPointInPath(49, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(51, 10), true, "ctx.isPointInPath(51, 10)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(69, 10), true, "ctx.isPointInPath(69, 10)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(71, 10), false, "ctx.isPointInPath(71, 10)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.transform.2',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.rect(50, 0, 20, 20);
  ctx.translate(50, 0);
  helpers.assertEqual(t, ctx.isPointInPath(-40, 10), false, "ctx.isPointInPath(-40, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(10, 10), false, "ctx.isPointInPath(10, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(49, 10), false, "ctx.isPointInPath(49, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(51, 10), true, "ctx.isPointInPath(51, 10)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(69, 10), true, "ctx.isPointInPath(69, 10)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(71, 10), false, "ctx.isPointInPath(71, 10)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.transform.3',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.scale(-1, 1);
  ctx.rect(-70, 0, 20, 20);
  helpers.assertEqual(t, ctx.isPointInPath(-40, 10), false, "ctx.isPointInPath(-40, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(10, 10), false, "ctx.isPointInPath(10, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(49, 10), false, "ctx.isPointInPath(49, 10)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(51, 10), true, "ctx.isPointInPath(51, 10)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(69, 10), true, "ctx.isPointInPath(69, 10)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(71, 10), false, "ctx.isPointInPath(71, 10)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.unclosed',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.moveTo(0, 0);
  ctx.lineTo(20, 0);
  ctx.lineTo(20, 20);
  ctx.lineTo(0, 20);
  helpers.assertEqual(t, ctx.isPointInPath(10, 10), true, "ctx.isPointInPath(10, 10)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(30, 10), false, "ctx.isPointInPath(30, 10)", "false");

  t.done()
});


test(module, '2d.path.isPointInPath.winding',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Create a square ring, using opposite windings to make a hole in the centre
  ctx.moveTo(0, 0);
  ctx.lineTo(50, 0);
  ctx.lineTo(50, 50);
  ctx.lineTo(0, 50);
  ctx.lineTo(0, 0);
  ctx.lineTo(10, 10);
  ctx.lineTo(10, 40);
  ctx.lineTo(40, 40);
  ctx.lineTo(40, 10);
  ctx.lineTo(10, 10);

  helpers.assertEqual(t, ctx.isPointInPath(5, 5), true, "ctx.isPointInPath(5, 5)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(25, 5), true, "ctx.isPointInPath(25, 5)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(45, 5), true, "ctx.isPointInPath(45, 5)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(5, 25), true, "ctx.isPointInPath(5, 25)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(25, 25), false, "ctx.isPointInPath(25, 25)", "false");
  helpers.assertEqual(t, ctx.isPointInPath(45, 25), true, "ctx.isPointInPath(45, 25)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(5, 45), true, "ctx.isPointInPath(5, 45)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(25, 45), true, "ctx.isPointInPath(25, 45)", "true");
  helpers.assertEqual(t, ctx.isPointInPath(45, 45), true, "ctx.isPointInPath(45, 45)", "true");

  t.done()
});


test(module, '2d.path.lineTo.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.lineTo(100, 25);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.lineTo.ensuresubpath.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.lineTo(100, 50);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.lineTo.ensuresubpath.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.lineTo(0, 25);
  ctx.lineTo(100, 25);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.lineTo.nextpoint','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.moveTo(-100, -100);
  ctx.lineTo(0, 25);
  ctx.lineTo(100, 25);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.lineTo.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.lineTo(Infinity, 50);
  ctx.lineTo(-Infinity, 50);
  ctx.lineTo(NaN, 50);
  ctx.lineTo(0, Infinity);
  ctx.lineTo(0, -Infinity);
  ctx.lineTo(0, NaN);
  ctx.lineTo(Infinity, Infinity);
  ctx.lineTo(100, 50);
  ctx.lineTo(0, 50);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 90,45, 0,255,0,255, "90,45", "0,255,0,255");

  t.done()
});


test(module, '2d.path.moveTo.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.rect(0, 0, 10, 50);
  ctx.moveTo(100, 0);
  ctx.lineTo(10, 0);
  ctx.lineTo(10, 50);
  ctx.lineTo(100, 50);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 90,25, 0,255,0,255, "90,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.moveTo.multiple','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.moveTo(0, 25);
  ctx.moveTo(100, 25);
  ctx.moveTo(0, 25);
  ctx.lineTo(100, 25);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.moveTo.newsubpath','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.moveTo(100, 0);
  ctx.moveTo(100, 50);
  ctx.moveTo(0, 50);
  ctx.fillStyle = '#f00';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.moveTo.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.moveTo(Infinity, 50);
  ctx.moveTo(-Infinity, 50);
  ctx.moveTo(NaN, 50);
  ctx.moveTo(0, Infinity);
  ctx.moveTo(0, -Infinity);
  ctx.moveTo(0, NaN);
  ctx.moveTo(Infinity, Infinity);
  ctx.lineTo(100, 50);
  ctx.lineTo(0, 50);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.quadraticCurveTo.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.quadraticCurveTo(100, 25, 100, 25);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.quadraticCurveTo.ensuresubpath.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.quadraticCurveTo(100, 50, 200, 50);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255");

  t.done()
});


test(module, '2d.path.quadraticCurveTo.ensuresubpath.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.quadraticCurveTo(0, 25, 100, 25);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255");

  t.done()
});


test(module, '2d.path.quadraticCurveTo.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.quadraticCurveTo(Infinity, 50, 0, 50);
  ctx.quadraticCurveTo(-Infinity, 50, 0, 50);
  ctx.quadraticCurveTo(NaN, 50, 0, 50);
  ctx.quadraticCurveTo(0, Infinity, 0, 50);
  ctx.quadraticCurveTo(0, -Infinity, 0, 50);
  ctx.quadraticCurveTo(0, NaN, 0, 50);
  ctx.quadraticCurveTo(0, 50, Infinity, 50);
  ctx.quadraticCurveTo(0, 50, -Infinity, 50);
  ctx.quadraticCurveTo(0, 50, NaN, 50);
  ctx.quadraticCurveTo(0, 50, 0, Infinity);
  ctx.quadraticCurveTo(0, 50, 0, -Infinity);
  ctx.quadraticCurveTo(0, 50, 0, NaN);
  ctx.quadraticCurveTo(Infinity, Infinity, 0, 50);
  ctx.quadraticCurveTo(Infinity, Infinity, Infinity, 50);
  ctx.quadraticCurveTo(Infinity, Infinity, Infinity, Infinity);
  ctx.quadraticCurveTo(Infinity, Infinity, 0, Infinity);
  ctx.quadraticCurveTo(Infinity, 50, Infinity, 50);
  ctx.quadraticCurveTo(Infinity, 50, Infinity, Infinity);
  ctx.quadraticCurveTo(Infinity, 50, 0, Infinity);
  ctx.quadraticCurveTo(0, Infinity, Infinity, 50);
  ctx.quadraticCurveTo(0, Infinity, Infinity, Infinity);
  ctx.quadraticCurveTo(0, Infinity, 0, Infinity);
  ctx.quadraticCurveTo(0, 50, Infinity, Infinity);
  ctx.lineTo(100, 50);
  ctx.lineTo(0, 50);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 90,45, 0,255,0,255, "90,45", "0,255,0,255");

  t.done()
});


test(module, '2d.path.quadraticCurveTo.scaled','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.scale(1000, 1000);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 0.055;
  ctx.beginPath();
  ctx.moveTo(-1, 1.05);
  ctx.quadraticCurveTo(0, -1, 1.2, 1.05);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.quadraticCurveTo.shape','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 55;
  ctx.beginPath();
  ctx.moveTo(-1000, 1050);
  ctx.quadraticCurveTo(0, -1000, 1200, 1050);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.rect(0, 0, 100, 50);
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.closed','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 200;
  ctx.lineJoin = 'miter';
  ctx.rect(100, 50, 100, 100);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.end.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 100;
  ctx.rect(200, 100, 400, 1000);
  ctx.lineTo(-2000, -1000);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.end.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 450;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'bevel';
  ctx.rect(150, 150, 2000, 2000);
  ctx.lineTo(160, 160);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.negative',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.beginPath();
  ctx.fillStyle = '#0f0';
  ctx.rect(0, 0, 50, 25);
  ctx.rect(100, 0, -50, 25);
  ctx.rect(0, 50, 50, -25);
  ctx.rect(100, 50, -50, -25);
  ctx.fill();
  helpers.assertPixel(t, canvas, 25,12, 0,255,0,255, "25,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,12, 0,255,0,255, "75,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,37, 0,255,0,255, "25,37", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,37, 0,255,0,255, "75,37", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.newsubpath','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.beginPath();
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.moveTo(-100, 25);
  ctx.lineTo(-50, 25);
  ctx.rect(200, 25, 1, 1);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.rect(Infinity, 50, 1, 1);
  ctx.rect(-Infinity, 50, 1, 1);
  ctx.rect(NaN, 50, 1, 1);
  ctx.rect(0, Infinity, 1, 1);
  ctx.rect(0, -Infinity, 1, 1);
  ctx.rect(0, NaN, 1, 1);
  ctx.rect(0, 50, Infinity, 1);
  ctx.rect(0, 50, -Infinity, 1);
  ctx.rect(0, 50, NaN, 1);
  ctx.rect(0, 50, 1, Infinity);
  ctx.rect(0, 50, 1, -Infinity);
  ctx.rect(0, 50, 1, NaN);
  ctx.rect(Infinity, Infinity, 1, 1);
  ctx.rect(Infinity, Infinity, Infinity, 1);
  ctx.rect(Infinity, Infinity, Infinity, Infinity);
  ctx.rect(Infinity, Infinity, 1, Infinity);
  ctx.rect(Infinity, 50, Infinity, 1);
  ctx.rect(Infinity, 50, Infinity, Infinity);
  ctx.rect(Infinity, 50, 1, Infinity);
  ctx.rect(0, Infinity, Infinity, 1);
  ctx.rect(0, Infinity, Infinity, Infinity);
  ctx.rect(0, Infinity, 1, Infinity);
  ctx.rect(0, 50, Infinity, Infinity);
  ctx.lineTo(100, 50);
  ctx.lineTo(0, 50);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 90,45, 0,255,0,255, "90,45", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.selfintersect','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 90;
  ctx.beginPath();
  ctx.rect(45, 20, 10, 10);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.winding',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.beginPath();
  ctx.fillStyle = '#f00';
  ctx.rect(0, 0, 50, 50);
  ctx.rect(100, 50, -50, -50);
  ctx.rect(0, 25, 100, -25);
  ctx.rect(100, 25, -100, 25);
  ctx.fill();
  helpers.assertPixel(t, canvas, 25,12, 0,255,0,255, "25,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,12, 0,255,0,255, "75,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 25,37, 0,255,0,255, "25,37", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,37, 0,255,0,255, "75,37", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.zero.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 100;
  ctx.beginPath();
  ctx.rect(0, 50, 100, 0);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.zero.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 100;
  ctx.beginPath();
  ctx.rect(50, -100, 0, 250);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.zero.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 100;
  ctx.beginPath();
  ctx.rect(50, 25, 0, 0);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.zero.4','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 50;
  ctx.rect(100, 25, 0, 0);
  ctx.lineTo(0, 25);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.zero.5','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.moveTo(0, 0);
  ctx.rect(100, 25, 0, 0);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.rect.zero.6','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 1.5;
  ctx.lineWidth = 200;
  ctx.beginPath();
  ctx.rect(100, 25, 1000, 0);
  ctx.stroke();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.empty','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 100;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(40, 25);
  ctx.moveTo(60, 25);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.overlap','2d.path.stroke.overlap.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);

  ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.lineWidth = 50;
  ctx.moveTo(0, 20);
  ctx.lineTo(100, 20);
  ctx.moveTo(0, 30);
  ctx.lineTo(100, 30);
  ctx.stroke();

  helpers.assertPixelApprox(t, canvas, 50,25, 0,127,0,255, "50,25", "0,127,0,255", 1);

  t.done()
});


test(module, '2d.path.stroke.prune.arc','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 100;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.arcTo(50, 25, 150, 25, 10);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.arc(50, 25, 10, 0, 0, false);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.prune.closed','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 100;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.lineTo(50, 25);
  ctx.closePath();
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.prune.corner','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 400;
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 1.4;

  ctx.beginPath();
  ctx.moveTo(-1000, 200, 0, 0);
  ctx.lineTo(-100, 200);
  ctx.lineTo(-100, 200);
  ctx.lineTo(-100, 200);
  ctx.lineTo(-100, 1000);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.prune.curve','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 100;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.quadraticCurveTo(50, 25, 50, 25);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.bezierCurveTo(50, 25, 50, 25, 50, 25);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.prune.line','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 100;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.lineTo(50, 25);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.prune.rect','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 100;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.rect(50, 25, 0, 0);
  ctx.stroke();

  ctx.strokeRect(50, 25, 0, 0);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.scale1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.beginPath();
  ctx.rect(25, 12.5, 50, 25);
  ctx.save();
  ctx.scale(50, 25);
  ctx.strokeStyle = '#0f0';
  ctx.stroke();
  ctx.restore();

  ctx.beginPath();
  ctx.rect(-25, -12.5, 150, 75);
  ctx.save();
  ctx.scale(50, 25);
  ctx.strokeStyle = '#f00';
  ctx.stroke();
  ctx.restore();

  helpers.assertPixel(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,0, 0,255,0,255, "50,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,25, 0,255,0,255, "0,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,25, 0,255,0,255, "99,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,49, 0,255,0,255, "50,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.scale2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.beginPath();
  ctx.rect(25, 12.5, 50, 25);
  ctx.save();
  ctx.rotate(Math.PI/2);
  ctx.scale(25, 50);
  ctx.strokeStyle = '#0f0';
  ctx.stroke();
  ctx.restore();

  ctx.beginPath();
  ctx.rect(-25, -12.5, 150, 75);
  ctx.save();
  ctx.rotate(Math.PI/2);
  ctx.scale(25, 50);
  ctx.strokeStyle = '#f00';
  ctx.stroke();
  ctx.restore();

  helpers.assertPixel(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,0, 0,255,0,255, "50,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,25, 0,255,0,255, "0,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,25, 0,255,0,255, "99,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,49, 0,255,0,255, "50,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.skew','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(49, -50);
  ctx.lineTo(201, -50);
  ctx.rotate(Math.PI/4);
  ctx.scale(1, 283);
  ctx.strokeStyle = '#0f0';
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.translate(-150, 0);
  ctx.moveTo(49, -50);
  ctx.lineTo(199, -50);
  ctx.rotate(Math.PI/4);
  ctx.scale(1, 142);
  ctx.strokeStyle = '#f00';
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.translate(-150, 0);
  ctx.moveTo(49, -50);
  ctx.lineTo(199, -50);
  ctx.rotate(Math.PI/4);
  ctx.scale(1, 142);
  ctx.strokeStyle = '#f00';
  ctx.stroke();
  ctx.restore();

  helpers.assertPixel(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,0, 0,255,0,255, "50,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,25, 0,255,0,255, "0,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,25, 0,255,0,255, "99,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,49, 0,255,0,255, "50,49", "0,255,0,255");
  helpers.assertPixel(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.unaffected','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.lineWidth = 50;
  ctx.moveTo(-100, 25);
  ctx.lineTo(-100, -100);
  ctx.lineTo(200, -100);
  ctx.lineTo(200, 25);
  ctx.strokeStyle = '#f00';
  ctx.stroke();

  ctx.closePath();
  ctx.strokeStyle = '#0f0';
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.stroke.union','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 40;
  ctx.moveTo(0, 10);
  ctx.lineTo(100, 10);
  ctx.moveTo(100, 40);
  ctx.lineTo(0, 40);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.transformation.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);

  ctx.translate(-100, 0);
  ctx.rect(100, 0, 100, 50);
  ctx.translate(0, -100);
  ctx.fillStyle = '#0f0';
  ctx.fill();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.transformation.changing','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.moveTo(0, 0);
  ctx.translate(100, 0);
  ctx.lineTo(0, 0);
  ctx.translate(0, 50);
  ctx.lineTo(0, 0);
  ctx.translate(-100, 0);
  ctx.lineTo(0, 0);
  ctx.translate(1000, 1000);
  ctx.rotate(Math.PI/2);
  ctx.scale(0.1, 0.1);
  ctx.fill();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.path.transformation.multiple','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#f00';
  ctx.translate(-100, 0);
  ctx.rect(0, 0, 100, 50);
  ctx.fill();
  ctx.translate(100, 0);
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 50;
  ctx.translate(0, -50);
  ctx.moveTo(0, 25);
  ctx.lineTo(100, 25);
  ctx.stroke();
  ctx.translate(0, 50);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});

