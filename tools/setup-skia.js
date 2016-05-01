const spawn = require('child_process').spawn
const path = require('path')

const env = process.env

const root = path.join(__dirname, '..')

console.log('# prepare skia for building')
spawn('python', ['bin/sync-and-gyp'], {
  cwd: path.join(root, 'external', 'skia'),
  env: env,
  stdio: 'inherit'
}).on('exit', function() {
  console.log('# building skia_lib')
  spawn('ninja', ['-C', 'out/Debug', 'skia_lib'], {
    cwd: path.join(root, 'external', 'skia'),
    env: env,
    stdio: 'inherit'
  })
})

