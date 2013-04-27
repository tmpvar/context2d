var helpers = require('../helpers');
var test = helpers.test;
var Canvas = helpers.Canvas;
var Window = helpers.Window;
var Document = helpers.Document;

test('2d.voidreturn', function(t) {

  helpers.loadImages([
    { id : 'yellow.png' , url: __dirname + '/../philip/orig/images/yellow.png' }
  ], function(images) {

    var canvas = new Canvas(100, 50);
    var ctx = canvas.getContext('2d')

    helpers.assertEqual(t, ctx.save(), undefined, "ctx.save()", "undefined");
    helpers.assertEqual(t, ctx.restore(), undefined, "ctx.restore()", "undefined");
    helpers.assertEqual(t, ctx.scale(1, 1), undefined, "ctx.scale(1, 1)", "undefined");
    helpers.assertEqual(t, ctx.rotate(0), undefined, "ctx.rotate(0)", "undefined");
    helpers.assertEqual(t, ctx.translate(0, 0), undefined, "ctx.translate(0, 0)", "undefined");
    if (ctx.transform) { // (avoid spurious failures, since the aim here is not to test that all features are supported)
        helpers.assertEqual(t, ctx.transform(1, 0, 0, 1, 0, 0), undefined, "ctx.transform(1, 0, 0, 1, 0, 0)", "undefined");
    }
    if (ctx.setTransform) {
        helpers.assertEqual(t, ctx.setTransform(1, 0, 0, 1, 0, 0), undefined, "ctx.setTransform(1, 0, 0, 1, 0, 0)", "undefined");
    }
    helpers.assertEqual(t, ctx.clearRect(0, 0, 0, 0), undefined, "ctx.clearRect(0, 0, 0, 0)", "undefined");
    helpers.assertEqual(t, ctx.fillRect(0, 0, 0, 0), undefined, "ctx.fillRect(0, 0, 0, 0)", "undefined");
    helpers.assertEqual(t, ctx.strokeRect(0, 0, 0, 0), undefined, "ctx.strokeRect(0, 0, 0, 0)", "undefined");
    helpers.assertEqual(t, ctx.beginPath(), undefined, "ctx.beginPath()", "undefined");
    helpers.assertEqual(t, ctx.closePath(), undefined, "ctx.closePath()", "undefined");
    helpers.assertEqual(t, ctx.moveTo(0, 0), undefined, "ctx.moveTo(0, 0)", "undefined");
    helpers.assertEqual(t, ctx.lineTo(0, 0), undefined, "ctx.lineTo(0, 0)", "undefined");
    helpers.assertEqual(t, ctx.quadraticCurveTo(0, 0, 0, 0), undefined, "ctx.quadraticCurveTo(0, 0, 0, 0)", "undefined");
    helpers.assertEqual(t, ctx.bezierCurveTo(0, 0, 0, 0, 0, 0), undefined, "ctx.bezierCurveTo(0, 0, 0, 0, 0, 0)", "undefined");
    helpers.assertEqual(t, ctx.arcTo(0, 0, 0, 0, 1), undefined, "ctx.arcTo(0, 0, 0, 0, 1)", "undefined");
    helpers.assertEqual(t, ctx.rect(0, 0, 0, 0), undefined, "ctx.rect(0, 0, 0, 0)", "undefined");
    helpers.assertEqual(t, ctx.arc(0, 0, 1, 0, 0, true), undefined, "ctx.arc(0, 0, 1, 0, 0, true)", "undefined");
    helpers.assertEqual(t, ctx.fill(), undefined, "ctx.fill()", "undefined");
    helpers.assertEqual(t, ctx.stroke(), undefined, "ctx.stroke()", "undefined");
    helpers.assertEqual(t, ctx.clip(), undefined, "ctx.clip()", "undefined");
    if (ctx.fillText) {
        helpers.assertEqual(t, ctx.fillText('test', 0, 0), undefined, "ctx.fillText('test', 0, 0)", "undefined");
        helpers.assertEqual(t, ctx.strokeText('test', 0, 0), undefined, "ctx.strokeText('test', 0, 0)", "undefined");
    }
    if (ctx.putImageData) {
        helpers.assertEqual(t, ctx.putImageData(ctx.getImageData(0, 0, 1, 1), 0, 0), undefined, "ctx.putImageData(ctx.getImageData(0, 0, 1, 1), 0, 0)", "undefined");
    }
    helpers.assertEqual(t, ctx.drawImage(images['yellow.png'], 0, 0, 1, 1, 0, 0, 0, 0), undefined, "ctx.drawImage(images['yellow.png'], 0, 0, 1, 1, 0, 0, 0, 0)", "undefined");
    helpers.assertEqual(t, ctx.drawImage(canvas, 0, 0, 1, 1, 0, 0, 0, 0), undefined, "ctx.drawImage(canvas, 0, 0, 1, 1, 0, 0, 0, 0)", "undefined");
    helpers.assertEqual(t, ctx.createLinearGradient(0, 0, 0, 0).addColorStop(0, 'white'), undefined, "ctx.createLinearGradient(0, 0, 0, 0).addColorStop(0, 'white')", "undefined");

    t.end()
  });
});

