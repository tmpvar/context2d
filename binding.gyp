{
  'targets': [{
    'target_name': 'context2d',
    'type' : 'static_library',
    'dependencies' : [
      'deps/skia/skia.gyp:alltargets'
    ],
    'sources' : [
      'src/binding.cc',
      'src/window.cc'
    ],
    'include_dirs' : [
    ]
  }]
}
