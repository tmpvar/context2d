var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Window = helpers.Window;
var Document = helpers.Document;

test('2d.imageData.create1.basic', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertNotEqual(t, ctx.createImageData(ctx.createImageData(1, 1)), null, "ctx.createImageData(ctx.createImageData(1, 1))", "null");

  t.end()
});


test('2d.imageData.create1.initial', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  var imgdata1 = ctx.getImageData(0, 0, 10, 20);
  var imgdata2 = ctx.createImageData(imgdata1);
  helpers.assertEqual(t, imgdata2.data.length, imgdata1.data.length, "imgdata2.data.length", "imgdata1.data.length");
  helpers.assertEqual(t, imgdata2.width, imgdata1.width, "imgdata2.width", "imgdata1.width");
  helpers.assertEqual(t, imgdata2.height, imgdata1.height, "imgdata2.height", "imgdata1.height");
  var isTransparentBlack = true;
  for (var i = 0; i < imgdata2.data.length; ++i)
      if (imgdata2.data[i] !== 0)
          isTransparentBlack = false;
  helpers.assert(isTransparentBlack, "isTransparentBlack");

  t.end()
});


test('2d.imageData.create1.type', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')
  var window = new Window()

  helpers.assertNotEqual(t, window.ImageData, undefined, "window.ImageData", "undefined");
  helpers.assertNotEqual(t, window.CanvasPixelArray, undefined, "window.CanvasPixelArray", "undefined");
  window.ImageData.prototype.thisImplementsImageData = true;
  window.CanvasPixelArray.prototype.thisImplementsCanvasPixelArray = true;
  var imgdata = ctx.createImageData(ctx.createImageData(1, 1));
  helpers.assert(imgdata.thisImplementsImageData, "imgdata.thisImplementsImageData");
  helpers.assert(imgdata.data.thisImplementsCanvasPixelArray, "imgdata.data.thisImplementsCanvasPixelArray");

  t.end()
});


test('2d.imageData.create1.zero', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createImageData(null);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createImageData(null)"); }

  t.end()
});


test('2d.imageData.create2.basic', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertNotEqual(t, ctx.createImageData(1, 1), null, "ctx.createImageData(1, 1)", "null");

  t.end()
});


test('2d.imageData.create2.initial', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.createImageData(10, 20);
  helpers.assertEqual(t, imgdata.data.length, imgdata.width*imgdata.height*4, "imgdata.data.length", "imgdata.width*imgdata.height*4");
  helpers.assert(imgdata.width < imgdata.height, "imgdata.width < imgdata.height");
  helpers.assert(imgdata.width > 0, "imgdata.width > 0");
  var isTransparentBlack = true;
  for (var i = 0; i < imgdata.data.length; ++i)
      if (imgdata.data[i] !== 0)
          isTransparentBlack = false;
  helpers.assert(isTransparentBlack, "isTransparentBlack");

  t.end()
});


test('2d.imageData.create2.large', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.createImageData(1000, 2000);
  helpers.assertEqual(t, imgdata.data.length, imgdata.width*imgdata.height*4, "imgdata.data.length", "imgdata.width*imgdata.height*4");
  helpers.assert(imgdata.width < imgdata.height, "imgdata.width < imgdata.height");
  helpers.assert(imgdata.width > 0, "imgdata.width > 0");
  var isTransparentBlack = true;
  for (var i = 0; i < imgdata.data.length; i += 7813) // check ~1024 points (assuming normal scaling)
      if (imgdata.data[i] !== 0)
          isTransparentBlack = false;
  helpers.assert(isTransparentBlack, "isTransparentBlack");

  t.end()
});


test('2d.imageData.create2.negative', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata1 = ctx.createImageData(10, 20);
  var imgdata2 = ctx.createImageData(-10, 20);
  var imgdata3 = ctx.createImageData(10, -20);
  var imgdata4 = ctx.createImageData(-10, -20);
  helpers.assertEqual(t, imgdata1.data.length, imgdata2.data.length, "imgdata1.data.length", "imgdata2.data.length");
  helpers.assertEqual(t, imgdata2.data.length, imgdata3.data.length, "imgdata2.data.length", "imgdata3.data.length");
  helpers.assertEqual(t, imgdata3.data.length, imgdata4.data.length, "imgdata3.data.length", "imgdata4.data.length");

  t.end()
});


test('2d.imageData.create2.nonfinite', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createImageData(Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createImageData(Infinity, 10)"); }
  try { var _thrown = false;
    ctx.createImageData(-Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createImageData(-Infinity, 10)"); }
  try { var _thrown = false;
    ctx.createImageData(NaN, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createImageData(NaN, 10)"); }
  try { var _thrown = false;
    ctx.createImageData(10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createImageData(10, Infinity)"); }
  try { var _thrown = false;
    ctx.createImageData(10, -Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createImageData(10, -Infinity)"); }
  try { var _thrown = false;
    ctx.createImageData(10, NaN);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createImageData(10, NaN)"); }
  try { var _thrown = false;
    ctx.createImageData(Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createImageData(Infinity, Infinity)"); }

  t.end()
});


test('2d.imageData.create2.round', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata1 = ctx.createImageData(10.01, 10.99);
  var imgdata2 = ctx.getImageData(0, 0, 10.01, 10.99);
  helpers.assertEqual(t, imgdata1.width, imgdata2.width, "imgdata1.width", "imgdata2.width");
  helpers.assertEqual(t, imgdata1.height, imgdata2.height, "imgdata1.height", "imgdata2.height");

  t.end()
});


test('2d.imageData.create2.tiny', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.createImageData(0.0001, 0.0001);
  helpers.assertEqual(t, imgdata.data.length, imgdata.width*imgdata.height*4, "imgdata.data.length", "imgdata.width*imgdata.height*4");
  helpers.assertEqual(t, imgdata.width, 1, "imgdata.width", "1");
  helpers.assertEqual(t, imgdata.height, 1, "imgdata.height", "1");
  var isTransparentBlack = true;
  for (var i = 0; i < imgdata.data.length; ++i)
      if (imgdata.data[i] !== 0)
          isTransparentBlack = false;
  helpers.assert(isTransparentBlack, "isTransparentBlack");

  t.end()
});


test('2d.imageData.create2.type', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')
  var window = new Window()

  helpers.assertNotEqual(t, window.ImageData, undefined, "window.ImageData", "undefined");
  helpers.assertNotEqual(t, window.CanvasPixelArray, undefined, "window.CanvasPixelArray", "undefined");
  window.ImageData.prototype.thisImplementsImageData = true;
  window.CanvasPixelArray.prototype.thisImplementsCanvasPixelArray = true;
  var imgdata = ctx.createImageData(1, 1);
  helpers.assert(imgdata.thisImplementsImageData, "imgdata.thisImplementsImageData");
  helpers.assert(imgdata.data.thisImplementsCanvasPixelArray, "imgdata.data.thisImplementsCanvasPixelArray");

  t.end()
});


test('2d.imageData.create2.zero', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createImageData(10, 0);
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) _fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.createImageData(10, 0)"); }
  try { var _thrown = false;
    ctx.createImageData(0, 10);
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) _fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.createImageData(0, 10)"); }
  try { var _thrown = false;
    ctx.createImageData(0, 0);
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) _fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.createImageData(0, 0)"); }

  t.end()
});


test('2d.imageData.get.basic', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertNotEqual(t, ctx.getImageData(0, 0, 100, 50), null, "ctx.getImageData(0, 0, 100, 50)", "null");

  t.end()
});


test('2d.imageData.get.clamp', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgb(-100, -200, -300)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = 'rgb(256, 300, 400)';
  ctx.fillRect(20, 10, 60, 10);
  var imgdata1 = ctx.getImageData(10, 5, 1, 1);
  helpers.assertEqual(t, imgdata1.data[0], 0, "imgdata1.data[\""+(0)+"\"]", "0");
  helpers.assertEqual(t, imgdata1.data[1], 0, "imgdata1.data[\""+(1)+"\"]", "0");
  helpers.assertEqual(t, imgdata1.data[2], 0, "imgdata1.data[\""+(2)+"\"]", "0");
  var imgdata2 = ctx.getImageData(30, 15, 1, 1);
  helpers.assertEqual(t, imgdata2.data[0], 255, "imgdata2.data[\""+(0)+"\"]", "255");
  helpers.assertEqual(t, imgdata2.data[1], 255, "imgdata2.data[\""+(1)+"\"]", "255");
  helpers.assertEqual(t, imgdata2.data[2], 255, "imgdata2.data[\""+(2)+"\"]", "255");

  t.end()
});


test('2d.imageData.get.length', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.getImageData(0, 0, 10, 10);
  helpers.assertEqual(t, imgdata.data.length, imgdata.width*imgdata.height*4, "imgdata.data.length", "imgdata.width*imgdata.height*4");

  t.end()
});


test('2d.imageData.get.nonfinite', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.getImageData(Infinity, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(Infinity, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(-Infinity, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(-Infinity, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(NaN, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(NaN, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(10, Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(10, -Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, -Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(10, NaN, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, NaN, 10, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(10, 10, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, 10, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(10, 10, -Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, 10, -Infinity, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(10, 10, NaN, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, 10, NaN, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(10, 10, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, 10, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.getImageData(10, 10, 10, -Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, 10, 10, -Infinity)"); }
  try { var _thrown = false;
    ctx.getImageData(10, 10, 10, NaN);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, 10, 10, NaN)"); }
  try { var _thrown = false;
    ctx.getImageData(Infinity, Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(Infinity, Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(Infinity, Infinity, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(Infinity, Infinity, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(Infinity, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(Infinity, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.getImageData(Infinity, Infinity, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(Infinity, Infinity, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.getImageData(Infinity, 10, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(Infinity, 10, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(Infinity, 10, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(Infinity, 10, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.getImageData(Infinity, 10, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(Infinity, 10, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.getImageData(10, Infinity, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, Infinity, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(10, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.getImageData(10, Infinity, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, Infinity, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.getImageData(10, 10, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.getImageData(10, 10, Infinity, Infinity)"); }

  t.end()
});


test('2d.imageData.get.nonpremul', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  var imgdata = ctx.getImageData(10, 10, 10, 10);
  helpers.assert(imgdata.data[0] > 200, "imgdata.data[\""+(0)+"\"] > 200");
  helpers.assert(imgdata.data[1] > 200, "imgdata.data[\""+(1)+"\"] > 200");
  helpers.assert(imgdata.data[2] > 200, "imgdata.data[\""+(2)+"\"] > 200");
  helpers.assert(imgdata.data[3] > 100, "imgdata.data[\""+(3)+"\"] > 100");
  helpers.assert(imgdata.data[3] < 200, "imgdata.data[\""+(3)+"\"] < 200");

  t.end()
});


test('2d.imageData.get.order.alpha', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  var imgdata = ctx.getImageData(0, 0, 10, 10);
  helpers.assert(imgdata.data[3] < 200, "imgdata.data[\""+(3)+"\"] < 200");
  helpers.assert(imgdata.data[3] > 100, "imgdata.data[\""+(3)+"\"] > 100");

  t.end()
});


test('2d.imageData.get.order.cols', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 2, 50);
  var imgdata = ctx.getImageData(0, 0, 10, 10);
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
  helpers.assertEqual(t, imgdata.data[Math.round(imgdata.width/2*4)], 255, "imgdata.data[Math.round(imgdata.width/2*4)]", "255");
  helpers.assertEqual(t, imgdata.data[Math.round((imgdata.height/2)*imgdata.width*4)], 0, "imgdata.data[Math.round((imgdata.height/2)*imgdata.width*4)]", "0");

  t.end()
});


test('2d.imageData.get.order.rgb', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#48c';
  ctx.fillRect(0, 0, 100, 50);
  var imgdata = ctx.getImageData(0, 0, 10, 10);
  helpers.assertEqual(t, imgdata.data[0], 0x44, "imgdata.data[\""+(0)+"\"]", "0x44");
  helpers.assertEqual(t, imgdata.data[1], 0x88, "imgdata.data[\""+(1)+"\"]", "0x88");
  helpers.assertEqual(t, imgdata.data[2], 0xCC, "imgdata.data[\""+(2)+"\"]", "0xCC");
  helpers.assertEqual(t, imgdata.data[3], 255, "imgdata.data[\""+(3)+"\"]", "255");
  helpers.assertEqual(t, imgdata.data[4], 0x44, "imgdata.data[\""+(4)+"\"]", "0x44");
  helpers.assertEqual(t, imgdata.data[5], 0x88, "imgdata.data[\""+(5)+"\"]", "0x88");
  helpers.assertEqual(t, imgdata.data[6], 0xCC, "imgdata.data[\""+(6)+"\"]", "0xCC");
  helpers.assertEqual(t, imgdata.data[7], 255, "imgdata.data[\""+(7)+"\"]", "255");

  t.end()
});


test('2d.imageData.get.order.rows', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 2);
  var imgdata = ctx.getImageData(0, 0, 10, 10);
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
  helpers.assertEqual(t, imgdata.data[Math.floor(imgdata.width/2*4)], 0, "imgdata.data[Math.floor(imgdata.width/2*4)]", "0");
  helpers.assertEqual(t, imgdata.data[(imgdata.height/2)*imgdata.width*4], 255, "imgdata.data[(imgdata.height/2)*imgdata.width*4]", "255");

  t.end()
});


test('2d.imageData.get.range', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#fff';
  ctx.fillRect(20, 10, 60, 10);
  var imgdata1 = ctx.getImageData(10, 5, 1, 1);
  helpers.assertEqual(t, imgdata1.data[0], 0, "imgdata1.data[\""+(0)+"\"]", "0");
  var imgdata2 = ctx.getImageData(30, 15, 1, 1);
  helpers.assertEqual(t, imgdata2.data[0], 255, "imgdata2.data[\""+(0)+"\"]", "255");

  t.end()
});


test('2d.imageData.get.source.negative', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#fff';
  ctx.fillRect(20, 10, 60, 10);
  
  var imgdata1 = ctx.getImageData(85, 25, -10, -10);
  helpers.assertEqual(t, imgdata1.data[0], 255, "imgdata1.data[\""+(0)+"\"]", "255");
  helpers.assertEqual(t, imgdata1.data[1], 255, "imgdata1.data[\""+(1)+"\"]", "255");
  helpers.assertEqual(t, imgdata1.data[2], 255, "imgdata1.data[\""+(2)+"\"]", "255");
  helpers.assertEqual(t, imgdata1.data[3], 255, "imgdata1.data[\""+(3)+"\"]", "255");
  helpers.assertEqual(t, imgdata1.data[imgdata1.data.length-4+0], 0, "imgdata1.data[imgdata1.data.length-4+0]", "0");
  helpers.assertEqual(t, imgdata1.data[imgdata1.data.length-4+1], 0, "imgdata1.data[imgdata1.data.length-4+1]", "0");
  helpers.assertEqual(t, imgdata1.data[imgdata1.data.length-4+2], 0, "imgdata1.data[imgdata1.data.length-4+2]", "0");
  helpers.assertEqual(t, imgdata1.data[imgdata1.data.length-4+3], 255, "imgdata1.data[imgdata1.data.length-4+3]", "255");
  
  var imgdata2 = ctx.getImageData(0, 0, -1, -1);
  helpers.assertEqual(t, imgdata2.data[0], 0, "imgdata2.data[\""+(0)+"\"]", "0");
  helpers.assertEqual(t, imgdata2.data[1], 0, "imgdata2.data[\""+(1)+"\"]", "0");
  helpers.assertEqual(t, imgdata2.data[2], 0, "imgdata2.data[\""+(2)+"\"]", "0");
  helpers.assertEqual(t, imgdata2.data[3], 0, "imgdata2.data[\""+(3)+"\"]", "0");

  t.end()
});


test('2d.imageData.get.source.outside', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#08f';
  ctx.fillRect(0, 0, 100, 50);
  
  var imgdata1 = ctx.getImageData(-10, 5, 1, 1);
  helpers.assertEqual(t, imgdata1.data[0], 0, "imgdata1.data[\""+(0)+"\"]", "0");
  helpers.assertEqual(t, imgdata1.data[1], 0, "imgdata1.data[\""+(1)+"\"]", "0");
  helpers.assertEqual(t, imgdata1.data[2], 0, "imgdata1.data[\""+(2)+"\"]", "0");
  helpers.assertEqual(t, imgdata1.data[3], 0, "imgdata1.data[\""+(3)+"\"]", "0");
  
  var imgdata2 = ctx.getImageData(10, -5, 1, 1);
  helpers.assertEqual(t, imgdata2.data[0], 0, "imgdata2.data[\""+(0)+"\"]", "0");
  helpers.assertEqual(t, imgdata2.data[1], 0, "imgdata2.data[\""+(1)+"\"]", "0");
  helpers.assertEqual(t, imgdata2.data[2], 0, "imgdata2.data[\""+(2)+"\"]", "0");
  helpers.assertEqual(t, imgdata2.data[3], 0, "imgdata2.data[\""+(3)+"\"]", "0");
  
  var imgdata3 = ctx.getImageData(200, 5, 1, 1);
  helpers.assertEqual(t, imgdata3.data[0], 0, "imgdata3.data[\""+(0)+"\"]", "0");
  helpers.assertEqual(t, imgdata3.data[1], 0, "imgdata3.data[\""+(1)+"\"]", "0");
  helpers.assertEqual(t, imgdata3.data[2], 0, "imgdata3.data[\""+(2)+"\"]", "0");
  helpers.assertEqual(t, imgdata3.data[3], 0, "imgdata3.data[\""+(3)+"\"]", "0");
  
  var imgdata4 = ctx.getImageData(10, 60, 1, 1);
  helpers.assertEqual(t, imgdata4.data[0], 0, "imgdata4.data[\""+(0)+"\"]", "0");
  helpers.assertEqual(t, imgdata4.data[1], 0, "imgdata4.data[\""+(1)+"\"]", "0");
  helpers.assertEqual(t, imgdata4.data[2], 0, "imgdata4.data[\""+(2)+"\"]", "0");
  helpers.assertEqual(t, imgdata4.data[3], 0, "imgdata4.data[\""+(3)+"\"]", "0");

  t.end()
});


test('2d.imageData.get.source.size', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata1 = ctx.getImageData(0, 0, 10, 10);
  var imgdata2 = ctx.getImageData(0, 0, 20, 20);
  helpers.assert(imgdata2.width > imgdata1.width, "imgdata2.width > imgdata1.width");
  helpers.assert(imgdata2.height > imgdata1.height, "imgdata2.height > imgdata1.height");

  t.end()
});


test('2d.imageData.get.tiny', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.getImageData(0, 0, 0.0001, 0.0001);
  helpers.assertEqual(t, imgdata.data.length, imgdata.width*imgdata.height*4, "imgdata.data.length", "imgdata.width*imgdata.height*4");
  helpers.assertEqual(t, imgdata.width, 1, "imgdata.width", "1");
  helpers.assertEqual(t, imgdata.height, 1, "imgdata.height", "1");

  t.end()
});


test('2d.imageData.get.type', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')
  var window = new Window()

  helpers.assertNotEqual(t, window.ImageData, undefined, "window.ImageData", "undefined");
  helpers.assertNotEqual(t, window.CanvasPixelArray, undefined, "window.CanvasPixelArray", "undefined");
  window.ImageData.prototype.thisImplementsImageData = true;
  window.CanvasPixelArray.prototype.thisImplementsCanvasPixelArray = true;
  var imgdata = ctx.getImageData(0, 0, 1, 1);
  helpers.assert(imgdata.thisImplementsImageData, "imgdata.thisImplementsImageData");
  helpers.assert(imgdata.data.thisImplementsCanvasPixelArray, "imgdata.data.thisImplementsCanvasPixelArray");

  t.end()
});


test('2d.imageData.get.unaffected', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 50, 50)
  ctx.fillStyle = '#f00';
  ctx.fillRect(50, 0, 50, 50)
  ctx.save();
  ctx.translate(50, 0);
  ctx.globalAlpha = 0.1;
  ctx.globalCompositeOperation = 'destination-atop';
  ctx.shadowColor = '#f00';
  ctx.rect(0, 0, 5, 5);
  ctx.clip();
  var imgdata = ctx.getImageData(0, 0, 50, 50);
  ctx.restore();
  ctx.putImageData(imgdata, 50, 0);
  helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.get.zero', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.getImageData(1, 1, 10, 0);
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) _fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.getImageData(1, 1, 10, 0)"); }
  try { var _thrown = false;
    ctx.getImageData(1, 1, 0, 10);
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) _fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.getImageData(1, 1, 0, 10)"); }
  try { var _thrown = false;
    ctx.getImageData(1, 1, 0, 0);
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) _fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.getImageData(1, 1, 0, 0)"); }

  t.end()
});


test('2d.imageData.object.ctor', function(t) {
  var window = new Window()

  helpers.assertNotEqual(t, window.ImageData, undefined, "window.ImageData", "undefined");
  try { var _thrown = false; new window.ImageData(1,1); } catch (e) { _thrown = true; } finally { helpers.assert(_thrown, "should throw exception: new window.ImageData(1,1)"); }

  t.end()
});


test('2d.imageData.object.nan', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.getImageData(0, 0, 10, 10);
  imgdata.data[0] = 100;
  imgdata.data[0] = NaN;
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
  imgdata.data[0] = 100;
  imgdata.data[0] = "cheese";
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");

  t.end()
});


test('2d.imageData.object.properties', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.getImageData(0, 0, 10, 10);
  helpers.assertEqual(t, typeof(imgdata.width), 'number', "typeof(imgdata.width)", "'number'");
  helpers.assertEqual(t, typeof(imgdata.height), 'number', "typeof(imgdata.height)", "'number'");
  helpers.assertEqual(t, typeof(imgdata.data), 'object', "typeof(imgdata.data)", "'object'");

  t.end()
});


test('2d.imageData.object.readonly', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.getImageData(0, 0, 10, 10);
  var w = imgdata.width;
  var h = imgdata.height;
  var d = imgdata.data;
  imgdata.width = 123;
  imgdata.height = 123;
  imgdata.data = [100,100,100,100];
  helpers.assertEqual(t, imgdata.width, w, "imgdata.width", "w");
  helpers.assertEqual(t, imgdata.height, h, "imgdata.height", "h");
  helpers.assertEqual(t, imgdata.data, d, "imgdata.data", "d");
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
  helpers.assertEqual(t, imgdata.data[1], 0, "imgdata.data[\""+(1)+"\"]", "0");
  helpers.assertEqual(t, imgdata.data[2], 0, "imgdata.data[\""+(2)+"\"]", "0");
  helpers.assertEqual(t, imgdata.data[3], 0, "imgdata.data[\""+(3)+"\"]", "0");

  t.end()
});


test('2d.imageData.object.round', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.getImageData(0, 0, 10, 10);
  imgdata.data[0] = 0.499;
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
  imgdata.data[0] = 0.5;
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
  imgdata.data[0] = 0.501;
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
  imgdata.data[0] = 1.499;
  helpers.assertEqual(t, imgdata.data[0], 1, "imgdata.data[\""+(0)+"\"]", "1");
  imgdata.data[0] = 1.5;
  helpers.assertEqual(t, imgdata.data[0], 1, "imgdata.data[\""+(0)+"\"]", "1");
  imgdata.data[0] = 1.501;
  helpers.assertEqual(t, imgdata.data[0], 1, "imgdata.data[\""+(0)+"\"]", "1");
  imgdata.data[0] = 2.5;
  helpers.assertEqual(t, imgdata.data[0], 2, "imgdata.data[\""+(0)+"\"]", "2");
  imgdata.data[0] = 3.5;
  helpers.assertEqual(t, imgdata.data[0], 3, "imgdata.data[\""+(0)+"\"]", "3");
  imgdata.data[0] = 252.5;
  helpers.assertEqual(t, imgdata.data[0], 252, "imgdata.data[\""+(0)+"\"]", "252");
  imgdata.data[0] = 253.5;
  helpers.assertEqual(t, imgdata.data[0], 253, "imgdata.data[\""+(0)+"\"]", "253");
  imgdata.data[0] = 254.5;
  helpers.assertEqual(t, imgdata.data[0], 254, "imgdata.data[\""+(0)+"\"]", "254");
  imgdata.data[0] = 256.5;
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
  imgdata.data[0] = -0.5;
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
  imgdata.data[0] = -1.5;
  helpers.assertEqual(t, imgdata.data[0], 255, "imgdata.data[\""+(0)+"\"]", "255");

  t.end()
});


test('2d.imageData.object.set', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.getImageData(0, 0, 10, 10);
  imgdata.data[0] = 100;
  helpers.assertEqual(t, imgdata.data[0], 100, "imgdata.data[\""+(0)+"\"]", "100");
  imgdata.data[0] = 200;
  helpers.assertEqual(t, imgdata.data[0], 200, "imgdata.data[\""+(0)+"\"]", "200");

  t.end()
});


test('2d.imageData.object.string', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.getImageData(0, 0, 10, 10);
  imgdata.data[0] = 100;
  imgdata.data[0] = "110";
  helpers.assertEqual(t, imgdata.data[0], 110, "imgdata.data[\""+(0)+"\"]", "110");
  imgdata.data[0] = 100;
  imgdata.data[0] = "0x78";
  helpers.assertEqual(t, imgdata.data[0], 120, "imgdata.data[\""+(0)+"\"]", "120");
  imgdata.data[0] = 100;
  imgdata.data[0] = " +130e0 ";
  helpers.assertEqual(t, imgdata.data[0], 130, "imgdata.data[\""+(0)+"\"]", "130");

  t.end()
});


test('2d.imageData.object.undefined', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.getImageData(0, 0, 10, 10);
  imgdata.data[0] = 100;
  imgdata.data[0] = undefined;
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");

  t.end()
});


test('2d.imageData.object.wrap', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.getImageData(0, 0, 10, 10);
  
  imgdata.data[0] = 0;
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
  imgdata.data[0] = 300;
  helpers.assertEqual(t, imgdata.data[0], 44, "imgdata.data[\""+(0)+"\"]", "44");
  imgdata.data[0] = -100;
  helpers.assertEqual(t, imgdata.data[0], 156, "imgdata.data[\""+(0)+"\"]", "156");
  
  imgdata.data[0] = 200+Math.pow(2, 32);
  helpers.assertEqual(t, imgdata.data[0], 200, "imgdata.data[\""+(0)+"\"]", "200");
  imgdata.data[0] = -200-Math.pow(2, 32);
  helpers.assertEqual(t, imgdata.data[0], 56, "imgdata.data[\""+(0)+"\"]", "56");
  
  imgdata.data[0] = -Infinity;
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");
  imgdata.data[0] = Infinity;
  helpers.assertEqual(t, imgdata.data[0], 0, "imgdata.data[\""+(0)+"\"]", "0");

  t.end()
});


test('2d.imageData.put.alpha', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0, 255, 0, 0.25)';
  ctx.fillRect(0, 0, 100, 50)
  var imgdata = ctx.getImageData(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  ctx.putImageData(imgdata, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,64, "50,25", "0,255,0,64", 2);

  t.end()
});


test('2d.imageData.put.basic', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50)
  var imgdata = ctx.getImageData(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  ctx.putImageData(imgdata, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.clip', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50)
  var imgdata = ctx.getImageData(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  ctx.beginPath();
  ctx.rect(0, 0, 50, 50);
  ctx.clip();
  ctx.putImageData(imgdata, 0, 0);
  helpers.assertPixelApprox(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.created', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.createImageData(100, 50);
  for (var i = 0; i < imgdata.data.length; i += 4) {
      imgdata.data[i] = 0;
      imgdata.data[i+1] = 255;
      imgdata.data[i+2] = 0;
      imgdata.data[i+3] = 255;
  }
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  ctx.putImageData(imgdata, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.cross', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var canvas2 = new Canvas();
  var ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#0f0';
  ctx2.fillRect(0, 0, 100, 50)
  var imgdata = ctx2.getImageData(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  ctx.putImageData(imgdata, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.dirty.negative', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 20, 20)
  
  var imgdata = ctx.getImageData(0, 0, 100, 50);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50)
  ctx.fillStyle = '#f00';
  ctx.fillRect(40, 20, 20, 20)
  ctx.putImageData(imgdata, 40, 20, 20, 20, -20, -20);
  
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 35,25, 0,255,0,255, "35,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 65,25, 0,255,0,255, "65,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 50,15, 0,255,0,255, "50,15", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 50,45, 0,255,0,255, "50,45", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.dirty.outside', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  
  var imgdata = ctx.getImageData(0, 0, 100, 50);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50)
  
  ctx.putImageData(imgdata, 100, 20, 20, 20, -20, -20);
  ctx.putImageData(imgdata, 200, 200, 0, 0, 100, 50);
  ctx.putImageData(imgdata, 40, 20, -30, -20, 30, 20);
  ctx.putImageData(imgdata, -30, 20, 0, 0, 30, 20);
  
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 98,15, 0,255,0,255, "98,15", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 98,25, 0,255,0,255, "98,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 98,45, 0,255,0,255, "98,45", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 1,5, 0,255,0,255, "1,5", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 1,25, 0,255,0,255, "1,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 1,45, 0,255,0,255, "1,45", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.dirty.rect1', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 20, 20)
  
  var imgdata = ctx.getImageData(0, 0, 100, 50);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50)
  ctx.fillStyle = '#f00';
  ctx.fillRect(40, 20, 20, 20)
  ctx.putImageData(imgdata, 40, 20, 0, 0, 20, 20);
  
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 35,25, 0,255,0,255, "35,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 65,25, 0,255,0,255, "65,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 50,15, 0,255,0,255, "50,15", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 50,45, 0,255,0,255, "50,45", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.dirty.rect2', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  ctx.fillStyle = '#0f0';
  ctx.fillRect(60, 30, 20, 20)
  
  var imgdata = ctx.getImageData(0, 0, 100, 50);
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50)
  ctx.fillStyle = '#f00';
  ctx.fillRect(40, 20, 20, 20)
  ctx.putImageData(imgdata, -20, -10, 60, 30, 20, 20);
  
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 35,25, 0,255,0,255, "35,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 65,25, 0,255,0,255, "65,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 50,15, 0,255,0,255, "50,15", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 50,45, 0,255,0,255, "50,45", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.dirty.zero', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  var imgdata = ctx.getImageData(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50)
  ctx.putImageData(imgdata, 0, 0, 0, 0, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.modified', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50)
  ctx.fillStyle = '#f00';
  ctx.fillRect(45, 20, 10, 10)
  var imgdata = ctx.getImageData(45, 20, 10, 10);
  for (var i = 0, len = imgdata.width*imgdata.height*4; i < len; i += 4)
  {
      imgdata.data[i] = 0;
      imgdata.data[i+1] = 255;
  }
  ctx.putImageData(imgdata, 45, 20);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.nonfinite', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = ctx.getImageData(0, 0, 10, 10);
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, -Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, -Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, NaN, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, NaN, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, -Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, -Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, NaN);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, NaN)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, 10, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, 10, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, -Infinity, 10, 10, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, -Infinity, 10, 10, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, NaN, 10, 10, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, NaN, 10, 10, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, 10, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, 10, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, -Infinity, 10, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, -Infinity, 10, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, NaN, 10, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, NaN, 10, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, Infinity, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, Infinity, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, -Infinity, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, -Infinity, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, NaN, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, NaN, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, -Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, -Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, NaN, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, NaN, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, 10, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, 10, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, 10, -Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, 10, -Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, 10, NaN, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, 10, NaN, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, 10, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, 10, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, 10, 10, -Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, 10, 10, -Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, 10, 10, NaN);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, 10, 10, NaN)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, 10, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, 10, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, Infinity, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, Infinity, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, Infinity, Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, Infinity, Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, Infinity, Infinity, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, Infinity, Infinity, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, Infinity, Infinity, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, Infinity, Infinity, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, Infinity, 10, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, Infinity, 10, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, Infinity, 10, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, Infinity, 10, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, Infinity, 10, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, Infinity, 10, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, 10, Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, 10, Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, 10, Infinity, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, 10, Infinity, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, 10, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, 10, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, 10, Infinity, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, 10, Infinity, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, 10, 10, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, 10, 10, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, 10, 10, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, 10, 10, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, Infinity, 10, 10, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, Infinity, 10, 10, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, Infinity, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, Infinity, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, Infinity, Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, Infinity, Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, Infinity, Infinity, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, Infinity, Infinity, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, Infinity, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, Infinity, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, Infinity, Infinity, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, Infinity, Infinity, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, Infinity, 10, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, Infinity, 10, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, Infinity, 10, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, Infinity, 10, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, Infinity, 10, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, Infinity, 10, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, 10, Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, 10, Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, 10, Infinity, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, 10, Infinity, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, 10, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, 10, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, 10, Infinity, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, 10, Infinity, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, 10, 10, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, 10, 10, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, 10, 10, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, 10, 10, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, Infinity, 10, 10, 10, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, Infinity, 10, 10, 10, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, Infinity, 10, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, Infinity, 10, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, Infinity, Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, Infinity, Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, Infinity, Infinity, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, Infinity, Infinity, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, Infinity, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, Infinity, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, Infinity, Infinity, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, Infinity, Infinity, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, Infinity, 10, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, Infinity, 10, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, Infinity, 10, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, Infinity, 10, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, Infinity, 10, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, Infinity, 10, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, 10, Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, 10, Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, 10, Infinity, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, 10, Infinity, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, 10, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, 10, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, 10, Infinity, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, 10, Infinity, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, 10, 10, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, 10, 10, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, 10, 10, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, 10, 10, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, Infinity, 10, 10, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, Infinity, 10, 10, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, Infinity, Infinity, 10, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, Infinity, Infinity, 10, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, Infinity, Infinity, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, Infinity, Infinity, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, Infinity, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, Infinity, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, Infinity, Infinity, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, Infinity, Infinity, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, Infinity, 10, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, Infinity, 10, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, Infinity, 10, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, Infinity, 10, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, Infinity, 10, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, Infinity, 10, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, Infinity, Infinity, 10);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, Infinity, Infinity, 10)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, Infinity, 10, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, Infinity, 10, Infinity)"); }
  try { var _thrown = false;
    ctx.putImageData(imgdata, 10, 10, 10, 10, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) _fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.putImageData(imgdata, 10, 10, 10, 10, Infinity, Infinity)"); }

  t.end()
});


test('2d.imageData.put.null', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.putImageData(null, 0, 0);
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) _fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.putImageData(null, 0, 0)"); }

  t.end()
});


test('2d.imageData.put.path', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  ctx.rect(0, 0, 100, 50);
  var imgdata = ctx.getImageData(0, 0, 100, 50);
  ctx.putImageData(imgdata, 0, 0);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.unaffected', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50)
  var imgdata = ctx.getImageData(0, 0, 100, 50);
  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50)
  ctx.globalAlpha = 0.1;
  ctx.globalCompositeOperation = 'destination-atop';
  ctx.shadowColor = '#f00';
  ctx.shadowBlur = 1;
  ctx.translate(100, 50);
  ctx.scale(0.1, 0.1);
  ctx.putImageData(imgdata, 0, 0);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.imageData.put.unchanged', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var i = 0;
  for (var y = 0; y < 16; ++y) {
      for (var x = 0; x < 16; ++x, ++i) {
          ctx.fillStyle = 'rgba(' + i + ',' + (Math.floor(i*1.5) % 256) + ',' + (Math.floor(i*23.3) % 256) + ',' + (i/256) + ')';
          ctx.fillRect(x, y, 1, 1);
      }
  }
  var imgdata1 = ctx.getImageData(0.1, 0.2, 15.8, 15.9);
  var olddata = [];
  for (var i = 0; i < imgdata1.data.length; ++i)
      olddata[i] = imgdata1.data[i];
  
  ctx.putImageData(imgdata1, 0.1, 0.2);
  
  var imgdata2 = ctx.getImageData(0.1, 0.2, 15.8, 15.9);
  for (var i = 0; i < imgdata2.data.length; ++i) {
      helpers.assertEqual(t, olddata[i], imgdata2.data[i], "olddata[\""+(i)+"\"]", "imgdata2.data[\""+(i)+"\"]");
  }

  t.end()
});


test('2d.imageData.put.wrongtype', function(t) {

  var canvas = new Canvas(100, 50);
  var ctx = canvas.getContext('2d')

  var imgdata = { width: 1, height: 1, data: [255, 0, 0, 255] };
  try { var _thrown = false;
    ctx.putImageData(imgdata, 0, 0);
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) _fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.putImageData(imgdata, 0, 0)"); }
  try { var _thrown = false;
    ctx.putImageData("cheese", 0, 0);
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) _fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.putImageData(\"cheese\", 0, 0)"); }
  try { var _thrown = false;
    ctx.putImageData(42, 0, 0);
  } catch (e) { if (e.code != DOMException.TYPE_MISMATCH_ERR) _fail("Failed assertion: expected exception of type TYPE_MISMATCH_ERR, got: "+e.message); _thrown = true; } finally { helpers.assert(_thrown, "should throw exception of type TYPE_MISMATCH_ERR: ctx.putImageData(42, 0, 0)"); }

  t.end()
});

