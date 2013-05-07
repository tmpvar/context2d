var Context2D = require('bindings')('context2d').Context2D;
var csscolor = require('./lib/color');
var cssfont = require('cssfontparser');
var util = require('util');
var TAU = Math.PI*2;
//
var valid = function(a) {
  return typeof a !== 'undefined' && !isNaN(a) && isFinite(a);
};

// TODO: prefer to lookup ownerDocument and find the DOMException
//       class if in a dom environment.  Otherwise, emit events,
//       like a sane node program

var DOMException = module.exports.DOMException = function(m, c) {
  var ret = new Error(m)
  ret.code = c;
  return ret;
};

DOMException.INDEX_SIZE_ERR                 = 1;
DOMException.DOMSTRING_SIZE_ERR             = 2;
DOMException.HIERARCHY_REQUEST_ERR          = 3;
DOMException.WRONG_DOCUMENT_ERR             = 4;
DOMException.INVALID_CHARACTER_ERR          = 5;
DOMException.NO_DATA_ALLOWED_ERR            = 6;
DOMException.NO_MODIFICATION_ALLOWED_ERR    = 7;
DOMException.NOT_FOUND_ERR                  = 8;
DOMException.NOT_SUPPORTED_ERR              = 9;
DOMException.INUSE_ATTRIBUTE_ERR            = 10;
DOMException.INVALID_STATE_ERR              = 11;
DOMException.SYNTAX_ERR                     = 12;
DOMException.INVALID_MODIFICATION_ERR       = 13;
DOMException.NAMESPACE_ERR                  = 14;
DOMException.INVALID_ACCESS_ERR             = 15;


var requireArgs = function(args, required) {
  if (args.length < required) {
    throw new DOMException('invalid number of args', DOMException.NOT_SUPPORTED_ERR);
  }
}


function CanvasGradient(type, opts) {

  Object.keys(opts).forEach(function(key) {
    if (isNaN(opts[key]) || !isFinite(opts[key])) {
      throw new DOMException('invalid gradient params', DOMException.NOT_SUPPORTED_ERR);
    }
  })

  if (type === 'radial' && (opts.r0 < 0 || opts.r1 < 0)) {
    throw new DOMException(
      'radial gradient radius must be > 0',
      DOMException.INDEX_SIZE_ERR
    );
  }

  var stops = [];
  var stopCache = {};
  var idx = 0;
  var last = -1;
  var count = 0;
  this.addColorStop = function(offset, color) {
    requireArgs(arguments, 2);

    if (isNaN(offset) || !isFinite(offset) || offset < 0 || offset > 1) {
      throw new DOMException(
        'color stop offset out of range',
        DOMException.INDEX_SIZE_ERR
      );
    }

    var color = csscolor(color);
    if (!color) {
      throw new DOMException('color stop color', DOMException.SYNTAX_ERR);
    }

    var key = offset + '-key';
    if (typeof stopCache[key] === 'undefined') {
      stopCache[key] = 0;
    } else {
      stopCache[key]+=.0000001;
    }

    color.array[3] *= 255;

    offset+=stopCache[key];

    stops.push({
      offset : offset,
      color : color.array,
      idx: idx++
    });

  };

  this.apply = function(ctx) {

    if (stops.length < 2) { return; }

    stops.sort(function(a, b) {
      return (a.idx < b.idx && a.offset <= b.offset) ? -1 : 1;
    });

    if (type === 'linear') {

      if (opts.x0 === opts.x1 && opts.y0 === opts.y1) {
        return;
      }

      ctx.setLinearGradientShader(
        opts.x0,
        opts.y0,
        opts.x1,
        opts.y1,
        stops
      );

      return true;
    } else if (type === 'radial') {

      if (opts.x0 === opts.x1 &&
          opts.y0 === opts.y1 &&
          opts.r0 === opts.r1)
      {
        return;
      }

      ctx.setRadialGradientShader(
        opts.x0,
        opts.y0,
        opts.r0,
        opts.x1,
        opts.y1,
        opts.r1,
        stops
      );

      return true;
    }
  };

  this.toString = function() {
    return JSON.stringify(opts) + ' - ' + stops.map(function(stop) {
      return stop.offset +  '-> [' + stop.color + '] ';
    }).join(',');
  }

  Object.defineProperty(this, 'type', {
    get : function() { return 'gradient' }
  });
}

module.exports.CanvasGradient = CanvasGradient;

function ImageData(buffer, w, h) {
  if (!buffer || !w || !h) {
    throw new Error('invalid argument count');
  }

  if (!(buffer instanceof CanvasPixelArray)) {
    buffer = new CanvasPixelArray(buffer);
  }

  Object.defineProperty(this, 'width', {
    get: function() { return w; }
  });

  Object.defineProperty(this, 'height', {
    get: function() { return h; }
  });

  Object.defineProperty(this, 'data', {
    get : function() { return buffer }
  });
}

module.exports.ImageData = ImageData;

function CanvasPixelArray() {
  Buffer.apply(this, arguments);
}

util.inherits(CanvasPixelArray, Buffer);


module.exports.CanvasPixelArray = CanvasPixelArray;

function CanvasPattern(id, x, y) {
  this.imageData = new ImageData(id.data, id.width, id.height);
  this.x = x;
  this.y = y;
}

CanvasPattern.prototype.type = 'pattern';

module.exports.CanvasPattern = CanvasPattern;


function ContextState() {

}

ContextState.prototype = {
  fillStyle: '#000000',
  strokeStyle: '#000000',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: 'rgba(0, 0, 0, 0.0)',
  shadowBlur: 0,
  textAlign: 'start',
  textBaseline: 'alphabetic',
  globalCompositeOperation: 'source-over',
  globalAlpha: 1,
  font: '10px sans-serif',
  lineWidth : 1,
  lineCap : 'butt',
  lineJoin : 'miter',
  miterLimit : 10,
  apply: function(ctx) {
    var that = this;
    Object.keys(this).forEach(function(key) {
      if (typeof that[key] !== 'function') {
        ctx[key] = that[key];
      }
    });
  },
  clone : function() {
    var ret = new ContextState();
    var that = this;
    Object.keys(this).forEach(function(key) {
      if (typeof that[key] !== 'function' && that[key] !== ret[key]) {
        ret[key] = that[key];
      }
    });

    return ret;
  }
};

module.exports.createContext = function(canvas, w, h) {

  var state = new ContextState();
  var stateStack = [];

  canvas = canvas || {
    width : w || 300,
    height: h || 150
  };

  canvas.dir = canvas.dir || 'ltr';

  var ret = new Context2D(canvas.width, canvas.height);

  var override = function(orig, fn) {
    ret[orig] = fn.bind(ret, ret[orig].bind(ret))
  };

  if (typeof canvas.width !== 'undefined' &&
      typeof canvas.width !== 'undefined' &&
      typeof canvas.addEventListener === 'function'
    )
  {
    canvas.addEventListener('resize', function(ev) {
      ret.width = canvas.width;
      ret.height = canvas.height;
    });
  }

  Object.defineProperty(ret, 'width', {
    get : function() { return canvas.width },
    set : function(w) {
      if (canvas.width !== w) {
        canvas.width = w;
        ret.resize(canvas.width, canvas.height);
      }
    }
  });

  Object.defineProperty(ret, 'height', {
    get : function() { return canvas.height },
    set : function(h) {
      if (canvas.h !== h) {
        canvas.height = h;
        ret.resize(canvas.width, canvas.height);
      }
    }
  });


  Object.defineProperty(ret, 'canvas', {
    value : canvas
  });

  Object.defineProperty(ret, 'globalAlpha', {
    get : function() { return state.globalAlpha; },
    set : function(v) {
      if (!isNaN(v) && isFinite(v) && v >= 0 && v <= 1) {
        state.globalAlpha = v;
        ret.setGlobalAlpha(v);
      }
    }
  });

  Object.defineProperty(ret, 'globalCompositeOperation', {
    get : function() {
      return state.globalCompositeOperation;
    },
    set : function(str) {
      var mapping = {
        'source-atop' : 9,
        'source-in' : 5,
        'source-out' : 7,
        'source-over' : 3,
        'destination-atop' : 10,
        'destination-in' : 6,
        'destination-out' : 8,
        'destination-over' : 4,
        'lighter' : 12,
        'copy' : 1,
        'xor' : 11
      };

      if (mapping[str]) {
        state.globalCompositeOperation = str;
        ret.setGlobalCompositeOperation(mapping[str]);
      }
    }
  });




  Object.defineProperty(ret, 'fillStyle', {
    get : function() {
      return state.fillStyle;
    },
    set : function(c) {
      if (!c) {
        return;
      }

      if (c === 'currentColor') {
        if (canvas.getAttribute) {
          var style = canvas.getAttribute('style') || '';
          var currentMatch = style.match(/color: ?([^\);]+)/);
          if (currentMatch && currentMatch.length > 1) {
            c = currentMatch[1];
          } else {
            c = '#000000';
          }
        } else {
          c = '#000000';
        }
      }

      if (c.type) {
        if (c.type === 'pattern') {
          var id = c.imageData;
          if (id) {
            ret.setFillStylePattern(new Buffer(id.data), id.width, id.height, !!c.x, !!c.y);
            state.fillStyle = c;
          } else {
            ret.fillStyle = 'rgba(0, 0, 0, 0.0)';
          }
        } else if (c.type === 'gradient') {
          state.fillStyle = c;
        }
        return;
      } else {
        var color = csscolor(c);
        if (color) {
          state.fillStyle = color.string;
          color = color.array;

          color[3] = color[3] * 255;
          ret.setFillStyle.apply(ret, color);
        }
      }
    }
  });

  Object.defineProperty(ret, 'strokeStyle', {
    get : function() {
      return state.strokeStyle;
    },
    set : function(c) {
      if (!c) {
        return;
      }

      if (c === 'currentColor') {
        if (canvas.getAttribute) {
          var style = canvas.getAttribute('style') || '';
          var currentMatch = style.match(/color: ?([^\);]+)/);
          if (currentMatch && currentMatch.length > 1) {
            c = currentMatch[1];
          } else {
            c = '#000000';
          }
        } else {
          c = '#000000';
        }
      }

      var color = csscolor(c);
      if (color) {
        state.strokeStyle = color.string;
        color = color.array;

        color[3] = color[3] * 255;
        ret.setStrokeStyle.apply(ret, color);
      }
    }
  });

  ret.drawImage = function(i) {
    requireArgs(arguments, 3);

    var args = [];
    Array.prototype.push.apply(args, arguments);
    args.shift();

    if (!i) {
      throw new DOMException('invalid image', DOMException.TYPE_MISMATCH_ERR);
    } else if (i.tagName) {

      var allowedTags = { 'img': 1 , 'video': 1, 'canvas': 1 };

      if (!allowedTags[i.tagName.toLowerCase()]) {
        throw new DOMException('invalid image', DOMException.TYPE_MISMATCH_ERR);
      }
    }



    if (typeof i.complete !== 'undefined' && !i.complete) {
      // TODO: what needs to happen here?
      return;
    }

    var needsSwizzle = true;

    if (i.getContext && (!i.width || !i.height)) {
      throw new DOMException('invalid canvas dimensions', DOMException.INVALID_STATE_ERR);
    }

    // Handle Canvas elements
    if (i.ctx) {
      i = i.ctx;
      needsSwizzle = false;
    }

    if (!i.imageData) {
      needsSwizzle = false;
      var buffer = new Buffer(i.width * i.height * 4);
      buffer.fill(0);
      i.imageData = {
        width : i.width,
        height: i.height,
        data:  buffer
      }
    }

    var id = i.imageData;

    if (!id.width || !id.height) {
      throw new DOMException('invalid image dimensions', DOMException.INVALID_STATE_ERR);
    }

    if (needsSwizzle && !i.swizzled) {
      var pre = function(component, alpha) {
        var prod = (component * alpha) + 128;
        return (prod + (prod >> 8)) >> 8;
      }

      var length = id.data.length;
      for (var i = 0; i<length; i+=4) {

        var a = id.data[i+3];
            r = pre(id.data[i], a),
            g = pre(id.data[i+1], a),
            b = pre(id.data[i+2], a);

        id.data[i+3] = a;
        id.data[i] = r;
        id.data[i+1] = g;
        id.data[i+2] = b;

      }
      i.swizzled = true;
    }

    var sx = 0,
        sy = 0,
        sw = id.width,
        sh = id.height,
        dx = 0,
        dy = 0,
        dw = id.width,
        dh = id.height;

    if (args.length === 2) {
      dx = args[0];
      dy = args[1];
    } else if (args.length === 4) {
      dx = args[0];
      dy = args[1];
      dw = args[2];
      dh = args[3];
    } else if (args.length === 8) {
      sx = args[0];
      sy = args[1];
      sw = args[2];
      sh = args[3];
      dx = args[4];
      dy = args[5];
      dw = args[6];
      dh = args[7];
    }

    if (!dw || ! dh) {
      return;
    }

    // if ((dx < 0 || dy < 0)) {
    //   if (!ret.shadowOffsetX &&
    //       !ret.shadowOffsetY &&
    //       !ret.shadowBlur)
    //   {
    //     return;
    //   }
    // }

    if (!valid(dw) ||
        !valid(dh) ||
        !valid(sw) ||
        !valid(sh) ||
        !valid(sx) ||
        !valid(sy) ||
        !valid(dx) ||
        !valid(dy)
    ){
      return;
    }

    if (dw < 0) {
      dx += dw;
      dw = Math.abs(dw);
    }

    if (dh < 0) {
      dy += dh;
      dh = Math.abs(dh);
    }

    if (sx < 0 ||
        sy < 0 ||
        sy > id.height ||
        sx > id.width ||
        sx + sw > id.width ||
        sy + sh > id.height
    ) {
      throw new DOMException('invalid source dimensions', DOMException.INDEX_SIZE_ERR);
    }

    if (sw < 0) {
      sx += sw;
      sw = Math.abs(sw);
    }

    if (sh < 0) {
      sy += sh;
      sh = Math.abs(sh);
    }

    var clamp = function(a, alt) {
      if (a>alt) {
        return alt;
      }
      return a;
    }

    if (sx < 0 || sy < 0) {
      throw new DOMException('invalid image dimensions', DOMException.INDEX_SIZE_ERR);
    }

    sy = clamp(sy, id.height);
    sx = clamp(sx, id.width);
    dy = clamp(dy, id.height);
    dx = clamp(dx, id.width);


    if (!sh || !sw || !dh || !dw) {
      throw new DOMException('invalid image dimensions (' + i.src + ')', DOMException.INDEX_SIZE_ERR);
    }

    ret.drawImageBuffer(id.data, sx, sy, sw, sh, dx, dy, dw, dh, id.width, id.height);
  };


  Object.defineProperty(ret, 'imageData', {
    get : function() {
      return {
        width : ret.width,
        height: ret.height,
        get data() {
          return ret.toBuffer();
        }
      }
    }
  });

  Object.defineProperty(ret, 'shadowOffsetX', {
    get : function() { return state.shadowOffsetX; },
    set : function(val) {
      if (!valid(val)) {
        return;
      }

      state.shadowOffsetX = val;

      ret.setShadowOffsetX(val);
    }
  });

  Object.defineProperty(ret, 'shadowOffsetY', {
    get : function() { return state.shadowOffsetY; },
    set : function(val) {
      if (!valid(val)) {
        return;
      }

      state.shadowOffsetY = val;

      ret.setShadowOffsetY(val);
    }
  });

  Object.defineProperty(ret, 'shadowBlur', {
    get : function() { return state.shadowBlur; },
    set : function(val) {
      if (val < 0 || !valid(val)) {
        return;
      }

      state.shadowBlur = val;

      ret.setShadowBlur(val);
    }
  });

  Object.defineProperty(ret, 'shadowColor', {
    get : function() { return state.shadowColor; },
    set : function(c) {
      var color = csscolor(c);
      if (color) {
        state.shadowColor = color.string;
        color = color.array;

        color[3] = color[3] * 255;
        ret.setShadowColor(
          color[0],
          color[1],
          color[2],
          color[3]
        );
      }
    }
  });

  var lineJoinMap = {
    miter : 0,
    round : 1,
    bevel : 2
  };

  Object.defineProperty(ret, 'lineJoin', {
    get : function() {
      return state.lineJoin;
    },
    set : function(val) {
      if (typeof lineJoinMap[val] !== 'undefined') {
        state.lineJoin = val;
        ret.setLineJoin(lineJoinMap[val]);
      }
    }
  });

  var lineCapMap = {
    butt : 0,
    round : 1,
    square : 2
  };

  Object.defineProperty(ret, 'lineCap', {
    get : function() {
      return state.lineCap;
    },
    set : function(val) {
      if (typeof lineCapMap[val] !== 'undefined') {
        state.lineCap = val;
        ret.setLineCap(lineCapMap[val]);
      }
    }
  });


  Object.defineProperty(ret, 'miterLimit', {
    get: function() { return state.miterLimit; },
    set: function(val) {
      if (valid(val) && val > 0) {
        state.miterLimit = val;
        ret.setMiterLimit(val);
      }
    }
  });

//   void setLineDash(sequence<double> segments); // default empty
//   sequence<double> getLineDash();
//            attribute double lineDashOffset;


  var fontCache = {};
  override('addFont', function(addFont, name, buffer) {

    var fontId = addFont(buffer);
    fontCache[name] = fontId;
    return fontId;
  });



  Object.defineProperty(ret, 'font', {
    get : function() {
      return state.font;
    },
    set: function (val) {
      if (!val || val.indexOf('inherit') > -1) {
        return
      }

      var f = cssfont(val, state.font);
      if (f && f.family !== 'default' && f.family !== 'initial') {
        state.font = f.toString();

        var family = f.family.split(', ')[0];

        if (fontCache[family]) {
          family = fontCache[family];
        }

        ret.setFont(
          family,
          false, false, f.size);
      }
    }
  });


  var textAlignMap = {
    start : 0,
    end : 2,
    left : 0,
    center : 1,
    right : 2
  };

  Object.defineProperty(ret, 'textAlign', {
    get : function() { return state.textAlign; },
    set : function(val) {
      if (!val || typeof textAlignMap[val] === 'undefined') {
        return;
      }

      state.textAlign = val;
      var intVal = textAlignMap[val] || 0;

      if (canvas.dir === 'rtl') {
        intVal += 2;
        if (intVal > 2) { intVal = 0;}
      }

      ret.setTextAlign(intVal);
    }
  });


  var textBaselineMap = {
    top : 0,
    hanging : 1,
    middle : 2,
    alphabetic: 3,
    ideographic : 4,
    bottom : 5
  };

  Object.defineProperty(ret, 'textBaseline', {
    get : function() { return state.textBaseline; },
    set : function(val) {
      if (!val || typeof textBaselineMap[val] === 'undefined') {
        return;
      }

      state.textBaseline = val;
      ret.setTextBaseline(val);
    }
  });


  var patternModeMap = {
    'repeat' : 1,
    'repeat-x' : 1,
    'repeat-y' : 1,
    'no-repeat' : 1
  };

  // The real work here is done in .setFillStyle and friends
  ret.createPattern = function(obj, mode) {
    requireArgs(arguments, 2);

    if (!obj || typeof obj === 'string' || obj.split) {
      throw new DOMException('invalid pattern', DOMException.TYPE_MISMATCH_ERR);
    }

    if (typeof obj.complete !== 'undefined' && !obj.complete) {
      return null;
    }

    if (!obj.width || !obj.height) {
      throw new DOMException('invalid object size', DOMException.INVALID_STATE_ERR);
    }

    if (mode === undefined) {
      throw new DOMException('invalid pattern mode', DOMException.SYNTAX_ERR);
    }

    if (mode && typeof patternModeMap[mode] === 'undefined') {
      throw new DOMException('invalid pattern mode', DOMException.SYNTAX_ERR);
    }

    if (obj.ctx) {
      obj = obj.ctx.imageData;
    } else if (obj.src) {
      obj = obj.imageData;
    } else {
      var buf = new Buffer(obj.width*obj.height*4);
      buf.fill(0);
      obj = new ImageData(buf, obj.width, obj.height);
    }

    return new CanvasPattern(
      obj,
      mode === 'repeat' || mode === 'repeat-x',
      mode === 'repeat' || mode === 'repeat-y'
    );
  };

  ret.createLinearGradient = function(x0, y0, x1, y1) {
    requireArgs(arguments, 4);

    return new CanvasGradient('linear', {
      x0 : x0,
      y0 : y0,
      x1 : x1,
      y1 : y1
    });
  };

  ret.createRadialGradient = function(x0, y0, r0, x1, y1, r1) {
    return new CanvasGradient('radial', {
      x0 : x0,
      y0 : y0,
      r0 : r0,
      x1 : x1,
      y1 : y1,
      r1 : r1
    });
  };

  ret.setTransform = function(a,b,c,d,e,f) {
    requireArgs(arguments, 6);

    if (!valid(a) ||
        !valid(b) ||
        !valid(c) ||
        !valid(d) ||
        !valid(e) ||
        !valid(f)
    ) {
      return;
    }

    this.resetMatrix();
    this.transform(a,b,c,d,e,f);

  };

  override('fillRect', function(fillRect, x, y, w, h) {
    requireArgs(arguments, 5);

    if (state.fillStyle) {
      var fs = state.fillStyle;
      if (fs.type) {
        if (fs.type === 'gradient') {
          if (!state.fillStyle.apply(ret)) {
            return;
          }

        } else if (fs.type === 'pattern') {

          // no repeat gets clamped to 0 as per
          // - 2d.pattern.paint.norepeat.coord3
          // - 2d.pattern.paint.repeatx.coord1
          if (((fs.y && !fs.x) || (!fs.y && !fs.x)) && x < 0) {
            w += x;
            x = 0;
          }

          if (((fs.x && !fs.y) || (!fs.y && !fs.x)) && y < 0) {
            h += y;
            y = 0;
          }

          if (!fs.y && fs.x && h > fs.imageData.height) {
            h = fs.imageData.height;
          }

          if (!fs.x && fs.y && w > fs.imageData.width) {
            w = fs.imageData.width;
          }
        }
      }
    }

    fillRect(x, y, w, h);
  });

  override('clearRect', function(clearRect, x, y, w, h) {
    requireArgs(arguments, 5);

    if (!valid(x) || !valid(y) || !valid(w) || !valid(h)) {
      return;
    }

    if (!w && !h) {
      return;
    }

    clearRect(x, y, w, h);
  });

  override('strokeRect', function(strokeRect, x, y, w, h) {
    requireArgs(arguments, 5);

    if (!valid(x) || !valid(y) || !valid(w) || !valid(h)) {
      return;
    }


    if (!w && !h) {
      return;
    }

    strokeRect(x, y, w, h);
  });

  override('scale', function(scale, x, y) {
    requireArgs(arguments, 3);

    if (!valid(x) || !valid(y)) {
      return;
    }
    scale(x, y);
  });

  override('translate', function(translate, x, y) {
    requireArgs(arguments, 3);

    if (!valid(x) || !valid(y)) {
      return;
    }
    translate(x, y);
  });

  override('transform', function(transform, a, b, c, d, e, f) {
    requireArgs(arguments, 7);

    if (!valid(a) ||
        !valid(b) ||
        !valid(c) ||
        !valid(d) ||
        !valid(e) ||
        !valid(f)
    ) {
      return;
    }

    transform(a, b, c, d, e, f);
  });

  override('rotate', function(rotate, rads) {
    requireArgs(arguments, 2);

    if (!valid(rads)) {
      return;
    }
    rotate(rads);
  });

  var validateWH = function(w, h) {
    if (!valid(w) || !valid(h)) {
      throw new DOMException('invalid dimensions', DOMException.NOT_SUPPORTED_ERR);
    }

    if (!w || !h) {
      throw new DOMException('invalid dimensions', DOMException.INDEX_SIZE_ERR);
    }
  }

  override('getImageData', function(getImageData, sx, sy, sw, sh) {
    if (!valid(sx) || !valid(sy)) {
      throw new DOMException('invalid coords', DOMException.NOT_SUPPORTED_ERR);
    }

    validateWH(sw, sh);

    if (sw + sx < 0 ||
        sh + sy < 0 ||
        sx + sw > ret.width ||
        sh + sy > ret.height)
    {
      sw = Math.abs(sw);
      sh = Math.abs(sh);

      var buf = new Buffer(sw * sh * 4);
      buf.fill(0);
      return new ImageData(buf, sw, sh);
    }


    if (sw < 0) {
      sx += sw;
      sw = Math.abs(sw);
    }

    if (sh < 0) {
      sy += sh;
      sh = Math.abs(sh);
    }


    sx = Math.round(Math.abs(sx));
    sy = Math.round(Math.abs(sy));
    sw = Math.round(sw) || 1;
    sh = Math.round(sh) || 1;

    var obj = getImageData(sx, sy, sw, sh);
    return new ImageData(obj.data, obj.width, obj.height);
  });

  override('putImageData', function(putImageData, id, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
    if (!valid(dx) ||
        !valid(dy) ||
        (typeof dirtyX !== 'undefined' && !valid(dirtyX)) ||
        (typeof dirtyY !== 'undefined' && !valid(dirtyY)) ||
        (typeof dirtyWidth !== 'undefined' && !valid(dirtyWidth)) ||
        (typeof dirtyHeight !== 'undefined' && !valid(dirtyHeight)))
    {
      throw new DOMException('invalid coords', DOMException.NOT_SUPPORTED_ERR);
    }

    if (!id) {
      throw new DOMException('invalid datatype', DOMException.TYPE_MISMATCH_ERR);
    }

    if (!(id instanceof ImageData)) {
      throw new DOMException('invalid datatype', DOMException.TYPE_MISMATCH_ERR);
    }

    var width = dirtyWidth;
    var height = dirtyHeight;
    dirtyX = dirtyX || 0;
    dirtyY = dirtyY || 0;

    if (typeof dirtyWidth === 'undefined') {
      width = id.width;
    }

    if (typeof dirtyHeight === 'undefined') {
      height = id.height;
    }

    if (width < 0) {
      dirtyX += width;
      width = Math.abs(width);
    }

    if (height < 0) {
      dirtyY += height;
      height = Math.abs(height);
    }

    if (width + dx > ret.width) {
      width = ret.width - (dx + width)
    }

    if (height + dy > ret.height) {
      height = ret.height - (dy + height)
    }

    if (width <= 0 || height <= 0 || dx + dirtyX < 0 || dirtyX < 0 || dy + dirtyY < 0  || dirtyY < 0) {
      return;
    }

    putImageData(new Buffer(id.data), dx, dy, dirtyX, dirtyY, width, height, id.width);
  })

  ret.createImageData = function(obj, h) {
    if (typeof obj === 'undefined' || obj === null) {
      throw new DOMException('invalid object', DOMException.NOT_SUPPORTED_ERR);
    }


    var w;
    if (typeof h !== 'undefined') {
      w = obj;
    } else {
      w = obj.width;
      h = obj.height;
    }

    validateWH(w, h)

    w = Math.round(Math.abs(w)) || 1;
    h = Math.round(Math.abs(h)) || 1;

    var buf = new CanvasPixelArray(w * h * 4);
    buf.fill(0);
    return new ImageData(buf, w, h);
  };


  Object.defineProperty(ret, 'lineWidth', {
    get : function() {
      return state.lineWidth;
    },
    set : function(width) {
      width = Number(width);

      if (width < 0 || !width || !valid(width)) {
        return;
      }

      state.lineWidth = width;
      ret.setLineWidth(width);
    }
  });

  override('isPointInPath', function(isPointInPath, x, y) {
    requireArgs(arguments, 3);

    return isPointInPath(x, y);
  });

  var nonspaceRemoval = /[\x00-\x1f]+[\x00-\x1f ]+[\x00-\x1f]+/g;
  var collapseText = function(str) {
    str = str.replace(/  /g, ' ');
    return str.replace(nonspaceRemoval, '').trim();
  };

  override('fillText', function(fillText, str, x, y, maxWidth) {
    requireArgs(arguments, 4);


    var bounds = ret.measureText(str);
    str = bounds.collapsedString;
    bounds.height -= y;

    var emsquare = cssfont(state.font).size;
    var padding = (bounds.height-emsquare);

    switch (state.textBaseline) {
      case 'bottom':
        y -= (bounds.height-emsquare)/2;
      break;

      case 'ideographic':
        y += padding/8;
      break;

      case 'middle':
        y += emsquare/4;
      break;

      case 'top':
        y += emsquare * .75;
      break;

      case 'hanging':
        y += ((bounds.height-emsquare)/2) - padding/8;
      break;
    }

    fillText(str, x, y, maxWidth);
  });

  override('strokeText', function(strokeText, str, x, y) {
    requireArgs(arguments, 4);

    strokeText(str, x, y);
  });


  override('arc', function(arc, x, y, radius, startAngle, endAngle, ccw) {
    requireArgs(arguments, 7);

    if (!valid(x) ||
        !valid(y) ||
        !valid(radius) ||
        !valid(startAngle) ||
        !valid(endAngle) ||
        !valid(ccw))
    {
      return;
    }

    var diff = TAU-Math.abs(startAngle - endAngle);

    if (ccw && diff > 0 && diff < 0.0001) {
      return;
    }

    if (radius < 0) {
      throw new DOMException('radius must be > 0', DOMException.INDEX_SIZE_ERR);
    }

    arc(x, y, radius, startAngle, endAngle, ccw);
  })

  override('arcTo', function(arcTo, x1, y1, x2, y2, radius) {
    requireArgs(arguments, 6);

    if (!valid(x1) ||
        !valid(y1) ||
        !valid(x2) ||
        !valid(y2) ||
        !valid(radius))
    {
      return;
    }

    if (radius < 0) {
      throw new DOMException('radius must be > 0', DOMException.INDEX_SIZE_ERR);
    }

    if (x1 === x2 && y1 === y2 || radius === 0) {
      ret.lineTo(x1, y1);
    } else {
      arcTo(x1, y1, x2, y2, radius);
    }
  })

  override('lineTo', function(lineTo, x, y) {
    requireArgs(arguments, 3);

    if (!valid(x) || !valid(y)) {
      return;
    }

    lineTo(x, y);
  });

  override('quadraticCurveTo', function(quadraticCurveTo, cpx, cpy, x, y) {
    requireArgs(arguments, 5);

    if (!valid(cpx) || !valid(cpy) || !valid(x) || !valid(y)) {
      return;
    }

    quadraticCurveTo(cpx, cpy, x, y);
  });

  override('bezierCurveTo', function(bezierCurveTo, x1, y1, x2, y2, x3, y3) {
    requireArgs(arguments, 7);

    if (!valid(x1) ||
        !valid(y1) ||
        !valid(x2) ||
        !valid(y2) ||
        !valid(x3) ||
        !valid(y3))
    {
      return;
    }

    bezierCurveTo(x1, y1, x2, y2, x3, y3);
  });

  override('moveTo', function(moveTo, x, y) {
    requireArgs(arguments, 3);

    if (!valid(x) || !valid(y)) {
      return;
    }

    moveTo(x, y);
  });

  override('rect', function(rect, x, y, w, h) {
    requireArgs(arguments, 5);

    if (!valid(x) || !valid(y) || !valid(w) || !valid(h)) {
      return;
    }
    rect(x, y, w, h);
  });

  override('measureText', function(measureText, str) {
    requireArgs(arguments, 2);

    if (!str) {
      return { width: 0, height: 0 };
    }

    str = collapseText(str);

    var ret = measureText(str);
    ret.collapsedString = str;

    return ret;
  });

  override('save', function(save) {
    stateStack.push(state);
    state = state.clone();
    save();
  });

  override('restore', function(restore) {
    var tmp = stateStack.pop(state);

    if (tmp) {
      state = tmp;
      state.apply(ret);
      restore();
    }
  });

  return ret;
};
