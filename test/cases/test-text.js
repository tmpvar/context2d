var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.text.align.default',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.textAlign, 'start', "ctx.textAlign", "'start'");

  t.done()
});


test(module, '2d.text.align.invalid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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

  t.done()
});


test(module, '2d.text.align.valid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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

  t.done()
});


test(module, '2d.text.baseline.default',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.textBaseline, 'alphabetic', "ctx.textBaseline", "'alphabetic'");

  t.done()
});


test(module, '2d.text.baseline.invalid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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

  t.done()
});


test(module, '2d.text.baseline.valid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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

  t.done()
});


test(module, '2d.text.draw.align.center','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.align.end.ltr','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.align.end.rtl','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  canvas.dir = 'rtl';

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
  }), 0);

});


test(module, '2d.text.draw.align.left','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.align.right','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.align.start.ltr','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.align.start.rtl','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  canvas.dir = 'rtl';

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
  }), 0);

});


test(module, '2d.text.draw.baseline.alphabetic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.baseline.bottom','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 1000, 500);
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
  }), 0);

});


test(module, '2d.text.draw.baseline.hanging','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.baseline.ideographic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.baseline.middle','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.baseline.top','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.fill.basic','2d.text.draw.fill.basic.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  ctx.font = '35px Arial, sans-serif';
  ctx.fillText('PASS', 5, 35);

  t.done()
});


test(module, '2d.text.draw.fill.maxWidth.bound','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.fill.maxWidth.fontface','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.fill.maxWidth.large','2d.text.draw.fill.maxWidth.large.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.font = '35px Arial, sans-serif';
  ctx.fillText('PASS', 5, 35, 200);

  t.done()
});


test(module, '2d.text.draw.fill.maxWidth.small','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.font = '35px Arial, sans-serif';
  ctx.fillText('fail fail fail fail fail', -100, 35, 90);

  t.done()
});


test(module, '2d.text.draw.fill.maxWidth.zero','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.font = '35px Arial, sans-serif';
  ctx.fillText('fail fail fail fail fail', 5, 35, 0);

  t.done()
});


test(module, '2d.text.draw.fill.rtl','2d.text.draw.fill.rtl.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  canvas.dir = 'rtl';

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  ctx.font = '35px Arial, sans-serif';
  ctx.fillText('\u202eFAIL \xa0 \xa0 SSAP', 5, 35);

  t.done()
});


test(module, '2d.text.draw.fill.unaffected','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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

  t.done()
});


test(module, '2d.text.draw.fontface','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.fontface.notinpage','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.fontface.repeat','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.kern.consistent','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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

  t.done()
});


test(module, '2d.text.draw.space.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.space.collapse.end','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.space.collapse.nonspace','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.space.collapse.other','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 1000, 500);
  var ctx = canvas.getContext('2d')

  ctx.font = '50px CanvasTest';

  setTimeout(wrapFunction(t, function () {
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.fillText('E \x09\x0a\x0c\x0d  \x09\x0a\x0c\x0dEE', -100, 37.5);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
  }), 0);

});


test(module, '2d.text.draw.space.collapse.space','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.space.collapse.start','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});


test(module, '2d.text.draw.stroke.basic','2d.text.draw.stroke.basic.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#0f0';
  ctx.fillStyle = '#f00';
  ctx.lineWidth = 1;
  ctx.font = '35px Arial, sans-serif';
  ctx.strokeText('PASS', 5, 35);

  t.done()
});


test(module, '2d.text.draw.stroke.unaffected','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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

  t.done()
});


test(module, '2d.text.font.default',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.font, '10px sans-serif', "ctx.font", "'10px sans-serif'");

  t.done()
});


test(module, '2d.text.font.parse.basic',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = '20px serif';
  helpers.assertEqual(t, ctx.font, '20px serif', "ctx.font", "'20px serif'");

  ctx.font = '20PX   SERIF';
  helpers.assertEqual(t, ctx.font, '20px serif', "ctx.font", "'20px serif'");

  t.done()
});


test(module, '2d.text.font.parse.complex',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = 'small-caps italic 400 12px/2 Unknown Font, sans-serif';
  helpers.assertEqual(t, ctx.font, 'italic small-caps 12px "Unknown Font", sans-serif', "ctx.font", "'italic small-caps 12px \"Unknown Font\", sans-serif'");

  t.done()
});


test(module, '2d.text.font.parse.invalid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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

  t.done()
});


test(module, '2d.text.font.parse.size.percentage.default',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = helpers.createCanvas(document);
  var ctx2 = canvas2.getContext('2d');
  ctx.font = '1000% serif';
  helpers.assertEqual(t, ctx.font, '100px serif', "ctx.font", "'100px serif'");

  t.done()
});


test(module, '2d.text.font.parse.size.percentage',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // set in the html
  ctx.font = '144px serif';

  ctx.font = '50% serif';
  helpers.assertEqual(t, ctx.font, '72px serif', "ctx.font", "'72px serif'");
  canvas.setAttribute('style', 'font-size: 100px');
  helpers.assertEqual(t, ctx.font, '72px serif', "ctx.font", "'72px serif'");

  t.done()
});


test(module, '2d.text.font.parse.system',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.font = 'message-box';
  helpers.assertNotEqual(t, ctx.font, 'message-box', "ctx.font", "'message-box'");

  t.done()
});


test(module, '2d.text.measure.width.basic',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  setTimeout(wrapFunction(t, function () {
      ctx.font = '50px CanvasTest';
      helpers.assertEqual(t, ctx.measureText('A').width, 50, "ctx.measureText('A').width", "50");
      helpers.assertEqual(t, ctx.measureText('AA').width, 100, "ctx.measureText('AA').width", "100");
      helpers.assertEqual(t, ctx.measureText('ABCD').width, 200, "ctx.measureText('ABCD').width", "200");

      ctx.font = '100px CanvasTest';
      helpers.assertEqual(t, ctx.measureText('A').width, 100, "ctx.measureText('A').width", "100");
  }), 0);

});


test(module, '2d.text.measure.width.empty',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  setTimeout(wrapFunction(t, function () {
      ctx.font = '50px CanvasTest';
      helpers.assertEqual(t, ctx.measureText("").width, 0, "ctx.measureText(\"\").width", "0");
  }), 0);

});


test(module, '2d.text.measure.width.space',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

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
  }), 0);

});

