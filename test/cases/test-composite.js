var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var Window = helpers.Window;
var Document = helpers.Document;
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.composite.canvas.copy', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,191, "50,25", "255,255,0,191", 5);

    t.end()
  });
});


test('2d.composite.canvas.destination-atop', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-atop';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 127,255,127,191, "50,25", "127,255,127,191", 5);

    t.end()
  });
});


test('2d.composite.canvas.destination-in', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,95, "50,25", "0,255,255,95", 5);

    t.end()
  });
});


test('2d.composite.canvas.destination-out', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,31, "50,25", "0,255,255,31", 5);

    t.end()
  });
});


test('2d.composite.canvas.destination-over', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 109,255,145,223, "50,25", "109,255,145,223", 5);

    t.end()
  });
});


test('2d.composite.canvas.lighter', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,127,255, "50,25", "191,255,127,255", 5);

    t.end()
  });
});


test('2d.composite.canvas.source-atop', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,63,127, "50,25", "191,255,63,127", 5);

    t.end()
  });
});


test('2d.composite.canvas.source-in', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,95, "50,25", "255,255,0,95", 5);

    t.end()
  });
});


test('2d.composite.canvas.source-out', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-out';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,95, "50,25", "255,255,0,95", 5);

    t.end()
  });
});


test('2d.composite.canvas.source-over', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 218,255,36,223, "50,25", "218,255,36,223", 5);

    t.end()
  });
});


test('2d.composite.canvas.xor', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = new Canvas();
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'xor';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,63,127, "50,25", "191,255,63,127", 5);

    t.end()
  });
});


test('2d.composite.clip.copy', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'copy';
  ctx.rect(-20, -20, 10, 10);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.composite.clip.destination-atop', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-atop';
  ctx.rect(-20, -20, 10, 10);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.composite.clip.destination-in', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.rect(-20, -20, 10, 10);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.composite.clip.destination-out', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.rect(-20, -20, 10, 10);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.composite.clip.destination-over', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-over';
  ctx.rect(-20, -20, 10, 10);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.composite.clip.lighter', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'lighter';
  ctx.rect(-20, -20, 10, 10);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.composite.clip.source-atop', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-atop';
  ctx.rect(-20, -20, 10, 10);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.composite.clip.source-in', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-in';
  ctx.rect(-20, -20, 10, 10);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.composite.clip.source-out', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-out';
  ctx.rect(-20, -20, 10, 10);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.composite.clip.source-over', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-over';
  ctx.rect(-20, -20, 10, 10);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.composite.clip.xor', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'xor';
  ctx.rect(-20, -20, 10, 10);
  ctx.clip();
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 50, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.composite.globalAlpha.canvas', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = new Canvas();
  canvas2.width = 100;
  canvas2.height = 50;
  var ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#f00';
  ctx2.fillRect(0, 0, 100, 50);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalAlpha = 0.01; // avoid any potential alpha=0 optimisations
  ctx.drawImage(canvas2, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 2,253,0,255, "50,25", "2,253,0,255", 2);

  t.end()
});


test('2d.composite.globalAlpha.canvaspattern', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = new Canvas();
  canvas2.width = 100;
  canvas2.height = 50;
  var ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#f00';
  ctx2.fillRect(0, 0, 100, 50);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = ctx.createPattern(canvas2, 'no-repeat');
  ctx.globalAlpha = 0.01; // avoid any potential alpha=0 optimisations
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 2,253,0,255, "50,25", "2,253,0,255", 2);

  t.end()
});


test('2d.composite.globalAlpha.default', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.globalAlpha, 1.0, "ctx.globalAlpha", "1.0");

  t.end()
});


test('2d.composite.globalAlpha.fill', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalAlpha = 0.01; // avoid any potential alpha=0 optimisations
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 2,253,0,255, "50,25", "2,253,0,255", 2);

  t.end()
});


test('2d.composite.globalAlpha.image', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../philip/orig/images/red.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalAlpha = 0.01; // avoid any potential alpha=0 optimisations
    ctx.drawImage(images['red.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 2,253,0,255, "50,25", "2,253,0,255", 2);

    t.end()
  });
});


test('2d.composite.globalAlpha.imagepattern', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../philip/orig/images/red.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.fillStyle = ctx.createPattern(images['red.png'], 'no-repeat');
    ctx.globalAlpha = 0.01; // avoid any potential alpha=0 optimisations
    ctx.fillRect(0, 0, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 2,253,0,255, "50,25", "2,253,0,255", 2);

    t.end()
  });
});


test('2d.composite.globalAlpha.invalid', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalAlpha = 0.5;
  var a = ctx.globalAlpha; // might not be exactly 0.5, if it is rounded/quantised, so remember for future comparisons
  ctx.globalAlpha = Infinity;
  helpers.assertEqual(t, ctx.globalAlpha, a, "ctx.globalAlpha", "a");
  ctx.globalAlpha = -Infinity;
  helpers.assertEqual(t, ctx.globalAlpha, a, "ctx.globalAlpha", "a");
  ctx.globalAlpha = NaN;
  helpers.assertEqual(t, ctx.globalAlpha, a, "ctx.globalAlpha", "a");

  t.end()
});


test('2d.composite.globalAlpha.range', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalAlpha = 0.5;
  var a = ctx.globalAlpha; // might not be exactly 0.5, if it is rounded/quantised, so remember for future comparisons
  ctx.globalAlpha = 1.1;
  helpers.assertEqual(t, ctx.globalAlpha, a, "ctx.globalAlpha", "a");
  ctx.globalAlpha = -0.1;
  helpers.assertEqual(t, ctx.globalAlpha, a, "ctx.globalAlpha", "a");
  ctx.globalAlpha = 0;
  helpers.assertEqual(t, ctx.globalAlpha, 0, "ctx.globalAlpha", "0");
  ctx.globalAlpha = 1;
  helpers.assertEqual(t, ctx.globalAlpha, 1, "ctx.globalAlpha", "1");

  t.end()
});


test('2d.composite.image.copy', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,191, "50,25", "255,255,0,191", 5);

    t.end()
  });
});


test('2d.composite.image.destination-atop', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-atop';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 127,255,127,191, "50,25", "127,255,127,191", 5);

    t.end()
  });
});


test('2d.composite.image.destination-in', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,95, "50,25", "0,255,255,95", 5);

    t.end()
  });
});


test('2d.composite.image.destination-out', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,31, "50,25", "0,255,255,31", 5);

    t.end()
  });
});


test('2d.composite.image.destination-over', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 109,255,145,223, "50,25", "109,255,145,223", 5);

    t.end()
  });
});


test('2d.composite.image.lighter', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,127,255, "50,25", "191,255,127,255", 5);

    t.end()
  });
});


test('2d.composite.image.source-atop', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,63,127, "50,25", "191,255,63,127", 5);

    t.end()
  });
});


test('2d.composite.image.source-in', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,95, "50,25", "255,255,0,95", 5);

    t.end()
  });
});


test('2d.composite.image.source-out', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-out';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,95, "50,25", "255,255,0,95", 5);

    t.end()
  });
});


test('2d.composite.image.source-over', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 218,255,36,223, "50,25", "218,255,36,223", 5);

    t.end()
  });
});


test('2d.composite.image.xor', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../philip/orig/images/yellow75.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'xor';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,63,127, "50,25", "191,255,63,127", 5);

    t.end()
  });
});


test('2d.composite.operation.casesensitive', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'Source-over';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.end()
});


test('2d.composite.operation.clear', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'clear';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.end()
});


test('2d.composite.operation.darker', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'darker';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.end()
});


test('2d.composite.operation.default', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.globalCompositeOperation, 'source-over', "ctx.globalCompositeOperation", "'source-over'");

  t.end()
});


test('2d.composite.operation.get', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var modes = ['source-atop', 'source-in', 'source-out', 'source-over',
      'destination-atop', 'destination-in', 'destination-out', 'destination-over',
      'lighter', 'copy', 'xor'];
  for (var i = 0; i < modes.length; ++i)
  {
      ctx.globalCompositeOperation = modes[i];
      helpers.assertEqual(t, ctx.globalCompositeOperation, modes[i], "ctx.globalCompositeOperation", "modes[\""+(i)+"\"]");
  }

  t.end()
});


test('2d.composite.operation.highlight', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'highlight';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.end()
});


test('2d.composite.operation.nullsuffix', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'source-over\0';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.end()
});


test('2d.composite.operation.over', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'over';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.end()
});


test('2d.composite.operation.unrecognised', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'nonexistent';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.end()
});


test('2d.composite.solid.copy', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'copy';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,255, "50,25", "255,255,0,255", 5);

  t.end()
});


test('2d.composite.solid.destination-atop', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-atop';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,255, "50,25", "0,255,255,255", 5);

  t.end()
});


test('2d.composite.solid.destination-in', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,255, "50,25", "0,255,255,255", 5);

  t.end()
});


test('2d.composite.solid.destination-out', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.solid.destination-over', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,255, "50,25", "0,255,255,255", 5);

  t.end()
});


test('2d.composite.solid.lighter', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 255,255,255,255, "50,25", "255,255,255,255", 5);

  t.end()
});


test('2d.composite.solid.source-atop', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,255, "50,25", "255,255,0,255", 5);

  t.end()
});


test('2d.composite.solid.source-in', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,255, "50,25", "255,255,0,255", 5);

  t.end()
});


test('2d.composite.solid.source-out', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-out';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.solid.source-over', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,255, "50,25", "255,255,0,255", 5);

  t.end()
});


test('2d.composite.solid.xor', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'xor';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.transparent.copy', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'copy';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,255,191, "50,25", "0,0,255,191", 5);

  t.end()
});


test('2d.composite.transparent.destination-atop', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-atop';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,127,127,191, "50,25", "0,127,127,191", 5);

  t.end()
});


test('2d.composite.transparent.destination-in', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,95, "50,25", "0,255,0,95", 5);

  t.end()
});


test('2d.composite.transparent.destination-out', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,31, "50,25", "0,255,0,31", 5);

  t.end()
});


test('2d.composite.transparent.destination-over', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,145,109,223, "50,25", "0,145,109,223", 5);

  t.end()
});


test('2d.composite.transparent.lighter', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,127,191,255, "50,25", "0,127,191,255", 5);

  t.end()
});


test('2d.composite.transparent.source-atop', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,63,191,127, "50,25", "0,63,191,127", 5);

  t.end()
});


test('2d.composite.transparent.source-in', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,255,95, "50,25", "0,0,255,95", 5);

  t.end()
});


test('2d.composite.transparent.source-out', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-out';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,255,95, "50,25", "0,0,255,95", 5);

  t.end()
});


test('2d.composite.transparent.source-over', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,36,218,223, "50,25", "0,36,218,223", 5);

  t.end()
});


test('2d.composite.transparent.xor', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'xor';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,63,191,127, "50,25", "0,63,191,127", 5);

  t.end()
});


test('2d.composite.uncovered.fill.copy', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'copy';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.translate(0, 25);
  ctx.fillRect(0, 50, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.uncovered.fill.destination-atop', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-atop';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.translate(0, 25);
  ctx.fillRect(0, 50, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.uncovered.fill.destination-in', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.translate(0, 25);
  ctx.fillRect(0, 50, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.uncovered.fill.source-in', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.translate(0, 25);
  ctx.fillRect(0, 50, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.uncovered.fill.source-out', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-out';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.translate(0, 25);
  ctx.fillRect(0, 50, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.uncovered.image.copy', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../philip/orig/images/yellow.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(images['yellow.png'], 40, 40, 10, 10, 40, 50, 10, 10);
    helpers.assertPixelApprox(t, canvas, 15,15, 0,0,0,0, "15,15", "0,0,0,0", 5);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.end()
  });
});


test('2d.composite.uncovered.image.destination-atop', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../philip/orig/images/yellow.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-atop';
    ctx.drawImage(images['yellow.png'], 40, 40, 10, 10, 40, 50, 10, 10);
    helpers.assertPixelApprox(t, canvas, 15,15, 0,0,0,0, "15,15", "0,0,0,0", 5);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.end()
  });
});


test('2d.composite.uncovered.image.destination-in', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../philip/orig/images/yellow.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(images['yellow.png'], 40, 40, 10, 10, 40, 50, 10, 10);
    helpers.assertPixelApprox(t, canvas, 15,15, 0,0,0,0, "15,15", "0,0,0,0", 5);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.end()
  });
});


test('2d.composite.uncovered.image.source-in', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../philip/orig/images/yellow.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(images['yellow.png'], 40, 40, 10, 10, 40, 50, 10, 10);
    helpers.assertPixelApprox(t, canvas, 15,15, 0,0,0,0, "15,15", "0,0,0,0", 5);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.end()
  });
});


test('2d.composite.uncovered.image.source-out', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../philip/orig/images/yellow.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-out';
    ctx.drawImage(images['yellow.png'], 40, 40, 10, 10, 40, 50, 10, 10);
    helpers.assertPixelApprox(t, canvas, 15,15, 0,0,0,0, "15,15", "0,0,0,0", 5);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.end()
  });
});


test('2d.composite.uncovered.nocontext.copy', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'copy';
  var canvas2 = new Canvas();
  ctx.drawImage(canvas2, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.uncovered.nocontext.destination-atop', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-atop';
  var canvas2 = new Canvas();
  ctx.drawImage(canvas2, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.uncovered.nocontext.destination-in', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-in';
  var canvas2 = new Canvas();
  ctx.drawImage(canvas2, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.uncovered.nocontext.source-in', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-in';
  var canvas2 = new Canvas();
  ctx.drawImage(canvas2, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.uncovered.nocontext.source-out', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-out';
  var canvas2 = new Canvas();
  ctx.drawImage(canvas2, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.end()
});


test('2d.composite.uncovered.pattern.copy', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../philip/orig/images/yellow.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'copy';
    ctx.fillStyle = ctx.createPattern(images['yellow.png'], 'no-repeat');
    ctx.fillRect(0, 50, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.end()
  });
});


test('2d.composite.uncovered.pattern.destination-atop', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../philip/orig/images/yellow.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-atop';
    ctx.fillStyle = ctx.createPattern(images['yellow.png'], 'no-repeat');
    ctx.fillRect(0, 50, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.end()
  });
});


test('2d.composite.uncovered.pattern.destination-in', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../philip/orig/images/yellow.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = ctx.createPattern(images['yellow.png'], 'no-repeat');
    ctx.fillRect(0, 50, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.end()
  });
});


test('2d.composite.uncovered.pattern.source-in', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../philip/orig/images/yellow.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = ctx.createPattern(images['yellow.png'], 'no-repeat');
    ctx.fillRect(0, 50, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.end()
  });
});


test('2d.composite.uncovered.pattern.source-out', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../philip/orig/images/yellow.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-out';
    ctx.fillStyle = ctx.createPattern(images['yellow.png'], 'no-repeat');
    ctx.fillRect(0, 50, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.end()
  });
});

