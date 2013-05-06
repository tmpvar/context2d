var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.pattern.animated.gif','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'anim-gr.gif' , url: __dirname + '/../images/anim-gr.gif' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var pattern = ctx.createPattern(images['anim-gr.gif'], 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 50, 50);
    setTimeout(wrapFunction(t, function () {
      ctx.fillRect(50, 0, 50, 50);
      helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
      helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);
    }), 0);

  });
});


test(module, '2d.pattern.basic.canvas','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var canvas2 = helpers.createCanvas(document);
  canvas2.width = 100;
  canvas2.height = 50;
  var ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#0f0';
  ctx2.fillRect(0, 0, 100, 50);
  
  var pattern = ctx.createPattern(canvas2, 'no-repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 100, 50);
  
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


test(module, '2d.pattern.basic.image','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    var img = images['green.png'];
    var pattern = ctx.createPattern(img, 'no-repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.basic.nocontext','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = helpers.createCanvas(document);
  canvas2.width = 100;
  canvas2.height = 50;
  var pattern = ctx.createPattern(canvas2, 'no-repeat');
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 100, 50);
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.pattern.basic.type',null, function(t) {

  helpers.loadImages(t, [
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    helpers.assertNotEqual(t, window.CanvasPattern, undefined, "window.CanvasPattern", "undefined");
    
    window.CanvasPattern.prototype.thisImplementsCanvasPattern = true;
    
    var img = images['green.png'];
    var pattern = ctx.createPattern(img, 'no-repeat');
    helpers.ok(t, pattern.thisImplementsCanvasPattern, "pattern.thisImplementsCanvasPattern");

    t.done()
  });
});


test(module, '2d.pattern.basic.zerocanvas',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  canvas.width = 0;
  canvas.height = 10;
  helpers.assertEqual(t, canvas.width, 0, "canvas.width", "0");
  helpers.assertEqual(t, canvas.height, 10, "canvas.height", "10");
  try { var _thrown = false;
    ctx.createPattern(canvas, 'repeat');
  } catch (e) { if (e.code != DOMException.INVALID_STATE_ERR) t.fail("Failed assertion: expected exception of type INVALID_STATE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INVALID_STATE_ERR: ctx.createPattern(canvas, 'repeat')"); }
  
  canvas.width = 10;
  canvas.height = 0;
  helpers.assertEqual(t, canvas.width, 10, "canvas.width", "10");
  helpers.assertEqual(t, canvas.height, 0, "canvas.height", "0");
  try { var _thrown = false;
    ctx.createPattern(canvas, 'repeat');
  } catch (e) { if (e.code != DOMException.INVALID_STATE_ERR) t.fail("Failed assertion: expected exception of type INVALID_STATE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INVALID_STATE_ERR: ctx.createPattern(canvas, 'repeat')"); }
  
  canvas.width = 0;
  canvas.height = 0;
  helpers.assertEqual(t, canvas.width, 0, "canvas.width", "0");
  helpers.assertEqual(t, canvas.height, 0, "canvas.height", "0");
  try { var _thrown = false;
    ctx.createPattern(canvas, 'repeat');
  } catch (e) { if (e.code != DOMException.INVALID_STATE_ERR) t.fail("Failed assertion: expected exception of type INVALID_STATE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INVALID_STATE_ERR: ctx.createPattern(canvas, 'repeat')"); }

  t.done()
});


test(module, '2d.pattern.crosscanvas','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var img = images['green.png'];
    
    var pattern = helpers.createCanvas(document).getContext('2d').createPattern(img, 'no-repeat');
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    
    helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.image.broken',null, function(t) {

  helpers.loadImages(t, [
    { id : 'broken.png' , url: __dirname + '/../images/broken.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var img = images['broken.png'];
    helpers.assertEqual(t, img.complete, false, "img.complete", "false");
    helpers.assertEqual(t, ctx.createPattern(img, 'repeat'), null, "ctx.createPattern(img, 'repeat')", "null");

    t.done()
  });
});


test(module, '2d.pattern.image.incomplete',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var img = new Image();
  helpers.assertEqual(t, img.complete, false, "img.complete", "false");
  helpers.assertEqual(t, ctx.createPattern(img, 'repeat'), null, "ctx.createPattern(img, 'repeat')", "null");

  t.done()
});


test(module, '2d.pattern.image.null',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createPattern(null, 'repeat');
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) t.fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.createPattern(null, 'repeat')"); }

  t.done()
});


test(module, '2d.pattern.image.string',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createPattern('../philip/orig/images/red.png', 'repeat');
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) t.fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.createPattern('../philip/orig/images/red.png', 'repeat')"); }

  t.done()
});


test(module, '2d.pattern.image.undefined',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createPattern(undefined, 'repeat');
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) t.fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.createPattern(undefined, 'repeat')"); }

  t.done()
});


test(module, '2d.pattern.modify.canvas1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = helpers.createCanvas(document);
  canvas2.width = 100;
  canvas2.height = 50;
  var ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#0f0';
  ctx2.fillRect(0, 0, 100, 50);
  
  var pattern = ctx.createPattern(canvas2, 'no-repeat');
  
  ctx2.fillStyle = '#f00';
  ctx2.fillRect(0, 0, 100, 50);
  
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 100, 50);
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.pattern.modify.canvas2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = helpers.createCanvas(document);
  canvas2.width = 100;
  canvas2.height = 50;
  var ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#0f0';
  ctx2.fillRect(0, 0, 100, 50);
  
  var pattern = ctx.createPattern(canvas2, 'no-repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx2.fillStyle = '#f00';
  ctx2.fillRect(0, 0, 100, 50);
  
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 100, 50);
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.pattern.modify.image1','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var img = images['green.png'];
    var pattern = ctx.createPattern(img, 'no-repeat');

    img.onload = wrapFunction(t, function ()
    {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, 100, 50);

        helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
        helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
        helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
        helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");
    });
    img.src = __dirname + '/../images/red.png';

  });
});


test(module, '2d.pattern.modify.image2','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var img = images['green.png'];
    var pattern = ctx.createPattern(img, 'no-repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    ctx.fillStyle = '#00f';
    ctx.fillRect(0, 0, 100, 50);

    img.onload = wrapFunction(t, function ()
    {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, 100, 50);

        helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
        helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
        helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
        helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");
    });
    img.src = __dirname + '/../images/red.png';

  });
});


test(module, '2d.pattern.paint.norepeat.basic','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    
    var img = images['green.png'];
    var pattern = ctx.createPattern(img, 'no-repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.norepeat.coord1','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 50, 50);
    ctx.fillStyle = '#f00';
    ctx.fillRect(50, 0, 50, 50);
    
    var img = images['green.png'];
    var pattern = ctx.createPattern(img, 'no-repeat');
    ctx.fillStyle = pattern;
    ctx.translate(50, 0);
    ctx.fillRect(-50, 0, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.norepeat.coord2','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green.png' , url: __dirname + '/../images/green.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var img = images['green.png'];
    var pattern = ctx.createPattern(img, 'no-repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 50, 50);
    
    ctx.fillStyle = '#f00';
    ctx.fillRect(50, 0, 50, 50);
    
    ctx.fillStyle = pattern;
    ctx.translate(50, 0);
    ctx.fillRect(-50, 0, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.norepeat.coord3','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    
    var img = images['red.png'];
    var pattern = ctx.createPattern(img, 'no-repeat');
    ctx.fillStyle = pattern;
    ctx.translate(50, 25);
    ctx.fillRect(-50, -25, 100, 50);
    
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 50, 25);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.norepeat.outside','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red.png' , url: __dirname + '/../images/red.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    
    var img = images['red.png'];
    var pattern = ctx.createPattern(img, 'no-repeat');
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    
    ctx.fillStyle = pattern;
    ctx.fillRect(0, -50, 100, 50);
    ctx.fillRect(-100, 0, 100, 50);
    ctx.fillRect(0, 50, 100, 50);
    ctx.fillRect(100, 0, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.orientation.canvas','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var canvas2 = helpers.createCanvas(document);
  canvas2.width = 100;
  canvas2.height = 50;
  var ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#f00';
  ctx2.fillRect(0, 0, 100, 25);
  ctx2.fillStyle = '#0f0';
  ctx2.fillRect(0, 25, 100, 25);
  
  var pattern = ctx.createPattern(canvas2, 'no-repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 25);
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.done()
});


test(module, '2d.pattern.paint.orientation.image','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'rrgg-256x256.png' , url: __dirname + '/../images/rrgg-256x256.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    
    var img = images['rrgg-256x256.png'];
    var pattern = ctx.createPattern(img, 'no-repeat');
    ctx.fillStyle = pattern;
    ctx.save();
    ctx.translate(0, -103);
    ctx.fillRect(0, 103, 100, 50);
    ctx.restore();
    
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 25);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.repeat.basic','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green-16x16.png' , url: __dirname + '/../images/green-16x16.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    
    var img = images['green-16x16.png'];
    var pattern = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.repeat.coord1','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'rgrg-256x256.png' , url: __dirname + '/../images/rgrg-256x256.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    
    var img = images['rgrg-256x256.png'];
    var pattern = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = pattern;
    ctx.translate(-128, -78);
    ctx.fillRect(128, 78, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.repeat.coord2','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'ggrr-256x256.png' , url: __dirname + '/../images/ggrr-256x256.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var img = images['ggrr-256x256.png'];
    var pattern = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.repeat.coord3','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'rgrg-256x256.png' , url: __dirname + '/../images/rgrg-256x256.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    var img = images['rgrg-256x256.png'];
    var pattern = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    
    ctx.translate(-128, -78);
    ctx.fillRect(128, 78, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.repeat.outside','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green-16x16.png' , url: __dirname + '/../images/green-16x16.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    
    var img = images['green-16x16.png'];
    var pattern = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = pattern;
    ctx.translate(50, 25);
    ctx.fillRect(-50, -25, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.repeatx.basic','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green-16x16.png' , url: __dirname + '/../images/green-16x16.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 16);
    
    var img = images['green-16x16.png'];
    var pattern = ctx.createPattern(img, 'repeat-x');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.repeatx.coord1','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red-16x16.png' , url: __dirname + '/../images/red-16x16.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    
    var img = images['red-16x16.png'];
    var pattern = ctx.createPattern(img, 'repeat-x');
    ctx.fillStyle = pattern;
    ctx.translate(0, 16);
    ctx.fillRect(0, -16, 100, 50);
    
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 16);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,25, 0,255,0,255, "1,25", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,25, 0,255,0,255, "98,25", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.repeatx.outside','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red-16x16.png' , url: __dirname + '/../images/red-16x16.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    
    var img = images['red-16x16.png'];
    var pattern = ctx.createPattern(img, 'repeat-x');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 16);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.repeaty.basic','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green-16x16.png' , url: __dirname + '/../images/green-16x16.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 16, 50);
    
    var img = images['green-16x16.png'];
    var pattern = ctx.createPattern(img, 'repeat-y');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.repeaty.coord1','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red-16x16.png' , url: __dirname + '/../images/red-16x16.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    
    var img = images['red-16x16.png'];
    var pattern = ctx.createPattern(img, 'repeat-y');
    ctx.fillStyle = pattern;
    ctx.translate(48, 0);
    ctx.fillRect(-48, 0, 100, 50);
    
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 16, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 50,1, 0,255,0,255, "50,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 50,48, 0,255,0,255, "50,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.paint.repeaty.outside','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'red-16x16.png' , url: __dirname + '/../images/red-16x16.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 100, 50);
    
    var img = images['red-16x16.png'];
    var pattern = ctx.createPattern(img, 'repeat-y');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    
    ctx.fillStyle = '#0f0';
    ctx.fillRect(0, 0, 16, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.repeat.case',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createPattern(canvas, "Repeat");
  } catch (e) { if (e.code != DOMException.SYNTAX_ERR) t.fail("Failed assertion: expected exception of type SYNTAX_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type SYNTAX_ERR: ctx.createPattern(canvas, \"Repeat\")"); }

  t.done()
});


test(module, '2d.pattern.repeat.empty','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green-1x1.png' , url: __dirname + '/../images/green-1x1.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    var img = images['green-1x1.png'];
    var pattern = ctx.createPattern(img, "");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 200, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.repeat.null','green-100x50.png', function(t) {

  helpers.loadImages(t, [
    { id : 'green-1x1.png' , url: __dirname + '/../images/green-1x1.png' }
  ], function(images) {
    var window = helpers.createWindow();
    var document = window.document;

    var canvas = helpers.createCanvas(document, 100, 50);
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = '#f00';
    ctx.fillRect(0, 0, 100, 50);
    var img = images['green-1x1.png'];
    var pattern = ctx.createPattern(img, null);
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 100, 50);
    
    helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
    helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
    helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

    t.done()
  });
});


test(module, '2d.pattern.repeat.nullsuffix',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createPattern(canvas, "repeat\0");
  } catch (e) { if (e.code != DOMException.SYNTAX_ERR) t.fail("Failed assertion: expected exception of type SYNTAX_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type SYNTAX_ERR: ctx.createPattern(canvas, \"repeat\\0\")"); }

  t.done()
});


test(module, '2d.pattern.repeat.undefined',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createPattern(canvas, undefined);
  } catch (e) { if (e.code != DOMException.SYNTAX_ERR) t.fail("Failed assertion: expected exception of type SYNTAX_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type SYNTAX_ERR: ctx.createPattern(canvas, undefined)"); }

  t.done()
});


test(module, '2d.pattern.repeat.unrecognised',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createPattern(canvas, "invalid");
  } catch (e) { if (e.code != DOMException.SYNTAX_ERR) t.fail("Failed assertion: expected exception of type SYNTAX_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type SYNTAX_ERR: ctx.createPattern(canvas, \"invalid\")"); }

  t.done()
});

