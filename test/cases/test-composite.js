var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.composite.canvas.copy','2d.composite.canvas.copy.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(document);
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,191, "50,25", "255,255,0,191", 5);

    t.done()
  });
});


test(module, '2d.composite.canvas.destination-atop','2d.composite.canvas.destination-atop.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(document);
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-atop';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 127,255,127,191, "50,25", "127,255,127,191", 5);

    t.done()
  });
});


test(module, '2d.composite.canvas.destination-in','2d.composite.canvas.destination-in.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(document);
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,95, "50,25", "0,255,255,95", 5);

    t.done()
  });
});


test(module, '2d.composite.canvas.destination-out','2d.composite.canvas.destination-out.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(document);
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,31, "50,25", "0,255,255,31", 5);

    t.done()
  });
});


test(module, '2d.composite.canvas.destination-over','2d.composite.canvas.destination-over.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(document);
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 109,255,145,223, "50,25", "109,255,145,223", 5);

    t.done()
  });
});


test(module, '2d.composite.canvas.lighter','2d.composite.canvas.lighter.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(document);
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,127,255, "50,25", "191,255,127,255", 5);

    t.done()
  });
});


test(module, '2d.composite.canvas.source-atop','2d.composite.canvas.source-atop.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(document);
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,63,127, "50,25", "191,255,63,127", 5);

    t.done()
  });
});


test(module, '2d.composite.canvas.source-in','2d.composite.canvas.source-in.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(document);
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,95, "50,25", "255,255,0,95", 5);

    t.done()
  });
});


test(module, '2d.composite.canvas.source-out','2d.composite.canvas.source-out.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(document);
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-out';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,95, "50,25", "255,255,0,95", 5);

    t.done()
  });
});


test(module, '2d.composite.canvas.source-over','2d.composite.canvas.source-over.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(document);
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 218,255,36,223, "50,25", "218,255,36,223", 5);

    t.done()
  });
});


test(module, '2d.composite.canvas.xor','2d.composite.canvas.xor.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var canvas2 = helpers.createCanvas(document);
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(images['yellow75.png'], 0, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'xor';
    ctx.drawImage(canvas2, 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,63,127, "50,25", "191,255,63,127", 5);

    t.done()
  });
});


test(module, '2d.composite.clip.copy','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.clip.destination-atop','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.clip.destination-in','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.clip.destination-out','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.clip.destination-over','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.clip.lighter','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.clip.source-atop','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.clip.source-in','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.clip.source-out','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.clip.source-over','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.clip.xor','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.globalAlpha.canvas','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = helpers.createCanvas(document);
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

  t.done()
});


test(module, '2d.composite.globalAlpha.canvaspattern','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = helpers.createCanvas(document);
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

  t.done()
});


test(module, '2d.composite.globalAlpha.default',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.globalAlpha, 1.0, "ctx.globalAlpha", "1.0");

  t.done()
});


test(module, '2d.composite.globalAlpha.fill','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalAlpha = 0.01; // avoid any potential alpha=0 optimisations
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 2,253,0,255, "50,25", "2,253,0,255", 2);

  t.done()
});


test(module, '2d.composite.globalAlpha.image','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalAlpha = 0.01; // avoid any potential alpha=0 optimisations
    ctx.drawImage(images['red.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 2,253,0,255, "50,25", "2,253,0,255", 2);

    t.done()
  });
});


test(module, '2d.composite.globalAlpha.imagepattern','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.fillStyle = ctx.createPattern(images['red.png'], 'no-repeat');
    ctx.globalAlpha = 0.01; // avoid any potential alpha=0 optimisations
    ctx.fillRect(0, 0, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 2,253,0,255, "50,25", "2,253,0,255", 2);

    t.done()
  });
});


test(module, '2d.composite.globalAlpha.invalid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalAlpha = 0.5;
  var a = ctx.globalAlpha; // might not be exactly 0.5, if it is rounded/quantised, so remember for future comparisons
  ctx.globalAlpha = Infinity;
  helpers.assertEqual(t, ctx.globalAlpha, a, "ctx.globalAlpha", "a");
  ctx.globalAlpha = -Infinity;
  helpers.assertEqual(t, ctx.globalAlpha, a, "ctx.globalAlpha", "a");
  ctx.globalAlpha = NaN;
  helpers.assertEqual(t, ctx.globalAlpha, a, "ctx.globalAlpha", "a");

  t.done()
});


test(module, '2d.composite.globalAlpha.range',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
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

  t.done()
});


test(module, '2d.composite.image.copy','2d.composite.image.copy.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,191, "50,25", "255,255,0,191", 5);

    t.done()
  });
});


test(module, '2d.composite.image.destination-atop','2d.composite.image.destination-atop.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-atop';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 127,255,127,191, "50,25", "127,255,127,191", 5);

    t.done()
  });
});


test(module, '2d.composite.image.destination-in','2d.composite.image.destination-in.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,95, "50,25", "0,255,255,95", 5);

    t.done()
  });
});


test(module, '2d.composite.image.destination-out','2d.composite.image.destination-out.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,31, "50,25", "0,255,255,31", 5);

    t.done()
  });
});


test(module, '2d.composite.image.destination-over','2d.composite.image.destination-over.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 109,255,145,223, "50,25", "109,255,145,223", 5);

    t.done()
  });
});


test(module, '2d.composite.image.lighter','2d.composite.image.lighter.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,127,255, "50,25", "191,255,127,255", 5);

    t.done()
  });
});


test(module, '2d.composite.image.source-atop','2d.composite.image.source-atop.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,63,127, "50,25", "191,255,63,127", 5);

    t.done()
  });
});


test(module, '2d.composite.image.source-in','2d.composite.image.source-in.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,95, "50,25", "255,255,0,95", 5);

    t.done()
  });
});


test(module, '2d.composite.image.source-out','2d.composite.image.source-out.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-out';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,95, "50,25", "255,255,0,95", 5);

    t.done()
  });
});


test(module, '2d.composite.image.source-over','2d.composite.image.source-over.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 218,255,36,223, "50,25", "218,255,36,223", 5);

    t.done()
  });
});


test(module, '2d.composite.image.xor','2d.composite.image.xor.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow75.png' , url: __dirname + '/../images/yellow75.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'xor';
    ctx.drawImage(images['yellow75.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 191,255,63,127, "50,25", "191,255,63,127", 5);

    t.done()
  });
});


test(module, '2d.composite.operation.casesensitive',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'Source-over';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.done()
});


test(module, '2d.composite.operation.clear',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'clear';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.done()
});


test(module, '2d.composite.operation.darker',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'darker';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.done()
});


test(module, '2d.composite.operation.default',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.globalCompositeOperation, 'source-over', "ctx.globalCompositeOperation", "'source-over'");

  t.done()
});


test(module, '2d.composite.operation.get',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var modes = ['source-atop', 'source-in', 'source-out', 'source-over',
      'destination-atop', 'destination-in', 'destination-out', 'destination-over',
      'lighter', 'copy', 'xor'];
  for (var i = 0; i < modes.length; ++i)
  {
      ctx.globalCompositeOperation = modes[i];
      helpers.assertEqual(t, ctx.globalCompositeOperation, modes[i], "ctx.globalCompositeOperation", "modes[\""+(i)+"\"]");
  }

  t.done()
});


test(module, '2d.composite.operation.highlight',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'highlight';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.done()
});


test(module, '2d.composite.operation.nullsuffix',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'source-over\0';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.done()
});


test(module, '2d.composite.operation.over',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'over';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.done()
});


test(module, '2d.composite.operation.unrecognised',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.globalCompositeOperation = 'xor';
  ctx.globalCompositeOperation = 'nonexistent';
  helpers.assertEqual(t, ctx.globalCompositeOperation, 'xor', "ctx.globalCompositeOperation", "'xor'");

  t.done()
});


test(module, '2d.composite.solid.copy','2d.composite.solid.copy.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'copy';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,255, "50,25", "255,255,0,255", 5);

  t.done()
});


test(module, '2d.composite.solid.destination-atop','2d.composite.solid.destination-atop.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-atop';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,255, "50,25", "0,255,255,255", 5);

  t.done()
});


test(module, '2d.composite.solid.destination-in','2d.composite.solid.destination-in.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,255, "50,25", "0,255,255,255", 5);

  t.done()
});


test(module, '2d.composite.solid.destination-out','2d.composite.solid.destination-out.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.solid.destination-over','2d.composite.solid.destination-over.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,255,255, "50,25", "0,255,255,255", 5);

  t.done()
});


test(module, '2d.composite.solid.lighter','2d.composite.solid.lighter.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 255,255,255,255, "50,25", "255,255,255,255", 5);

  t.done()
});


test(module, '2d.composite.solid.source-atop','2d.composite.solid.source-atop.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,255, "50,25", "255,255,0,255", 5);

  t.done()
});


test(module, '2d.composite.solid.source-in','2d.composite.solid.source-in.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,255, "50,25", "255,255,0,255", 5);

  t.done()
});


test(module, '2d.composite.solid.source-out','2d.composite.solid.source-out.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-out';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.solid.source-over','2d.composite.solid.source-over.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 255,255,0,255, "50,25", "255,255,0,255", 5);

  t.done()
});


test(module, '2d.composite.solid.xor','2d.composite.solid.xor.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'xor';
  ctx.fillStyle = 'rgba(255, 255, 0, 1.0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.transparent.copy','2d.composite.transparent.copy.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'copy';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,255,191, "50,25", "0,0,255,191", 5);

  t.done()
});


test(module, '2d.composite.transparent.destination-atop','2d.composite.transparent.destination-atop.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-atop';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,127,127,191, "50,25", "0,127,127,191", 5);

  t.done()
});


test(module, '2d.composite.transparent.destination-in','2d.composite.transparent.destination-in.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,95, "50,25", "0,255,0,95", 5);

  t.done()
});


test(module, '2d.composite.transparent.destination-out','2d.composite.transparent.destination-out.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,31, "50,25", "0,255,0,31", 5);

  t.done()
});


test(module, '2d.composite.transparent.destination-over','2d.composite.transparent.destination-over.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,145,109,223, "50,25", "0,145,109,223", 5);

  t.done()
});


test(module, '2d.composite.transparent.lighter','2d.composite.transparent.lighter.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,127,191,255, "50,25", "0,127,191,255", 5);

  t.done()
});


test(module, '2d.composite.transparent.source-atop','2d.composite.transparent.source-atop.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,63,191,127, "50,25", "0,63,191,127", 5);

  t.done()
});


test(module, '2d.composite.transparent.source-in','2d.composite.transparent.source-in.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,255,95, "50,25", "0,0,255,95", 5);

  t.done()
});


test(module, '2d.composite.transparent.source-out','2d.composite.transparent.source-out.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-out';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,255,95, "50,25", "0,0,255,95", 5);

  t.done()
});


test(module, '2d.composite.transparent.source-over','2d.composite.transparent.source-over.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,36,218,223, "50,25", "0,36,218,223", 5);

  t.done()
});


test(module, '2d.composite.transparent.xor','2d.composite.transparent.xor.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'xor';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,63,191,127, "50,25", "0,63,191,127", 5);

  t.done()
});


test(module, '2d.composite.uncovered.fill.copy','2d.composite.uncovered.fill.copy.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'copy';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.translate(0, 25);
  ctx.fillRect(0, 50, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.uncovered.fill.destination-atop','2d.composite.uncovered.fill.destination-atop.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-atop';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.translate(0, 25);
  ctx.fillRect(0, 50, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.uncovered.fill.destination-in','2d.composite.uncovered.fill.destination-in.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.translate(0, 25);
  ctx.fillRect(0, 50, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.uncovered.fill.source-in','2d.composite.uncovered.fill.source-in.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.translate(0, 25);
  ctx.fillRect(0, 50, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.uncovered.fill.source-out','2d.composite.uncovered.fill.source-out.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-out';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
  ctx.translate(0, 25);
  ctx.fillRect(0, 50, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.uncovered.image.copy','2d.composite.uncovered.image.copy.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../images/yellow.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(images['yellow.png'], 40, 40, 10, 10, 40, 50, 10, 10);
    helpers.assertPixelApprox(t, canvas, 15,15, 0,0,0,0, "15,15", "0,0,0,0", 5);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.done()
  });
});


test(module, '2d.composite.uncovered.image.destination-atop','2d.composite.uncovered.image.destination-atop.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../images/yellow.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-atop';
    ctx.drawImage(images['yellow.png'], 40, 40, 10, 10, 40, 50, 10, 10);
    helpers.assertPixelApprox(t, canvas, 15,15, 0,0,0,0, "15,15", "0,0,0,0", 5);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.done()
  });
});


test(module, '2d.composite.uncovered.image.destination-in','2d.composite.uncovered.image.destination-in.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../images/yellow.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(images['yellow.png'], 40, 40, 10, 10, 40, 50, 10, 10);
    helpers.assertPixelApprox(t, canvas, 15,15, 0,0,0,0, "15,15", "0,0,0,0", 5);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.done()
  });
});


test(module, '2d.composite.uncovered.image.source-in','2d.composite.uncovered.image.source-in.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../images/yellow.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(images['yellow.png'], 40, 40, 10, 10, 40, 50, 10, 10);
    helpers.assertPixelApprox(t, canvas, 15,15, 0,0,0,0, "15,15", "0,0,0,0", 5);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.done()
  });
});


test(module, '2d.composite.uncovered.image.source-out','2d.composite.uncovered.image.source-out.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../images/yellow.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-out';
    ctx.drawImage(images['yellow.png'], 40, 40, 10, 10, 40, 50, 10, 10);
    helpers.assertPixelApprox(t, canvas, 15,15, 0,0,0,0, "15,15", "0,0,0,0", 5);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.done()
  });
});


test(module, '2d.composite.uncovered.nocontext.copy','2d.composite.uncovered.nocontext.copy.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'copy';
  var canvas2 = helpers.createCanvas(document);
  ctx.drawImage(canvas2, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.uncovered.nocontext.destination-atop','2d.composite.uncovered.nocontext.destination-atop.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-atop';
  var canvas2 = helpers.createCanvas(document);
  ctx.drawImage(canvas2, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.uncovered.nocontext.destination-in','2d.composite.uncovered.nocontext.destination-in.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-in';
  var canvas2 = helpers.createCanvas(document);
  ctx.drawImage(canvas2, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.uncovered.nocontext.source-in','2d.composite.uncovered.nocontext.source-in.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-in';
  var canvas2 = helpers.createCanvas(document);
  ctx.drawImage(canvas2, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.uncovered.nocontext.source-out','2d.composite.uncovered.nocontext.source-out.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'source-out';
  var canvas2 = helpers.createCanvas(document);
  ctx.drawImage(canvas2, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

  t.done()
});


test(module, '2d.composite.uncovered.pattern.copy','2d.composite.uncovered.pattern.copy.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../images/yellow.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'copy';
    ctx.fillStyle = ctx.createPattern(images['yellow.png'], 'no-repeat');
    ctx.fillRect(0, 50, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.done()
  });
});


test(module, '2d.composite.uncovered.pattern.destination-atop','2d.composite.uncovered.pattern.destination-atop.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../images/yellow.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-atop';
    ctx.fillStyle = ctx.createPattern(images['yellow.png'], 'no-repeat');
    ctx.fillRect(0, 50, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.done()
  });
});


test(module, '2d.composite.uncovered.pattern.destination-in','2d.composite.uncovered.pattern.destination-in.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../images/yellow.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = ctx.createPattern(images['yellow.png'], 'no-repeat');
    ctx.fillRect(0, 50, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.done()
  });
});


test(module, '2d.composite.uncovered.pattern.source-in','2d.composite.uncovered.pattern.source-in.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../images/yellow.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = ctx.createPattern(images['yellow.png'], 'no-repeat');
    ctx.fillRect(0, 50, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.done()
  });
});


test(module, '2d.composite.uncovered.pattern.source-out','2d.composite.uncovered.pattern.source-out.png', function(t) {

  helpers.loadImages(t, [
    { id : 'yellow.png' , url: __dirname + '/../images/yellow.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'source-out';
    ctx.fillStyle = ctx.createPattern(images['yellow.png'], 'no-repeat');
    ctx.fillRect(0, 50, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0", 5);

    t.done()
  });
});

