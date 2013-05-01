var glob = require('glob');
var fs = require('fs');
var path = require('path');
var dir = path.join(__dirname, 'philip', 'orig');

var tests = {};
var indent = 2;
var pad = function() {
  return (new Array(indent+1)).join(' ');
};

var files = glob.sync(dir + '/tests/2d.*.html');
files.forEach(function(file) {
  indent = 2;
  var basename = path.basename(file);
  var first5 = path.basename(file).substring(0, 5);
  if (first5 === 'index' || first5 === 'repor' || first5 === 'resul' || first5 ==='spec.') {
    return;
  }


  var baseParts = basename.split('.');

  if (!tests[baseParts[1]]) {
    tests[baseParts[1]] = [
      "var helpers = require('../helpers');",
      "var test = helpers.test;",
      'var Canvas = helpers.Canvas;',
      'var Image = helpers.Image;',
      'var DOMException = helpers.DOMException;',
      'var wrapFunction = helpers.wrapFunction;',
      ''
    ];
  }


  var test = tests[baseParts[1]];

  var contents = fs.readFileSync(file).toString();
  var title = contents.match(/<title>Canvas test: ([^<]+)/)[1];

  //contents = contents.replace(/\.\.\/images/g, '/../philip/orig/images');
  contents = contents.replace(/_fail\(/g, 't.fail(');

  var deferred = contents.indexOf('deferTest')  > -1;
  contents = contents.replace(/ *deferTest\(\);/, '');


  contents = contents.replace(
    'wrapFunction(function () {',
    'wrapFunction(t, function () {'
  );

  // contents = contents.replace('})', '    t.end()\n  }');
  contents = contents.replace(/\.\.\/images/g, '../philip/orig/images');

  var expectedMatch = contents.match(/<img src=.([^'"]+).*class=.output expected/)

  var expected = null;
  if (expectedMatch) {
    expected = "'" + expectedMatch[1] + "'";
  }

  var titleString = "'" + title + "'";
  test.push("test(module, " + titleString + "," + expected + ", function(t) {");

  var imageMatches = contents.match(/<img[^>]+/gi);
  var images = [];
  if (imageMatches) {



    imageMatches.forEach(function(match) {


      var src = match.match(/src="([^"]+)/)[1];
      var id = match.match(/id="([^"]+)/)[1];
      if (id === 'expected') {
        return;
      }

      images.push("{ id : '" + id + "' , url: __dirname + '/../images/" + path.basename(src) + "' }");
    });

    if (images.length) {
      indent = 4;
      test.push('');
      test.push('  helpers.loadImages(t, [');
      test.push('    ' + images.join(',\n    '));
      test.push('  ], function(images) {');
    }
  }

  test.push(pad() + "var window = helpers.createWindow();");
  test.push(pad() + "var document = window.document;");


  var size = contents.match(/<canvas.*width="(\d+)".*height="(\d+)"/);
  if (contents.indexOf('canvas.') > -1 || contents.indexOf('ctx.') > -1) {
    test.push('');
    test.push(pad() + 'var canvas = helpers.createCanvas(document, ' + size[1] + ', ' + size[2] + ');');
    test.push(pad() + "var ctx = canvas.getContext('2d')");
  }

  var testStart = '_addTest(function(canvas, ctx) {';

  var testPos = contents.indexOf(testStart);
  var testString = contents.substring(testPos + testStart.length);
  testString = testString.substring(0, testString.indexOf("});\n</script>"))
  testString = testString.trim();

  testString = testString.replace(/document.getElementById\(([^\)]+)\)/ig, "images[$1]");
  testString = testString.replace(/document.createElement\(.canvas.\)/g,'helpers.createCanvas(document)');
  testString = testString.replace(/new Canvas\(/g,'new Canvas(document)');
  testString = testString.replace(/_assert\(/g, 'helpers.ok(t, ');
  testString = testString.replace(/_assertSame\(/g, 'helpers.assertEqual(t, ');
  testString = testString.replace(/_assertEqual\(/g, 'helpers.assertEqual(t, ');
  testString = testString.replace(/_assertDifferent\(/g, 'helpers.assertNotEqual(t, ');
  testString = testString.replace(/_assertPixelApprox\(/g, 'helpers.assertPixelApprox(t, ');
  testString = testString.replace(/_assertPixel\(/g, 'helpers.assertPixel(t, ');
  testString = testString.replace(/_assertMatch\(/g, 'helpers.assertMatch(t, ');


  testString = testString.split('\n').map(function(line) {
    return pad() + line;
  }).join('\n');

  test.push('');

  test.push(testString);

  test.push('');
  !deferred && test.push(pad() + 't.done()');

  if (images.length) {
    indent-=2;
    test.push(pad() + '});');
  }
  test.push("});");
  test.push("");
  test.push("");
});


Object.keys(tests).forEach(function(key) {
  fs.writeFileSync(__dirname + '/cases/test-' + key + '.js', tests[key].join('\n'));
});

