{
  'variables' : {
    'shared_include_dirs' : [
      'src',
      'node_modules/windows-angle/deps/angle/include',
      'node_modules/windows-angle/src/shim',
      'external/skia/include',
      "<!(node -e \"require('nan')\")",
      "<!(node tools/include-dirs.js)"
    ],
    # TODO: proper Debug/Release support
    'shared_static_libraries': [
      '../node_modules/context2d-skia/skia/out/Debug/libgenperf_libs.a',
      '../node_modules/context2d-skia/skia/out/Debug/libjpeg-turbo.a',
      '../node_modules/context2d-skia/skia/out/Debug/libpng_static.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_codec.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_codec_android.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_core.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_effects.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_images.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_opts.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_opts_sse41.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_opts_ssse3.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_ports.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_sfnt.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_skgpu.a',
      '../node_modules/context2d-skia/skia/out/Debug/libskia_utils.a',
      '../node_modules/context2d-skia/skia/out/Debug/libwebp_dec.a',
      '../node_modules/context2d-skia/skia/out/Debug/libwebp_demux.a',
      '../node_modules/context2d-skia/skia/out/Debug/libwebp_dsp.a',
      '../node_modules/context2d-skia/skia/out/Debug/libwebp_enc.a',
      '../node_modules/context2d-skia/skia/out/Debug/libwebp_utils.a'
    ]
  },
}
