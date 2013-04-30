var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.gradient.empty','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  var g = ctx.createLinearGradient(0, 0, 0, 50);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.gradient.interpolate.alpha','2d.gradient.interpolate.alpha.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#ff0';
  ctx.fillRect(0, 0, 100, 50);
  var g = ctx.createLinearGradient(0, 0, 100, 0);
  g.addColorStop(0, 'rgba(0,0,255, 0)');
  g.addColorStop(1, 'rgba(0,0,255, 1)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 25,25, 191,191,63,255, "25,25", "191,191,63,255", 3);
  helpers.assertPixelApprox(t, canvas, 50,25, 127,127,127,255, "50,25", "127,127,127,255", 3);
  helpers.assertPixelApprox(t, canvas, 75,25, 63,63,191,255, "75,25", "63,63,191,255", 3);

  t.end()
});


test('2d.gradient.interpolate.colour','2d.gradient.interpolate.colour.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createLinearGradient(0, 0, 100, 0);
  g.addColorStop(0, '#ff0');
  g.addColorStop(1, '#00f');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 25,25, 191,191,63,255, "25,25", "191,191,63,255", 3);
  helpers.assertPixelApprox(t, canvas, 50,25, 127,127,127,255, "50,25", "127,127,127,255", 3);
  helpers.assertPixelApprox(t, canvas, 75,25, 63,63,191,255, "75,25", "63,63,191,255", 3);

  t.end()
});


test('2d.gradient.interpolate.colouralpha','2d.gradient.interpolate.colouralpha.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createLinearGradient(0, 0, 100, 0);
  g.addColorStop(0, 'rgba(255,255,0, 0)');
  g.addColorStop(1, 'rgba(0,0,255, 1)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 25,25, 191,191,63,63, "25,25", "191,191,63,63", 3);
  helpers.assertPixelApprox(t, canvas, 50,25, 127,127,127,127, "50,25", "127,127,127,127", 3);
  helpers.assertPixelApprox(t, canvas, 75,25, 63,63,191,191, "75,25", "63,63,191,191", 3);

  t.end()
});


test('2d.gradient.interpolate.multiple','2d.gradient.interpolate.multiple.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  canvas.width = 200;
  var g = ctx.createLinearGradient(0, 0, 200, 0);
  g.addColorStop(0, '#ff0');
  g.addColorStop(0.5, '#0ff');
  g.addColorStop(1, '#f0f');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 200, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 127,255,127,255, "50,25", "127,255,127,255", 3);
  helpers.assertPixelApprox(t, canvas, 100,25, 0,255,255,255, "100,25", "0,255,255,255", 3);
  helpers.assertPixelApprox(t, canvas, 150,25, 127,127,255,255, "150,25", "127,127,255,255", 3);

  t.end()
});


test('2d.gradient.interpolate.outside','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createLinearGradient(25, 0, 75, 0);
  g.addColorStop(0.4, '#0f0');
  g.addColorStop(0.6, '#0f0');
  
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 20,25, 0,255,0,255, "20,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);
  helpers.assertPixelApprox(t, canvas, 80,25, 0,255,0,255, "80,25", "0,255,0,255", 2);

  t.end()
});


test('2d.gradient.interpolate.overlap','2d.gradient.interpolate.overlap.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  canvas.width = 200;
  var g = ctx.createLinearGradient(0, 0, 200, 0);
  g.addColorStop(0, '#f00');
  g.addColorStop(0, '#ff0');
  g.addColorStop(0.25, '#00f');
  g.addColorStop(0.25, '#0f0');
  g.addColorStop(0.25, '#0f0');
  g.addColorStop(0.25, '#0f0');
  g.addColorStop(0.25, '#ff0');
  g.addColorStop(0.5, '#00f');
  g.addColorStop(0.5, '#0f0');
  g.addColorStop(0.75, '#00f');
  g.addColorStop(0.75, '#f00');
  g.addColorStop(0.75, '#ff0');
  g.addColorStop(0.5, '#0f0');
  g.addColorStop(0.5, '#0f0');
  g.addColorStop(0.5, '#ff0');
  g.addColorStop(1, '#00f');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 200, 50);
  helpers.assertPixelApprox(t, canvas, 49,25, 0,0,255,255, "49,25", "0,0,255,255", 16);
  helpers.assertPixelApprox(t, canvas, 51,25, 255,255,0,255, "51,25", "255,255,0,255", 16);
  helpers.assertPixelApprox(t, canvas, 99,25, 0,0,255,255, "99,25", "0,0,255,255", 16);
  helpers.assertPixelApprox(t, canvas, 101,25, 255,255,0,255, "101,25", "255,255,0,255", 16);
  helpers.assertPixelApprox(t, canvas, 149,25, 0,0,255,255, "149,25", "0,0,255,255", 16);
  helpers.assertPixelApprox(t, canvas, 151,25, 255,255,0,255, "151,25", "255,255,0,255", 16);

  t.end()
});


test('2d.gradient.interpolate.overlap2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createLinearGradient(0, 0, 100, 0);
  var ps = [ 0, 1/10, 1/4, 1/3, 1/2, 3/4, 1 ];
  for (var p = 0; p < ps.length; ++p)
  {
          g.addColorStop(ps[p], '#0f0');
          for (var i = 0; i < 15; ++i)
                  g.addColorStop(ps[p], '#f00');
          g.addColorStop(ps[p], '#0f0');
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 1,25, 0,255,0,255, "1,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 30,25, 0,255,0,255, "30,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 40,25, 0,255,0,255, "40,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 60,25, 0,255,0,255, "60,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 80,25, 0,255,0,255, "80,25", "0,255,0,255");

  t.end()
});


test('2d.gradient.interpolate.solid','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createLinearGradient(0, 0, 100, 0);
  g.addColorStop(0, '#0f0');
  g.addColorStop(1, '#0f0');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.gradient.interpolate.vertical','2d.gradient.interpolate.vertical.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createLinearGradient(0, 0, 0, 50);
  g.addColorStop(0, '#ff0');
  g.addColorStop(1, '#00f');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,12, 191,191,63,255, "50,12", "191,191,63,255", 10);
  helpers.assertPixelApprox(t, canvas, 50,25, 127,127,127,255, "50,25", "127,127,127,255", 5);
  helpers.assertPixelApprox(t, canvas, 50,37, 63,63,191,255, "50,37", "63,63,191,255", 10);

  t.end()
});


test('2d.gradient.interpolate.zerosize','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createLinearGradient(50, 25, 50, 25); // zero-length line (undefined direction)
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 40,20, 0,255,0,255, "40,20", "0,255,0,255", 2);

  t.end()
});


test('2d.gradient.linear.nonfinite',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createLinearGradient(Infinity, 0, 1, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(Infinity, 0, 1, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(-Infinity, 0, 1, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(-Infinity, 0, 1, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(NaN, 0, 1, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(NaN, 0, 1, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, Infinity, 1, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, Infinity, 1, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, -Infinity, 1, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, -Infinity, 1, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, NaN, 1, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, NaN, 1, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, 0, Infinity, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, 0, Infinity, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, 0, -Infinity, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, 0, -Infinity, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, 0, NaN, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, 0, NaN, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, 0, 1, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, 0, 1, Infinity)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, 0, 1, -Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, 0, 1, -Infinity)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, 0, 1, NaN);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, 0, 1, NaN)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(Infinity, Infinity, 1, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(Infinity, Infinity, 1, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(Infinity, Infinity, Infinity, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(Infinity, Infinity, Infinity, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(Infinity, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(Infinity, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(Infinity, Infinity, 1, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(Infinity, Infinity, 1, Infinity)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(Infinity, 0, Infinity, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(Infinity, 0, Infinity, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(Infinity, 0, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(Infinity, 0, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(Infinity, 0, 1, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(Infinity, 0, 1, Infinity)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, Infinity, Infinity, 0);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, Infinity, Infinity, 0)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, Infinity, 1, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, Infinity, 1, Infinity)"); }
  try { var _thrown = false;
    ctx.createLinearGradient(0, 0, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createLinearGradient(0, 0, Infinity, Infinity)"); }

  t.end()
});


test('2d.gradient.linear.transform.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createLinearGradient(0, 0, 200, 0);
  g.addColorStop(0, '#f00');
  g.addColorStop(0.25, '#0f0');
  g.addColorStop(0.75, '#0f0');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
  ctx.translate(-50, 0);
  ctx.fillRect(50, 0, 100, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.gradient.linear.transform.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.translate(100, 0);
  var g = ctx.createLinearGradient(0, 0, 200, 0);
  g.addColorStop(0, '#f00');
  g.addColorStop(0.25, '#0f0');
  g.addColorStop(0.75, '#0f0');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
  ctx.translate(-150, 0);
  ctx.fillRect(50, 0, 100, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.gradient.linear.transform.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createLinearGradient(0, 0, 200, 0);
  g.addColorStop(0, '#f00');
  g.addColorStop(0.25, '#0f0');
  g.addColorStop(0.75, '#0f0');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  ctx.translate(-50, 0);
  ctx.fillRect(50, 0, 100, 50);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.gradient.object.compare',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g1 = ctx.createLinearGradient(0, 0, 100, 0);
  var g2 = ctx.createLinearGradient(0, 0, 100, 0);
  helpers.assertNotEqual(t, g1, g2, "g1", "g2");
  ctx.fillStyle = g1;
  helpers.assertEqual(t, ctx.fillStyle, g1, "ctx.fillStyle", "g1");

  t.end()
});


test('2d.gradient.object.crosscanvas','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  var g = helpers.createCanvas(document).getContext('2d').createLinearGradient(0, 0, 100, 0);
  g.addColorStop(0, '#0f0');
  g.addColorStop(1, '#0f0');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.gradient.object.invalidcolour',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createLinearGradient(0, 0, 100, 0);
  try { var _thrown = false;
    g.addColorStop(0, "");
  } catch (e) { if (e.code != DOMException.SYNTAX_ERR) t.fail("Failed assertion: expected exception of type SYNTAX_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type SYNTAX_ERR: g.addColorStop(0, \"\")"); }
  try { var _thrown = false;
    g.addColorStop(0, 'undefined');
  } catch (e) { if (e.code != DOMException.SYNTAX_ERR) t.fail("Failed assertion: expected exception of type SYNTAX_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type SYNTAX_ERR: g.addColorStop(0, 'undefined')"); }

  t.end()
});


test('2d.gradient.object.invalidoffset',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createLinearGradient(0, 0, 100, 0);
  try { var _thrown = false;
    g.addColorStop(-1, '#000');
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: g.addColorStop(-1, '#000')"); }
  try { var _thrown = false;
    g.addColorStop(2, '#000');
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: g.addColorStop(2, '#000')"); }
  try { var _thrown = false;
    g.addColorStop(Infinity, '#000');
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: g.addColorStop(Infinity, '#000')"); }
  try { var _thrown = false;
    g.addColorStop(-Infinity, '#000');
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: g.addColorStop(-Infinity, '#000')"); }
  try { var _thrown = false;
    g.addColorStop(NaN, '#000');
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: g.addColorStop(NaN, '#000')"); }

  t.end()
});


test('2d.gradient.object.return',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  window.CanvasGradient.prototype.thisImplementsCanvasGradient = true;
  
  var g1 = ctx.createLinearGradient(0, 0, 100, 0);
  helpers.assertNotEqual(t, g1.addColorStop, undefined, "g1.addColorStop", "undefined");
  helpers.assertEqual(t, g1.thisImplementsCanvasGradient, true, "g1.thisImplementsCanvasGradient", "true");
  
  var g2 = ctx.createRadialGradient(0, 0, 10, 0, 0, 20);
  helpers.assertNotEqual(t, g2.addColorStop, undefined, "g2.addColorStop", "undefined");
  helpers.assertEqual(t, g2.thisImplementsCanvasGradient, true, "g2.thisImplementsCanvasGradient", "true");

  t.end()
});


test('2d.gradient.object.update','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createLinearGradient(-100, 0, 200, 0);
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
  g.addColorStop(0.1, '#0f0');
  g.addColorStop(0.9, '#0f0');
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixelApprox(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255", 2);

  t.end()
});


test('2d.gradient.radial.cone.behind','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(120, 25, 10, 211, 25, 100);
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.cone.beside','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(0, 100, 40, 100, 100, 50);
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.cone.bottom','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(210, 25, 100, 230, 25, 101);
  g.addColorStop(0, '#0f0');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.cone.cylinder','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(210, 25, 100, 230, 25, 100);
  g.addColorStop(0, '#0f0');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.cone.front','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(311, 25, 10, 210, 25, 100);
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#0f0');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.cone.shape1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var tol = 1; // tolerance to avoid antialiasing artifacts
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(30+tol, 40);
  ctx.lineTo(110, -20+tol);
  ctx.lineTo(110, 100-tol);
  ctx.fill();
  
  var g = ctx.createRadialGradient(30+10*5/2, 40, 10*3/2, 30+10*15/4, 40, 10*9/4);
  g.addColorStop(0, '#0f0');
  g.addColorStop(1, '#0f0');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.cone.shape2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var tol = 1; // tolerance to avoid antialiasing artifacts
  
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(30+10*5/2, 40, 10*3/2, 30+10*15/4, 40, 10*9/4);
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  
  ctx.fillStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(30-tol, 40);
  ctx.lineTo(110, -20-tol);
  ctx.lineTo(110, 100+tol);
  ctx.fill();
  
  helpers.assertPixel(t, canvas, 1,1, 0,255,0,255, "1,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,1, 0,255,0,255, "50,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,1, 0,255,0,255, "98,1", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,25, 0,255,0,255, "1,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,25, 0,255,0,255, "98,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 1,48, 0,255,0,255, "1,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,48, 0,255,0,255, "50,48", "0,255,0,255");
  helpers.assertPixel(t, canvas, 98,48, 0,255,0,255, "98,48", "0,255,0,255");

  t.end()
});


test('2d.gradient.radial.cone.top','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(230, 25, 100, 100, 25, 101);
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#0f0');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.equal','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(50, 25, 20, 50, 25, 20);
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.inside1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(50, 25, 100, 50, 25, 200);
  g.addColorStop(0, '#0f0');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.inside2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(50, 25, 200, 50, 25, 100);
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#0f0');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.inside3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(50, 25, 200, 50, 25, 100);
  g.addColorStop(0, '#f00');
  g.addColorStop(0.993, '#f00');
  g.addColorStop(1, '#0f0');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.negative',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, -0.1, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.createRadialGradient(0, 0, -0.1, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, 0, 0, -0.1);
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.createRadialGradient(0, 0, 1, 0, 0, -0.1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, -0.1, 0, 0, -0.1);
  } catch (e) { if (e.code != DOMException.INDEX_SIZE_ERR) t.fail("Failed assertion: expected exception of type INDEX_SIZE_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type INDEX_SIZE_ERR: ctx.createRadialGradient(0, 0, -0.1, 0, 0, -0.1)"); }

  t.end()
});


test('2d.gradient.radial.nonfinite',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, 1, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, 1, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(-Infinity, 0, 1, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(-Infinity, 0, 1, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(NaN, 0, 1, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(NaN, 0, 1, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, 1, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, 1, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, -Infinity, 1, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, -Infinity, 1, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, NaN, 1, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, NaN, 1, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, Infinity, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, Infinity, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, -Infinity, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, -Infinity, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, NaN, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, NaN, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, Infinity, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, Infinity, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, -Infinity, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, -Infinity, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, NaN, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, NaN, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, 0, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, 0, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, 0, -Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, 0, -Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, 0, NaN, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, 0, NaN, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, 0, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, 0, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, 0, 0, -Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, 0, 0, -Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, 0, 0, NaN);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, 0, 0, NaN)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, 1, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, 1, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, Infinity, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, Infinity, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, Infinity, Infinity, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, Infinity, Infinity, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, Infinity, Infinity, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, Infinity, Infinity, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, Infinity, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, Infinity, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, Infinity, Infinity, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, Infinity, Infinity, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, Infinity, 0, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, Infinity, 0, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, Infinity, 0, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, Infinity, 0, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, Infinity, 0, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, Infinity, 0, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, 1, Infinity, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, 1, Infinity, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, 1, Infinity, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, 1, Infinity, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, 1, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, 1, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, 1, Infinity, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, 1, Infinity, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, 1, 0, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, 1, 0, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, 1, 0, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, 1, 0, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, Infinity, 1, 0, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, Infinity, 1, 0, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, Infinity, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, Infinity, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, Infinity, Infinity, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, Infinity, Infinity, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, Infinity, Infinity, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, Infinity, Infinity, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, Infinity, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, Infinity, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, Infinity, Infinity, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, Infinity, Infinity, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, Infinity, 0, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, Infinity, 0, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, Infinity, 0, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, Infinity, 0, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, Infinity, 0, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, Infinity, 0, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, 1, Infinity, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, 1, Infinity, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, 1, Infinity, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, 1, Infinity, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, 1, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, 1, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, 1, Infinity, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, 1, Infinity, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, 1, 0, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, 1, 0, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, 1, 0, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, 1, 0, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(Infinity, 0, 1, 0, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(Infinity, 0, 1, 0, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, Infinity, 0, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, Infinity, 0, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, Infinity, Infinity, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, Infinity, Infinity, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, Infinity, Infinity, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, Infinity, Infinity, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, Infinity, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, Infinity, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, Infinity, Infinity, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, Infinity, Infinity, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, Infinity, 0, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, Infinity, 0, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, Infinity, 0, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, Infinity, 0, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, Infinity, 0, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, Infinity, 0, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, 1, Infinity, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, 1, Infinity, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, 1, Infinity, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, 1, Infinity, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, 1, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, 1, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, 1, Infinity, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, 1, Infinity, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, 1, 0, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, 1, 0, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, 1, 0, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, 1, 0, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, Infinity, 1, 0, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, Infinity, 1, 0, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, Infinity, Infinity, 0, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, Infinity, Infinity, 0, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, Infinity, Infinity, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, Infinity, Infinity, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, Infinity, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, Infinity, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, Infinity, Infinity, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, Infinity, Infinity, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, Infinity, 0, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, Infinity, 0, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, Infinity, 0, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, Infinity, 0, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, Infinity, 0, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, Infinity, 0, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, Infinity, Infinity, 1);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, Infinity, Infinity, 1)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, Infinity, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, Infinity, Infinity, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, Infinity, 0, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, Infinity, 0, Infinity)"); }
  try { var _thrown = false;
    ctx.createRadialGradient(0, 0, 1, 0, Infinity, Infinity);
  } catch (e) { if (e.code != DOMException.NOT_SUPPORTED_ERR) t.fail("Failed assertion: expected exception of type NOT_SUPPORTED_ERR, got: "+e.message); _thrown = true; } finally { helpers.ok(t, _thrown, "should throw exception of type NOT_SUPPORTED_ERR: ctx.createRadialGradient(0, 0, 1, 0, Infinity, Infinity)"); }

  t.end()
});


test('2d.gradient.radial.outside1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(200, 25, 10, 200, 25, 20);
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#0f0');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.outside2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(200, 25, 20, 200, 25, 10);
  g.addColorStop(0, '#0f0');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.outside3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(200, 25, 20, 200, 25, 10);
  g.addColorStop(0, '#0f0');
  g.addColorStop(0.001, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.touch1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(150, 25, 50, 200, 25, 100);
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.touch2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(-80, 25, 70, 0, 25, 150);
  g.addColorStop(0, '#f00');
  g.addColorStop(0.01, '#0f0');
  g.addColorStop(0.99, '#0f0');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.touch3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  
  var g = ctx.createRadialGradient(120, -15, 25, 140, -30, 50);
  g.addColorStop(0, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
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

  t.end()
});


test('2d.gradient.radial.transform.1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createRadialGradient(0, 0, 0, 0, 0, 11.2);
  g.addColorStop(0, '#0f0');
  g.addColorStop(0.5, '#0f0');
  g.addColorStop(0.51, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
  ctx.translate(50, 25);
  ctx.scale(10, 10);
  ctx.fillRect(-5, -2.5, 10, 5);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.gradient.radial.transform.2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.translate(100, 0);
  var g = ctx.createRadialGradient(0, 0, 0, 0, 0, 11.2);
  g.addColorStop(0, '#0f0');
  g.addColorStop(0.5, '#0f0');
  g.addColorStop(0.51, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
  ctx.translate(-50, 25);
  ctx.scale(10, 10);
  ctx.fillRect(-5, -2.5, 10, 5);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});


test('2d.gradient.radial.transform.3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var g = ctx.createRadialGradient(0, 0, 0, 0, 0, 11.2);
  g.addColorStop(0, '#0f0');
  g.addColorStop(0.5, '#0f0');
  g.addColorStop(0.51, '#f00');
  g.addColorStop(1, '#f00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 100, 50);
  ctx.translate(50, 25);
  ctx.scale(10, 10);
  ctx.fillRect(-5, -2.5, 10, 5);
  helpers.assertPixel(t, canvas, 25,25, 0,255,0,255, "25,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");
  helpers.assertPixel(t, canvas, 75,25, 0,255,0,255, "75,25", "0,255,0,255");

  t.end()
});

