var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Window = helpers.Window;
var Document = helpers.Document;

test('2d.shadow.alpha.1', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = 'rgba(255, 0, 0, 0.01)';
  ctx.shadowOffsetY = 50;
  ctx.fillRect(0, -50, 100, 50);
  
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 4);

  t.end()
});


test('2d.shadow.alpha.2', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = 'rgba(0, 0, 255, 0.5)';
  ctx.shadowOffsetY = 50;
  ctx.fillRect(0, -50, 100, 50);
  
  helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

  t.end()
});


test('2d.shadow.alpha.3', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00'; // (work around broken Firefox globalAlpha caching)
  ctx.shadowColor = '#00f';
  ctx.shadowOffsetY = 50;
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0, -50, 100, 50);
  
  helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

  t.end()
});


test('2d.shadow.alpha.4', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00'; // (work around broken Firefox globalAlpha caching)
  ctx.shadowColor = 'rgba(0, 0, 255, 0.707)';
  ctx.shadowOffsetY = 50;
  ctx.globalAlpha = 0.707;
  ctx.fillRect(0, -50, 100, 50);
  
  helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

  t.end()
});


test('2d.shadow.alpha.5', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = 'rgba(64, 0, 0, 0.5)';
  ctx.shadowColor = '#00f';
  ctx.shadowOffsetY = 50;
  ctx.fillRect(0, -50, 100, 50);
  
  helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

  t.end()
});


test('2d.shadow.attributes.shadowBlur.initial', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.shadowBlur, 0, "ctx.shadowBlur", "0");

  t.end()
});


test('2d.shadow.attributes.shadowBlur.invalid', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.attributes.shadowBlur.valid', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.shadowBlur = 1;
  helpers.assertEqual(t, ctx.shadowBlur, 1, "ctx.shadowBlur", "1");
  
  ctx.shadowBlur = 0.5;
  helpers.assertEqual(t, ctx.shadowBlur, 0.5, "ctx.shadowBlur", "0.5");
  
  ctx.shadowBlur = 1e6;
  helpers.assertEqual(t, ctx.shadowBlur, 1e6, "ctx.shadowBlur", "1e6");
  
  ctx.shadowBlur = 0;
  helpers.assertEqual(t, ctx.shadowBlur, 0, "ctx.shadowBlur", "0");

  t.end()
});


test('2d.shadow.attributes.shadowColor.initial', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.shadowColor, 'rgba(0, 0, 0, 0.0)', "ctx.shadowColor", "'rgba(0, 0, 0, 0.0)'");

  t.end()
});


test('2d.shadow.attributes.shadowColor.invalid', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.attributes.shadowColor.valid', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.shadowColor = 'lime';
  helpers.assertEqual(t, ctx.shadowColor, '#00ff00', "ctx.shadowColor", "'#00ff00'");
  
  ctx.shadowColor = 'RGBA(0,255, 0,0)';
  helpers.assertEqual(t, ctx.shadowColor, 'rgba(0, 255, 0, 0.0)', "ctx.shadowColor", "'rgba(0, 255, 0, 0.0)'");

  t.end()
});


test('2d.shadow.attributes.shadowOffset.initial', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.shadowOffsetX, 0, "ctx.shadowOffsetX", "0");
  helpers.assertEqual(t, ctx.shadowOffsetY, 0, "ctx.shadowOffsetY", "0");

  t.end()
});


test('2d.shadow.attributes.shadowOffset.invalid', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.attributes.shadowOffset.valid', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.blur.high', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#ff0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = '#00f';
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 555.6;
  ctx.fillRect(-200, -200, 200, 400);

  t.end()
});


test('2d.shadow.blur.low', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.canvas.alpha', function(t) {

  helpers.loadImages([
    { id : 'transparent50.png' , url: __dirname + '/../philip/orig/images/transparent50.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
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

    t.end()
  });
});


test('2d.shadow.canvas.basic', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = new Canvas();
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

  t.end()
});


test('2d.shadow.canvas.transparent.1', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = new Canvas();
  canvas2.width = 100;
  canvas2.height = 50;
  var ctx2 = canvas2.getContext('2d');
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowColor = '#f00';
  ctx.shadowOffsetY = 50;
  ctx.drawImage(canvas2, 0, -50);
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.shadow.canvas.transparent.2', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = new Canvas();
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

  t.end()
});


test('2d.shadow.clip.1', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.clip.2', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.clip.3', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.composite.1', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'xor';
  ctx.shadowColor = '#f00';
  ctx.shadowOffsetX = 100;
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-100, 0, 200, 50);
  
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.shadow.composite.2', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'xor';
  ctx.shadowColor = '#f00';
  ctx.shadowBlur = 1;
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-10, -10, 120, 70);
  
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.shadow.composite.3', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.enable.blur', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'destination-atop';
  ctx.shadowColor = '#0f0';
  ctx.shadowBlur = 0.1;
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.shadow.enable.off.1', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.shadowColor = '#f00';
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.shadow.enable.off.2', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'destination-atop';
  ctx.shadowColor = '#f00';
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.shadow.enable.x', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'destination-atop';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetX = 0.1;
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.shadow.enable.y', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'destination-atop';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetY = 0.1;
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.shadow.gradient.alpha', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.gradient.basic', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.gradient.transparent.1', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.gradient.transparent.2', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.image.alpha', function(t) {

  helpers.loadImages([
    { id : 'transparent50.png' , url: __dirname + '/../philip/orig/images/transparent50.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowOffsetY = 50;
    ctx.shadowColor = '#00f';
    ctx.drawImage(images['transparent50.png'], 0, -50);
    
    helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

    t.end()
  });
});


test('2d.shadow.image.basic', function(t) {

  helpers.loadImages([
    { id : 'red.png' , url: __dirname + '/../philip/orig/images/red.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowColor = '#0f0';
    ctx.shadowOffsetY = 50;
    ctx.drawImage(images['red.png'], 0, -50);
    
    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

    t.end()
  });
});


test('2d.shadow.image.scale', function(t) {

  helpers.loadImages([
    { id : 'redtransparent.png' , url: __dirname + '/../philip/orig/images/redtransparent.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowOffsetY = 50;
    ctx.shadowColor = '#0f0';
    ctx.drawImage(images['redtransparent.png'], 0, 0, 100, 50, -10, -50, 240, 50);
    
    helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);

    t.end()
  });
});


test('2d.shadow.image.section', function(t) {

  helpers.loadImages([
    { id : 'redtransparent.png' , url: __dirname + '/../philip/orig/images/redtransparent.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowOffsetY = 50;
    ctx.shadowColor = '#f00';
    ctx.drawImage(images['redtransparent.png'], 50, 0, 50, 50, 0, -50, 50, 50);
    
    helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);

    t.end()
  });
});


test('2d.shadow.image.transparent.1', function(t) {

  helpers.loadImages([
    { id : 'transparent.png' , url: __dirname + '/../philip/orig/images/transparent.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowColor = '#f00';
    ctx.shadowOffsetY = 50;
    ctx.drawImage(images['transparent.png'], 0, -50);
    
    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

    t.end()
  });
});


test('2d.shadow.image.transparent.2', function(t) {

  helpers.loadImages([
    { id : 'redtransparent.png' , url: __dirname + '/../philip/orig/images/redtransparent.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
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

    t.end()
  });
});


test('2d.shadow.offset.negativeX', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetX = -50;
  ctx.fillRect(50, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.shadow.offset.negativeY', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetY = -25;
  ctx.fillRect(0, 25, 100, 25);
  helpers.assertPixel(t, canvas, 50,12, 0,255,0,255, "50,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,37, 0,255,0,255, "50,37", "0,255,0,255");

  t.end()
});


test('2d.shadow.offset.positiveX', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetX = 50;
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.shadow.offset.positiveY', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.shadowColor = '#0f0';
  ctx.shadowOffsetY = 25;
  ctx.fillRect(0, 0, 100, 25);
  helpers.assertPixel(t, canvas, 50,12, 0,255,0,255, "50,12", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,37, 0,255,0,255, "50,37", "0,255,0,255");

  t.end()
});


test('2d.shadow.outside', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.pattern.alpha', function(t) {

  helpers.loadImages([
    { id : 'transparent50.png' , url: __dirname + '/../philip/orig/images/transparent50.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var pattern = ctx.createPattern(images['transparent50.png'], 'repeat');
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowOffsetY = 50;
    ctx.shadowColor = '#00f';
    ctx.fillStyle = pattern;
    ctx.fillRect(0, -50, 100, 50);
    
    helpers.assertPixelApprox(t, canvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);

    t.end()
  });
});


test('2d.shadow.pattern.basic', function(t) {

  helpers.loadImages([
    { id : 'red.png' , url: __dirname + '/../philip/orig/images/red.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var pattern = ctx.createPattern(images['red.png'], 'repeat');
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowColor = '#0f0';
    ctx.shadowOffsetY = 50;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, -50, 100, 50);
    
    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

    t.end()
  });
});


test('2d.shadow.pattern.transparent.1', function(t) {

  helpers.loadImages([
    { id : 'transparent.png' , url: __dirname + '/../philip/orig/images/transparent.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var pattern = ctx.createPattern(images['transparent.png'], 'repeat');
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.shadowColor = '#f00';
    ctx.shadowOffsetY = 50;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, -50, 100, 50);
    
    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

    t.end()
  });
});


test('2d.shadow.pattern.transparent.2', function(t) {

  helpers.loadImages([
    { id : 'redtransparent.png' , url: __dirname + '/../philip/orig/images/redtransparent.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
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

    t.end()
  });
});


test('2d.shadow.stroke.basic', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.stroke.cap.1', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.stroke.cap.2', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.stroke.join.1', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.stroke.join.2', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.stroke.join.3', function(t) {

  var canvas = new Canvas(100, 50);
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

  t.end()
});


test('2d.shadow.transform.1', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowOffsetY = 50;
  ctx.shadowColor = '#0f0';
  ctx.translate(100, 100);
  ctx.fillRect(-100, -150, 100, 50);
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.shadow.transform.2', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.shadowOffsetY = 50;
  ctx.shadowColor = '#0f0';
  ctx.rotate(Math.PI)
  ctx.fillRect(-100, 0, 100, 50);
  
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});

