{
  'variables' : {
    'shared_include_dirs' : [
      'src',
      'node_modules/windows-angle/deps/angle/include',
      'node_modules/windows-angle/src/shim',
      "<!(node -e \"require('nan')\")",
      "<!@(node -e \"require('skia.cc').includes()\")",
    ]
  },
}
