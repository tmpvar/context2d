var Context2D = require('bindings')('context2d').Context2D;
var parseCSSColor = require('csscolorparser').parseCSSColor;

module.exports.createContext = function(canvas, w, h) {
  var w = w || 300;
  var h = h || 150;
  var ret = new Context2D(w, h);

  // TODO: track changes here
  ret.width = w;
  ret.height = h;

  Object.defineProperty(ret, 'canvas', {
    value : canvas
  });

  Object.defineProperty(ret, 'globalAlpha', {
    get : ret.getGlobalAlpha.bind(ret),
    set : ret.setGlobalAlpha.bind(ret)
  });

  Object.defineProperty(ret, 'globalCompositeOperation', {
    get : ret.getGlobalAlpha.bind(ret),
    set : function(str) {
      var mapping = {
        'source-atop' : 9,
        'source-in' : 5,
        'source-out' : 7,
        'source-over' : 3,
        'destination-atop' : 10,
        'destination-in' : 5,
        'destination-out' : 8,
        'destination-over' : 4,
        'lighter' : 17,
        'copy' : 0,
        'xor' : 11
      };

      ret.setGlobalCompositeOperation(mapping[str] || 3);
    }
  });

  var fill = 'black';
  Object.defineProperty(ret, 'fillStyle', {
    get : function() {
      return fill;
    },
    set : function(c) {
      if (c.type && c.type === 'pattern') {
        //var id = c.obj.imageData
        //ret.setFillStylePattern(id.data, id.width, id.height, !!c.x, !!c.y);
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
      return;
    }

    // Handle Canvas elements
    if (i.ctx) {
      i = i.ctx;
    }

    if (!i.imageData) {
      throw new Error('invalid image');
      return;
    }

    var id = i.imageData;

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
