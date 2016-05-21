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

module.exports.include_dirs = function() {
  console.log(' -I' + includes.join(' -I'))
}

var staticLibs = [
  './node_modules/context2d-skia/skia/out/Debug/libgenperf_libs.a',
  './node_modules/context2d-skia/skia/out/Debug/libjpeg-turbo.a',
  './node_modules/context2d-skia/skia/out/Debug/libpng_static.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_codec.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_codec_android.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_core.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_effects.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_images.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_opts.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_opts_sse41.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_opts_ssse3.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_ports.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_sfnt.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_skgpu.a',
  './node_modules/context2d-skia/skia/out/Debug/libskia_utils.a',
  './node_modules/context2d-skia/skia/out/Debug/libwebp_dec.a',
  './node_modules/context2d-skia/skia/out/Debug/libwebp_demux.a',
  './node_modules/context2d-skia/skia/out/Debug/libwebp_dsp.a',
  './node_modules/context2d-skia/skia/out/Debug/libwebp_enc.a',
  './node_modules/context2d-skia/skia/out/Debug/libwebp_utils.a'
].map(function(dir) {
  return path.resolve(path.join(__dirname, '..'), dir)
})

module.exports.static_libraries = function () {
  console.log(staticLibs.join(' '))
}
