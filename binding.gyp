{
  'includes' : [
    'context2d.gypi'
  ],

  'targets': [{
    'target_name' : 'context2d',
    'dependencies' : [
      'context2d-static',
    ],
    'sources' : ['src/binding.cc',],
    'include_dirs' : [
      '<@(shared_include_dirs)'
    ],
    'conditions' : [
      ['OS == "linux"', {
        'libraries' : ['-lfreetype']
      }]
    ]
  },
  {
    'target_name' : 'context2d-static',
    'type' : 'static_library',
    "standalone_static_library": 1,
    'dependencies' : [
      'skia'
    ],
    'sources' : [
      'src/context2d.cc',
    ],
    'include_dirs' : [
      '<@(shared_include_dirs)'
    ],
  },
  {
    'target_name' : 'zlib',
    'type' : 'static_library',
    'sources' :[
      'deps/zlib/adler32.c',
      'deps/zlib/compress.c',
      'deps/zlib/crc32.c',
      'deps/zlib/deflate.c',
      'deps/zlib/gzclose.c',
      'deps/zlib/gzlib.c',
      'deps/zlib/gzread.c',
      'deps/zlib/gzwrite.c',
      'deps/zlib/infback.c',
      'deps/zlib/inffast.c',
      'deps/zlib/inflate.c',
      'deps/zlib/inftrees.c',
      'deps/zlib/trees.c',
      'deps/zlib/uncompr.c',
      'deps/zlib/zutil.c',
    ]
  },
  {
    'target_name' : 'libpng',
    'type' : 'static_library',
    'dependencies' : ['zlib'],
    'include_dirs' : [
      'deps/zlib/'
    ],
    'sources' : [
      'deps/libpng/png.c',
      'deps/libpng/pngerror.c',
      'deps/libpng/pngget.c',
      'deps/libpng/pngmem.c',
      'deps/libpng/pngpread.c',
      'deps/libpng/pngread.c',
      'deps/libpng/pngrio.c',
      'deps/libpng/pngrtran.c',
      'deps/libpng/pngrutil.c',
      'deps/libpng/pngset.c',
      'deps/libpng/pngtest.c',
      'deps/libpng/pngtrans.c',
      'deps/libpng/pngwio.c',
      'deps/libpng/pngwrite.c',
      'deps/libpng/pngwtran.c',
      'deps/libpng/pngwutil.c',
    ]
  },
  {
    'target_name' : 'skia',
    "standalone_static_library": 1,
    'type' : 'static_library',
    'include_dirs' : [
      '<@(shared_include_dirs)'
    ],
    'defines' : [
      'SK_DEBUG',
      'SK_ENABLE_LIBPNG',
      'SK_GAMMA_SRGB',
      'SK_GAMMA_APPLY_TO_A8',
      'SK_DEVELOPER=1',
    ],
    'dependencies' : [
      'libpng',
    ],
    'sources' : [
      'deps/skia/src/core/Sk64.cpp',
      'deps/skia/src/core/SkAAClip.cpp',
      'deps/skia/src/core/SkAdvancedTypefaceMetrics.cpp',
      'deps/skia/src/core/SkAlphaRuns.cpp',
      'deps/skia/src/core/SkAnnotation.cpp',
      'deps/skia/src/core/SkBBoxHierarchy.cpp',
      'deps/skia/src/core/SkBBoxHierarchyRecord.cpp',
      'deps/skia/src/core/SkBBoxRecord.cpp',
      'deps/skia/src/core/SkBitmap.cpp',
      'deps/skia/src/core/SkBitmap_scroll.cpp',
      'deps/skia/src/core/SkBitmapHeap.cpp',
      'deps/skia/src/core/SkBitmapProcShader.cpp',
      'deps/skia/src/core/SkBitmapProcBicubic.cpp',
      'deps/skia/src/core/SkBitmapProcState.cpp',
      'deps/skia/src/core/SkBitmapProcState_matrixProcs.cpp',
      'deps/skia/src/core/SkBitmapSampler.cpp',
      'deps/skia/src/core/SkBlitMask_D32.cpp',
      'deps/skia/src/core/SkBlitRow_D16.cpp',
      'deps/skia/src/core/SkBlitRow_D32.cpp',
      'deps/skia/src/core/SkBlitRow_D4444.cpp',
      'deps/skia/src/core/SkBlitter.cpp',
      'deps/skia/src/core/SkBlitter_4444.cpp',
      'deps/skia/src/core/SkBlitter_A1.cpp',
      'deps/skia/src/core/SkBlitter_A8.cpp',
      'deps/skia/src/core/SkBlitter_ARGB32.cpp',
      'deps/skia/src/core/SkBlitter_RGB16.cpp',
      'deps/skia/src/core/SkBlitter_Sprite.cpp',
      'deps/skia/src/core/SkBuffer.cpp',
      'deps/skia/src/core/SkCanvas.cpp',
      'deps/skia/src/core/SkChunkAlloc.cpp',
      'deps/skia/src/core/SkClipStack.cpp',
      'deps/skia/src/core/SkColor.cpp',
      'deps/skia/src/core/SkColorFilter.cpp',
      'deps/skia/src/core/SkColorTable.cpp',
      'deps/skia/src/core/SkComposeShader.cpp',
      'deps/skia/src/core/SkConfig8888.cpp',
      'deps/skia/src/core/SkCordic.cpp',
      'deps/skia/src/core/SkCubicClipper.cpp',
      'deps/skia/src/core/SkData.cpp',
      'deps/skia/src/core/SkDataTable.cpp',
      'deps/skia/src/core/SkDebug.cpp',
      'deps/skia/src/core/SkDeque.cpp',
      'deps/skia/src/core/SkDevice.cpp',
      'deps/skia/src/core/SkDeviceProfile.cpp',
      'deps/skia/src/core/SkDither.cpp',
      'deps/skia/src/core/SkDraw.cpp',
      'deps/skia/src/core/SkDrawLooper.cpp',
      'deps/skia/src/core/SkEdge.cpp',
      'deps/skia/src/core/SkEdgeBuilder.cpp',
      'deps/skia/src/core/SkEdgeClipper.cpp',
      'deps/skia/src/core/SkError.cpp',
      'deps/skia/src/core/SkFDStream.cpp',
      'deps/skia/src/core/SkFilterProc.cpp',
      'deps/skia/src/core/SkFlate.cpp',
      'deps/skia/src/core/SkFlattenable.cpp',
      'deps/skia/src/core/SkFlattenableBuffers.cpp',
      'deps/skia/src/core/SkFloat.cpp',
      'deps/skia/src/core/SkFloatBits.cpp',
      'deps/skia/src/core/SkFontDescriptor.cpp',
      'deps/skia/src/core/SkFontHost.cpp',
      'deps/skia/src/core/SkFontStream.cpp',
      'deps/skia/src/core/SkGeometry.cpp',
      'deps/skia/src/core/SkGlyphCache.cpp',
      'deps/skia/src/core/SkGraphics.cpp',
      'deps/skia/src/core/SkImageFilter.cpp',
      'deps/skia/src/core/SkImageFilterUtils.cpp',
      'deps/skia/src/core/SkInstCnt.cpp',
      'deps/skia/src/core/SkLineClipper.cpp',
      'deps/skia/src/core/SkMallocPixelRef.cpp',
      'deps/skia/src/core/SkMask.cpp',
      'deps/skia/src/core/SkMaskFilter.cpp',
      'deps/skia/src/core/SkMaskGamma.cpp',
      'deps/skia/src/core/SkMath.cpp',
      'deps/skia/src/core/SkMatrix.cpp',
      'deps/skia/src/core/SkMemory_stdlib.cpp',
      'deps/skia/src/core/SkMetaData.cpp',
      'deps/skia/src/core/SkOrderedReadBuffer.cpp',
      'deps/skia/src/core/SkOrderedWriteBuffer.cpp',
      'deps/skia/src/core/SkPackBits.cpp',
      'deps/skia/src/core/SkPaint.cpp',
      'deps/skia/src/core/SkPaintPriv.cpp',
      'deps/skia/src/core/SkPath.cpp',
      'deps/skia/src/core/SkPathEffect.cpp',
      'deps/skia/src/core/SkPathHeap.cpp',
      'deps/skia/src/core/SkPathMeasure.cpp',
      'deps/skia/src/core/SkPicture.cpp',
      'deps/skia/src/core/SkPictureFlat.cpp',
      'deps/skia/src/core/SkPicturePlayback.cpp',
      'deps/skia/src/core/SkPictureRecord.cpp',
      'deps/skia/src/core/SkPictureStateTree.cpp',
      'deps/skia/src/core/SkPixelRef.cpp',
      'deps/skia/src/core/SkPoint.cpp',
      'deps/skia/src/core/SkProcSpriteBlitter.cpp',
      'deps/skia/src/core/SkPtrRecorder.cpp',
      'deps/skia/src/core/SkQuadClipper.cpp',
      'deps/skia/src/core/SkRasterClip.cpp',
      'deps/skia/src/core/SkRasterizer.cpp',
      'deps/skia/src/core/SkRect.cpp',
      'deps/skia/src/core/SkRefCnt.cpp',
      'deps/skia/src/core/SkRefDict.cpp',
      'deps/skia/src/core/SkRegion.cpp',
      'deps/skia/src/core/SkRegion_path.cpp',
      'deps/skia/src/core/SkRegion_rects.cpp',
      'deps/skia/src/core/SkRRect.cpp',
      'deps/skia/src/core/SkRTree.cpp',
      'deps/skia/src/core/SkScalar.cpp',
      'deps/skia/src/core/SkScalerContext.cpp',
      'deps/skia/src/core/SkScan.cpp',
      'deps/skia/src/core/SkScan_Antihair.cpp',
      'deps/skia/src/core/SkScan_AntiPath.cpp',
      'deps/skia/src/core/SkScan_Hairline.cpp',
      'deps/skia/src/core/SkScan_Path.cpp',
      'deps/skia/src/core/SkShader.cpp',
      'deps/skia/src/core/SkSpriteBlitter_ARGB32.cpp',
      'deps/skia/src/core/SkSpriteBlitter_RGB16.cpp',
      'deps/skia/src/core/SkStream.cpp',
      'deps/skia/src/core/SkString.cpp',
      'deps/skia/src/core/SkStringUtils.cpp',
      'deps/skia/src/core/SkStroke.cpp',
      'deps/skia/src/core/SkStrokeRec.cpp',
      'deps/skia/src/core/SkStrokerPriv.cpp',
      'deps/skia/src/core/SkTileGrid.cpp',
      'deps/skia/src/core/SkTileGridPicture.cpp',
      'deps/skia/src/core/SkTLS.cpp',
      'deps/skia/src/core/SkTSearch.cpp',
      'deps/skia/src/core/SkTypeface.cpp',
      'deps/skia/src/core/SkTypefaceCache.cpp',
      'deps/skia/src/core/SkUnPreMultiply.cpp',
      'deps/skia/src/core/SkUtils.cpp',
#      'deps/skia/src/core/SkUtilsArm.cpp',
      'deps/skia/src/core/SkWriter32.cpp',
      'deps/skia/src/core/SkXfermode.cpp',
#      'deps/skia/src/device/xps/SkXPSDevice.cpp',
      'deps/skia/src/effects/gradients/SkBitmapCache.cpp',
      'deps/skia/src/effects/gradients/SkClampRange.cpp',
      'deps/skia/src/effects/gradients/SkGradientShader.cpp',
      'deps/skia/src/effects/gradients/SkLinearGradient.cpp',
      'deps/skia/src/effects/gradients/SkRadialGradient.cpp',
      'deps/skia/src/effects/gradients/SkSweepGradient.cpp',
      'deps/skia/src/effects/gradients/SkTwoPointConicalGradient.cpp',
      'deps/skia/src/effects/gradients/SkTwoPointRadialGradient.cpp',
      'deps/skia/src/effects/Sk1DPathEffect.cpp',
      'deps/skia/src/effects/Sk2DPathEffect.cpp',
      'deps/skia/src/effects/SkArithmeticMode.cpp',
      'deps/skia/src/effects/SkAvoidXfermode.cpp',
      'deps/skia/src/effects/SkBicubicImageFilter.cpp',
      'deps/skia/src/effects/SkBitmapSource.cpp',
      'deps/skia/src/effects/SkBlendImageFilter.cpp',
      'deps/skia/src/effects/SkBlurDrawLooper.cpp',
      'deps/skia/src/effects/SkBlurImageFilter.cpp',
      'deps/skia/src/effects/SkBlurMask.cpp',
      'deps/skia/src/effects/SkBlurMaskFilter.cpp',
      'deps/skia/src/effects/SkColorFilterImageFilter.cpp',
      'deps/skia/src/effects/SkColorFilters.cpp',
      'deps/skia/src/effects/SkColorMatrix.cpp',
      'deps/skia/src/effects/SkColorMatrixFilter.cpp',
      'deps/skia/src/effects/SkCornerPathEffect.cpp',
      'deps/skia/src/effects/SkDashPathEffect.cpp',
      'deps/skia/src/effects/SkDiscretePathEffect.cpp',
      'deps/skia/src/effects/SkDisplacementMapEffect.cpp',
      'deps/skia/src/effects/SkEmbossMask.cpp',
      'deps/skia/src/effects/SkEmbossMaskFilter.cpp',
      'deps/skia/src/effects/SkKernel33MaskFilter.cpp',
      'deps/skia/src/effects/SkLayerDrawLooper.cpp',
      'deps/skia/src/effects/SkLayerRasterizer.cpp',
      'deps/skia/src/effects/SkLightingImageFilter.cpp',
      'deps/skia/src/effects/SkMagnifierImageFilter.cpp',
      'deps/skia/src/effects/SkMatrixConvolutionImageFilter.cpp',
      'deps/skia/src/effects/SkMergeImageFilter.cpp',
      'deps/skia/src/effects/SkMorphologyImageFilter.cpp',
      'deps/skia/src/effects/SkOffsetImageFilter.cpp',
      'deps/skia/src/effects/SkPaintFlagsDrawFilter.cpp',
      'deps/skia/src/effects/SkPerlinNoiseShader.cpp',
      'deps/skia/src/effects/SkPixelXorXfermode.cpp',
      'deps/skia/src/effects/SkPorterDuff.cpp',
      'deps/skia/src/effects/SkRectShaderImageFilter.cpp',
      'deps/skia/src/effects/SkStippleMaskFilter.cpp',
      'deps/skia/src/effects/SkTableColorFilter.cpp',
      'deps/skia/src/effects/SkTableMaskFilter.cpp',
      'deps/skia/src/effects/SkTestImageFilters.cpp',
      'deps/skia/src/effects/SkTransparentShader.cpp',
      'deps/skia/src/gpu/effects/GrConfigConversionEffect.cpp',
      'deps/skia/src/gpu/effects/GrConvolutionEffect.cpp',
      'deps/skia/src/gpu/effects/GrSimpleTextureEffect.cpp',
      'deps/skia/src/gpu/effects/GrSingleTextureEffect.cpp',
      'deps/skia/src/gpu/effects/GrTextureDomainEffect.cpp',
      'deps/skia/src/gpu/effects/GrTextureStripAtlas.cpp',
#      'deps/skia/src/gpu/gl/android/GrGLCreateNativeInterface_android.cpp',
#      'deps/skia/src/gpu/gl/android/SkNativeGLContext_android.cpp',
#      'deps/skia/src/gpu/gl/angle/GrGLCreateANGLEInterface.cpp',
#      'deps/skia/src/gpu/gl/angle/SkANGLEGLContext.cpp',
      'deps/skia/src/gpu/gl/debug/GrBufferObj.cpp',
      'deps/skia/src/gpu/gl/debug/GrDebugGL.cpp',
      'deps/skia/src/gpu/gl/debug/GrFrameBufferObj.cpp',
      'deps/skia/src/gpu/gl/debug/GrGLCreateDebugInterface.cpp',
      'deps/skia/src/gpu/gl/debug/GrProgramObj.cpp',
      'deps/skia/src/gpu/gl/debug/GrShaderObj.cpp',
      'deps/skia/src/gpu/gl/debug/GrTextureObj.cpp',
      'deps/skia/src/gpu/gl/debug/GrTextureUnitObj.cpp',
      'deps/skia/src/gpu/gl/debug/SkDebugGLContext.cpp',
      'deps/skia/src/gpu/gl/GrGLBufferImpl.cpp',
      'deps/skia/src/gpu/gl/GrGLCaps.cpp',
      'deps/skia/src/gpu/gl/GrGLContext.cpp',
      'deps/skia/src/gpu/gl/GrGLCreateNativeInterface_none.cpp',
      'deps/skia/src/gpu/gl/GrGLCreateNullInterface.cpp',
      'deps/skia/src/gpu/gl/GrGLDefaultInterface_native.cpp',
      'deps/skia/src/gpu/gl/GrGLDefaultInterface_none.cpp',
      'deps/skia/src/gpu/gl/GrGLEffect.cpp',
      'deps/skia/src/gpu/gl/GrGLEffectMatrix.cpp',
      'deps/skia/src/gpu/gl/GrGLExtensions.cpp',
      'deps/skia/src/gpu/gl/GrGLIndexBuffer.cpp',
      'deps/skia/src/gpu/gl/GrGLInterface.cpp',
      'deps/skia/src/gpu/gl/GrGLNoOpInterface.cpp',
      'deps/skia/src/gpu/gl/GrGLPath.cpp',
      'deps/skia/src/gpu/gl/GrGLProgram.cpp',
      'deps/skia/src/gpu/gl/GrGLProgramDesc.cpp',
      'deps/skia/src/gpu/gl/GrGLRenderTarget.cpp',
      'deps/skia/src/gpu/gl/GrGLShaderBuilder.cpp',
      'deps/skia/src/gpu/gl/GrGLSL.cpp',
      'deps/skia/src/gpu/gl/GrGLStencilBuffer.cpp',
      'deps/skia/src/gpu/gl/GrGLTexture.cpp',
      'deps/skia/src/gpu/gl/GrGLUniformManager.cpp',
      'deps/skia/src/gpu/gl/GrGLUtil.cpp',
      'deps/skia/src/gpu/gl/GrGLVertexArray.cpp',
      'deps/skia/src/gpu/gl/GrGLVertexBuffer.cpp',
      'deps/skia/src/gpu/gl/GrGpuGL.cpp',
      'deps/skia/src/gpu/gl/GrGpuGL_program.cpp',
      'deps/skia/src/gpu/gl/SkGLContextHelper.cpp',
      'deps/skia/src/gpu/gl/SkNullGLContext.cpp',
      'deps/skia/src/gpu/GrAAConvexPathRenderer.cpp',
      'deps/skia/src/gpu/GrAAHairLinePathRenderer.cpp',
      'deps/skia/src/gpu/GrAARectRenderer.cpp',
      'deps/skia/src/gpu/GrAddPathRenderers_default.cpp',
#      'deps/skia/src/gpu/GrAddPathRenderers_none.cpp',
      'deps/skia/src/gpu/GrAllocPool.cpp',
      'deps/skia/src/gpu/GrAtlas.cpp',
      'deps/skia/src/gpu/GrBufferAllocPool.cpp',
      'deps/skia/src/gpu/GrCacheID.cpp',
      'deps/skia/src/gpu/GrClipData.cpp',
      'deps/skia/src/gpu/GrClipMaskCache.cpp',
      'deps/skia/src/gpu/GrClipMaskManager.cpp',
      'deps/skia/src/gpu/GrContext.cpp',
      'deps/skia/src/gpu/GrDefaultPathRenderer.cpp',
      'deps/skia/src/gpu/GrDrawState.cpp',
      'deps/skia/src/gpu/GrDrawTarget.cpp',
      'deps/skia/src/gpu/GrEffect.cpp',
      'deps/skia/src/gpu/GrGeometryBuffer.cpp',
      'deps/skia/src/gpu/GrGpu.cpp',
      'deps/skia/src/gpu/GrGpuFactory.cpp',
      'deps/skia/src/gpu/GrInOrderDrawBuffer.cpp',
      'deps/skia/src/gpu/GrMemory.cpp',
      'deps/skia/src/gpu/GrMemoryPool.cpp',
      'deps/skia/src/gpu/GrOvalRenderer.cpp',
      'deps/skia/src/gpu/GrPath.cpp',
      'deps/skia/src/gpu/GrPathRenderer.cpp',
      'deps/skia/src/gpu/GrPathRendererChain.cpp',
      'deps/skia/src/gpu/GrPathUtils.cpp',
      'deps/skia/src/gpu/GrRectanizer.cpp',
#      'deps/skia/src/gpu/GrRectanizer_fifo.cpp',
      'deps/skia/src/gpu/GrReducedClip.cpp',
      'deps/skia/src/gpu/GrRenderTarget.cpp',
      'deps/skia/src/gpu/GrResource.cpp',
      'deps/skia/src/gpu/GrResourceCache.cpp',
      'deps/skia/src/gpu/GrSoftwarePathRenderer.cpp',
      'deps/skia/src/gpu/GrStencil.cpp',
      'deps/skia/src/gpu/GrStencilAndCoverPathRenderer.cpp',
      'deps/skia/src/gpu/GrStencilBuffer.cpp',
      'deps/skia/src/gpu/GrSurface.cpp',
      'deps/skia/src/gpu/GrSWMaskHelper.cpp',
      'deps/skia/src/gpu/GrTextContext.cpp',
      'deps/skia/src/gpu/GrTextStrike.cpp',
      'deps/skia/src/gpu/GrTexture.cpp',
      'deps/skia/src/gpu/GrTextureAccess.cpp',
      'deps/skia/src/gpu/SkGpuDevice.cpp',
      'deps/skia/src/gpu/SkGr.cpp',
      'deps/skia/src/gpu/SkGrFontScaler.cpp',
      'deps/skia/src/gpu/SkGrPixelRef.cpp',
      'deps/skia/src/gpu/SkGrTexturePixelRef.cpp',
      'deps/skia/src/image/SkDataPixelRef.cpp',
      'deps/skia/src/image/SkImage.cpp',
      'deps/skia/src/image/SkImage_Codec.cpp',
      'deps/skia/src/image/SkImage_Gpu.cpp',
      'deps/skia/src/image/SkImage_Picture.cpp',
      'deps/skia/src/image/SkImage_Raster.cpp',
      'deps/skia/src/image/SkImagePriv.cpp',
      'deps/skia/src/image/SkSurface.cpp',
      'deps/skia/src/image/SkSurface_Gpu.cpp',
      'deps/skia/src/image/SkSurface_Picture.cpp',
      'deps/skia/src/image/SkSurface_Raster.cpp',
#      'deps/skia/src/images/bmpdecoderhelper.cpp',
      'deps/skia/src/images/SkBitmapRegionDecoder.cpp',
      'src/SkImageDecoder_context2d.cpp',
#      'deps/skia/src/images/SkImageDecoder.cpp',
#      'deps/skia/src/images/SkImageDecoder_FactoryDefault.cpp',
      'deps/skia/src/images/SkImageDecoder_FactoryRegistrar.cpp',
#      'deps/skia/src/images/SkImageDecoder_libbmp.cpp',
#      'deps/skia/src/images/SkImageDecoder_libgif.cpp',
#      'deps/skia/src/images/SkImageDecoder_libico.cpp',
#      'deps/skia/src/images/SkImageDecoder_libjpeg.cpp',
      'deps/skia/src/images/SkImageDecoder_libpng.cpp',
#      'deps/skia/src/images/SkImageDecoder_libwebp.cpp',
      'deps/skia/src/images/SkImageEncoder.cpp',
#      'deps/skia/src/images/SkImageEncoder_argb.cpp',
      'deps/skia/src/images/SkImageEncoder_Factory.cpp',
      'deps/skia/src/images/SkImageRef.cpp',
      'deps/skia/src/images/SkImageRef_GlobalPool.cpp',
      'deps/skia/src/images/SkImageRefPool.cpp',
      'deps/skia/src/images/SkImages.cpp',
#      'deps/skia/src/images/SkJpegUtility.cpp',
      'deps/skia/src/images/SkMovie.cpp',
#      'deps/skia/src/images/SkMovie_gif.cpp',
      'deps/skia/src/images/SkPageFlipper.cpp',
      'deps/skia/src/images/SkScaledBitmapSampler.cpp',
      'deps/skia/src/lazy/SkBitmapFactory.cpp',
      'deps/skia/src/lazy/SkLazyPixelRef.cpp',
      'deps/skia/src/lazy/SkLruImageCache.cpp',
      'deps/skia/src/lazy/SkPurgeableImageCache.cpp',
      'deps/skia/src/lazy/SkPurgeableMemoryBlock_common.cpp',
#      'deps/skia/src/opts/SkBitmapProcState_arm_neon.cpp',
#      'deps/skia/src/opts/SkBitmapProcState_matrixProcs_neon.cpp',
#      'deps/skia/src/opts/SkBitmapProcState_opts_arm.cpp',
#      'deps/skia/src/opts/SkBitmapProcState_opts_none.cpp',
      'deps/skia/src/opts/SkBitmapProcState_opts_SSE2.cpp',
      'deps/skia/src/opts/SkBitmapProcState_opts_SSSE3.cpp',
      'deps/skia/src/opts/opts_check_SSE2.cpp',
      'deps/skia/src/opts/SkBlitRect_opts_SSE2.cpp',
#      'deps/skia/src/opts/SkBlitRow_opts_arm.cpp',
#      'deps/skia/src/opts/SkBlitRow_opts_arm_neon.cpp',
#      'deps/skia/src/opts/SkBlitRow_opts_none.cpp',
      'deps/skia/src/opts/SkBlitRow_opts_SSE2.cpp',
#      'deps/skia/src/opts/SkUtils_opts_none.cpp',
      'deps/skia/src/opts/SkUtils_opts_SSE2.cpp',
      'deps/skia/src/pathops/SkAddIntersections.cpp',
      'deps/skia/src/pathops/SkDCubicIntersection.cpp',
      'deps/skia/src/pathops/SkDCubicLineIntersection.cpp',
      'deps/skia/src/pathops/SkDCubicToQuads.cpp',
      'deps/skia/src/pathops/SkDLineIntersection.cpp',
      'deps/skia/src/pathops/SkDQuadImplicit.cpp',
      'deps/skia/src/pathops/SkDQuadIntersection.cpp',
      'deps/skia/src/pathops/SkDQuadLineIntersection.cpp',
      'deps/skia/src/pathops/SkIntersections.cpp',
      'deps/skia/src/pathops/SkOpAngle.cpp',
      'deps/skia/src/pathops/SkOpContour.cpp',
      'deps/skia/src/pathops/SkOpEdgeBuilder.cpp',
      'deps/skia/src/pathops/SkOpSegment.cpp',
      'deps/skia/src/pathops/SkPathOpsBounds.cpp',
      'deps/skia/src/pathops/SkPathOpsCommon.cpp',
      'deps/skia/src/pathops/SkPathOpsCubic.cpp',
      'deps/skia/src/pathops/SkPathOpsDebug.cpp',
      'deps/skia/src/pathops/SkPathOpsLine.cpp',
      'deps/skia/src/pathops/SkPathOpsOp.cpp',
      'deps/skia/src/pathops/SkPathOpsPoint.cpp',
      'deps/skia/src/pathops/SkPathOpsQuad.cpp',
      'deps/skia/src/pathops/SkPathOpsRect.cpp',
      'deps/skia/src/pathops/SkPathOpsSimplify.cpp',
      'deps/skia/src/pathops/SkPathOpsTriangle.cpp',
      'deps/skia/src/pathops/SkPathOpsTypes.cpp',
      'deps/skia/src/pathops/SkPathWriter.cpp',
      'deps/skia/src/pathops/SkQuarticRoot.cpp',
      'deps/skia/src/pathops/SkReduceOrder.cpp',
      'deps/skia/src/pdf/SkPDFCatalog.cpp',
      'deps/skia/src/pdf/SkPDFDevice.cpp',
      'deps/skia/src/pdf/SkPDFDocument.cpp',
      'deps/skia/src/pdf/SkPDFFont.cpp',
      'deps/skia/src/pdf/SkPDFFormXObject.cpp',
      'deps/skia/src/pdf/SkPDFGraphicState.cpp',
      'deps/skia/src/pdf/SkPDFImage.cpp',
      'deps/skia/src/pdf/SkPDFImageStream.cpp',
      'deps/skia/src/pdf/SkPDFPage.cpp',
      'deps/skia/src/pdf/SkPDFShader.cpp',
      'deps/skia/src/pdf/SkPDFStream.cpp',
      'deps/skia/src/pdf/SkPDFTypes.cpp',
      'deps/skia/src/pdf/SkPDFUtils.cpp',
      'deps/skia/src/pipe/SkGPipeRead.cpp',
      'deps/skia/src/pipe/SkGPipeWrite.cpp',
      'deps/skia/src/ports/SkGlobalInitialization_default.cpp',
#      'deps/skia/src/ports/SkHarfBuzzFont.cpp',
      'deps/skia/src/sfnt/SkOTTable_name.cpp',
      'deps/skia/src/sfnt/SkOTUtils.cpp',

# missing include
#      'deps/skia/src/text/SkTextLayout.cpp',
      'deps/skia/src/utils/SkBase64.cpp',
      'deps/skia/src/utils/SkBitmapHasher.cpp',
      'deps/skia/src/utils/SkBitSet.cpp',
      'deps/skia/src/utils/SkBoundaryPatch.cpp',
      'deps/skia/src/utils/SkCamera.cpp',
#      'deps/skia/src/utils/SkCityHash.cpp',
      'deps/skia/src/utils/SkCondVar.cpp',
      'deps/skia/src/utils/SkCountdown.cpp',
      'deps/skia/src/utils/SkCubicInterval.cpp',
      'deps/skia/src/utils/SkCullPoints.cpp',
      'deps/skia/src/utils/SkDeferredCanvas.cpp',
      'deps/skia/src/utils/SkDumpCanvas.cpp',
      'deps/skia/src/utils/SkInterpolator.cpp',
      'deps/skia/src/utils/SkJSON.cpp',
      'deps/skia/src/utils/SkLayer.cpp',
      'deps/skia/src/utils/SkMatrix44.cpp',
      'deps/skia/src/utils/SkMD5.cpp',
      'deps/skia/src/utils/SkMeshUtils.cpp',
      'deps/skia/src/utils/SkNinePatch.cpp',
#      'deps/skia/src/utils/SkNullCanvas.cpp',
#      'deps/skia/src/utils/SkNWayCanvas.cpp',
      'deps/skia/src/ports/SkOSFile_stdio.cpp',
      'deps/skia/src/utils/SkOSFile.cpp',
      'deps/skia/src/utils/SkParse.cpp',
      'deps/skia/src/utils/SkParseColor.cpp',
      'deps/skia/src/utils/SkParsePath.cpp',
      'deps/skia/src/utils/SkPictureUtils.cpp',
      'deps/skia/src/utils/SkProxyCanvas.cpp',
      'deps/skia/src/utils/SkRTConf.cpp',
      'deps/skia/src/utils/SkSHA1.cpp',
      'deps/skia/src/utils/SkThreadPool.cpp',
#      'deps/skia/src/utils/SkThreadUtils_pthread_mach.cpp',

#      'deps/skia/src/utils/SkThreadUtils_pthread_other.cpp',
#      'deps/skia/src/utils/SkThreadUtils_win.cpp',
      'deps/skia/src/utils/SkUnitMappers.cpp',
#      'deps/skia/src/views/animated/SkBorderView.cpp',
#      'deps/skia/src/views/animated/SkImageView.cpp',
#      'deps/skia/src/views/animated/SkProgressBarView.cpp',
#      'deps/skia/src/views/animated/SkScrollBarView.cpp',
#      'deps/skia/src/views/animated/SkStaticTextView.cpp',
#      'deps/skia/src/views/animated/SkWidgetViews.cpp',
#      'deps/skia/src/views/sdl/SkOSWindow_SDL.cpp',
      'deps/skia/src/views/SkBGViewArtist.cpp',
      'deps/skia/src/views/SkEvent.cpp',
      'deps/skia/src/views/SkEventSink.cpp',
      'deps/skia/src/views/SkOSMenu.cpp',
      'deps/skia/src/views/SkParsePaint.cpp',
      'deps/skia/src/views/SkProgressView.cpp',
      'deps/skia/src/views/SkStackViewLayout.cpp',
      'deps/skia/src/views/SkTagList.cpp',
      'deps/skia/src/views/SkTextBox.cpp',
      'deps/skia/src/views/SkTouchGesture.cpp',
      'deps/skia/src/views/SkView.cpp',
      'deps/skia/src/views/SkViewInflate.cpp',
      'deps/skia/src/views/SkViewPriv.cpp',
      'deps/skia/src/views/SkWidgets.cpp',
      'deps/skia/src/views/SkWindow.cpp',
#      'deps/skia/src/xml/SkBML_XMLParser.cpp',
#      'deps/skia/src/xml/SkDOM.cpp',
#      'deps/skia/src/xml/SkJS.cpp',
#      'deps/skia/src/xml/SkJSDisplayable.cpp',
#      'deps/skia/src/xml/SkXMLParser.cpp',
#      'deps/skia/src/xml/SkXMLPullParser.cpp',
#      'deps/skia/src/xml/SkXMLWriter.cpp',

    ],
    'conditions' : [
      ['OS == "mac"', {
        'cflags': [
          '-mssse3',
          '-g',
        ],
        'defines' : [
          'SK_BUILD_FOR_MAC',
          'GR_MAC_BUILD=1',
          'DEBUG',
          '_DEBUG',
          'SK_SUPPORT_GPU=1',
          'SK_ZLIB_INCLUDE=<zlib.h>',
          'SK_USE_POSIX_THREADS',
        ],
        'sources' : [
#          'deps/skia/src/utils/mac/SkBitmap_Mac.cpp',
          'deps/skia/src/utils/mac/SkCreateCGImageRef.cpp',
          'deps/skia/src/utils/mac/SkStream_mac.cpp',
#          'deps/skia/src/views/mac/SkOSWindow_Mac.cpp',
          'deps/skia/src/ports/SkDebug_stdio.cpp',
          'deps/skia/src/images/SkImageRef_ashmem.cpp',
          'deps/skia/src/ports/SkFontHost_mac.cpp',
          'deps/skia/src/ports/SkPurgeableMemoryBlock_mac.cpp',
          'deps/skia/src/ports/SkImageDecoder_CG.cpp',
          'deps/skia/src/ports/SkThread_pthread.cpp',
          'deps/skia/src/utils/SkThreadUtils_pthread.cpp',
          'deps/skia/src/utils/SkThreadUtils_pthread_mach.cpp',
          'deps/skia/src/ports/SkTime_Unix.cpp',

          'deps/skia/src/ports/SkFontConfigInterface_direct.cpp',
        ],
        'xcode_settings': {
          'OTHER_CFLAGS': ['-mssse3',],
        },
        'include_dirs' : [
          'deps/skia/include/utils/mac'
        ]
      }],
      ['OS == "linux"', {
        'cflags': [
          '-mssse3',
          '<!@(freetype-config --cflags)',
        ],
        'defines' : [
          'SK_USE_POSIX_THREADS'
          'DEBUG',
          '_DEBUG',
          'SK_SUPPORT_GPU=1',
        ],
        'sources' : [
          'deps/skia/src/utils/SkThreadUtils_pthread_linux.cpp',
          'deps/skia/src/utils/SkThreadUtils_pthread.cpp',
          'deps/skia/src/ports/SkThread_pthread.cpp',
          'deps/skia/src/ports/SkDebug_stdio.cpp',
          'deps/skia/src/ports/SkTime_Unix.cpp',
          'deps/skia/src/ports/SkFontHost_linux.cpp',
          'deps/skia/src/ports/SkFontHost_FreeType.cpp',
          'deps/skia/src/ports/SkFontHost_FreeType_common.cpp',
          'deps/skia/src/images/SkImageRef_ashmem.cpp',
#          'deps/skia/src/views/unix/skia_unix.cpp',
#          'deps/skia/src/views/unix/SkOSWindow_Unix.cpp',
        ],
      }],
      ['OS == "win"', {
        'cflags': [
          '-mssse3',
        ],
        'defines' : [
          '_USE_MATH_DEFINES',
          'SK_SUPPORT_GPU=1',
          'SK_ZLIB_INCLUDE=<zlib.h>'
        ],

        # TODO: we'll need angle on windows
        #'dependencies' : [
        #  'deps/skia/third_party/externals/angle/src/build_angle.gyp'
        #],
        'sources' : [
          'deps/skia/src/ports/SkDebug_win.cpp',
          'deps/skia/src/ports/SkFontHost_win.cpp',
          'deps/skia/src/ports/SkFontHost_win_dw.cpp',
          'deps/skia/src/ports/SkImageDecoder_WIC.cpp',
          'deps/skia/src/ports/SkThread_win.cpp',
          'deps/skia/src/ports/SkTime_win.cpp',

#          'deps/skia/src/views/win/skia_win.cpp',
#          'deps/skia/src/views/win/SkOSWindow_win.cpp',

          'deps/skia/src/utils/win/SkAutoCoInitialize.cpp',
          'deps/skia/src/utils/win/SkDWriteFontFileStream.cpp',
          'deps/skia/src/utils/win/SkDWriteGeometrySink.cpp',
          'deps/skia/src/utils/win/SkHRESULT.cpp',
          'deps/skia/src/utils/win/SkIStream.cpp',
          'deps/skia/src/utils/win/SkWGL_win.cpp',
          #'deps/skia/src/images/SkImageDecoder_wbmp.cpp',
          #'deps/skia/src/images/SkImageDecoder_libgif.cpp',
          #'deps/skia/src/images/SkImageDecoder_libico.cpp',
          #'deps/skia/src/images/SkImageDecoder_libbmp.cpp',
          #'deps/skia/src/images/SkImageDecoder_libjpeg.cpp',
        ],
        'xcode_settings': {
          'OTHER_CFLAGS': ['-mssse3',],
        },
        'include_dirs' : [
          '<@(shared_include_dirs)',
          'deps/skia/src/utils/win',
          'deps/skia/include/utils/win'
        ]
      }]
    ]
  }]
}
