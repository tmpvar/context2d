var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var domino = require('domino');
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.text.align.default', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.textAlign, 'start', "ctx.textAlign", "'start'");

  t.end()
});


test('2d.text.align.invalid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.textAlign = 'start';
  ctx.textAlign = 'bogus';
  helpers.assertEqual(t, ctx.textAlign, 'start', "ctx.textAlign", "'start'");
  
  ctx.textAlign = 'start';
  ctx.textAlign = 'END';
  helpers.assertEqual(t, ctx.textAlign, 'start', "ctx.textAlign", "'start'");
  
  ctx.textAlign = 'start';
  ctx.textAlign = 'end ';
  helpers.assertEqual(t, ctx.textAlign, 'start', "ctx.textAlign", "'start'");
  
  ctx.textAlign = 'start';
  ctx.textAlign = 'end\0';
  helpers.assertEqual(t, ctx.textAlign, 'start', "ctx.textAlign", "'start'");

  t.end()
});


test('2d.text.align.valid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.textAlign = 'start';
  helpers.assertEqual(t, ctx.textAlign, 'start', "ctx.textAlign", "'start'");
  
  ctx.textAlign = 'end';
  helpers.assertEqual(t, ctx.textAlign, 'end', "ctx.textAlign", "'end'");
  
  ctx.textAlign = 'left';
  helpers.assertEqual(t, ctx.textAlign, 'left', "ctx.textAlign", "'left'");
  
  ctx.textAlign = 'right';
  helpers.assertEqual(t, ctx.textAlign, 'right', "ctx.textAlign", "'right'");
  
  ctx.textAlign = 'center';
  helpers.assertEqual(t, ctx.textAlign, 'center', "ctx.textAlign", "'center'");

  t.end()
});


test('2d.text.baseline.default', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.textBaseline, 'alphabetic', "ctx.textBaseline", "'alphabetic'");

  t.end()
});


test('2d.text.baseline.invalid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.textBaseline = 'top';
  ctx.textBaseline = 'bogus';
  helpers.assertEqual(t, ctx.textBaseline, 'top', "ctx.textBaseline", "'top'");
  
  ctx.textBaseline = 'top';
  ctx.textBaseline = 'MIDDLE';
  helpers.assertEqual(t, ctx.textBaseline, 'top', "ctx.textBaseline", "'top'");
  
  ctx.textBaseline = 'top';
  ctx.textBaseline = 'middle ';
  helpers.assertEqual(t, ctx.textBaseline, 'top', "ctx.textBaseline", "'top'");
  
  ctx.textBaseline = 'top';
  ctx.textBaseline = 'middle\0';
  helpers.assertEqual(t, ctx.textBaseline, 'top', "ctx.textBaseline", "'top'");

  t.end()
});


test('2d.text.baseline.valid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.textBaseline = 'top';
  helpers.assertEqual(t, ctx.textBaseline, 'top', "ctx.textBaseline", "'top'");
  
  ctx.textBaseline = 'hanging';
  helpers.assertEqual(t, ctx.textBaseline, 'hanging', "ctx.textBaseline", "'hanging'");
  
  ctx.textBaseline = 'middle';
  helpers.assertEqual(t, ctx.textBaseline, 'middle', "ctx.textBaseline", "'middle'");
  
  ctx.textBaseline = 'alphabetic';
  helpers.assertEqual(t, ctx.textBaseline, 'alphabetic', "ctx.textBaseline", "'alphabetic'");
  
  ctx.textBaseline = 'ideographic';
  helpers.assertEqual(t, ctx.textBaseline, 'ideographic', "ctx.textBaseline", "'ideographic'");
  
  ctx.textBaseline = 'bottom';
  helpers.assertEqual(t, ctx.textBaseline, 'bottom', "ctx.textBaseline", "'bottom'");

  t.end()
});


test('2d.text.draw.align.center', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textAlign = 'center';
      ctx.fillText('DD', 50, 37.5);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.align.end.ltr', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textAlign = 'end';
      ctx.fillText('DD', 100, 37.5);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.align.end.rtl', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textAlign = 'end';
      ctx.fillText('DD', 0, 37.5);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.align.left', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textAlign = 'left';
      ctx.fillText('DD', 0, 37.5);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.align.right', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textAlign = 'right';
      ctx.fillText('DD', 100, 37.5);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.align.start.ltr', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textAlign = 'start';
      ctx.fillText('DD', 0, 37.5);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.align.start.rtl', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textAlign = 'start';
      ctx.fillText('DD', 100, 37.5);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.baseline.alphabetic', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('CC', 0, 37.5);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.baseline.bottom', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textBaseline = 'bottom';
      ctx.fillText('CC', 0, 50);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.baseline.hanging', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textBaseline = 'hanging';
      ctx.fillText('CC', 0, 12.5);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.baseline.ideographic', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textBaseline = 'ideographic';
      ctx.fillText('CC', 0, 31.25);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.baseline.middle', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textBaseline = 'middle';
      ctx.fillText('CC', 0, 25);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.baseline.top', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textBaseline = 'top';
      ctx.fillText('CC', 0, 0);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,45, 0,255,0,255, "95,45", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.fill.basic', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  ctx.font = '35px Arial, sans-serif';
  ctx.fillText('PASS', 5, 35);

  t.end()
});


test('2d.text.draw.fill.maxWidth.bound', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.fillText('DD', 0, 37.5, 100);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.fill.maxWidth.fontface', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#0f0';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#f00';
      ctx.fillText('EEEE', -50, 37.5, 40);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.fill.maxWidth.large', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.font = '35px Arial, sans-serif';
  ctx.fillText('PASS', 5, 35, 200);

  t.end()
});


test('2d.text.draw.fill.maxWidth.small', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.font = '35px Arial, sans-serif';
  ctx.fillText('fail fail fail fail fail', -100, 35, 90);

  t.end()
});


test('2d.text.draw.fill.maxWidth.zero', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.font = '35px Arial, sans-serif';
  ctx.fillText('fail fail fail fail fail', 5, 35, 0);

  t.end()
});


test('2d.text.draw.fill.rtl', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  ctx.font = '35px Arial, sans-serif';
  ctx.fillText('\u202eFAIL \xa0 \xa0 SSAP', 5, 35);

  t.end()
});


test('2d.text.draw.fill.unaffected', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  
  ctx.font = '35px Arial, sans-serif';
  ctx.fillText('FAIL', 5, 35);
  
  ctx.lineTo(100, 50);
  ctx.lineTo(0, 50);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255");

  t.end()
});


test('2d.text.draw.fontface', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '67px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.fillText('AA', 0, 50);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.fontface.notinpage', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '67px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.fillText('AA', 0, 50);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.fontface.repeat', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.font = '67px CanvasTest';
  ctx.fillStyle = '#0f0';
  ctx.fillText('AA', 0, 50);
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillText('AA', 0, 50);
      helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 95,5, 0,255,0,255, "95,5", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.kern.consistent', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 3;
  ctx.font = '20px Arial, sans-serif';
  ctx.fillText('VAVAVAVAVAVAVA', -50, 25);
  ctx.fillText('ToToToToToToTo', -50, 45);
  ctx.strokeText('VAVAVAVAVAVAVA', -50, 25);
  ctx.strokeText('ToToToToToToTo', -50, 45);

  t.end()
});


test('2d.text.draw.space.basic', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.fillText('E EE', -100, 37.5);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.space.collapse.end', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.textAlign = 'right';
      ctx.fillText('EE ', 100, 37.5);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.space.collapse.nonspace', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.fillText('E\x0b EE', -150, 37.5);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.space.collapse.other', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.fillText('E \x09\x0a\x0c\x0d  \x09\x0a\x0c\x0dEE', -100, 37.5);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.space.collapse.space', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.fillText('E  EE', -100, 37.5);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.space.collapse.start', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';
  
  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.fillText(' EE', 0, 37.5);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 500);

});


test('2d.text.draw.stroke.basic', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.fillStyle = '#f00';
  ctx.lineWidth = 1;
  ctx.font = '35px Arial, sans-serif';
  ctx.strokeText('PASS', 5, 35);

  t.end()
});


test('2d.text.draw.stroke.unaffected', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  
  ctx.font = '35px Arial, sans-serif';
  ctx.strokeStyle = '#f00';
  ctx.strokeText('FAIL', 5, 35);
  
  ctx.lineTo(100, 50);
  ctx.lineTo(0, 50);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 5,45, 0,255,0,255, "5,45", "0,255,0,255");

  t.end()
});


test('2d.text.font.default', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.font, '10px sans-serif', "ctx.font", "'10px sans-serif'");

  t.end()
});


test('2d.text.font.parse.basic', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '20px serif';
  helpers.assertEqual(t, ctx.font, '20px serif', "ctx.font", "'20px serif'");
  
  ctx.font = '20PX   SERIF';
  helpers.assertEqual(t, ctx.font, '20px serif', "ctx.font", "'20px serif'");

  t.end()
});


test('2d.text.font.parse.complex', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = 'small-caps italic 400 12px/2 Unknown Font, sans-serif';
  helpers.assertEqual(t, ctx.font, 'italic small-caps 12px "Unknown Font", sans-serif', "ctx.font", "'italic small-caps 12px \"Unknown Font\", sans-serif'");

  t.end()
});


test('2d.text.font.parse.invalid', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '20px serif';
  helpers.assertEqual(t, ctx.font, '20px serif', "ctx.font", "'20px serif'");
  
  ctx.font = '20px serif';
  ctx.font = 'bogus';
  helpers.assertEqual(t, ctx.font, '20px serif', "ctx.font", "'20px serif'");
  
  ctx.font = '20px serif';
  ctx.font = 'inherit';
  helpers.assertEqual(t, ctx.font, '20px serif', "ctx.font", "'20px serif'");
  
  ctx.font = '20px serif';
  ctx.font = '10px {bogus}';
  helpers.assertEqual(t, ctx.font, '20px serif', "ctx.font", "'20px serif'");
  
  ctx.font = '20px serif';
  ctx.font = '10px initial';
  helpers.assertEqual(t, ctx.font, '20px serif', "ctx.font", "'20px serif'");
  
  ctx.font = '20px serif';
  ctx.font = '10px default';
  helpers.assertEqual(t, ctx.font, '20px serif', "ctx.font", "'20px serif'");
  
  ctx.font = '20px serif';
  ctx.font = '10px inherit';
  helpers.assertEqual(t, ctx.font, '20px serif', "ctx.font", "'20px serif'");

  t.end()
});


test('2d.text.font.parse.size.percentage.default', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = new Canvas();
  var ctx2 = canvas2.getContext('2d');
  ctx.font = '1000% serif';
  helpers.assertEqual(t, ctx.font, '100px serif', "ctx.font", "'100px serif'");

  t.end()
});


test('2d.text.font.parse.size.percentage', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '50% serif';
  helpers.assertEqual(t, ctx.font, '72px serif', "ctx.font", "'72px serif'");
  canvas.setAttribute('style', 'font-size: 100px');
  helpers.assertEqual(t, ctx.font, '72px serif', "ctx.font", "'72px serif'");

  t.end()
});


test('2d.text.font.parse.system', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = 'message-box';
  helpers.assertNotEqual(t, ctx.font, 'message-box', "ctx.font", "'message-box'");

  t.end()
});


test('2d.text.measure.width.basic', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  setTimeout(wrapFunction(t, function () {
      ctx.font = '50px CanvasTest';
      helpers.assertEqual(t, ctx.measureText('A').width, 50, "ctx.measureText('A').width", "50");
      helpers.assertEqual(t, ctx.measureText('AA').width, 100, "ctx.measureText('AA').width", "100");
      helpers.assertEqual(t, ctx.measureText('ABCD').width, 200, "ctx.measureText('ABCD').width", "200");
  
      ctx.font = '100px CanvasTest';
      helpers.assertEqual(t, ctx.measureText('A').width, 100, "ctx.measureText('A').width", "100");
  }), 500);

});


test('2d.text.measure.width.empty', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  setTimeout(wrapFunction(t, function () {
      ctx.font = '50px CanvasTest';
      helpers.assertEqual(t, ctx.measureText("").width, 0, "ctx.measureText(\"\").width", "0");
  }), 500);

});


test('2d.text.measure.width.space', function(t) {
  var window = helpers.createWindow()
  var document = window.document

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  setTimeout(wrapFunction(t, function () {
      ctx.font = '50px CanvasTest';
      helpers.assertEqual(t, ctx.measureText('A B').width, 150, "ctx.measureText('A B').width", "150");
      helpers.assertEqual(t, ctx.measureText('A  B').width, 150, "ctx.measureText('A  B').width", "150");
      helpers.assertEqual(t, ctx.measureText('A \x09\x0a\x0c\x0d  \x09\x0a\x0c\x0dB').width, 150, "ctx.measureText('A \\x09\\x0a\\x0c\\x0d  \\x09\\x0a\\x0c\\x0dB').width", "150");
      helpers.ok(t, ctx.measureText('A \x0b B').width >= 200, "ctx.measureText('A \\x0b B').width >= 200");
  
      helpers.assertEqual(t, ctx.measureText(' AB').width, 100, "ctx.measureText(' AB').width", "100");
      helpers.assertEqual(t, ctx.measureText('AB ').width, 100, "ctx.measureText('AB ').width", "100");
  }), 500);

});

