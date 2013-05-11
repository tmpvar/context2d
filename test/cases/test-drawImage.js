var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.drawImage.3arg','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' },
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.drawImage(images['green.png'], 0, 0);
    ctx.drawImage(images['red.png'], -100, 0);
    ctx.drawImage(images['red.png'], 100, 0);
    ctx.drawImage(images['red.png'], 0, -50);
    ctx.drawImage(images['red.png'], 0, 50);

    helpers.assertPixelApprox(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.5arg','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' },
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.drawImage(images['green.png'], 50, 0, 50, 50);
    ctx.drawImage(images['red.png'], 0, 0, 50, 50);
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 50, 50);

    helpers.assertPixelApprox(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.9arg.basic','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.drawImage(images['green.png'], 0, 0, 100, 50, 0, 0, 100, 50);
    helpers.assertPixelApprox(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.9arg.destpos','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' },
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.drawImage(images['green.png'], 0, 0, 100, 50, 0, 0, 100, 50);
    ctx.drawImage(images['red.png'], 0, 0, 100, 50, -100, 0, 100, 50);
    ctx.drawImage(images['red.png'], 0, 0, 100, 50, 100, 0, 100, 50);
    ctx.drawImage(images['red.png'], 0, 0, 100, 50, 0, -50, 100, 50);
    ctx.drawImage(images['red.png'], 0, 0, 100, 50, 0, 50, 100, 50);
    helpers.assertPixelApprox(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.9arg.destsize','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' },
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.drawImage(images['green.png'], 1, 1, 1, 1, 0, 0, 100, 50);
    ctx.drawImage(images['red.png'], 0, 0, 100, 50, -50, 0, 50, 50);
    ctx.drawImage(images['red.png'], 0, 0, 100, 50, 100, 0, 50, 50);
    ctx.drawImage(images['red.png'], 0, 0, 100, 50, 0, -25, 100, 25);
    ctx.drawImage(images['red.png'], 0, 0, 100, 50, 0, 50, 100, 25);
    helpers.assertPixelApprox(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.9arg.sourcepos','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'rgrg-256x256.png' , url: __dirname + '/../images/rgrg-256x256.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.drawImage(images['rgrg-256x256.png'], 140, 20, 100, 50, 0, 0, 100, 50);
    helpers.assertPixelApprox(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.9arg.sourcesize','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'rgrg-256x256.png' , url: __dirname + '/../images/rgrg-256x256.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.drawImage(images['rgrg-256x256.png'], 0, 0, 256, 256, 0, 0, 100, 50);
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 51, 26);
    ctx.fillRect(49, 24, 51, 26);
    helpers.assertPixelApprox(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 20,20, 0,255,0,255, "20,20", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 80,20, 0,255,0,255, "80,20", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 20,30, 0,255,0,255, "20,30", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 80,30, 0,255,0,255, "80,30", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.alpha','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalAlpha = 0;
    ctx.drawImage(images['red.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.animated.apng','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'anim-gr.png' , url: __dirname + '/../images/anim-gr.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    setTimeout(wrapFunction(t, function () {
        ctx.drawImage(images['anim-gr.png'], 0, 0);
        helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
    }), 0);

  });
});


test(module, '2d.drawImage.animated.gif','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'anim-gr.gif' , url: __dirname + '/../images/anim-gr.gif' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    setTimeout(wrapFunction(t, function () {
        ctx.drawImage(images['anim-gr.gif'], 0, 0);
        helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
    }), 0);

  });
});


test(module, '2d.drawImage.animated.poster','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'anim-poster-gr.png' , url: __dirname + '/../images/anim-poster-gr.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.drawImage(images['anim-poster-gr.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.broken','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'broken.png' , url: __dirname + '/../images/broken.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    var img = images['broken.png'];
    helpers.assertEqual(t, img.complete, false, "img.complete", "false");
    ctx.drawImage(img, 0, 0);

    t.done()
  });
});


test(module, '2d.drawImage.canvas','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = helpers.createCanvas(t, document);
  canvas2.width = 100;
  canvas2.height = 50;
  var ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#0f0';
  ctx2.fillRect(0, 0, 100, 50);

  ctx.fillStyle = '#f00';
  ctx.drawImage(canvas2, 0, 0);

  helpers.assertPixelApprox(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255", 2);

  t.done()
});


test(module, '2d.drawImage.clip','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.rect(-10, -10, 1, 1);
    ctx.clip();
    ctx.drawImage(images['red.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.composite','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(images['red.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.floatsource','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.drawImage(images['green.png'], 10.1, 10.1, 0.1, 0.1, 0, 0, 100, 50);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.incomplete','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  var img = new Image();
  helpers.assertEqual(t, img.complete, false, "img.complete", "false");
  ctx.drawImage(img, 0, 0);

  t.done()
});


test(module, '2d.drawImage.negativedest','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'ggrr-256x256.png' , url: __dirname + '/../images/ggrr-256x256.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.drawImage(images['ggrr-256x256.png'], 100, 78, 50, 50, 0, 50, 50, -50);
    ctx.drawImage(images['ggrr-256x256.png'], 100, 128, 50, -50, 100, 50, -50, -50);
    helpers.assertPixelApprox(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 51,1, 0,255,0,255, "51,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 51,48, 0,255,0,255, "51,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.negativedir','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'ggrr-256x256.png' , url: __dirname + '/../images/ggrr-256x256.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.drawImage(images['ggrr-256x256.png'], 0, 178, 50, -100, 0, 0, 50, 100);
    ctx.drawImage(images['ggrr-256x256.png'], 0, 78, 50, 100, 50, 100, 50, -100);
    helpers.assertPixelApprox(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 51,1, 0,255,0,255, "51,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 51,48, 0,255,0,255, "51,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.negativesource','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'ggrr-256x256.png' , url: __dirname + '/../images/ggrr-256x256.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.drawImage(images['ggrr-256x256.png'], 100, 78, -100, 50, 0, 0, 50, 50);
    ctx.drawImage(images['ggrr-256x256.png'], 100, 128, -100, -50, 50, 0, 50, 50);
    helpers.assertPixelApprox(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 48,1, 0,255,0,255, "48,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 48,48, 0,255,0,255, "48,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 51,1, 0,255,0,255, "51,1", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 51,48, 0,255,0,255, "51,48", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.nonfinite','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    var red = images['red.png'];
    ctx.drawImage(red, Infinity, 0);
    ctx.drawImage(red, -Infinity, 0);
    ctx.drawImage(red, NaN, 0);
    ctx.drawImage(red, 0, Infinity);
    ctx.drawImage(red, 0, -Infinity);
    ctx.drawImage(red, 0, NaN);
    ctx.drawImage(red, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, 50);
    ctx.drawImage(red, -Infinity, 0, 100, 50);
    ctx.drawImage(red, NaN, 0, 100, 50);
    ctx.drawImage(red, 0, Infinity, 100, 50);
    ctx.drawImage(red, 0, -Infinity, 100, 50);
    ctx.drawImage(red, 0, NaN, 100, 50);
    ctx.drawImage(red, 0, 0, Infinity, 50);
    ctx.drawImage(red, 0, 0, -Infinity, 50);
    ctx.drawImage(red, 0, 0, NaN, 50);
    ctx.drawImage(red, 0, 0, 100, Infinity);
    ctx.drawImage(red, 0, 0, 100, -Infinity);
    ctx.drawImage(red, 0, 0, 100, NaN);
    ctx.drawImage(red, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, 50, 0, 0, 100, 50);
    ctx.drawImage(red, -Infinity, 0, 100, 50, 0, 0, 100, 50);
    ctx.drawImage(red, NaN, 0, 100, 50, 0, 0, 100, 50);
    ctx.drawImage(red, 0, Infinity, 100, 50, 0, 0, 100, 50);
    ctx.drawImage(red, 0, -Infinity, 100, 50, 0, 0, 100, 50);
    ctx.drawImage(red, 0, NaN, 100, 50, 0, 0, 100, 50);
    ctx.drawImage(red, 0, 0, Infinity, 50, 0, 0, 100, 50);
    ctx.drawImage(red, 0, 0, -Infinity, 50, 0, 0, 100, 50);
    ctx.drawImage(red, 0, 0, NaN, 50, 0, 0, 100, 50);
    ctx.drawImage(red, 0, 0, 100, Infinity, 0, 0, 100, 50);
    ctx.drawImage(red, 0, 0, 100, -Infinity, 0, 0, 100, 50);
    ctx.drawImage(red, 0, 0, 100, NaN, 0, 0, 100, 50);
    ctx.drawImage(red, 0, 0, 100, 50, Infinity, 0, 100, 50);
    ctx.drawImage(red, 0, 0, 100, 50, -Infinity, 0, 100, 50);
    ctx.drawImage(red, 0, 0, 100, 50, NaN, 0, 100, 50);
    ctx.drawImage(red, 0, 0, 100, 50, 0, Infinity, 100, 50);
    ctx.drawImage(red, 0, 0, 100, 50, 0, -Infinity, 100, 50);
    ctx.drawImage(red, 0, 0, 100, 50, 0, NaN, 100, 50);
    ctx.drawImage(red, 0, 0, 100, 50, 0, 0, Infinity, 50);
    ctx.drawImage(red, 0, 0, 100, 50, 0, 0, -Infinity, 50);
    ctx.drawImage(red, 0, 0, 100, 50, 0, 0, NaN, 50);
    ctx.drawImage(red, 0, 0, 100, 50, 0, 0, 100, Infinity);
    ctx.drawImage(red, 0, 0, 100, 50, 0, 0, 100, -Infinity);
    ctx.drawImage(red, 0, 0, 100, 50, 0, 0, 100, NaN);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, 0, 0, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, 0, 0, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, 0, 0, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, Infinity, 0, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, 0, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, 0, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, Infinity, 0, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, Infinity, 0, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, 0, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, 0, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, Infinity, 50, 0, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, 0, 0, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, Infinity, 0, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, 0, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, 0, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, Infinity, 0, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, Infinity, 0, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, 0, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, 0, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, Infinity, 100, 50, 0, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, 0, 0, 100, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, 0, 0, 100, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, Infinity, 0, 100, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, 0, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, 0, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, Infinity, 0, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, Infinity, 0, 100, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, 0, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, 0, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, Infinity, 50, 0, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, 0, 0, 100, 50);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, Infinity, 0, 100, 50);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, 0, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, 0, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, Infinity, 0, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, 50, Infinity, 0, 100, 50);
    ctx.drawImage(red, Infinity, 0, 100, 50, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, 0, 100, 50, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, 100, 50, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, 50, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, 50, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, 100, 50, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, 50, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, 50, 0, Infinity, 100, 50);
    ctx.drawImage(red, Infinity, 0, 100, 50, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, 100, 50, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, 50, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, 50, 0, 0, Infinity, 50);
    ctx.drawImage(red, Infinity, 0, 100, 50, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, Infinity, 0, 100, 50, 0, 0, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, 0, 0, 100, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, 0, 0, 100, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, Infinity, 0, 100, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, 0, Infinity, 100, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, 0, 0, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, Infinity, 0, 0, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, Infinity, 0, 100, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, 0, Infinity, 100, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, 0, 0, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, Infinity, 50, 0, 0, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, 0, 0, 100, 50);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, Infinity, 0, 100, 50);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, 0, Infinity, 100, 50);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, 0, 0, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, Infinity, 0, 0, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, 50, Infinity, 0, 100, 50);
    ctx.drawImage(red, 0, Infinity, 100, 50, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, 0, Infinity, 100, 50, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, 100, 50, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, 50, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, 50, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, 100, 50, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, 50, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, 50, 0, Infinity, 100, 50);
    ctx.drawImage(red, 0, Infinity, 100, 50, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, 100, 50, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, 50, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, 50, 0, 0, Infinity, 50);
    ctx.drawImage(red, 0, Infinity, 100, 50, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, Infinity, 100, 50, 0, 0, 100, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, 0, 0, 100, 50);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, Infinity, 0, 100, 50);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, 0, Infinity, 100, 50);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, 0, 0, Infinity, 50);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, Infinity, 0, 0, 100, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, 50, Infinity, 0, 100, 50);
    ctx.drawImage(red, 0, 0, Infinity, 50, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, 0, 0, Infinity, 50, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, 0, Infinity, 50, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, 50, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, 50, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, 0, 0, Infinity, 50, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, 50, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, 50, 0, Infinity, 100, 50);
    ctx.drawImage(red, 0, 0, Infinity, 50, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, 0, Infinity, 50, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, 50, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, 50, 0, 0, Infinity, 50);
    ctx.drawImage(red, 0, 0, Infinity, 50, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, Infinity, 50, 0, 0, 100, Infinity);
    ctx.drawImage(red, 0, 0, 100, Infinity, Infinity, 0, 100, 50);
    ctx.drawImage(red, 0, 0, 100, Infinity, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, 0, 0, 100, Infinity, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, 0, 100, Infinity, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, 100, Infinity, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, 0, 100, Infinity, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, 0, 0, 100, Infinity, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, 100, Infinity, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, 0, 0, 100, Infinity, 0, Infinity, 100, 50);
    ctx.drawImage(red, 0, 0, 100, Infinity, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, 0, 100, Infinity, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, 100, Infinity, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, 0, 100, Infinity, 0, 0, Infinity, 50);
    ctx.drawImage(red, 0, 0, 100, Infinity, 0, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, 100, Infinity, 0, 0, 100, Infinity);
    ctx.drawImage(red, 0, 0, 100, 50, Infinity, Infinity, 100, 50);
    ctx.drawImage(red, 0, 0, 100, 50, Infinity, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, 0, 100, 50, Infinity, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, 100, 50, Infinity, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, 0, 100, 50, Infinity, 0, Infinity, 50);
    ctx.drawImage(red, 0, 0, 100, 50, Infinity, 0, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, 100, 50, Infinity, 0, 100, Infinity);
    ctx.drawImage(red, 0, 0, 100, 50, 0, Infinity, Infinity, 50);
    ctx.drawImage(red, 0, 0, 100, 50, 0, Infinity, Infinity, Infinity);
    ctx.drawImage(red, 0, 0, 100, 50, 0, Infinity, 100, Infinity);
    ctx.drawImage(red, 0, 0, 100, 50, 0, 0, Infinity, Infinity);
    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.drawImage.nowrap','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'redtransparent.png' , url: __dirname + '/../images/redtransparent.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.drawImage(images['redtransparent.png'], -1950, 0, 2000, 50);
    helpers.assertPixelApprox(t, canvas, 45,25, 0,255,0,255, "45,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
    helpers.assertPixelApprox(t, canvas, 55,25, 0,255,0,255, "55,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.null',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.drawImage(null, 0, 0);
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) t.fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.drawImage(null, 0, 0)"); }

  t.done()
});


test(module, '2d.drawImage.outsidesource','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green.png' , url: __dirname + '/../images/green.png' },
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.drawImage(images['green.png'], 10.5, 10.5, 89.5, 39.5, 0, 0, 100, 50);
    ctx.drawImage(images['green.png'], 5.5, 5.5, -5.5, -5.5, 0, 0, 100, 50);
    ctx.drawImage(images['green.png'], 100, 50, -5, -5, 0, 0, 100, 50);
    try { var _thrown = false;
      ctx.drawImage(images['red.png'], -0.001, 0, 100, 50, 0, 0, 100, 50);
    } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.drawImage(images['red.png'], -0.001, 0, 100, 50, 0, 0, 100, 50)"); }
    try { var _thrown = false;
      ctx.drawImage(images['red.png'], 0, -0.001, 100, 50, 0, 0, 100, 50);
    } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.drawImage(images['red.png'], 0, -0.001, 100, 50, 0, 0, 100, 50)"); }
    try { var _thrown = false;
      ctx.drawImage(images['red.png'], 0, 0, 100.001, 50, 0, 0, 100, 50);
    } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.drawImage(images['red.png'], 0, 0, 100.001, 50, 0, 0, 100, 50)"); }
    try { var _thrown = false;
      ctx.drawImage(images['red.png'], 0, 0, 100, 50.001, 0, 0, 100, 50);
    } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.drawImage(images['red.png'], 0, 0, 100, 50.001, 0, 0, 100, 50)"); }
    try { var _thrown = false;
      ctx.drawImage(images['red.png'], 50, 0, 50.001, 50, 0, 0, 100, 50);
    } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.drawImage(images['red.png'], 50, 0, 50.001, 50, 0, 0, 100, 50)"); }
    try { var _thrown = false;
      ctx.drawImage(images['red.png'], 0, 0, -5, 5, 0, 0, 100, 50);
    } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.drawImage(images['red.png'], 0, 0, -5, 5, 0, 0, 100, 50)"); }
    try { var _thrown = false;
      ctx.drawImage(images['red.png'], 0, 0, 5, -5, 0, 0, 100, 50);
    } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.drawImage(images['red.png'], 0, 0, 5, -5, 0, 0, 100, 50)"); }
    try { var _thrown = false;
      ctx.drawImage(images['red.png'], 110, 60, -20, -20, 0, 0, 100, 50);
    } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.drawImage(images['red.png'], 110, 60, -20, -20, 0, 0, 100, 50)"); }
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.path','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.rect(0, 0, 100, 50);
    ctx.drawImage(images['red.png'], 0, 0);
    ctx.fill();
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.self.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 50, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(50, 0, 50, 50);
  ctx.drawImage(canvas, 50, 0);

  helpers.assertPixelApprox(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255", 2);

  t.done()
});


test(module, '2d.drawImage.self.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 1, 100, 49);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 1);
  ctx.drawImage(canvas, 0, 1);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 2);

  helpers.assertPixelApprox(t, canvas, 0,0, 0,255,0,255, "0,0", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 99,0, 0,255,0,255, "99,0", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 0,49, 0,255,0,255, "0,49", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 99,49, 0,255,0,255, "99,49", "0,255,0,255", 2);

  t.done()
});


test(module, '2d.drawImage.transform','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.translate(100, 0);
    ctx.drawImage(images['red.png'], 0, 0);
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

    t.done()
  });
});


test(module, '2d.drawImage.wrongtype',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.drawImage(undefined, 0, 0);
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) t.fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.drawImage(undefined, 0, 0)"); }
  try { var _thrown = false;
    ctx.drawImage(0, 0, 0);
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) t.fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.drawImage(0, 0, 0)"); }
  try { var _thrown = false;
    ctx.drawImage("", 0, 0);
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) t.fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.drawImage(\"\", 0, 0)"); }
  try { var _thrown = false;
    ctx.drawImage(document.createElement('p'), 0, 0);
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) t.fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.drawImage(document.createElement('p'), 0, 0)"); }

  t.done()
});


test(module, '2d.drawImage.zerocanvas','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(t, document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);

  var canvas2 = helpers.createCanvas(t, document);
  canvas2.width = 0;
  canvas2.height = 10;
  try { var _thrown = false;
    ctx.drawImage(canvas2, 0, 0);
  } catch (e) { if (e.code != DOMException.INVALID_STATE_ERR) t.fail("Failed assertion: expected exception of type INVALID_STATE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INVALID_STATE_ERR: ctx.drawImage(canvas2, 0, 0)"); }

  canvas2.width = 10;
  canvas2.height = 0;
  try { var _thrown = false;
    ctx.drawImage(canvas2, 0, 0);
  } catch (e) { if (e.code != DOMException.INVALID_STATE_ERR) t.fail("Failed assertion: expected exception of type INVALID_STATE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INVALID_STATE_ERR: ctx.drawImage(canvas2, 0, 0)"); }

  canvas2.width = 0;
  canvas2.height = 0;
  try { var _thrown = false;
    ctx.drawImage(canvas2, 0, 0);
  } catch (e) { if (e.code != DOMException.INVALID_STATE_ERR) t.fail("Failed assertion: expected exception of type INVALID_STATE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INVALID_STATE_ERR: ctx.drawImage(canvas2, 0, 0)"); }

  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.done()
});


test(module, '2d.drawImage.zerosource','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(t, document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    try { var _thrown = false;
      ctx.drawImage(images['red.png'], 10, 10, 0, 1, 0, 0, 100, 50);
    } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.drawImage(images['red.png'], 10, 10, 0, 1, 0, 0, 100, 50)"); }
    try { var _thrown = false;
      ctx.drawImage(images['red.png'], 10, 10, 1, 0, 0, 0, 100, 50);
    } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.drawImage(images['red.png'], 10, 10, 1, 0, 0, 0, 100, 50)"); }
    try { var _thrown = false;
      ctx.drawImage(images['red.png'], 10, 10, 0, 0, 0, 0, 100, 50);
    } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.drawImage(images['red.png'], 10, 10, 0, 0, 0, 0, 100, 50)"); }
    helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

    t.done()
  });
});

