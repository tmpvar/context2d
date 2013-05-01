var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = helpers.wrapFunction;

test(module, '2d.fillStyle.default',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  helpers.assertEqual(t, ctx.fillStyle, '#000000', "ctx.fillStyle", "'#000000'");

  t.done()
});


test(module, '2d.fillStyle.get.semitransparent',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  helpers.assertMatch(t, ctx.fillStyle, /^rgba\(255, 255, 255, 0\.4\d+\)$/, "ctx.fillStyle", "/^rgba\\(255, 255, 255, 0\\.4\\d+\\)$/");

  t.done()
});


test(module, '2d.fillStyle.get.solid',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#fa0';
  helpers.assertEqual(t, ctx.fillStyle, '#ffaa00', "ctx.fillStyle", "'#ffaa00'");

  t.done()
});


test(module, '2d.fillStyle.get.transparent',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0,0,0,0)';
  helpers.assertEqual(t, ctx.fillStyle, 'rgba(0, 0, 0, 0.0)', "ctx.fillStyle", "'rgba(0, 0, 0, 0.0)'");

  t.done()
});


test(module, '2d.fillStyle.invalidstring','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.fillStyle = 'invalid';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.invalidtype','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.fillStyle = '#0f0';
  ctx.fillStyle = null;
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.current.basic','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  canvas.setAttribute('style', 'color: #0f0');
  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'currentColor';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.current.changed','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  canvas.setAttribute('style', 'color: #0f0');
  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'currentColor';
  canvas.setAttribute('style', 'color: #f00');
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.current.removed','2d.fillStyle.parse.current.removed.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Try not to let it undetectably incorrectly pick up opaque-black
  // from other parts of the document:
  document.body.parentNode.setAttribute('style', 'color: #f00');
  document.body.setAttribute('style', 'color: #f00');
  canvas.setAttribute('style', 'color: #f00');
  
  var canvas2 = helpers.createCanvas(document);
  var ctx2 = canvas2.getContext('2d');
  ctx2.fillStyle = '#f00';
  ctx2.fillStyle = 'currentColor';
  ctx2.fillRect(0, 0, 100, 50);
  ctx.drawImage(canvas2, 0, 0);
  
  document.body.parentNode.removeAttribute('style');
  document.body.removeAttribute('style');
  
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,255, "50,25", "0,0,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hex3','2d.fillStyle.parse.hex3.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hex6','2d.fillStyle.parse.hex6.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = '#00fF00';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsl-1','2d.fillStyle.parse.hsl-1.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsl(120, 100%, 50%)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsl-2','2d.fillStyle.parse.hsl-2.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsl( -240 , 100% , 50% )';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsl-3','2d.fillStyle.parse.hsl-3.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsl(360120, 100%, 50%)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsl-4','2d.fillStyle.parse.hsl-4.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsl(-360240, 100%, 50%)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsl-5','2d.fillStyle.parse.hsl-5.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsl(120.0, 100.0%, 50.0%)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsl-clamp-1','2d.fillStyle.parse.hsl-clamp-1.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsl(120, 200%, 50%)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsl-clamp-2','2d.fillStyle.parse.hsl-clamp-2.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsl(120, -200%, 49.9%)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 127,127,127,255, "50,25", "127,127,127,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsl-clamp-3','2d.fillStyle.parse.hsl-clamp-3.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsl(120, 100%, 200%)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 255,255,255,255, "50,25", "255,255,255,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsl-clamp-4','2d.fillStyle.parse.hsl-clamp-4.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsl(120, 100%, -200%)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,255, "50,25", "0,0,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsla-1','2d.fillStyle.parse.hsla-1.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsla(120, 100%, 50%, 0.499)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,127, "50,25", "0,255,0,127");

  t.done()
});


test(module, '2d.fillStyle.parse.hsla-2','2d.fillStyle.parse.hsla-2.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsla( 120.0 , 100.0% , 50.0% , 1 )';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsla-clamp-1','2d.fillStyle.parse.hsla-clamp-1.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsla(120, 200%, 50%, 1)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsla-clamp-2','2d.fillStyle.parse.hsla-clamp-2.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsla(120, -200%, 49.9%, 1)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 127,127,127,255, "50,25", "127,127,127,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsla-clamp-3','2d.fillStyle.parse.hsla-clamp-3.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsla(120, 100%, 200%, 1)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 255,255,255,255, "50,25", "255,255,255,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsla-clamp-4','2d.fillStyle.parse.hsla-clamp-4.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsla(120, 100%, -200%, 1)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,255, "50,25", "0,0,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsla-clamp-5','2d.fillStyle.parse.hsla-clamp-5.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsla(120, 100%, 50%, 2)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.hsla-clamp-6','2d.fillStyle.parse.hsla-clamp-6.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsla(120, 100%, 0%, -2)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.fillStyle.parse.html4','2d.fillStyle.parse.html4.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'limE';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hex1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = '#f'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hex2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = '#f0'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hex3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = '#g00'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hex4','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = '#ff00'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hex5','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = '#ff000'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hex6','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = '#fg0000'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hex7','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = '#ff0000f'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hex8','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = '#ff0000ff'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hsl-1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'hsl(0%, 100%, 50%)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hsl-2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'hsl(z, 100%, 50%)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hsl-3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'hsl(0, 0, 50%)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hsl-4','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'hsl(0, 100%, 0)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hsl-5','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'hsl(0, 100%, 100%, 1)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hsla-1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'hsla(0%, 100%, 50%, 1)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.hsla-2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'hsla(0, 0, 50%, 1)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.name-1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'darkbrown'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.name-2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'firebrick1'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.name-3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'red blue'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgb-1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgb(255.0, 0, 0)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgb-2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgb(255, 0.0, 0)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgb-3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgb(255.0, 0, 0,)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgb-4','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgb(100%, 0, 0)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgb-5','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgb(255 0 0)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgb-6','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgb(255, - 1, 0)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgb-7','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgb(255, 0, 0, 1)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgba-1','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgba(255, 0, 0)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgba-2','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgba(255.0, 0, 0, 1)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgba-3','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgba(100%, 0, 0, 1)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgba-4','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgba(255, 0, 0, 100%)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.invalid.rgba-5','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  try { ctx.fillStyle = 'rgba(255, 0, 0, 1. 0)'; } catch (e) { } // this shouldn't throw, but it shouldn't matter here if it does
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.rgb-clamp-1','2d.fillStyle.parse.rgb-clamp-1.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgb(-1000, 1000, -1000)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.rgb-clamp-2','2d.fillStyle.parse.rgb-clamp-2.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgb(-200%, 200%, -200%)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.rgb-clamp-3','2d.fillStyle.parse.rgb-clamp-3.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgb(-2147483649, 4294967298, -18446744073709551619)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.rgb-clamp-4','2d.fillStyle.parse.rgb-clamp-4.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgb(-1000000000000000000000000000000000000000, 1000000000000000000000000000000000000000, -1000000000000000000000000000000000000000)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.rgb-clamp-5','2d.fillStyle.parse.rgb-clamp-5.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgb(-10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, -10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.rgb-num','2d.fillStyle.parse.rgb-num.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgb(0,255,0)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.rgb-percent','2d.fillStyle.parse.rgb-percent.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgb(0% ,100% ,0%)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.rgba-clamp-1','2d.fillStyle.parse.rgba-clamp-1.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgba(0, 255, 0, -2)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.fillStyle.parse.rgba-clamp-2','2d.fillStyle.parse.rgba-clamp-2.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgba(0, 255, 0, 2)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.rgba-num-1','2d.fillStyle.parse.rgba-num-1.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgba(  0  ,  255  ,  0  ,  .499  )';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,127, "50,25", "0,255,0,127");

  t.done()
});


test(module, '2d.fillStyle.parse.rgba-num-2','2d.fillStyle.parse.rgba-num-2.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgba(  0  ,  255  ,  0  ,  0.499  )';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,127, "50,25", "0,255,0,127");

  t.done()
});


test(module, '2d.fillStyle.parse.rgba-percent','2d.fillStyle.parse.rgba-percent.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgba(0%,100%,0%,0.499)';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,127, "50,25", "0,255,0,127");

  t.done()
});


test(module, '2d.fillStyle.parse.rgba-solid-1','2d.fillStyle.parse.rgba-solid-1.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgba(  0  ,  255  ,  0  ,  1  )';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.rgba-solid-2','2d.fillStyle.parse.rgba-solid-2.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'rgba(  0  ,  255  ,  0  ,  1.0  )';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.done()
});


test(module, '2d.fillStyle.parse.svg-1','2d.fillStyle.parse.svg-1.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 128,128,128,255, "50,25", "128,128,128,255");

  t.done()
});


test(module, '2d.fillStyle.parse.svg-2','2d.fillStyle.parse.svg-2.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'grey';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 128,128,128,255, "50,25", "128,128,128,255");

  t.done()
});


test(module, '2d.fillStyle.parse.system',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'ThreeDDarkShadow';
  helpers.assertMatch(t, ctx.fillStyle, /^#(?!(FF0000|ff0000|f00)$)/, "ctx.fillStyle", "/^#(?!(FF0000|ff0000|f00)$)/"); // test that it's not red

  t.done()
});


test(module, '2d.fillStyle.parse.transparent-1','2d.fillStyle.parse.transparent-1.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});


test(module, '2d.fillStyle.parse.transparent-2','2d.fillStyle.parse.transparent-2.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'TrAnSpArEnT';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,0,0,0, "50,25", "0,0,0,0");

  t.done()
});

