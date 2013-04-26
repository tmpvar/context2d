var ok = require('assert').ok
var pseudoCanvas = {};
var fs = require('fs');
var context = require('./').createContext(pseudoCanvas);

// console.log(context);
// ok(context.canvas === pseudoCanvas);

// var hue = 0;
// var lastX = 640 * Math.random();
// var lastY = 480 * Math.random();
// context.save();
//   context.translate(context.canvas.width/2, context.canvas.height/2);
//   context.scale(0.9, 0.9);
//   context.translate(-context.canvas.width/2, -context.canvas.height/2);
//   context.beginPath();
//   context.lineWidth = 5 + Math.random() * 10;
//   context.moveTo(lastX, lastY);
//   lastX = context.canvas.width * Math.random();
//   lastY = context.canvas.height * Math.random();
//   context.bezierCurveTo(context.canvas.width * Math.random(),
//                        context.canvas.height * Math.random(),
//                        context.canvas.width * Math.random(),
//                        context.canvas.height * Math.random(),
//                        lastX, lastY);

//   hue = hue + 10 * Math.random();
//   context.strokeStyle = 'hsl(' + hue + ', 50%, 50%)';
//   context.shadowColor = 'white';
//   context.shadowBlur = 10;
//   context.stroke();
// context.restore();

context.fillStyle = "#ff00ff";
context.fillRect(10, 10, 100, 100);

fs.writeFileSync(__dirname + '/out.png', context.toPngBuffer());

console.log('ok');
