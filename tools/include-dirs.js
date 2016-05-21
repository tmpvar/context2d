var path = require('path')

var includes = [
  './node_modules/context2d-skia/skia/include/android',
  './node_modules/context2d-skia/skia/include/animator',
  './node_modules/context2d-skia/skia/include/codec',
  './node_modules/context2d-skia/skia/include/config',
  './node_modules/context2d-skia/skia/include/core',
  './node_modules/context2d-skia/skia/include/effects',
  './node_modules/context2d-skia/skia/include/gpu',
  './node_modules/context2d-skia/skia/include/images',
  './node_modules/context2d-skia/skia/include/pathops',
  './node_modules/context2d-skia/skia/include/ports',
  './node_modules/context2d-skia/skia/include/private',
  './node_modules/context2d-skia/skia/include/svg',
  './node_modules/context2d-skia/skia/include/utils',
  './node_modules/context2d-skia/skia/include/views',
  './node_modules/context2d-skia/skia/include/xml',
  './node_modules/context2d-skia/skia/src/core'
].map(function(dir) {
  return path.resolve(process.cwd(), dir)
})

console.log(' -I' + includes.join(' -I'))
