var Context2D = require('bindings')('context2d').Context2D;
var parseCSSColor = require('csscolorparser').parseCSSColor;

module.exports.createContext = function(canvas) {
  var ret = new Context2D;

  Object.defineProperty(ret, 'canvas', {
    value : canvas
  });

  Object.defineProperty(ret, 'globalAlpha', {
    get : ret.getGlobalAlpha.bind(ret),
    set : ret.setGlobalAlpha.bind(ret)
  });

  var fill = 'black';
  Object.defineProperty(ret, 'fillStyle', {
    get : function() {
      return fill;
    },
    set : function(color) {
      console.log(c);
      var c = parseCSSColor(color);
      if (c) {
        fill = color;
        c[3] = c[3] * 255;
        ret.setFillStyle.apply(ret, c);
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
