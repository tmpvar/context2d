var Context2D = require('bindings')('context2d').Context2D;
var parseCSSColor = require('csscolorparser').parseCSSColor;


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


module.exports.createContext = function(canvas, w, h) {
  var w = w || 300;
  var h = h || 150;
  canvas.width = w;
  canvas.height = h;
  var ret = new Context2D(w, h);

  // TODO: track changes here
  ret.width = w;
  ret.height = h;

  Object.defineProperty(ret, 'canvas', {
    value : canvas
  });

  Object.defineProperty(ret, 'globalAlpha', {
    get : ret.getGlobalAlpha.bind(ret),
    set : function(v) {
      if (!isNaN(v) && isFinite(v) && v >= 0 && v <= 1) {
        ret.setGlobalAlpha(v);
      }
    }
  });


  var globalCompositeOperation = 'source-over';
  Object.defineProperty(ret, 'globalCompositeOperation', {
    get : function() {
      return globalCompositeOperation;
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
        globalCompositeOperation = str;
        ret.setGlobalCompositeOperation(mapping[str]);
      }
    }
  });

  var fill = 'black';
  Object.defineProperty(ret, 'fillStyle', {
    get : function() {
      return fill;
    },
    set : function(c) {
      if (c.type && c.type === 'pattern') {
        var id = c.obj.imageData
        ret.setFillStylePattern(id.data, id.width, id.height, !!c.x, !!c.y);
      } else {

        var color = parseCSSColor(c);
        if (c) {
          fill = c;
          color[3] = color[3] * 255;
          ret.setFillStyle.apply(ret, color);
        }
      }
    }
  });

  ret.drawImage = function(i) {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    args.shift();

    if (!i) {
      throw new DOMException('invalid image', DOMException.TYPE_MISMATCH_ERR);
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

    var valid = function(a) {
      return !isNaN(a) && isFinite(a);
    };

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
        sx+sw > id.width ||
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
      if (a < 0) {
        return 0;
      } else if (a>alt) {
        return alt;
      }
      return a;
    }

    if (sx < 0 || sy < 0) {
      throw new DOMException('invalid image dimensions', DOMException.INDEX_SIZE_ERR);
    }

    sy = clamp(sy, id.height);
    sx = clamp(sy, id.width);
    dy = clamp(dy, id.height);
    dx = clamp(dx, id.width);


    if (!sh || !sw || !dh || !dw) {
      throw new DOMException('invalid image dimensions', DOMException.INDEX_SIZE_ERR);
    }

    ret.drawImageBuffer(id.data, sx, sy, sw, sh, dx, dy, dw, dh, id.width, id.height);
  };


  Object.defineProperty(ret, 'imageData', {
    get : function() {
      return {
        width : ret.width,
        height: ret.height,
        data : ret.toBuffer()
      }
    }
  });

//            attribute double shadowOffsetX; // (default 0)
//            attribute double shadowOffsetY; // (default 0)
//            attribute double shadowBlur; // (default 0)
//            attribute DOMString shadowColor; // (default transparent black)
//            attribute double lineWidth; // (default 1)
//            attribute DOMString lineCap; // "butt", "round", "square" (default "butt")
//            attribute DOMString lineJoin; // "round", "bevel", "miter" (default "miter")
//            attribute double miterLimit; // (default 10)
//   void setLineDash(sequence<double> segments); // default empty
//   sequence<double> getLineDash();
//            attribute double lineDashOffset;
//            attribute DOMString font; // (default 10px sans-serif)
//            attribute DOMString textAlign; // "start", "end", "left", "right", "center" (default: "start")
//            attribute DOMString textBaseline; // "top", "hanging", "middle", "alphabetic", "ideographic", "bottom" (default: "alphabetic")


  // The real work here is done in .setFillStyle and friends
  ret.createPattern = function(obj, mode) {
    if (!obj) {
      return;
    }

    if (obj.ctx) {
      obj = obj.ctx;
    }

    return {
      type : 'pattern',
      obj : obj,
      x : mode === 'repeat' || mode === 'repeat-x',
      y : mode === 'repeat' || mode === 'repeat-y',
    };
  };


  ret.setTransform = function(a,b,c,d,e,f) {
    if (
      typeof a !== 'undefined' &&
      typeof b !== 'undefined' &&
      typeof c !== 'undefined' &&
      typeof d !== 'undefined' &&
      typeof e !== 'undefined' &&
      typeof f !== 'undefined'
    ) {
      this.resetMatrix();
      this.transform(a,b,c,d,e,f);
    }
  };

  return ret;
};
