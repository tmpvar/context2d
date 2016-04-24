var ok = require('assert').ok
var pseudoCanvas = {};
var fs = require('fs');
var ctx = require('./').createContext(pseudoCanvas);

ctx.beginPath()
  ctx.moveTo(0, 0)
  // ctx.lineTo(10, 10)
  // ctx.stroke()

// console.log(ctx);
// ok(ctx.canvas === pseudoCanvas);

// var hue = 0;
// var lastX = 640 * Math.random();
// var lastY = 480 * Math.random();
// ctx.save();
//   ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
//   ctx.scale(0.9, 0.9);
//   ctx.translate(-ctx.canvas.width/2, -ctx.canvas.height/2);
//   ctx.beginPath();
//   ctx.lineWidth = 5 + Math.random() * 10;
//   ctx.moveTo(lastX, lastY);
//   lastX = ctx.canvas.width * Math.random();
//   lastY = ctx.canvas.height * Math.random();
//   ctx.bezierCurveTo(ctx.canvas.width * Math.random(),
//                        ctx.canvas.height * Math.random(),
//                        ctx.canvas.width * Math.random(),
//                        ctx.canvas.height * Math.random(),
//                        lastX, lastY);

//   hue = hue + 10 * Math.random();
//   ctx.strokeStyle = 'hsl(' + hue + ', 50%, 50%)';
//   ctx.shadowColor = 'white';
//   ctx.shadowBlur = 10;
//   ctx.stroke();
// ctx.restore();

// ctx.fillStyle = "#ff00ff";
// ctx.fillRect(10, 10, 100, 100);
// console.log('here');
// // fs.writeFileSync(__dirname + '/out.png', ctx.toPngBuffer());

// console.log('ok');
