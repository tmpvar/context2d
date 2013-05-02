var parseCSSColor = require('csscolorparser').parseCSSColor;

var magicSystemMapping = {};
[ 'ActiveBorder','ActiveCaption','AppWorkspace',
  'Background','ButtonFace','ButtonHighlight',
  'ButtonShadow','ButtonText','CaptionText',
  'GrayText','Highlight','HighlightText',
  'InactiveBorder','InactiveCaption',
  'InactiveCaptionText','InfoBackground','InfoText',
  'Menu','MenuText','Scrollbar','ThreeDDarkShadow',
  'ThreeDFace','ThreeDHighlight','ThreeDLightShadow',
  'ThreeDShadow','Window','WindowFrame','WindowText'
].forEach(function(key) {
  // w3c doesn't behave, so neither will we.
  // this is deprecated anyhow.
  magicSystemMapping[key] = '#FF00FF';
});


module.exports = function(c) {

  c = magicSystemMapping[c] || c;

  if (!c || !c.match) {
    return;
  }

  if (c[0] === '#' && !c.match(/#[\da-f]{3,6}/i)) {
    return;
  } else if (c[0] !== '#' && c.match(/rgb|rgba|hsl|hsla/)) {
    var type = c.substring(0,3);
    var components = c.indexOf('(');
    var fullType = c.substring(0, components);

    var parts = c.replace(/^[a-z]+\(|\)$/g, '').trim().split(/ *, */);
    var alpha = null;
    if (components === 4) {
      var alpha = parts.pop();
      if (alpha.match(/ |%/)) {
        return;
      }

      alpha = parseFloat(alpha);
      if (isNaN(alpha)) {
        return;
      }
    }

    var percent = c.match(/%/g);
    if (percent) {
      if (type === 'rgb' && percent.length !== 3) {
        return;
      } else if (type === 'hsl' && percent.length !== 2) {
        return;
      }
    }

    parts = parts.filter(function(part, i) {
      part = part.trim();
      if (part.indexOf(' ') > -1) {
        return false;
      }

      if (type === 'rgb' && (part.indexOf('.') > -1 || part.indexOf(' ') > -1)) {
        return false;
      }

      if (type === 'hsl') {
        if (isNaN(parseInt(part, 10))) {
          return false;
        }
      }

      return true;
    });

    if (alpha !== null) {
      parts.push(alpha);
    }

    if (parts.length < components) {
      return;
    }
  }

  var color = parseCSSColor(c);
  if (color) {

    if (color[3] === 1) {
      c = '#' + color.slice(0,3).map(function(a) { return a.toString(16)[0] + a.toString(16)[0]; }).join('');
    }

    if (c[0] !== '#') {
      c = fullType + '(' + color.map(function(val, i) {
        if (i === 3) {
          if (val) {
            return val;
          } else {
            return val.toFixed(1);
          }
        }

        return val;
      }).join(', ') + ')'
    }

    return {
      array : color,
      string : c
    };
  }
};
