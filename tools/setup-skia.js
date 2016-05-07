const spawn = require('child_process').spawn
const path = require('path')

const root = path.join(__dirname, '..')
const depotDir = path.join(root, 'external', 'depot_tools')

const env = Object.assign({}, process.env, {
  PATH: process.env.PATH + ':' + depotDir
})

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

