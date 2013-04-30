var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.transformation.order','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.scale(2, 1);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, -50, 50, 50);
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.rotate.direction','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, -100, 50, 100);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.rotate.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.translate(100, 10);
  ctx.rotate(Infinity);
  ctx.rotate(-Infinity);
  ctx.rotate(NaN);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-100, -10, 100, 50);
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.rotate.radians','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.rotate(Math.PI); // should fail obviously if this is 3.1 degrees
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-100, -50, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.rotate.wrap','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.rotate(Math.PI * (1 + 4096)); // == pi (mod 2*pi)
  // We need about pi +/- 0.001 in order to get correct-looking results
  // 32-bit floats can store pi*4097 with precision 2^-10, so that should
  // be safe enough on reasonable implementations
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-100, -50, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,2, 0,255,0,255, "98,2", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,47, 0,255,0,255, "98,47", "0,255,0,255");

  t.end()
});


test('2d.transformation.rotate.wrapnegative','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.rotate(-Math.PI * (1 + 4096));
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-100, -50, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,2, 0,255,0,255, "98,2", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,47, 0,255,0,255, "98,47", "0,255,0,255");

  t.end()
});


test('2d.transformation.rotate.zero','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.rotate(0);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.scale.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.scale(2, 4);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 50, 12.5);
  helpers.assertPixel(t, canvas, 90,40, 0,255,0,255, "90,40", "0,255,0,255");

  t.end()
});


test('2d.transformation.scale.large','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.scale(1e5, 1e5);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 1, 1);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.scale.multiple','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.scale(Math.sqrt(2), Math.sqrt(2));
  ctx.scale(Math.sqrt(2), Math.sqrt(2));
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 50, 25);
  helpers.assertPixel(t, canvas, 90,40, 0,255,0,255, "90,40", "0,255,0,255");

  t.end()
});


test('2d.transformation.scale.negative','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.save();
  ctx.scale(-1, 1);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-50, 0, 50, 50);
  ctx.restore();
  
  ctx.save();
  ctx.scale(1, -1);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(50, -50, 50, 50);
  ctx.restore();
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.scale.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.translate(100, 10);
  ctx.scale(Infinity, 0.1);
  ctx.scale(-Infinity, 0.1);
  ctx.scale(NaN, 0.1);
  ctx.scale(0.1, Infinity);
  ctx.scale(0.1, -Infinity);
  ctx.scale(0.1, NaN);
  ctx.scale(Infinity, Infinity);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-100, -10, 100, 50);
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.scale.zero','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.save();
  ctx.translate(50, 0);
  ctx.scale(0, 1);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.restore();
  
  ctx.save();
  ctx.translate(0, 25);
  ctx.scale(1, 0);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.restore();
  
  // Firefox has a bug where it renders the canvas as empty and toDataURL throws an exception
  canvas.toDataURL();
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.setTransform.multiple','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.setTransform(1/2,0, 0,1/2, 0,0);
  ctx.setTransform(2,0, 0,2, 0,0);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 50, 25);
  helpers.assertPixel(t, canvas, 75,35, 0,255,0,255, "75,35", "0,255,0,255");

  t.end()
});


test('2d.transformation.setTransform.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.translate(100, 10);
  ctx.setTransform(Infinity, 0, 0, 0, 0, 0);
  ctx.setTransform(-Infinity, 0, 0, 0, 0, 0);
  ctx.setTransform(NaN, 0, 0, 0, 0, 0);
  ctx.setTransform(0, Infinity, 0, 0, 0, 0);
  ctx.setTransform(0, -Infinity, 0, 0, 0, 0);
  ctx.setTransform(0, NaN, 0, 0, 0, 0);
  ctx.setTransform(0, 0, Infinity, 0, 0, 0);
  ctx.setTransform(0, 0, -Infinity, 0, 0, 0);
  ctx.setTransform(0, 0, NaN, 0, 0, 0);
  ctx.setTransform(0, 0, 0, Infinity, 0, 0);
  ctx.setTransform(0, 0, 0, -Infinity, 0, 0);
  ctx.setTransform(0, 0, 0, NaN, 0, 0);
  ctx.setTransform(0, 0, 0, 0, Infinity, 0);
  ctx.setTransform(0, 0, 0, 0, -Infinity, 0);
  ctx.setTransform(0, 0, 0, 0, NaN, 0);
  ctx.setTransform(0, 0, 0, 0, 0, Infinity);
  ctx.setTransform(0, 0, 0, 0, 0, -Infinity);
  ctx.setTransform(0, 0, 0, 0, 0, NaN);
  ctx.setTransform(Infinity, Infinity, 0, 0, 0, 0);
  ctx.setTransform(Infinity, Infinity, Infinity, 0, 0, 0);
  ctx.setTransform(Infinity, Infinity, Infinity, Infinity, 0, 0);
  ctx.setTransform(Infinity, Infinity, Infinity, Infinity, Infinity, 0);
  ctx.setTransform(Infinity, Infinity, Infinity, Infinity, Infinity, Infinity);
  ctx.setTransform(Infinity, Infinity, Infinity, Infinity, 0, Infinity);
  ctx.setTransform(Infinity, Infinity, Infinity, 0, Infinity, 0);
  ctx.setTransform(Infinity, Infinity, Infinity, 0, Infinity, Infinity);
  ctx.setTransform(Infinity, Infinity, Infinity, 0, 0, Infinity);
  ctx.setTransform(Infinity, Infinity, 0, Infinity, 0, 0);
  ctx.setTransform(Infinity, Infinity, 0, Infinity, Infinity, 0);
  ctx.setTransform(Infinity, Infinity, 0, Infinity, Infinity, Infinity);
  ctx.setTransform(Infinity, Infinity, 0, Infinity, 0, Infinity);
  ctx.setTransform(Infinity, Infinity, 0, 0, Infinity, 0);
  ctx.setTransform(Infinity, Infinity, 0, 0, Infinity, Infinity);
  ctx.setTransform(Infinity, Infinity, 0, 0, 0, Infinity);
  ctx.setTransform(Infinity, 0, Infinity, 0, 0, 0);
  ctx.setTransform(Infinity, 0, Infinity, Infinity, 0, 0);
  ctx.setTransform(Infinity, 0, Infinity, Infinity, Infinity, 0);
  ctx.setTransform(Infinity, 0, Infinity, Infinity, Infinity, Infinity);
  ctx.setTransform(Infinity, 0, Infinity, Infinity, 0, Infinity);
  ctx.setTransform(Infinity, 0, Infinity, 0, Infinity, 0);
  ctx.setTransform(Infinity, 0, Infinity, 0, Infinity, Infinity);
  ctx.setTransform(Infinity, 0, Infinity, 0, 0, Infinity);
  ctx.setTransform(Infinity, 0, 0, Infinity, 0, 0);
  ctx.setTransform(Infinity, 0, 0, Infinity, Infinity, 0);
  ctx.setTransform(Infinity, 0, 0, Infinity, Infinity, Infinity);
  ctx.setTransform(Infinity, 0, 0, Infinity, 0, Infinity);
  ctx.setTransform(Infinity, 0, 0, 0, Infinity, 0);
  ctx.setTransform(Infinity, 0, 0, 0, Infinity, Infinity);
  ctx.setTransform(Infinity, 0, 0, 0, 0, Infinity);
  ctx.setTransform(0, Infinity, Infinity, 0, 0, 0);
  ctx.setTransform(0, Infinity, Infinity, Infinity, 0, 0);
  ctx.setTransform(0, Infinity, Infinity, Infinity, Infinity, 0);
  ctx.setTransform(0, Infinity, Infinity, Infinity, Infinity, Infinity);
  ctx.setTransform(0, Infinity, Infinity, Infinity, 0, Infinity);
  ctx.setTransform(0, Infinity, Infinity, 0, Infinity, 0);
  ctx.setTransform(0, Infinity, Infinity, 0, Infinity, Infinity);
  ctx.setTransform(0, Infinity, Infinity, 0, 0, Infinity);
  ctx.setTransform(0, Infinity, 0, Infinity, 0, 0);
  ctx.setTransform(0, Infinity, 0, Infinity, Infinity, 0);
  ctx.setTransform(0, Infinity, 0, Infinity, Infinity, Infinity);
  ctx.setTransform(0, Infinity, 0, Infinity, 0, Infinity);
  ctx.setTransform(0, Infinity, 0, 0, Infinity, 0);
  ctx.setTransform(0, Infinity, 0, 0, Infinity, Infinity);
  ctx.setTransform(0, Infinity, 0, 0, 0, Infinity);
  ctx.setTransform(0, 0, Infinity, Infinity, 0, 0);
  ctx.setTransform(0, 0, Infinity, Infinity, Infinity, 0);
  ctx.setTransform(0, 0, Infinity, Infinity, Infinity, Infinity);
  ctx.setTransform(0, 0, Infinity, Infinity, 0, Infinity);
  ctx.setTransform(0, 0, Infinity, 0, Infinity, 0);
  ctx.setTransform(0, 0, Infinity, 0, Infinity, Infinity);
  ctx.setTransform(0, 0, Infinity, 0, 0, Infinity);
  ctx.setTransform(0, 0, 0, Infinity, Infinity, 0);
  ctx.setTransform(0, 0, 0, Infinity, Infinity, Infinity);
  ctx.setTransform(0, 0, 0, Infinity, 0, Infinity);
  ctx.setTransform(0, 0, 0, 0, Infinity, Infinity);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-100, -10, 100, 50);
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.setTransform.skewed','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Create green with a red square ring inside it
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(20, 10, 60, 30);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(40, 20, 20, 10);
  
  // Draw a skewed shape to fill that gap, to make sure it is aligned correctly
  ctx.setTransform(1,4, 2,3, 5,6);
  // Post-transform coordinates:
  //   [[20,10],[80,10],[80,40],[20,40],[20,10],[40,20],[40,30],[60,30],[60,20],[40,20],[20,10]];
  // Hence pre-transform coordinates:
  var pts=[[-7.4,11.2],[-43.4,59.2],[-31.4,53.2],[4.6,5.2],[-7.4,11.2],
           [-15.4,25.2],[-11.4,23.2],[-23.4,39.2],[-27.4,41.2],[-15.4,25.2],
           [-7.4,11.2]];
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (var i = 0; i < pts.length; ++i)
      ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.fill();
  helpers.assertPixel(t, canvas, 21,11, 0,255,0,255, "21,11", "0,255,0,255");
  helpers.assertPixel(t, canvas, 79,11, 0,255,0,255, "79,11", "0,255,0,255");
  helpers.assertPixel(t, canvas, 21,39, 0,255,0,255, "21,39", "0,255,0,255");
  helpers.assertPixel(t, canvas, 79,39, 0,255,0,255, "79,39", "0,255,0,255");
  helpers.assertPixel(t, canvas, 39,19, 0,255,0,255, "39,19", "0,255,0,255");
  helpers.assertPixel(t, canvas, 61,19, 0,255,0,255, "61,19", "0,255,0,255");
  helpers.assertPixel(t, canvas, 39,31, 0,255,0,255, "39,31", "0,255,0,255");
  helpers.assertPixel(t, canvas, 61,31, 0,255,0,255, "61,31", "0,255,0,255");

  t.end()
});


test('2d.transformation.transform.identity','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.transform(1,0, 0,1, 0,0);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.transform.multiply','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.transform(1,2, 3,4, 5,6);
  ctx.transform(-2,1, 3/2,-1/2, 1,-2);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.transform.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.translate(100, 10);
  ctx.transform(Infinity, 0, 0, 0, 0, 0);
  ctx.transform(-Infinity, 0, 0, 0, 0, 0);
  ctx.transform(NaN, 0, 0, 0, 0, 0);
  ctx.transform(0, Infinity, 0, 0, 0, 0);
  ctx.transform(0, -Infinity, 0, 0, 0, 0);
  ctx.transform(0, NaN, 0, 0, 0, 0);
  ctx.transform(0, 0, Infinity, 0, 0, 0);
  ctx.transform(0, 0, -Infinity, 0, 0, 0);
  ctx.transform(0, 0, NaN, 0, 0, 0);
  ctx.transform(0, 0, 0, Infinity, 0, 0);
  ctx.transform(0, 0, 0, -Infinity, 0, 0);
  ctx.transform(0, 0, 0, NaN, 0, 0);
  ctx.transform(0, 0, 0, 0, Infinity, 0);
  ctx.transform(0, 0, 0, 0, -Infinity, 0);
  ctx.transform(0, 0, 0, 0, NaN, 0);
  ctx.transform(0, 0, 0, 0, 0, Infinity);
  ctx.transform(0, 0, 0, 0, 0, -Infinity);
  ctx.transform(0, 0, 0, 0, 0, NaN);
  ctx.transform(Infinity, Infinity, 0, 0, 0, 0);
  ctx.transform(Infinity, Infinity, Infinity, 0, 0, 0);
  ctx.transform(Infinity, Infinity, Infinity, Infinity, 0, 0);
  ctx.transform(Infinity, Infinity, Infinity, Infinity, Infinity, 0);
  ctx.transform(Infinity, Infinity, Infinity, Infinity, Infinity, Infinity);
  ctx.transform(Infinity, Infinity, Infinity, Infinity, 0, Infinity);
  ctx.transform(Infinity, Infinity, Infinity, 0, Infinity, 0);
  ctx.transform(Infinity, Infinity, Infinity, 0, Infinity, Infinity);
  ctx.transform(Infinity, Infinity, Infinity, 0, 0, Infinity);
  ctx.transform(Infinity, Infinity, 0, Infinity, 0, 0);
  ctx.transform(Infinity, Infinity, 0, Infinity, Infinity, 0);
  ctx.transform(Infinity, Infinity, 0, Infinity, Infinity, Infinity);
  ctx.transform(Infinity, Infinity, 0, Infinity, 0, Infinity);
  ctx.transform(Infinity, Infinity, 0, 0, Infinity, 0);
  ctx.transform(Infinity, Infinity, 0, 0, Infinity, Infinity);
  ctx.transform(Infinity, Infinity, 0, 0, 0, Infinity);
  ctx.transform(Infinity, 0, Infinity, 0, 0, 0);
  ctx.transform(Infinity, 0, Infinity, Infinity, 0, 0);
  ctx.transform(Infinity, 0, Infinity, Infinity, Infinity, 0);
  ctx.transform(Infinity, 0, Infinity, Infinity, Infinity, Infinity);
  ctx.transform(Infinity, 0, Infinity, Infinity, 0, Infinity);
  ctx.transform(Infinity, 0, Infinity, 0, Infinity, 0);
  ctx.transform(Infinity, 0, Infinity, 0, Infinity, Infinity);
  ctx.transform(Infinity, 0, Infinity, 0, 0, Infinity);
  ctx.transform(Infinity, 0, 0, Infinity, 0, 0);
  ctx.transform(Infinity, 0, 0, Infinity, Infinity, 0);
  ctx.transform(Infinity, 0, 0, Infinity, Infinity, Infinity);
  ctx.transform(Infinity, 0, 0, Infinity, 0, Infinity);
  ctx.transform(Infinity, 0, 0, 0, Infinity, 0);
  ctx.transform(Infinity, 0, 0, 0, Infinity, Infinity);
  ctx.transform(Infinity, 0, 0, 0, 0, Infinity);
  ctx.transform(0, Infinity, Infinity, 0, 0, 0);
  ctx.transform(0, Infinity, Infinity, Infinity, 0, 0);
  ctx.transform(0, Infinity, Infinity, Infinity, Infinity, 0);
  ctx.transform(0, Infinity, Infinity, Infinity, Infinity, Infinity);
  ctx.transform(0, Infinity, Infinity, Infinity, 0, Infinity);
  ctx.transform(0, Infinity, Infinity, 0, Infinity, 0);
  ctx.transform(0, Infinity, Infinity, 0, Infinity, Infinity);
  ctx.transform(0, Infinity, Infinity, 0, 0, Infinity);
  ctx.transform(0, Infinity, 0, Infinity, 0, 0);
  ctx.transform(0, Infinity, 0, Infinity, Infinity, 0);
  ctx.transform(0, Infinity, 0, Infinity, Infinity, Infinity);
  ctx.transform(0, Infinity, 0, Infinity, 0, Infinity);
  ctx.transform(0, Infinity, 0, 0, Infinity, 0);
  ctx.transform(0, Infinity, 0, 0, Infinity, Infinity);
  ctx.transform(0, Infinity, 0, 0, 0, Infinity);
  ctx.transform(0, 0, Infinity, Infinity, 0, 0);
  ctx.transform(0, 0, Infinity, Infinity, Infinity, 0);
  ctx.transform(0, 0, Infinity, Infinity, Infinity, Infinity);
  ctx.transform(0, 0, Infinity, Infinity, 0, Infinity);
  ctx.transform(0, 0, Infinity, 0, Infinity, 0);
  ctx.transform(0, 0, Infinity, 0, Infinity, Infinity);
  ctx.transform(0, 0, Infinity, 0, 0, Infinity);
  ctx.transform(0, 0, 0, Infinity, Infinity, 0);
  ctx.transform(0, 0, 0, Infinity, Infinity, Infinity);
  ctx.transform(0, 0, 0, Infinity, 0, Infinity);
  ctx.transform(0, 0, 0, 0, Infinity, Infinity);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-100, -10, 100, 50);
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.transformation.transform.skewed','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Create green with a red square ring inside it
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(20, 10, 60, 30);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(40, 20, 20, 10);
  
  // Draw a skewed shape to fill that gap, to make sure it is aligned correctly
  ctx.transform(1,4, 2,3, 5,6);
  // Post-transform coordinates:
  //   [[20,10],[80,10],[80,40],[20,40],[20,10],[40,20],[40,30],[60,30],[60,20],[40,20],[20,10]];
  // Hence pre-transform coordinates:
  var pts=[[-7.4,11.2],[-43.4,59.2],[-31.4,53.2],[4.6,5.2],[-7.4,11.2],
           [-15.4,25.2],[-11.4,23.2],[-23.4,39.2],[-27.4,41.2],[-15.4,25.2],
           [-7.4,11.2]];
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (var i = 0; i < pts.length; ++i)
      ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.fill();
  helpers.assertPixel(t, canvas, 21,11, 0,255,0,255, "21,11", "0,255,0,255");
  helpers.assertPixel(t, canvas, 79,11, 0,255,0,255, "79,11", "0,255,0,255");
  helpers.assertPixel(t, canvas, 21,39, 0,255,0,255, "21,39", "0,255,0,255");
  helpers.assertPixel(t, canvas, 79,39, 0,255,0,255, "79,39", "0,255,0,255");
  helpers.assertPixel(t, canvas, 39,19, 0,255,0,255, "39,19", "0,255,0,255");
  helpers.assertPixel(t, canvas, 61,19, 0,255,0,255, "61,19", "0,255,0,255");
  helpers.assertPixel(t, canvas, 39,31, 0,255,0,255, "39,31", "0,255,0,255");
  helpers.assertPixel(t, canvas, 61,31, 0,255,0,255, "61,31", "0,255,0,255");

  t.end()
});


test('2d.transformation.translate.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.translate(100, 50);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-100, -50, 100, 50);
  helpers.assertPixel(t, canvas, 90,40, 0,255,0,255, "90,40", "0,255,0,255");

  t.end()
});


test('2d.transformation.translate.nonfinite','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.translate(100, 10);
  ctx.translate(Infinity, 0.1);
  ctx.translate(-Infinity, 0.1);
  ctx.translate(NaN, 0.1);
  ctx.translate(0.1, Infinity);
  ctx.translate(0.1, -Infinity);
  ctx.translate(0.1, NaN);
  ctx.translate(Infinity, Infinity);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-100, -10, 100, 50);
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});

