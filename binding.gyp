{
  'includes': [
    'context2d.gypi',
  ],

  'targets': [
    {
    'target_name' : 'context2d',
    'dependencies' : [
      'context2d-static'
    ],
    'sources' : ['src/binding.cc'],
    'xcode_settings': {
      'MACOSX_DEPLOYMENT_TARGET': '10.7',
      'OTHER_CFLAGS': ['-stdlib=libc++', '-std=c++11']
    },
    'type': 'loadable_module',
    'win_delay_load_hook': 'false',
    'product_prefix': '',

    'include_dirs': [
      '<(node_root_dir)/src',
      '<(node_root_dir)/deps/uv/include',
      '<(node_root_dir)/deps/v8/include',
      '<@(shared_include_dirs)'
    ],

    'libraries': [
      '<@(shared_static_libraries)'
    ],

    'conditions': [
      [ 'OS=="mac"', {
        # 'defines': [ '_DARWIN_USE_64_BIT_INODE=1' ],
        # 'libraries': [ '-undefined dynamic_lookup' ],
        'link_settings': {
          'libraries': [
            # '$(SDKROOT)/System/Library/Frameworks/CoreFoundation.framework',
            # '$(SDKROOT)/System/Library/Frameworks/CoreGraphics.framework',
            # '$(SDKROOT)/System/Library/Frameworks/CoreText.framework',
            # '$(SDKROOT)/System/Library/Frameworks/UIKit.framework',
            # '$(SDKROOT)/System/Library/Frameworks/Foundation.framework',
            # '$(SDKROOT)/System/Library/Frameworks/QuartzCore.framework',
            # '$(SDKROOT)/System/Library/Frameworks/OpenGL.framework',
            # '$(SDKROOT)/System/Library/Frameworks/ImageIO.framework',
            '$(SDKROOT)/System/Library/Frameworks/ApplicationServices.framework',
          ],
        },
        # 'xcode_settings': {
        #   'DYLIB_INSTALL_NAME_BASE': '@rpath'
        # },
      }],
      # [ 'OS=="win"', {
      #   'libraries': [
      #     '-lkernel32.lib',
      #     '-luser32.lib',
      #     '-lgdi32.lib',
      #     '-lwinspool.lib',
      #     '-lcomdlg32.lib',
      #     '-ladvapi32.lib',
      #     '-lshell32.lib',
      #     '-lole32.lib',
      #     '-loleaut32.lib',
      #     '-luuid.lib',
      #     '-lodbc32.lib',
      #     '-lDelayImp.lib',
      #     '-l"<(node_root_dir)/$(ConfigurationName)/<(runtime).lib"'
      #   ],
      #   # warning C4251: 'node::ObjectWrap::handle_' : class 'v8::Persistent<T>'
      #   # needs to have dll-interface to be used by clients of class 'node::ObjectWrap'
      #   'msvs_disabled_warnings': [ 4251 ],
      # }, {
      #   # OS!="win"
      #   'defines': [ '_LARGEFILE_SOURCE', '_FILE_OFFSET_BITS=64' ],
      # }],
      # [ 'OS=="freebsd" or OS=="openbsd" or OS=="solaris" or (OS=="linux" and target_arch!="ia32")', {
      #   'cflags': [ '-fPIC' ],
      # }]
    ]
  },
  {
    'target_name' : 'context2d-static',
    'type' : 'static_library',
    'standalone_static_library': 1,
    'xcode_settings': {
      'MACOSX_DEPLOYMENT_TARGET': '10.7',
      'OTHER_CFLAGS': ['-stdlib=libc++', '-std=c++11']
    },

# TODO: build type

    'libraries': [
      '<@(shared_static_libraries)'
    ],
    'sources' : [
      'src/context2d.cc',
    ],
    'include_dirs': [
      '<(node_root_dir)/src',
      '<(node_root_dir)/deps/uv/include',
      '<(node_root_dir)/deps/v8/include',
      '<@(shared_include_dirs)'
    ],
  }]
}
