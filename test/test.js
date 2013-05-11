var hound = require('hound');
var optimist = require('optimist');
var exec = require('child_process').exec;
var path = require('path');
var glob = require('glob');
var assert = require('assert');

var optimist = require('optimist')
    .usage('Run the context2d test suite')
    .alias('s', 'suites')
    .string('s')
    .describe('s', 'files that you want to run. ie: -s <regex>')
    .alias('f', 'fail-fast')
    .describe('f', 'stop on the first failed test')
    .alias('h', 'help')
    .describe('h', 'show the help')
    .alias('t', 'tests')
    .describe('t', 'choose the test cases to run. ie: -t <regex>')
    .alias('v', 'verbose')
    .describe('v', 'show all tests that are being run')
    .alias('q', 'quiet')
    .describe('q', 'silence')
    .alias('w', 'watch')
    .describe('w', 'watch for changes');



var argv = optimist.argv;
if (argv.help) {
  optimist.showHelp();
  process.exit();
}

var log = (argv.q) ? function(){} : console.log;

var files = [
  'cases/test-canvas.js',
  'cases/test-clearRect.js',
  'cases/test-composite.js',
  //'cases/test-coordinatespace.js',
  'cases/test-drawImage.js',
  'cases/test-fillRect.js',
  'cases/test-fillStyle.js',
  //'cases/test-getcontext.js',
  'cases/test-gradient.js',
  'cases/test-imageData.js',
  'cases/test-line.js',
  'cases/test-missingargs.js',
  'cases/test-path.js',
  'cases/test-pattern.js',
  'cases/test-scaled.js',
  'cases/test-shadow.js',
  'cases/test-state.js',
  'cases/test-strokeRect.js',
  'cases/test-strokeStyle.js',
  'cases/test-text.js',
  'cases/test-transformation.js',
  'cases/test-voidreturn.js'
];


var modules = {};
var currentModule = "";
var moduleIndex = 0;
var start = new Date().getTime();
var fileFilter = [];
var testFilter = [];

Error.stackTraceLimit = 100;


var testRegex = new RegExp(argv.tests, 'i');
var fileRegex = new RegExp(argv.suites, 'i');
var allowSuite = function(val) {
   return !argv.suites || val.match(fileRegex);
};


files = files.filter(allowSuite);


var modules = {};
var testsToRun = [];

files.map(function (p) {
  var base = path.basename(p).replace('.js', '').replace('test-', '');
  var required = require(path.join(__dirname, p));
  Array.prototype.push.apply(
    testsToRun,
    Object.keys(required).filter(function(key) {
      if (!argv.tests || key.match(testRegex)) {
        return true;
      }
      return false;
    }).map(function(key) {
      return {
        suite: base,
        name : key,
        fn : required[key]
      }
    })
  );
});

var running;
var rerun = function() {
  if (running) {
    running = running(run);
  } else {
    running = run();
  }
};



var run = function(complete) {
  var totalTests = testsToRun.length;
  var failedTests = 0;
  var passedTests = 0;
  var currentTest = 0;
  var cancel = false;
  var currentSuite = '';

  var runNext = function() {
    if (cancel) {
      log('cancelled...')
      return cancel();
    }

    if (currentTest >= testsToRun.length) {
      return done();
    }
    var test = testsToRun[currentTest];
    if (test.suite !== currentSuite) {
      currentSuite = test.suite;
      argv.v && log('\n' + currentSuite)
    }

    var timer = setTimeout(function() {
      result(new Error('timeout: ' + test.name));
    }, 2500);

    function result(e) {
      assert.done = function() {};
      clearTimeout(timer);
      if (!e) {
        passedTests++;
        argv.v && log('  √ ' + test.name);
      } else {
        if (argv.f) {
          test.ctx && test.ctx.debug();
        }

        failedTests++;
        log('  ✖ ' + test.name);
        log('     ', e.actual || e.stack || e);
        if (argv.f) {
          log('')
          log('failing fast after', passedTests, 'passed tests');
          running = false;
          return;
        }
      }
      currentTest++;
      setImmediate(runNext);
    }

    try {
      assert.done = result;
      // assert.fail = function(msg) {
      //   throw new Error(msg);
      // };
      assert.context = test;
      test.fn(assert);
    } catch (e) {
      result(e);
    }
  };

  var start = Date.now();
  var done = function() {
    log('');
    running = false;
    var ratio = failedTests + '/' + totalTests;
    var percent = 0;
    if (totalTests === 0) {
      percent = '100%';
    } else {
      percent = Math.floor((passedTests/totalTests)*100) + '%';
    }

    log('TOTALS: %s failed; %s success', ratio, percent);
    log('TIME: %dms', Date.now()-start);
    complete && complete(!!failedTests);
  }

  process.nextTick(runNext);
  return function(fn) {
    cancel = fn;
  }
}

if (argv.w) {
  var watcher = hound.watch(__dirname + '/../lib');
  watcher.watch(__dirname + '/../index.js');
  watcher.watch(__dirname + '/../src');
  watcher.watch(__dirname + '/../deps/skia/src/');

  watcher.on('change', function(file) {
    if (file.match(/\.(h|cc|cpp)/)) {
      log('[recompiling]')
      exec('node-gyp configure build', function(e, out, err) {

        if (e) {
          log('ERROR:');
          err.split('\n').forEach(function(line) {
            if (line.indexOf('gyp') < 0) {
              console.log(line);
            }
          });

        } else {
          exec('touch ' + __filename);
          rerun();
        }
      });
    } else {
      rerun();
    }
  });
}

run(function(e) {
  if (e) {
    process.exit(1);
  }
});
