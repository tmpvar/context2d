{
  'variables' : {
    'shared_include_dirs' : [
      'src',
      'node_modules/windows-angle/deps/angle/include',
      'node_modules/windows-angle/src/shim',
      'external/skia/include',
      "<!(node -e \"require('nan')\")",
      "<!(node -e \"require('./tools/gyp.js').include_dirs()\")"
    ],
    # TODO: proper Debug/Release support
    'shared_static_libraries': [
      "<!(node -e \"require('./tools/gyp.js').static_libraries()\")"
    ]
  },
}
