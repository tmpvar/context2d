var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Image = helpers.Image;
var DOMException = helpers.DOMException;
var wrapFunction = function(t, cb) { return function() { cb(); t.end() } };
test('2d.state.saverestore.bitmap','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.save();
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.restore();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.state.saverestore.clip','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.save();
  ctx.rect(0, 0, 1, 1);
  ctx.clip();
  ctx.restore();
  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.state.saverestore.fillStyle',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.fillStyle;
  ctx.save();
  ctx.fillStyle = "#ff0000";
  ctx.restore();
  helpers.assertEqual(t, ctx.fillStyle, old, "ctx.fillStyle", "old");
  
  // Also test that save() doesn't modify the values
  ctx.fillStyle = "#ff0000";
  old = ctx.fillStyle;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against "#ff0000"
  ctx.save();
  helpers.assertEqual(t, ctx.fillStyle, old, "ctx.fillStyle", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.font',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.font;
  ctx.save();
  ctx.font = "25px serif";
  ctx.restore();
  helpers.assertEqual(t, ctx.font, old, "ctx.font", "old");
  
  // Also test that save() doesn't modify the values
  ctx.font = "25px serif";
  old = ctx.font;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against "25px serif"
  ctx.save();
  helpers.assertEqual(t, ctx.font, old, "ctx.font", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.globalAlpha',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.globalAlpha;
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.restore();
  helpers.assertEqual(t, ctx.globalAlpha, old, "ctx.globalAlpha", "old");
  
  // Also test that save() doesn't modify the values
  ctx.globalAlpha = 0.5;
  old = ctx.globalAlpha;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against 0.5
  ctx.save();
  helpers.assertEqual(t, ctx.globalAlpha, old, "ctx.globalAlpha", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.globalCompositeOperation',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.globalCompositeOperation;
  ctx.save();
  ctx.globalCompositeOperation = "copy";
  ctx.restore();
  helpers.assertEqual(t, ctx.globalCompositeOperation, old, "ctx.globalCompositeOperation", "old");
  
  // Also test that save() doesn't modify the values
  ctx.globalCompositeOperation = "copy";
  old = ctx.globalCompositeOperation;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against "copy"
  ctx.save();
  helpers.assertEqual(t, ctx.globalCompositeOperation, old, "ctx.globalCompositeOperation", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.lineCap',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.lineCap;
  ctx.save();
  ctx.lineCap = "round";
  ctx.restore();
  helpers.assertEqual(t, ctx.lineCap, old, "ctx.lineCap", "old");
  
  // Also test that save() doesn't modify the values
  ctx.lineCap = "round";
  old = ctx.lineCap;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against "round"
  ctx.save();
  helpers.assertEqual(t, ctx.lineCap, old, "ctx.lineCap", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.lineJoin',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.lineJoin;
  ctx.save();
  ctx.lineJoin = "round";
  ctx.restore();
  helpers.assertEqual(t, ctx.lineJoin, old, "ctx.lineJoin", "old");
  
  // Also test that save() doesn't modify the values
  ctx.lineJoin = "round";
  old = ctx.lineJoin;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against "round"
  ctx.save();
  helpers.assertEqual(t, ctx.lineJoin, old, "ctx.lineJoin", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.lineWidth',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.lineWidth;
  ctx.save();
  ctx.lineWidth = 0.5;
  ctx.restore();
  helpers.assertEqual(t, ctx.lineWidth, old, "ctx.lineWidth", "old");
  
  // Also test that save() doesn't modify the values
  ctx.lineWidth = 0.5;
  old = ctx.lineWidth;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against 0.5
  ctx.save();
  helpers.assertEqual(t, ctx.lineWidth, old, "ctx.lineWidth", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.miterLimit',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.miterLimit;
  ctx.save();
  ctx.miterLimit = 0.5;
  ctx.restore();
  helpers.assertEqual(t, ctx.miterLimit, old, "ctx.miterLimit", "old");
  
  // Also test that save() doesn't modify the values
  ctx.miterLimit = 0.5;
  old = ctx.miterLimit;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against 0.5
  ctx.save();
  helpers.assertEqual(t, ctx.miterLimit, old, "ctx.miterLimit", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.path','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f00';
  ctx.fillRect(0, 0, 100, 50);
  ctx.save();
  ctx.rect(0, 0, 100, 50);
  ctx.restore();
  ctx.fillStyle = '#0f0';
  ctx.fill();
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.state.saverestore.shadowBlur',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.shadowBlur;
  ctx.save();
  ctx.shadowBlur = 5;
  ctx.restore();
  helpers.assertEqual(t, ctx.shadowBlur, old, "ctx.shadowBlur", "old");
  
  // Also test that save() doesn't modify the values
  ctx.shadowBlur = 5;
  old = ctx.shadowBlur;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against 5
  ctx.save();
  helpers.assertEqual(t, ctx.shadowBlur, old, "ctx.shadowBlur", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.shadowColor',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.shadowColor;
  ctx.save();
  ctx.shadowColor = "#ff0000";
  ctx.restore();
  helpers.assertEqual(t, ctx.shadowColor, old, "ctx.shadowColor", "old");
  
  // Also test that save() doesn't modify the values
  ctx.shadowColor = "#ff0000";
  old = ctx.shadowColor;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against "#ff0000"
  ctx.save();
  helpers.assertEqual(t, ctx.shadowColor, old, "ctx.shadowColor", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.shadowOffsetX',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.shadowOffsetX;
  ctx.save();
  ctx.shadowOffsetX = 5;
  ctx.restore();
  helpers.assertEqual(t, ctx.shadowOffsetX, old, "ctx.shadowOffsetX", "old");
  
  // Also test that save() doesn't modify the values
  ctx.shadowOffsetX = 5;
  old = ctx.shadowOffsetX;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against 5
  ctx.save();
  helpers.assertEqual(t, ctx.shadowOffsetX, old, "ctx.shadowOffsetX", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.shadowOffsetY',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.shadowOffsetY;
  ctx.save();
  ctx.shadowOffsetY = 5;
  ctx.restore();
  helpers.assertEqual(t, ctx.shadowOffsetY, old, "ctx.shadowOffsetY", "old");
  
  // Also test that save() doesn't modify the values
  ctx.shadowOffsetY = 5;
  old = ctx.shadowOffsetY;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against 5
  ctx.save();
  helpers.assertEqual(t, ctx.shadowOffsetY, old, "ctx.shadowOffsetY", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.stack',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.lineWidth = 1;
  ctx.save();
  ctx.lineWidth = 2;
  ctx.save();
  ctx.lineWidth = 3;
  helpers.assertEqual(t, ctx.lineWidth, 3, "ctx.lineWidth", "3");
  ctx.restore();
  helpers.assertEqual(t, ctx.lineWidth, 2, "ctx.lineWidth", "2");
  ctx.restore();
  helpers.assertEqual(t, ctx.lineWidth, 1, "ctx.lineWidth", "1");

  t.end()
});


test('2d.state.saverestore.stackdepth',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  var limit = 512;
  for (var i = 1; i < limit; ++i)
  {
      ctx.save();
      ctx.lineWidth = i;
  }
  for (var i = limit-1; i > 0; --i)
  {
      helpers.assertEqual(t, ctx.lineWidth, i, "ctx.lineWidth", "i");
      ctx.restore();
  }

  t.end()
});


test('2d.state.saverestore.strokeStyle',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.strokeStyle;
  ctx.save();
  ctx.strokeStyle = "#ff0000";
  ctx.restore();
  helpers.assertEqual(t, ctx.strokeStyle, old, "ctx.strokeStyle", "old");
  
  // Also test that save() doesn't modify the values
  ctx.strokeStyle = "#ff0000";
  old = ctx.strokeStyle;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against "#ff0000"
  ctx.save();
  helpers.assertEqual(t, ctx.strokeStyle, old, "ctx.strokeStyle", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.textAlign',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.textAlign;
  ctx.save();
  ctx.textAlign = "center";
  ctx.restore();
  helpers.assertEqual(t, ctx.textAlign, old, "ctx.textAlign", "old");
  
  // Also test that save() doesn't modify the values
  ctx.textAlign = "center";
  old = ctx.textAlign;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against "center"
  ctx.save();
  helpers.assertEqual(t, ctx.textAlign, old, "ctx.textAlign", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.textBaseline',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  // Test that restore() undoes any modifications
  var old = ctx.textBaseline;
  ctx.save();
  ctx.textBaseline = "bottom";
  ctx.restore();
  helpers.assertEqual(t, ctx.textBaseline, old, "ctx.textBaseline", "old");
  
  // Also test that save() doesn't modify the values
  ctx.textBaseline = "bottom";
  old = ctx.textBaseline;
      // we're not interested in failures caused by get(set(x)) != x (e.g.
      // from rounding), so compare against 'old' instead of against "bottom"
  ctx.save();
  helpers.assertEqual(t, ctx.textBaseline, old, "ctx.textBaseline", "old");
  ctx.restore();

  t.end()
});


test('2d.state.saverestore.transformation','green-100x50.png', function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0';
  ctx.fillRect(0, 0, 100, 50);
  ctx.save();
  ctx.translate(200, 0);
  ctx.restore();
  ctx.fillStyle = '#f00';
  ctx.fillRect(-200, 0, 100, 50);
  helpers.assertPixel(t, canvas, 50,25, 0,255,0,255, "50,25", "0,255,0,255");

  t.end()
});


test('2d.state.saverestore.underflow',null, function(t) {
  var window = helpers.createWindow();
  var document = window.document;

  var canvas = helpers.createCanvas(document, 100, 50);
  var ctx = canvas.getContext('2d')

  for (var i = 0; i < 16; ++i)
      ctx.restore();
  ctx.lineWidth = 0.5;
  ctx.restore();
  helpers.assertEqual(t, ctx.lineWidth, 0.5, "ctx.lineWidth", "0.5");

  t.end()
});

