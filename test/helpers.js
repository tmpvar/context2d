var context = require('../');
var domino = require('domino');
var test = require('tap').test;
var argv = require('optimist').argv;
var Image = module.exports.Image = require('htmlimage').HTMLImageElement;

var background = new Image();
background.onload = function() {
  console.log(background.imageData.data);
}
background.src = __dirname + '/images/background-tiled.png';

var testQueue = [];
module.exports.test = function(name, fn) {
  if (!argv.t || name.indexOf(argv.t) > -1) {
    if (!background.complete) {
      background.on('load', function() {
        test(name, fn);
      });
    } else {
      test(name, fn);
    }
  }
};

module.exports.createWindow = function() {
  return domino.createWindow('<p />');
}

module.exports.Canvas = function(w, h) {
  w = w || 300;
  h = h || 150;

  var ret = {
    getContext : function() {
      ret.ctx = context.createContext(ret, w, h);
      return ret.ctx;
    },
    width : w,
    height : h
  };

  return ret;
}

module.exports.createCanvas = function(doc, w, h) {

  w = w || 300;
  h = h || 150;

  var el = doc.createElement('canvas');
  el.width = w;
  el.height = h;

  el.getContext = function() {
    el.ctx = context.createContext(el, this.width, this.height);
    el.ctx.drawImage(background, 0, 0);
    return el.ctx;
  }

  doc.body.appendChild(el);
  return el;
}

module.exports.DOMException = context.DOMException;

module.exports.Window = function() {

};


var getLastArgs = function(args, start) {
  var a = [];
  while (a.length < args.length) {
    a = args[a.length];
  }

  return a.slice(start);
};

module.exports.ok = function(t, val) {
  if (!val) {
    t.fail(getLastArgs(1).join(','));
  }
}


module.exports.assertEqual = function(t, a, b) {
  t.equal(a, b, getLastArgs(3).join(','));
};

module.exports.assertNotEqual = function(t, a, b) {
  t.notEqual(a, b, getLastArgs(3).join(','));
};


module.exports.assertPixel = function(t, canvas, x,y, r,g,b,a, pos, color) {
  var c = canvas.ctx.getPixel(x, y);

  var message = 'Failed assertion: got pixel [' +
                JSON.stringify(c) +
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

  if (diff > tolerance) {
    t.fail('Failed assertion: got pixel [' +
            JSON.stringify(c) + '] at ('+x+','+y+'), expected ['+
            r+','+g+','+b+','+a+'] +/- '+tolerance);
  }
};

module.exports.assertMatch = function(t, a, b, text_a, text_b) {
  console.log(a, b, a.match(b));
  if (!a.match(b)) {
    t.fail('Failed assertion ' + text_a + ' matches ' + text_b +
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
        fn(images);
      }
    };

    images[o.id].on('error', function(e) {
      t.fail('IMAGE ERROR:' +  o.id + e);
      t.end();
    });

    images[o.id].src = o.url;

  });


};