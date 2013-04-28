[
  'cases/test-canvas',
  'cases/test-clearRect',
  'cases/test-composite',
  // Requires manual intervention..
  // 'cases/test-coordinatespace',

  'cases/test-drawImage',
  'cases/test-fillRect',
  // 'cases/test-fillStyle',

  // 'cases/test-gradient',
  // 'cases/test-imageData',
  // 'cases/test-line',
  //'cases/test-missingargs',
  // 'cases/test-path',
  // 'cases/test-pattern',
  // 'cases/test-scaled',
  // 'cases/test-shadow',
  // 'cases/test-state',
  // 'cases/test-strokeRect',
  // 'cases/test-strokeStyle',
  // 'cases/test-text',
  // 'cases/test-transformation',
  //'cases/test-voidreturn',

  // These are <canvas> specific and not needed for context2d tests
  // 'cases/test-getcontext',

].forEach(function(file) {
  require(__dirname + '/' + file)
})