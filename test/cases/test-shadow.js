var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.shadow.alpha.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = 'rgba(255, 0, 0, 0.01)';
  ctx.shadowOffsetY = 50;
  ctx.fillRect(0, -50, 100, 50);

  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 4);

  t.done()
});


test(module, '2d.shadow.alpha.2','2d.shadow.alpha.2.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = 'rgba(0, 0, 255, 0.5)';
  ctx.shadowOffsetY = 50;
  ctx.fillRect(0, -50, 100, 50);

  helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

  t.done()
});


test(module, '2d.shadow.alpha.3','2d.shadow.alpha.3.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00'; // (work around broken Firefox globalAlpha caching)
  ctx.shadowColor = '#00f';
  ctx.shadowOffsetY = 50;
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0, -50, 100, 50);

  helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

  t.done()
});


test(module, '2d.shadow.alpha.4','2d.shadow.alpha.4.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00'; // (work around broken Firefox globalAlpha caching)
  ctx.shadowColor = 'rgba(0, 0, 255, 0.707)';
  ctx.shadowOffsetY = 50;
  ctx.globalAlpha = 0.707;
  ctx.fillRect(0, -50, 100, 50);

  helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

  t.done()
});


test(module, '2d.shadow.alpha.5','2d.shadow.alpha.5.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = 'rgba(64, 0, 0, 0.5)';
  ctx.shadowColor = '#00f';
  ctx.shadowOffsetY = 50;
  ctx.fillRect(0, -50, 100, 50);

  helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

  t.done()
});


test(module, '2d.shadow.attributes.shadowBlur.initial',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.shadowBlur, 0, "ctx.shadowBlur", "0");

  t.done()
});


test(module, '2d.shadow.attributes.shadowBlur.invalid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.shadowBlur = 1;
  ctx.shadowBlur = -2;
  helpers.assertEqual(t, ctx.shadowBlur, 1, "ctx.shadowBlur", "1");

  ctx.shadowBlur = 1;
  ctx.shadowBlur = Infinity;
  helpers.assertEqual(t, ctx.shadowBlur, 1, "ctx.shadowBlur", "1");

  ctx.shadowBlur = 1;
  ctx.shadowBlur = -Infinity;
  helpers.assertEqual(t, ctx.shadowBlur, 1, "ctx.shadowBlur", "1");

  ctx.shadowBlur = 1;
  ctx.shadowBlur = NaN;
  helpers.assertEqual(t, ctx.shadowBlur, 1, "ctx.shadowBlur", "1");

  t.done()
});


test(module, '2d.shadow.attributes.shadowBlur.valid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.shadowBlur = 1;
  helpers.assertEqual(t, ctx.shadowBlur, 1, "ctx.shadowBlur", "1");

  ctx.shadowBlur = 0.5;
  helpers.assertEqual(t, ctx.shadowBlur, 0.5, "ctx.shadowBlur", "0.5");

  ctx.shadowBlur = 1e6;
  helpers.assertEqual(t, ctx.shadowBlur, 1e6, "ctx.shadowBlur", "1e6");

  ctx.shadowBlur = 0;
  helpers.assertEqual(t, ctx.shadowBlur, 0, "ctx.shadowBlur", "0");

  t.done()
});


test(module, '2d.shadow.attributes.shadowColor.initial',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.shadowColor, 'rgba(0, 0, 0, 0.0)', "ctx.shadowColor", "'rgba(0, 0, 0, 0.0)'");

  t.done()
});


test(module, '2d.shadow.attributes.shadowColor.invalid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.shadowColor = '#00ff00';
  ctx.shadowColor = 'bogus';
  helpers.assertEqual(t, ctx.shadowColor, '#00ff00', "ctx.shadowColor", "'#00ff00'");

  ctx.shadowColor = '#00ff00';
  ctx.shadowColor = 'red bogus';
  helpers.assertEqual(t, ctx.shadowColor, '#00ff00', "ctx.shadowColor", "'#00ff00'");

  ctx.shadowColor = '#00ff00';
  ctx.shadowColor = ctx;
  helpers.assertEqual(t, ctx.shadowColor, '#00ff00', "ctx.shadowColor", "'#00ff00'");

  ctx.shadowColor = '#00ff00';
  ctx.shadowColor = undefined;
  helpers.assertEqual(t, ctx.shadowColor, '#00ff00', "ctx.shadowColor", "'#00ff00'");

  t.done()
});


test(module, '2d.shadow.attributes.shadowColor.valid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.shadowColor = 'lime';
  helpers.assertEqual(t, ctx.shadowColor, '#00ff00', "ctx.shadowColor", "'#00ff00'");

  ctx.shadowColor = 'RGBA(0,255, 0,0)';
  helpers.assertEqual(t, ctx.shadowColor, 'rgba(0, 255, 0, 0.0)', "ctx.shadowColor", "'rgba(0, 255, 0, 0.0)'");

  t.done()
});


test(module, '2d.shadow.attributes.shadowOffset.initial',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.shadowOffsetX, 0, "ctx.shadowOffsetX", "0");
  helpers.assertEqual(t, ctx.shadowOffsetY, 0, "ctx.shadowOffsetY", "0");

  t.done()
});


test(module, '2d.shadow.attributes.shadowOffset.invalid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;
  ctx.shadowOffsetX = Infinity;
  ctx.shadowOffsetY = Infinity;
  helpers.assertEqual(t, ctx.shadowOffsetX, 1, "ctx.shadowOffsetX", "1");
  helpers.assertEqual(t, ctx.shadowOffsetY, 2, "ctx.shadowOffsetY", "2");

  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;
  ctx.shadowOffsetX = -Infinity;
  ctx.shadowOffsetY = -Infinity;
  helpers.assertEqual(t, ctx.shadowOffsetX, 1, "ctx.shadowOffsetX", "1");
  helpers.assertEqual(t, ctx.shadowOffsetY, 2, "ctx.shadowOffsetY", "2");

  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;
  ctx.shadowOffsetX = NaN;
  ctx.shadowOffsetY = NaN;
  helpers.assertEqual(t, ctx.shadowOffsetX, 1, "ctx.shadowOffsetX", "1");
  helpers.assertEqual(t, ctx.shadowOffsetY, 2, "ctx.shadowOffsetY", "2");

  t.done()
});


test(module, '2d.shadow.attributes.shadowOffset.valid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;
  helpers.assertEqual(t, ctx.shadowOffsetX, 1, "ctx.shadowOffsetX", "1");
  helpers.assertEqual(t, ctx.shadowOffsetY, 2, "ctx.shadowOffsetY", "2");

  ctx.shadowOffsetX = 0.5;
  ctx.shadowOffsetY = 0.25;
  helpers.assertEqual(t, ctx.shadowOffsetX, 0.5, "ctx.shadowOffsetX", "0.5");
  helpers.assertEqual(t, ctx.shadowOffsetY, 0.25, "ctx.shadowOffsetY", "0.25");

  ctx.shadowOffsetX = -0.5;
  ctx.shadowOffsetY = -0.25;
  helpers.assertEqual(t, ctx.shadowOffsetX, -0.5, "ctx.shadowOffsetX", "-0.5");
  helpers.assertEqual(t, ctx.shadowOffsetY, -0.25, "ctx.shadowOffsetY", "-0.25");

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  helpers.assertEqual(t, ctx.shadowOffsetX, 0, "ctx.shadowOffsetX", "0");
  helpers.assertEqual(t, ctx.shadowOffsetY, 0, "ctx.shadowOffsetY", "0");

  ctx.shadowOffsetX = 1e6;
  ctx.shadowOffsetY = 1e6;
  helpers.assertEqual(t, ctx.shadowOffsetX, 1e6, "ctx.shadowOffsetX", "1e6");
  helpers.assertEqual(t, ctx.shadowOffsetY, 1e6, "ctx.shadowOffsetY", "1e6");

  t.done()
});


test(module, '2d.shadow.blur.high','2d.shadow.blur.high.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#ff0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = '#00f';
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 555.6;
  ctx.fillRect(-200, -200, 200, 400);

  t.done()
});


test(module, '2d.shadow.blur.low','2d.shadow.blur.low.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#ff0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = '#00f';
  ctx.shadowOffsetY = 25;
  for (var x = 0; x < 100; ++x) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, 0, 1, 50);
      ctx.clip();
      ctx.shadowBlur = x;
      ctx.fillRect(-200, -200, 500, 200);
      ctx.restore();
  }

  t.done()
});


test(module, '2d.shadow.canvas.alpha','2d.shadow.canvas.alpha.png', function(t) {

  helpers.loadImages(t, [
    { id : 'transparent50.png' , url: __dirname + '/../images/transparent50.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(t, document);
    canvas2.width = 100;
    canvas2.height = 50;
    var ctx2 = canvas2.getContext('2d');
    ctx2.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx2.fillRect(0, 0, 100, 50);

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowOffsetY = 50;
    ctx.shadowColor = '#00f';
    ctx.drawImage(canvas2, 0, -50);

    helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

    t.done()
  });
});


test(module, '2d.shadow.canvas.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = helpers.createCanvas(t, document);
  canvas2.width = 100;
  canvas2.height = 50;
  var ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#f00';
  ctx2.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetY = 50;
  ctx.drawImage(canvas2, 0, -50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.canvas.transparent.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = helpers.createCanvas(t, document);
  canvas2.width = 100;
  canvas2.height = 50;
  var ctx2 = canvas2.getContext('2d');

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = '#f00';
  ctx.shadowOffsetY = 50;
  ctx.drawImage(canvas2, 0, -50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.canvas.transparent.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = helpers.createCanvas(t, document);
  canvas2.width = 100;
  canvas2.height = 50;
  var ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#f00';
  ctx2.fillRect(0, 0, 50, 50);

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 50, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(50, 0, 50, 50);
  ctx.shadowOffsetY = 50;
  ctx.shadowColor = '#0f0';
  ctx.drawImage(canvas2, 50, -50);
  ctx.shadowColor = '#f00';
  ctx.drawImage(canvas2, -50, -50);

  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.clip.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 50, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(50, 0, 50, 50);

  ctx.save();
  ctx.beginPath();
  ctx.rect(50, 0, 50, 50);
  ctx.clip();
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetX = 50;
  ctx.fillRect(0, 0, 50, 50);
  ctx.restore();

  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.clip.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(50, 0, 50, 50);

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, 50, 50);
  ctx.clip();
  ctx.shadowColor = '#f00';
  ctx.shadowOffsetX = 50;
  ctx.fillRect(0, 0, 50, 50);
  ctx.restore();

  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.clip.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(50, 0, 50, 50);

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, 50, 50);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetX = 50;
  ctx.fillRect(-50, 0, 50, 50);
  ctx.restore();

  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.composite.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'xor';
  ctx.shadowColor = '#f00';
  ctx.shadowOffsetX = 100;
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-100, 0, 200, 50);

  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.done()
});


test(module, '2d.shadow.composite.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'xor';
  ctx.shadowColor = '#f00';
  ctx.shadowBlur = 1;
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-10, -10, 120, 70);

  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.done()
});


test(module, '2d.shadow.composite.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.shadowColor = '#f00';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#f00';
  ctx.fillRect(200, 0, 100, 50);

  helpers.assertPixelApprox(t, canvas, 5,5, 0,255,0,255, "5,5", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.done()
});


test(module, '2d.shadow.enable.blur','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'destination-atop';
  ctx.shadowColor = '#0f0';
  ctx.shadowBlur = 0.1;
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.enable.off.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.shadowColor = '#f00';
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.enable.off.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'destination-atop';
  ctx.shadowColor = '#f00';
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.enable.x','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'destination-atop';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetX = 0.1;
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.enable.y','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'destination-atop';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetY = 0.1;
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.gradient.alpha','2d.shadow.gradient.alpha.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  var gradient = ctx.createLinearGradient(0, 0, 100, 0);
  gradient.addColorStop(0, 'rgba(255,0,0,0.5)');
  gradient.addColorStop(1, 'rgba(255,0,0,0.5)');
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowOffsetY = 50;
  ctx.shadowColor = '#00f';
  ctx.fillStyle = gradient;
  ctx.fillRect(0, -50, 100, 50);

  helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

  t.done()
});


test(module, '2d.shadow.gradient.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  var gradient = ctx.createLinearGradient(0, 0, 100, 0);
  gradient.addColorStop(0, '#f00');
  gradient.addColorStop(1, '#f00');
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetY = 50;
  ctx.fillStyle = gradient;
  ctx.fillRect(0, -50, 100, 50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.gradient.transparent.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  var gradient = ctx.createLinearGradient(0, 0, 100, 0);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = '#f00';
  ctx.shadowOffsetY = 50;
  ctx.fillStyle = gradient;
  ctx.fillRect(0, -50, 100, 50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.gradient.transparent.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  var gradient = ctx.createLinearGradient(0, 0, 100, 0);
  gradient.addColorStop(0, '#f00');
  gradient.addColorStop(0.499, '#f00');
  gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(50, 0, 50, 50);
  ctx.shadowOffsetY = 50;
  ctx.shadowColor = '#0f0';
  ctx.fillStyle = gradient;
  ctx.fillRect(0, -50, 100, 50);

  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.image.alpha','2d.shadow.image.alpha.png', function(t) {

  helpers.loadImages(t, [
    { id : 'transparent50.png' , url: __dirname + '/../images/transparent50.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowOffsetY = 50;
    ctx.shadowColor = '#00f';
    ctx.drawImage(images['transparent50.png'], 0, -50);

    helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

    t.done()
  });
});


test(module, '2d.shadow.image.basic','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowColor = '#0f0';
    ctx.shadowOffsetY = 50;
    ctx.drawImage(images['red.png'], 0, -50);

    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.shadow.image.scale','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'redtransparent.png' , url: __dirname + '/../images/redtransparent.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowOffsetY = 50;
    ctx.shadowColor = '#0f0';
    ctx.drawImage(images['redtransparent.png'], 0, 0, 100, 50, -10, -50, 240, 50);

    helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.shadow.image.section','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'redtransparent.png' , url: __dirname + '/../images/redtransparent.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowOffsetY = 50;
    ctx.shadowColor = '#f00';
    ctx.drawImage(images['redtransparent.png'], 50, 0, 50, 50, 0, -50, 50, 50);

    helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.shadow.image.transparent.1','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'transparent.png' , url: __dirname + '/../images/transparent.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowColor = '#f00';
    ctx.shadowOffsetY = 50;
    ctx.drawImage(images['transparent.png'], 0, -50);

    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.shadow.image.transparent.2','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'redtransparent.png' , url: __dirname + '/../images/redtransparent.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 50, 50);
    ctx.fillStyle = '#f00';
    ctx.fillRect(50, 0, 50, 50);
    ctx.shadowOffsetY = 50;
    ctx.shadowColor = '#0f0';
    ctx.drawImage(images['redtransparent.png'], 50, -50);
    ctx.shadowColor = '#f00';
    ctx.drawImage(images['redtransparent.png'], -50, -50);

    helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
    helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.shadow.offset.negativeX','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetX = -50;
  ctx.fillRect(50, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.offset.negativeY','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetY = -25;
  ctx.fillRect(0, 25, 100, 25);
  helpers.assertPixel(t, canvas, 50,12, 0,255,0,255, "50,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,37, 0,255,0,255, "50,37", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.offset.positiveX','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetX = 50;
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.offset.positiveY','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetY = 25;
  ctx.fillRect(0, 0, 100, 25);
  helpers.assertPixel(t, canvas, 50,12, 0,255,0,255, "50,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,37, 0,255,0,255, "50,37", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.outside','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetX = 100;
  ctx.fillRect(-100, 0, 25, 50);
  ctx.shadowOffsetX = -100;
  ctx.fillRect(175, 0, 25, 50);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 100;
  ctx.fillRect(25, -100, 50, 25);
  ctx.shadowOffsetY = -100;
  ctx.fillRect(25, 125, 50, 25);
  helpers.assertPixel(t, canvas, 12,25, 0,255,0,255, "12,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 87,25, 0,255,0,255, "87,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,12, 0,255,0,255, "50,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,37, 0,255,0,255, "50,37", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.pattern.alpha','2d.shadow.pattern.alpha.png', function(t) {

  helpers.loadImages(t, [
    { id : 'transparent50.png' , url: __dirname + '/../images/transparent50.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    var pattern = ctx.createPattern(images['transparent50.png'], 'repeat');
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowOffsetY = 50;
    ctx.shadowColor = '#00f';
    ctx.fillStyle = pattern;
    ctx.fillRect(0, -50, 100, 50);

    helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

    t.done()
  });
});


test(module, '2d.shadow.pattern.basic','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    var pattern = ctx.createPattern(images['red.png'], 'repeat');
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowColor = '#0f0';
    ctx.shadowOffsetY = 50;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, -50, 100, 50);

    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.shadow.pattern.transparent.1','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'transparent.png' , url: __dirname + '/../images/transparent.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    var pattern = ctx.createPattern(images['transparent.png'], 'repeat');
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowColor = '#f00';
    ctx.shadowOffsetY = 50;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, -50, 100, 50);

    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.shadow.pattern.transparent.2','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'redtransparent.png' , url: __dirname + '/../images/redtransparent.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    var pattern = ctx.createPattern(images['redtransparent.png'], 'repeat');
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 50, 50);
    ctx.fillStyle = '#0f0';
    ctx.fillRect(50, 0, 50, 50);
    ctx.shadowOffsetY = 50;
    ctx.shadowColor = '#0f0';
    ctx.fillStyle = pattern;
    ctx.fillRect(0, -50, 100, 50);

    helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
    helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.shadow.stroke.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetY = 50;
  ctx.beginPath();
  ctx.lineWidth = 50;
  ctx.moveTo(0, -25);
  ctx.lineTo(100, -25);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 1,25, 0,255,0,255, "1,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,25, 0,255,0,255, "98,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.stroke.cap.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.shadowColor = '#f00';
  ctx.shadowOffsetY = 50;
  ctx.beginPath();
  ctx.lineWidth = 50;
  ctx.lineCap = 'butt';
  ctx.moveTo(-50, -25);
  ctx.lineTo(0, -25);
  ctx.moveTo(100, -25);
  ctx.lineTo(150, -25);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 1,25, 0,255,0,255, "1,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,25, 0,255,0,255, "98,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.stroke.cap.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetY = 50;
  ctx.beginPath();
  ctx.lineWidth = 50;
  ctx.lineCap = 'square';
  ctx.moveTo(25, -25);
  ctx.lineTo(75, -25);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 1,25, 0,255,0,255, "1,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,25, 0,255,0,255, "98,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.stroke.join.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.shadowColor = '#f00';
  ctx.shadowOffsetX = 100;
  ctx.lineWidth = 200;
  ctx.lineJoin = 'bevel';
  ctx.beginPath();
  ctx.moveTo(-200, -50);
  ctx.lineTo(-150, -50);
  ctx.lineTo(-151, -100);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.stroke.join.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(50, 0, 50, 50);
  ctx.strokeStyle = '#f00';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetX = 100;
  ctx.lineWidth = 200;
  ctx.lineJoin = 'miter';
  ctx.beginPath();
  ctx.moveTo(-200, -50);
  ctx.lineTo(-150, -50);
  ctx.lineTo(-151, -100);
  ctx.stroke();

  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.stroke.join.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.strokeStyle = '#f00';
  ctx.shadowColor = '#f00';
  ctx.shadowOffsetX = 100;
  ctx.lineWidth = 200;
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 0.1;
  ctx.beginPath();
  ctx.moveTo(-200, -50);
  ctx.lineTo(-150, -50);
  ctx.lineTo(-151, -100); // (not an exact right angle, to avoid some other bug in Firefox 3)
  ctx.stroke();

  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.transform.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowOffsetY = 50;
  ctx.shadowColor = '#0f0';
  ctx.translate(100, 100);
  ctx.fillRect(-100, -150, 100, 50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.shadow.transform.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowOffsetY = 50;
  ctx.shadowColor = '#0f0';
  ctx.rotate(Math.PI)
  ctx.fillRect(-100, 0, 100, 50);

  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});

