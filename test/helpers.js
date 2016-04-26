var context = require('../context2d');
var domino = require('domino');
var argv = require('optimist').argv;
var Image = module.exports.Image = require('htmlimage');
var fs = require('fs');
var CanvasFontBuffer = fs.readFileSync(__dirname + '/fonts/CanvasTest.ttf');


// In the tests, this is specified in a css style. I really
// Do not want to have to have a dom to run these so I've
// generated background-tiled.png and it gets drawn when
// the context is created.
var background = new Image();
background.src = __dirname + '/images/background-tiled.png';
background.listeners = 10;

var testQueue = [];
module.exports.test = function(module, name, image, fn) {
  var skip = {
    '2d.gradient.radial.outside3' : 'https://code.google.com/p/skia/issues/detail?id=517',
    '2d.drawImage.animated.gif' : 'https://github.com/tmpvar/HTMLImageElement/issues/1',
    '2d.pattern.animated.gif' : 'https://github.com/tmpvar/HTMLImageElement/issues/1',
    '2d.text.draw.fill.rtl' : '../deps/skia/src/core/SkUtils.cpp:143: failed assertion "(c & 0xC0) != 0x80"',
    '2d.path.isPointInPath.arc' : './../../c/skia.cc/src/core/SkPath.cpp:2774: failed assertion "0"',
    '2d.path.isPointInPath.bigarc' : './../../c/skia.cc/src/core/SkPath.cpp:2774: failed assertion "0"',
  };


  if (skip[name]) {
    console.warn('SKIPPED:', name, '(see: ' + skip[name], ')');
    return function(t) { t.done() } ;
  }


  module.exports[name] = function(t) {
    if (image) {
      t.image = new Image();
      t.image.onload = function() {
        t.readExpectedPixel = function(x, y) {
          var id = t.image.imageData;
          var pos = x + (y * id.width)
          var data = id.data;
          return [
            data[pos+3],
            data[pos],
            data[pos+1],
            data[pos+2],
          ];
        };

        try {
          fn(t);
        } catch (e) {
          t.done(e);
        }
      }

      t.image.on('error', function() {
        console.log('blah', arguments);
      });

      t.image.src = __dirname + '/images/' + image;

    } else {
      try {
        fn(t);
      } catch (e) {
        t.done(e);
      }
    }
  };
};

module.exports.createWindow = function() {
  var window = domino.createWindow('<p />');
  window.CanvasGradient = context.CanvasGradient;
  window.ImageData = context.ImageData;
  window.CanvasPixelArray = context.CanvasPixelArray;
  window.CanvasPattern = context.CanvasPattern;


  return window;
}

module.exports.createCanvas = function(t, doc, w, h) {
  w = w || 300;
  h = h || 150;

  var el = doc.createElement('canvas');
  var ctx;
  var resize = function() {

    var ev = doc.createEvent('HTMLEvents');
    ev.initEvent('resize', true, false, {
      target: el
    });
    el.dispatchEvent(ev);
  };

  Object.defineProperty(el, 'toDataURL', {
    value: function() {
      if (ctx) {
        return 'data:image/png;base64,' + ctx.toPngBuffer().toString('hex');
      }
    }
  });

  Object.defineProperty(el, 'width', {
    get: function() { return w; },
    set: function(width) {
      if (w !== width) {
        w = width;
        resize();
      }
    }
  });

  Object.defineProperty(el, 'height', {
    get: function() { return h; },
    set: function(height) {
      if (height != h) {
        h = height;
        resize();
      }
    }
  });

  Object.defineProperty(el, 'getContext', {
    value: function getContext() {
      ctx = el.ctx = context.createContext(el, w, h);

      el.ctx.debug = function() {
        module.exports.output(el.ctx);
        ctx.dumpState();
      }
      t.context.ctx = ctx;

      el.ctx.addFont('CanvasTest', CanvasFontBuffer);

  //    el.ctx.drawImage(background, 0, 0);
      return el.ctx;
    }
  })

  doc.body.appendChild(el);
  return el;
}

module.exports.DOMException = context.DOMException;

module.exports.Window = function() {

};


var getLastArgs = function(args, start) {
  var a = [];
  Array.prototype.push.apply(a, args);
  return a.slice(start);
};

module.exports.ok = function(t, val) {
  if (!val) {
    t.fail(getLastArgs(arguments,2).join(','));
  }
}

module.exports.wrapFunction = function(t, cb) {
  return function() {
    try {
      cb();
    } catch (e) {
      t.done(e);
    }
    t.done()
  }
};


module.exports.compareWithImage = function(t, ctx, message) {

  var contextData = ctx.toBuffer();
  var expectedData = t.image.imageData.data;

  var where = contextData.length;
  var miss = 0;

  for (var i=0; i<contextData.length; i+=4) {
    // Red mean fail.
    if (contextData[i]) {
      t.fail('red detected! @ ' + where);
    }
  }

  // compare solid components
  while(where--) {
    if (expectedData[where] === 255 && Math.abs(contextData[where] - expectedData[where]) > 5) {
      miss++;
    }
  }

  var percent = miss/contextData.length

  // sentinel for detecting > 1% difference of major components
  if (percent > .01) {
    t.fail('image are not equal..');
  }
}

module.exports.assertEqual = function(t, a, b) {
  t.equal(a, b, getLastArgs(arguments,3).join(','));
};

module.exports.assertNotEqual = function(t, a, b) {
  t.notEqual(a, b, getLastArgs(arguments,3).join(','));
};


module.exports.assertPixel = function(t, canvas, x,y, r,g,b,a, pos, color) {
  var c = canvas.ctx.getPixel(x, y);

  var message = 'Failed assertion: got pixel [' +
                [c.r, c.g, c.b, c.a].join(',') +
                '] at ('+x+','+y+'), expected ['+r+','+g+','+b+','+a+']';
  var ok = c && c.r === r && c.g === g && c.b === b && c.a === a;

  !ok && t.fail(message);
}

module.exports.assertPixelApprox = function(t, canvas, x,y, r,g,b,a, pos, color, tolerance) {
  var c = canvas.ctx.getPixel(x, y);

  var diff = Math.max(
    Math.abs(c.r-r),
    Math.abs(c.g-g),
    Math.abs(c.b-b),
    Math.abs(c.a-a)
  );

  // Add +1 for 2d.gradient.interpolate.colouralpha
  // which was off by 4 on the blue channel with tolerance of 3
  if (diff > (tolerance + 1)) {
    t.done('Failed assertion: got pixel [' +
            [c.r, c.g, c.b, c.a].join(',') + '] at ('+x+','+y+'), expected ['+
            r+','+g+','+b+','+a+'] +/- '+tolerance);
  }
};

module.exports.assertMatch = function(t, a, b, text_a, text_b) {
  if (!a.match(b)) {
    t.done('Failed assertion ' + text_a + ' matches ' + text_b +
        ' (got ' + a + ')');
  }
}


module.exports.output = function(ctx, name) {
  name = name || 'out.png';
  require('fs').writeFileSync(__dirname + '/' + name, ctx.toPngBuffer());
}
module.exports.outputRaw = function(ctx, name) {
  name = name || 'out.raw';
  require('fs').writeFileSync(__dirname + '/' + name, ctx.toBuffer());
}

module.exports.loadImages = function(t, array, fn) {
  var total = array.length;
  var images = {};
  array.forEach(function(o) {
    images[o.id] = new Image();
    images[o.id].onload = function() {
      total--;
      if (!total) {
        try {
          fn(images);
        } catch (e) {
          t.done(e);
        }
      }
    };

    images[o.id].on('error', function(e) {
      if (o.url.indexOf('broken') === -1) {
        t.done('IMAGE ERROR:' +  o.id + e);
      }
      t.done();
    });

    images[o.id].src = o.url;

  });


};
