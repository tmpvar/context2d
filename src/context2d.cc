// TODO: remove this
#define SK_SUPPORT_LEGACY_GETDEVICE

#include <node.h>
#include <node_buffer.h>
#include <nan.h>
#include <stdio.h>

#define _USE_MATH_DEFINES 1

#include "context2d.h"
#include <SkSurface.h>
#include <SkPaint.h>
#include <SkPath.h>
#include <SkError.h>
#include <SkTypes.h>
#include <SkImageInfo.h>

#include <SkStream.h>
#include <SkDevice.h>
#include <SkBlurDrawLooper.h>

#include <SkData.h>
#include <SkFontMgr.h>
#include <SkGraphics.h>
#include <SkColorFilter.h>
#include <SkGradientShader.h>
#include <SkShader.h>
#include <SkImageEncoder.h>
#include <SkRect.h>
#include <SkRegion.h>
#include <SkPixelRef.h>
#include <SkTypeface.h>
#include <SkMatrix44.h>
#include <SkXfermode.h>
#include <SkBitmapProcShader.h>
#include <SkUnPreMultiply.h>

#include <stdio.h>
#include <assert.h>

#define TAU M_PI*2
using namespace node;
using namespace v8;

#define DEGREES(rads) ((rads) * (180/M_PI))

bool findFontByUniqueId(SkTypeface *face, void* context) {
  SkFontID *fontId = (SkFontID *)context;
  if (face->uniqueID() == *fontId) {
    return true;
  }
  return false;
}

Context2D::Context2D(uint32_t w, uint32_t h) {
  this->resizeCanvas(w, h);

  this->globalAlpha = 255;
  this->globalCompositeOperation = SkXfermode::kSrcOver_Mode;

  this->paint.setXfermodeMode(this->globalCompositeOperation);
  this->paint.setColor(SK_ColorBLACK);
  this->paint.setStyle(SkPaint::kFill_Style);
  this->paint.setLCDRenderText(true);
  this->paint.setHinting(SkPaint::kSlight_Hinting);
  this->paint.setSubpixelText(true);
  this->paint.setAntiAlias(true);
  this->paint.setDither(true);

  this->strokePaint.setColor(SK_ColorBLACK);
  this->strokePaint.setStrokeMiter(10);
  this->strokePaint.setStrokeWidth(1);
  this->strokePaint.setStyle(SkPaint::kStroke_Style);
  this->strokePaint.setLCDRenderText(true);
  this->strokePaint.setHinting(SkPaint::kSlight_Hinting);
  this->strokePaint.setSubpixelText(true);
  this->strokePaint.setAntiAlias(true);
  this->strokePaint.setDither(true);

  this->defaultLineWidth = true;

  this->shadowX = 0;
  this->shadowY = 0;
  this->shadowBlur = 0;
  this->shadowPaint.setColor(0x00000000);
}

Context2D::~Context2D() {
  // TODO: cleanup after yourself!
}

bool Context2D::setupShadow(SkPaint *paint) {
  SkColor shadowColor = this->shadowPaint.getColor();
  int shadowAlpha = SkColorGetA(this->shadowPaint.getColor());
  if (shadowAlpha &&
      (this->shadowX || this->shadowY || this->shadowBlur))
  {

    if (shadowAlpha == 255) {
      shadowAlpha = SkColorGetA(paint->getColor());
    }

    SkColor c = SkColorSetARGBInline(
      shadowAlpha,
      SkColorGetR(shadowColor),
      SkColorGetG(shadowColor),
      SkColorGetB(shadowColor)
    );

    SkMatrix m = this->canvas->getTotalMatrix();

    SkPoint shadowOffset;
    m.mapXY(this->shadowX, this->shadowY, &shadowOffset);

    sk_sp<SkDrawLooper> dl = SkBlurDrawLooper::Make(
      c,
      this->shadowBlur,
      this->shadowX,
      this->shadowY,
      SkBlurDrawLooper::kAll_BlurFlag | SkBlurDrawLooper::kOverrideColor_BlurFlag | SkBlurDrawLooper::kIgnoreTransform_BlurFlag
    );

    paint->setLooper(dl);

    return true;
  }
  return false;
}

void Context2D::resizeCanvas(uint32_t width, uint32_t height) {

  if (!width) {
    width = 1;
  }

  if (!height) {
    height = 1;
  }

  SkImageInfo info = SkImageInfo::MakeN32(width, height, SkAlphaType::kPremul_SkAlphaType);
  this->surface = SkSurface::MakeRaster(info);

  // if (this->canvas == nullptr) {
  //   const size_t minRowBytes = info.minRowBytes();
  //   const size_t size = info.getSafeSize(minRowBytes);
  //   SkAutoTMalloc<SkPMColor> storage(size);
  //   SkPMColor* baseAddr = storage.get();
  //   sk_bzero(baseAddr, size);

  //   this->canvas = SkCanvas::NewRasterDirect(info, baseAddr, minRowBytes);
  //   return;
  // }

  // this->surface.reset(SkSurface::MakeRaster(info).get());
  this->canvas = this->surface->getCanvas();
}

void *Context2D::getTextureData() {
  if (this->canvas) {
    SkBitmap bitmap = this->canvas->getDevice()->accessBitmap(false);
    bitmap.lockPixels();
    void *data = bitmap.getPixels();
    bitmap.unlockPixels();
    return data;
  }
  return NULL;
}

NAN_METHOD(Context2D::New) {
  Context2D* context = new Context2D(
    info[0]->Uint32Value(),
    info[1]->Uint32Value()
  );

  context->Wrap(info.Holder());
  info.GetReturnValue().Set(info.Holder());
}

NAN_METHOD(Context2D::Resize) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  int width = info[0]->Uint32Value() & 0xff;
  int height = info[1]->Uint32Value() & 0xff;

  ctx->resizeCanvas(width, height);
}

NAN_METHOD(Context2D::DumpState) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  SkMatrix44 matrix(ctx->canvas->getTotalMatrix());
  matrix.dump();
  ctx->path.dump();
}

NAN_METHOD(Context2D::GetPixel) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkBitmap bitmap = ctx->canvas->getDevice()->accessBitmap(false);

  ctx->canvas->flush();

  bitmap.lockPixels();

  // TODO: validity and bounds
  SkColor color = bitmap.getColor(
    info[0]->Int32Value(),
    info[1]->Int32Value()
  );

  Local<Object> obj = Nan::New<Object>();
  obj->Set(Nan::New("r").ToLocalChecked(), Nan::New(SkColorGetR(color)));
  obj->Set(Nan::New("g").ToLocalChecked(), Nan::New(SkColorGetG(color)));
  obj->Set(Nan::New("b").ToLocalChecked(), Nan::New(SkColorGetB(color)));
  obj->Set(Nan::New("a").ToLocalChecked(), Nan::New(SkColorGetA(color)));

  bitmap.unlockPixels();

  info.GetReturnValue().Set(obj);
}

NAN_METHOD(Context2D::ToPngBuffer) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  ctx->canvas->flush();
  SkBitmap bitmap = ctx->canvas->getDevice()->accessBitmap(false);
  size_t size = bitmap.getSize();

  void *data = malloc(size);
  SkMemoryWStream stream(data, size);
  SkImageEncoder::EncodeStream(&stream, bitmap, SkImageEncoder::kPNG_Type, 100);

  Nan::MaybeLocal<v8::Object> buffer = Nan::NewBuffer((char *)data, size);

  info.GetReturnValue().Set(buffer.ToLocalChecked());
}


NAN_METHOD(Context2D::ToBuffer) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());


  SkBitmap bitmap = ctx->canvas->getDevice()->accessBitmap(true);
  size_t size = bitmap.getSize();
  void *data = malloc(size);
  ctx->canvas->flush();

  bitmap.lockPixels();
  memcpy(data, (const char *)bitmap.getPixels(), size);
  bitmap.unlockPixels();

  Nan::MaybeLocal<v8::Object> buffer = Nan::NewBuffer((char *)data, size);

  info.GetReturnValue().Set(buffer.ToLocalChecked());
}


NAN_METHOD(Context2D::Save) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  ctx->canvas->save();
}

NAN_METHOD(Context2D::Restore) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  ctx->canvas->restore();
}

NAN_METHOD(Context2D::Scale) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  if (!info[0]->IsUndefined() && !info[1]->IsUndefined()) {
    ctx->canvas->scale(
      SkDoubleToScalar(info[0]->NumberValue()),
      SkDoubleToScalar(info[1]->NumberValue())
    );
  }
}

NAN_METHOD(Context2D::Rotate) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  if (!info[0]->IsUndefined()) {
    SkScalar rads = SkDoubleToScalar(DEGREES(info[0]->NumberValue()));
    ctx->canvas->rotate(rads);
  }
}

NAN_METHOD(Context2D::Translate) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  if (!info[0]->IsUndefined() && !info[0]->IsUndefined()) {
    SkScalar x = SkDoubleToScalar(info[0]->NumberValue());
    SkScalar y = SkDoubleToScalar(info[1]->NumberValue());

    ctx->canvas->translate(x, y);
  }
}

NAN_METHOD(Context2D::Transform) {
    if (!info[0]->IsUndefined() &&
      !info[1]->IsUndefined() &&
      !info[2]->IsUndefined() &&
      !info[3]->IsUndefined() &&
      !info[4]->IsUndefined() &&
      !info[5]->IsUndefined())
  {
    SkScalar a = SkDoubleToScalar(info[0]->NumberValue());
    SkScalar b = SkDoubleToScalar(info[1]->NumberValue());
    SkScalar c = SkDoubleToScalar(info[2]->NumberValue());
    SkScalar d = SkDoubleToScalar(info[3]->NumberValue());
    SkScalar e = SkDoubleToScalar(info[4]->NumberValue());
    SkScalar f = SkDoubleToScalar(info[5]->NumberValue());

    SkMatrix m;

    m[0] = a;
    m[1] = c;
    m[2] = e;
    m[3] = b;
    m[4] = d;
    m[5] = f;
    m[6] = 0;
    m[7] = 0;
    m[8] = 1;

    Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

    ctx->canvas->concat(m);
  }
}

NAN_METHOD(Context2D::ResetMatrix) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  ctx->canvas->resetMatrix();
}

NAN_METHOD(Context2D::SetGlobalAlpha) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());\

  ctx->globalAlpha = (uint8_t)(info[0]->NumberValue()*255);

  if (ctx->globalAlpha > 255) {
    ctx->globalAlpha = 255;
  } else if (ctx->globalAlpha < 0) {
    ctx->globalAlpha = 0;
  }
}

NAN_METHOD(Context2D::SetGlobalCompositeOperation) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  ctx->globalCompositeOperation = (SkXfermode::Mode)info[0]->IntegerValue();
}

NAN_METHOD(Context2D::SetImageSmoothingEnabled) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
}

NAN_METHOD(Context2D::GetImageSmoothingEnabled) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
}

NAN_METHOD(Context2D::SetStrokeStyle) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  // Clear off the old shader
  ctx->strokePaint.setShader(NULL);

  U8CPU a = (U8CPU)info[3]->Uint32Value();
  U8CPU r = (U8CPU)info[0]->Uint32Value();
  U8CPU g = (U8CPU)info[1]->Uint32Value();
  U8CPU b = (U8CPU)info[2]->Uint32Value();

  ctx->strokePaint.setColor(SkColorSetARGBInline(a,r,g,b));
}

NAN_METHOD(Context2D::SetFillStylePattern) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  if (!Buffer::HasInstance(info[0])) {
    Nan::ThrowTypeError("First argument needs to be a buffer");
  }

  Local<Object> buffer_obj = info[0]->ToObject();
  char *buffer_data = Buffer::Data(buffer_obj);

  int32_t w = info[1]->Int32Value();
  int32_t h = info[2]->Int32Value();

  SkShader::TileMode repeatX = info[3]->BooleanValue() ?
                               SkShader::kRepeat_TileMode :
                               SkShader::kClamp_TileMode;

  SkShader::TileMode repeatY = info[4]->BooleanValue()?
                               SkShader::kRepeat_TileMode :
                               SkShader::kClamp_TileMode;

  // TODO: implement cropping via the w/h params

  SkBitmap src;
  src.setInfo(SkImageInfo::Make(w, h, kRGBA_8888_SkColorType, kPremul_SkAlphaType));
  src.allocPixels();
  src.setPixels(buffer_data);

  sk_sp<SkShader> shader = SkMakeBitmapShader(src, repeatX, repeatY, nullptr, nullptr);
  ctx->paint.setShader(shader);
  // shader->unref();
}

NAN_METHOD(Context2D::SetFillStylePatternCanvas) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  Context2D *src = ObjectWrap::Unwrap<Context2D>(info[0]->ToObject());

  SkShader::TileMode repeatX = info[3]->BooleanValue() ?
                               SkShader::kRepeat_TileMode :
                               SkShader::kClamp_TileMode;

  SkShader::TileMode repeatY = info[4]->BooleanValue()?
                               SkShader::kRepeat_TileMode :
                               SkShader::kClamp_TileMode;

  SkMatrix matrix;
  matrix.setTranslate(SkIntToScalar(10), SkIntToScalar(0));

  // TODO: `src->surface->newImageSnapshot()` needs to be called upon creation
  //       of the pattern.  This will require another c++ class that wraps
  //       SkImage/SkShader
  //
  //       affects tests:
  //       - 2d.pattern.modify.canvas1
  //       - 2d.pattern.modify.canvas2

  sk_sp<SkImage> sourceImage(src->surface->makeImageSnapshot());
  sk_sp<SkShader> shader(sourceImage->makeShader(repeatX, repeatY, &matrix));

  ctx->paint.setShader(shader);
}

NAN_METHOD(Context2D::SetFillStyle) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  // Clear off the old shader
  ctx->paint.setShader(NULL);

  U8CPU a = info[3]->Uint32Value();
  U8CPU r = info[0]->Uint32Value();
  U8CPU g = info[1]->Uint32Value();
  U8CPU b = info[2]->Uint32Value();

  ctx->paint.setColor(SkColorSetARGBInline(a,r,g,b));
}

NAN_METHOD(Context2D::SetLinearGradientShader) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkPoint points[2] = {
    {
      SkDoubleToScalar(info[0]->NumberValue()),
      SkDoubleToScalar(info[1]->NumberValue())
    },
    {
      SkDoubleToScalar(info[2]->NumberValue()),
      SkDoubleToScalar(info[3]->NumberValue())
    }
  };

  SkColor* colors = NULL;
  SkScalar* offsets = NULL;


  if (info[4]->IsArray()) {
    Handle<Array> stops = Handle<Array>::Cast(info[4]);
    uint32_t stopCount = stops->Length();


    if (stopCount > 1) {

      colors = new SkColor[stopCount];
      offsets = new SkScalar[stopCount];

      Handle<Object> item;
      Handle<Array> color;

      for (uint32_t stop = 0; stop < stopCount; stop++) {
        item = stops->Get(stop)->ToObject();

        offsets[stop] = SkDoubleToScalar(
          item->Get(Nan::New("offset").ToLocalChecked())->NumberValue()
        );

        color = Handle<Array>::Cast(item->Get(Nan::New("color").ToLocalChecked()));

        colors[stop] = SkColorSetARGB(color->Get(3)->Uint32Value() & 0xff,
                                      color->Get(0)->Uint32Value() & 0xff,
                                      color->Get(1)->Uint32Value() & 0xff,
                                      color->Get(2)->Uint32Value() & 0xff);
      }


      sk_sp<SkShader> gradientShader = SkGradientShader::MakeLinear(
        points,
        colors,
        offsets,
        stopCount,
        SkShader::kRepeat_TileMode
      );

      ctx->paint.setShader(gradientShader);

      delete[] colors;
      delete[] offsets;

      // gradientShader->unref();
    }
  }
}

NAN_METHOD(Context2D::SetRadialGradientShader) {
   Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkPoint start = {
    SkDoubleToScalar(info[0]->NumberValue()),
    SkDoubleToScalar(info[1]->NumberValue())
  };

  SkScalar startRadius = SkDoubleToScalar(info[2]->NumberValue());

  SkPoint end = {
    SkDoubleToScalar(info[3]->NumberValue()),
    SkDoubleToScalar(info[4]->NumberValue())
  };

  SkScalar endRadius = SkDoubleToScalar(info[5]->NumberValue());


  SkColor* colors = NULL;
  SkScalar* offsets = NULL;


  if (info[6]->IsArray()) {
    Handle<Array> stops = Handle<Array>::Cast(info[6]);
    uint32_t stopCount = stops->Length();

    if (stopCount > 1) {

      colors = new SkColor[stopCount];
      offsets = new SkScalar[stopCount];

      Handle<Object> item;
      Handle<Array> color;

      for (uint32_t stop = 0; stop < stopCount; stop++) {
        item = stops->Get(stop)->ToObject();

        offsets[stop] = SkDoubleToScalar(
          item->Get(Nan::New("offset").ToLocalChecked())->NumberValue()
        );

        color = Handle<Array>::Cast(item->Get(Nan::New("color").ToLocalChecked()));

        colors[stop] = SkColorSetARGB(color->Get(3)->Uint32Value() & 0xff,
                                      color->Get(0)->Uint32Value() & 0xff,
                                      color->Get(1)->Uint32Value() & 0xff,
                                      color->Get(2)->Uint32Value() & 0xff);
      }

      sk_sp<SkShader> gradientShader = SkGradientShader::MakeTwoPointConical(
        start,
        startRadius,
        end,
        endRadius,
        colors,
        offsets,
        stopCount,
        SkShader::kClamp_TileMode
      );

      assert(gradientShader);

      ctx->paint.setShader(gradientShader);

      delete[] colors;
      delete[] offsets;

      // gradientShader->unref();

    }
  }
}

NAN_METHOD(Context2D::SetShadowOffsetX) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  ctx->shadowX = SkDoubleToScalar(info[0]->NumberValue());
}

NAN_METHOD(Context2D::SetShadowOffsetY) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  ctx->shadowY = SkDoubleToScalar(info[0]->NumberValue());
}

NAN_METHOD(Context2D::SetShadowBlur) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  ctx->shadowBlur = SkDoubleToScalar(info[0]->NumberValue());
}

NAN_METHOD(Context2D::SetShadowColor) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  // Clear off the old shader
  ctx->shadowPaint.setShader(NULL);

  U8CPU a = info[3]->Uint32Value();
  U8CPU r = info[0]->Uint32Value();
  U8CPU g = info[1]->Uint32Value();
  U8CPU b = info[2]->Uint32Value();

  ctx->shadowPaint.setColor(SkColorSetARGBInline(a,r,g,b));
}

NAN_METHOD(Context2D::ClearRect) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  SkCanvas *canvas = ctx->canvas;

  SkScalar x = SkDoubleToScalar(info[0]->NumberValue());
  SkScalar y = SkDoubleToScalar(info[1]->NumberValue());
  SkScalar w = SkDoubleToScalar(info[2]->NumberValue());
  SkScalar h = SkDoubleToScalar(info[3]->NumberValue());

  canvas->save();
  SkPaint clearPaint;
  clearPaint.setColor(SkColorSetARGBInline(0, 0, 0, 0));
  clearPaint.setXfermodeMode(SkXfermode::kSrc_Mode);

  ctx->canvas->drawRectCoords(
    x,
    y,
    x+w,
    y+h,
    clearPaint
  );

  canvas->restore();
}

NAN_METHOD(Context2D::FillRect) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkRect rect = SkRect::MakeXYWH(
    SkDoubleToScalar(info[0]->NumberValue()),
    SkDoubleToScalar(info[1]->NumberValue()),
    SkDoubleToScalar(info[2]->NumberValue()),
    SkDoubleToScalar(info[3]->NumberValue())
  );

  SkPaint p, spaint(ctx->paint);
  p.setXfermodeMode(ctx->globalCompositeOperation);
  p.setAlpha(ctx->globalAlpha);

  int count = 0;

  if (ctx->setupShadow(&spaint)) {
    count = ctx->canvas->saveLayer(NULL, &p);
    ctx->canvas->drawRect(rect, spaint);
    ctx->canvas->drawRect(rect, ctx->shadowPaint);
    ctx->canvas->restoreToCount(count);
  }

  count = ctx->canvas->saveLayer(NULL, &p);
  ctx->canvas->drawRect(rect, ctx->paint);
  ctx->canvas->restoreToCount(count);
}

NAN_METHOD(Context2D::StrokeRect) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkScalar x = SkDoubleToScalar(info[0]->NumberValue());
  SkScalar y = SkDoubleToScalar(info[1]->NumberValue());
  SkScalar w = SkDoubleToScalar(info[2]->NumberValue());
  SkScalar h = SkDoubleToScalar(info[3]->NumberValue());

  SkPaint p(ctx->strokePaint);
  p.setXfermodeMode(ctx->globalCompositeOperation);
  p.setAlpha(ctx->globalAlpha);

  SkScalar bx = (x < 0) ? x : 0;
  SkScalar by = (y < 0) ? y : 0;

  int dw = ctx->canvas->getDevice()->width();
  int dh = ctx->canvas->getDevice()->height();

  SkScalar bw = w + x > dw ? w + x : dw;
  SkScalar bh = h + y > dh ? h + y : dh;

  // TODO: apply transform to strokeWidth

  SkRect bounds = {
    bx, by, bw, bh
  };

  int count = ctx->canvas->saveLayer(&bounds, &p);

  if (!h || !w) {
    SkPath subpath;
    subpath.moveTo(x, y);
    if (!w) {
      subpath.lineTo(x, y+h);
    } else {
      subpath.lineTo(x+w, y);
    }

    ctx->path.addPath(subpath);

    SkPaint p(ctx->strokePaint);

    if (p.getStrokeJoin() == SkPaint::kRound_Join) {
      p.setStrokeCap(SkPaint::kRound_Cap);
    } else if (p.getStrokeJoin() == SkPaint::kMiter_Join) {
      p.setStrokeCap(SkPaint::kButt_Cap);
    }

    ctx->canvas->drawPath(ctx->path, p);

  } else {

    SkPaint spaint(ctx->strokePaint);

    // TODO: in order to do this properly, it needs to be done like
    //       fillRect
    ctx->setupShadow(&spaint);

    ctx->canvas->drawRectCoords(x,y,x+w, y+h, spaint);
  }

  ctx->canvas->restoreToCount(count);
}

NAN_METHOD(Context2D::BeginPath) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  ctx->path.rewind();
}

NAN_METHOD(Context2D::Fill) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  ctx->canvas->save();
  ctx->canvas->resetMatrix();

  ctx->canvas->drawPath(ctx->path, ctx->paint);

  ctx->canvas->restore();
}

NAN_METHOD(Context2D::Stroke) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkPaint stroke(ctx->strokePaint);
  SkMatrix im, m = ctx->canvas->getTotalMatrix();

  assert(m.invert(&im));

  SkPaint layerPaint;
  layerPaint.setXfermodeMode(ctx->globalCompositeOperation);
  layerPaint.setAlpha(ctx->globalAlpha);

  SkPath fillPath;
  bool fill = false;

  if (!ctx->path.isLine(NULL) && (im.getScaleX() > 1 || im.getScaleY() > 1)) {
    fill = stroke.getFillPath(ctx->path, &fillPath);
  }

  int count = ctx->canvas->saveLayer(NULL, &layerPaint);

    // TODO: in order to do this properly, it needs to be done like
    //       fillRect
    ctx->setupShadow(&stroke);
    if (fill) {
      fillPath.transform(im);
      ctx->canvas->drawPath(fillPath, stroke);
    } else {
      ctx->path.transform(im);
      ctx->canvas->drawPath(ctx->path, stroke);
    }
  ctx->canvas->restoreToCount(count);
}

NAN_METHOD(Context2D::Clip) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  ctx->canvas->clipPath(ctx->path, SkRegion::kIntersect_Op, true);
}

NAN_METHOD(Context2D::IsPointInPath) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkScalar x = SkDoubleToScalar(info[0]->NumberValue());
  SkScalar y = SkDoubleToScalar(info[1]->NumberValue());

  SkRect bounds = ctx->path.getBounds();
  SkScalar d = 0.00001f;
  if (bounds.left() >= x) {
    x+=d;
  } else if (bounds.right() <= x) {
    x-=d;
  }

  if (bounds.top() >= y) {
    y+=d;
  } else if (bounds.bottom() <= y) {
    y-=d;
  }

  bool contained = ctx->path.contains(x, y);

  info.GetReturnValue().Set(Nan::New(contained));
}

NAN_METHOD(Context2D::ClosePath) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  ctx->path.close();
}

NAN_METHOD(Context2D::MoveTo) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkPoint pt;

  SkMatrix m = ctx->canvas->getTotalMatrix();
  m.mapXY(
    SkDoubleToScalar(info[0]->NumberValue()),
    SkDoubleToScalar(info[1]->NumberValue()),
    &pt
  );

  ctx->path.moveTo(pt);
}

NAN_METHOD(Context2D::LineTo) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkMatrix m = ctx->canvas->getTotalMatrix();

  SkPoint pt;
  m.mapXY(
    SkDoubleToScalar(info[0]->NumberValue()),
    SkDoubleToScalar(info[1]->NumberValue()),
    &pt
  );

  if (ctx->path.isEmpty()) {
    ctx->path.moveTo(pt);
  }

  ctx->path.lineTo(pt);
}

NAN_METHOD(Context2D::QuadraticCurveTo) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkScalar cpx = SkDoubleToScalar(info[0]->NumberValue());
  SkScalar cpy = SkDoubleToScalar(info[1]->NumberValue());
  SkScalar x = SkDoubleToScalar(info[2]->NumberValue());
  SkScalar y = SkDoubleToScalar(info[3]->NumberValue());

  SkMatrix m = ctx->canvas->getTotalMatrix();
  SkPoint cp, p;

  m.mapXY(cpx, cpy, &cp);
  m.mapXY(x, y, &p);


  if (ctx->path.isEmpty()) {
    ctx->path.moveTo(cp);
  }

  ctx->path.quadTo(cp, p);
}

NAN_METHOD(Context2D::BezierCurveTo) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkScalar x1 = SkDoubleToScalar(info[0]->NumberValue());
  SkScalar y1 = SkDoubleToScalar(info[1]->NumberValue());
  SkScalar x2 = SkDoubleToScalar(info[2]->NumberValue());
  SkScalar y2 = SkDoubleToScalar(info[3]->NumberValue());
  SkScalar x3 = SkDoubleToScalar(info[4]->NumberValue());
  SkScalar y3 = SkDoubleToScalar(info[5]->NumberValue());

  SkMatrix m = ctx->canvas->getTotalMatrix();

  SkPoint pt, p1, p2, p3;

  m.mapXY(x1, y1, &p1);
  m.mapXY(x2, y2, &p2);
  m.mapXY(x3, y3, &p3);

  if (!ctx->path.getLastPt(&pt)) {
    ctx->path.moveTo(x1, y1);
  } else {
    ctx->path.moveTo(pt);
  }

  ctx->path.cubicTo(p1, p2, p3);
}

NAN_METHOD(Context2D::ArcTo) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkMatrix m(ctx->canvas->getTotalMatrix());

  SkScalar tx = m.getTranslateX();
  SkScalar ty = m.getTranslateY();
  SkScalar sx = m.getScaleX();
  SkScalar sy = m.getScaleY();

  SkScalar x1 = SkDoubleToScalar(info[0]->NumberValue() * sx) + tx;
  SkScalar y1 = SkDoubleToScalar(info[1]->NumberValue() * sy) + ty;
  SkScalar x2 = SkDoubleToScalar(info[2]->NumberValue() * sx) + tx;
  SkScalar y2 = SkDoubleToScalar(info[3]->NumberValue() * sy) + ty;
  SkScalar r = SkDoubleToScalar(info[4]->NumberValue());

  if (sx != 1 && sy != 1) {
    r = m.mapRadius(r);
  } else if (sx != 1) {
    r = sx * r;
  } else {
    r = sy * r;
  }

  SkPoint pt;

  bool hasPoint = ctx->path.getLastPt(&pt);
  if (pt.equals(x1, y1)) {
  } else if (!hasPoint) {
    ctx->path.moveTo(x1, y1);
  } else {

    ctx->path.arcTo(x1, y1, x2, y2, r);
    if (sx != 1 || sy != 1) {
      ctx->path.lineTo(x2, y2);
    }
  }
}

NAN_METHOD(Context2D::Rect) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkScalar x = SkDoubleToScalar(info[0]->NumberValue());
  SkScalar y = SkDoubleToScalar(info[1]->NumberValue());
  SkScalar w = SkDoubleToScalar(info[2]->NumberValue());
  SkScalar h = SkDoubleToScalar(info[3]->NumberValue());

  SkMatrix m = ctx->canvas->getTotalMatrix();
  SkPath subpath;
  subpath.addRect(SkRect::MakeXYWH(x, y, w, h));
  subpath.transform(m);
  ctx->path.addPath(subpath);
}

NAN_METHOD(Context2D::Arc) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  SkMatrix m = ctx->canvas->getTotalMatrix();

  SkScalar x = SkDoubleToScalar(info[0]->NumberValue());
  SkScalar y = SkDoubleToScalar(info[1]->NumberValue());
  SkScalar r = SkDoubleToScalar(info[2]->NumberValue());
  SkScalar sa = SkDoubleToScalar(info[3]->NumberValue());
  SkScalar ea = SkDoubleToScalar(info[4]->NumberValue());
  bool ccw = info[5]->BooleanValue();


  SkPoint pt;
  m.mapXY(x, y, &pt);

  if (!ctx->path.isEmpty()) {
    ctx->path.lineTo(pt);
  }

  SkRect rect;
  m.mapRect(&rect, SkRect::MakeLTRB(x-r, y-r, x+r, y+r));

  if (!ccw) {
    if (sa > ea+TAU) {
      ea = fmod(ea, (SkScalar)TAU);
	  sa = fmod(sa, (SkScalar)TAU);
    }
  } else {
    if (ea > sa+TAU) {
	  ea = fmod(ea, (SkScalar)TAU);
	  sa = fmod(sa, (SkScalar)TAU);
    }
  }

  SkScalar diff = ea-sa;
  if (diff > TAU) {
	diff = fmod(diff, (SkScalar)TAU);
  }

  SkScalar startDegrees = fmod((SkScalar)DEGREES(sa), 360.0f);
  SkScalar sweepDegrees = (SkScalar)DEGREES(diff);

  if (sweepDegrees == 0 || sweepDegrees >= 360 || sweepDegrees <= -360 || ea > sa+TAU) {
    ctx->path.arcTo(rect, startDegrees, 0, false);
    ctx->path.addOval(
      rect,
      ccw ? SkPath::kCCW_Direction : SkPath::kCW_Direction
    );

    ctx->path.arcTo(rect, startDegrees + sweepDegrees, 0, true);

  } else {

    sweepDegrees = fmodf(sweepDegrees, 360);

    if (ccw && sweepDegrees >= 0) {
      sweepDegrees -= 360;
    } else if (!ccw && sweepDegrees <= 0) {
      sweepDegrees += 360;
    }
    ctx->path.arcTo(rect, startDegrees, sweepDegrees, false);
  }
}

NAN_METHOD(Context2D::Ellipse) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
}

NAN_METHOD(Context2D::FillText) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  String::Utf8Value string(info[0]);
  SkScalar x = SkDoubleToScalar(info[1]->NumberValue());
  SkScalar y = SkDoubleToScalar(info[2]->NumberValue());
  size_t length = string.length();

  if (!info[3]->IsUndefined()) {
    SkScalar maxWidth = SkDoubleToScalar(info[3]->NumberValue());
    length = ctx->paint.breakText(*string, length, maxWidth);
  }

  ctx->canvas->drawText(*string, length, x, y, ctx->paint);
}

NAN_METHOD(Context2D::StrokeText) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  String::Utf8Value string(info[0]);
  SkScalar x = SkDoubleToScalar(info[1]->NumberValue());
  SkScalar y = SkDoubleToScalar(info[2]->NumberValue());
  size_t length = string.length();

  if (!info[3]->IsUndefined()) {
    SkScalar maxWidth = SkDoubleToScalar(info[3]->NumberValue());
    length = ctx->strokePaint.breakText(*string, length, maxWidth);
  }

  ctx->canvas->drawText(*string, length, x, y, ctx->strokePaint);
}

NAN_METHOD(Context2D::MeasureText) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  String::Utf8Value string(info[0]);

  SkRect bounds;

  SkScalar width = ctx->paint.measureText(
    *string,
    string.length(),
    &bounds
    // TODO: scale
  );

  Local<Object> obj = Nan::New<Object>();
  obj->Set(Nan::New("width").ToLocalChecked(), Nan::New(width));
  obj->Set(Nan::New("height").ToLocalChecked(), Nan::New(bounds.height()));

  info.GetReturnValue().Set(obj);
}

NAN_METHOD(Context2D::SetFont) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  bool isBold = info[1]->BooleanValue();
  bool isItalic = info[2]->BooleanValue();

  SkScalar fontSize = SkDoubleToScalar(info[3]->NumberValue());
  ctx->paint.setTextSize(fontSize);
  ctx->strokePaint.setTextSize(fontSize);

  SkTypeface::Style style = SkTypeface::kNormal;

  if (isBold && isItalic) {
    style = SkTypeface::kBoldItalic;
  } else if (isBold) {
    style = SkTypeface::kBold;
  } else if (isItalic) {
    style = SkTypeface::kItalic;
  }

  SkTypeface *face = NULL;

  if (info[0]->IsString()) {
    String::Utf8Value family(info[0]);
    face = SkTypeface::CreateFromName(*family, style);
  } else if (info[0]->IsNumber()) {
    SkFontID id = info[0]->Uint32Value();
    face = ctx->typeFaceCache.findByProcAndRef(findFontByUniqueId, &id);
  }

  if (face) {
    ctx->paint.setTypeface(face);
    ctx->strokePaint.setTypeface(face);
  }
}

NAN_METHOD(Context2D::SetTextAlign) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkPaint::Align align = (SkPaint::Align)info[0]->IntegerValue();
  ctx->paint.setTextAlign(align);
  ctx->strokePaint.setTextAlign(align);
}

NAN_METHOD(Context2D::GetTextBaseline) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
}

NAN_METHOD(Context2D::SetTextBaseline) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
}

NAN_METHOD(Context2D::AddFont) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  Local<Object> buffer_obj = info[0]->ToObject();
  char *buffer_data = Buffer::Data(buffer_obj);
  size_t buffer_length = Buffer::Length(buffer_obj);

  SkData *data = SkData::NewWithCopy((void *)buffer_data, buffer_length);
  SkMemoryStream stream(data);
  SkTypeface* face = SkTypeface::CreateFromStream((SkStreamAsset *)&stream);

  ctx->typeFaceCache.add(face);

  data->unref();

  info.GetReturnValue().Set(Nan::New(face->uniqueID()));
}

NAN_METHOD(Context2D::DrawImageBuffer) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  Local<Object> buffer_obj = info[0]->ToObject();
  char *buffer_data = Buffer::Data(buffer_obj);

  SkScalar sx = SkDoubleToScalar(info[1]->NumberValue());
  SkScalar sy = SkDoubleToScalar(info[2]->NumberValue());
  SkScalar sw = SkDoubleToScalar(info[3]->NumberValue());
  SkScalar sh = SkDoubleToScalar(info[4]->NumberValue());
  SkScalar dx = SkDoubleToScalar(info[5]->NumberValue());
  SkScalar dy = SkDoubleToScalar(info[6]->NumberValue());
  SkScalar dw = SkDoubleToScalar(info[7]->NumberValue());
  SkScalar dh = SkDoubleToScalar(info[8]->NumberValue());
  int32_t w  = info[9]->Int32Value();
  int32_t h  = info[10]->Int32Value();

  SkBitmap src;
  src.setInfo(SkImageInfo::Make(w, h, kRGBA_8888_SkColorType, kPremul_SkAlphaType));
  src.allocPixels();
  src.setPixels(buffer_data);

  const SkRect srcRect = { sx, sy, sx+sw, sy+sh };
  SkRect destRect = { dx, dy, dx+dw, dy+dh };
  const SkISize canvasSize = ctx->canvas->getBaseLayerSize();
  SkRect bounds = {
    0, 0,
    SkIntToScalar(canvasSize.width()),
    SkIntToScalar(canvasSize.height())
  };

  SkPaint layerPaint, spaint;
  layerPaint.setXfermodeMode(ctx->globalCompositeOperation);
  layerPaint.setAlpha(ctx->globalAlpha);

  // TODO: in order to do this properly, it needs to be done like
  //       fillRect
  ctx->setupShadow(&spaint);
  int count = ctx->canvas->saveLayer(&bounds, &layerPaint);
    ctx->canvas->drawBitmapRect(
      src,
      srcRect,
      destRect,
      &spaint,
      SkCanvas::kFast_SrcRectConstraint
  );

  ctx->canvas->restoreToCount(count);
}

NAN_METHOD(Context2D::DrawCanvas) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  Context2D *src = ObjectWrap::Unwrap<Context2D>(info[0]->ToObject());

  SkScalar sx = SkDoubleToScalar(info[1]->NumberValue());
  SkScalar sy = SkDoubleToScalar(info[2]->NumberValue());
  SkScalar sw = SkDoubleToScalar(info[3]->NumberValue());
  SkScalar sh = SkDoubleToScalar(info[4]->NumberValue());
  SkScalar dx = SkDoubleToScalar(info[5]->NumberValue());
  SkScalar dy = SkDoubleToScalar(info[6]->NumberValue());
  SkScalar dw = SkDoubleToScalar(info[7]->NumberValue());
  SkScalar dh = SkDoubleToScalar(info[8]->NumberValue());

  const SkRect srcRect = { sx, sy, sx+sw, sy+sh };
  SkRect destRect = { dx, dy, dx+dw, dy+dh };
  const SkISize canvasSize = ctx->canvas->getBaseLayerSize();
  SkRect bounds = {
    0, 0,
    SkIntToScalar(canvasSize.width()),
    SkIntToScalar(canvasSize.height())
  };

  SkPaint layerPaint, spaint;
  layerPaint.setXfermodeMode(ctx->globalCompositeOperation);
  layerPaint.setAlpha(ctx->globalAlpha);

  // TODO: in order to do this properly, it needs to be done like
  //       fillRect
  ctx->setupShadow(&spaint);
  int count = ctx->canvas->saveLayer(&bounds, &layerPaint);

  sk_sp<SkImage> image = src->surface->makeImageSnapshot(SkBudgeted::kYes);
  ctx->canvas->drawImageRect(image.get(), srcRect, destRect, &spaint);

  ctx->canvas->restoreToCount(count);
}

NAN_METHOD(Context2D::CreateImageData) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
}

NAN_METHOD(Context2D::GetImageData) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  int32_t sx = info[0]->Int32Value();
  int32_t sy = info[1]->Int32Value();
  int32_t sw = info[2]->Int32Value();
  int32_t sh = info[3]->Int32Value();

  ctx->canvas->flush();
  SkBitmap masterBitmap = ctx->canvas->getDevice()->accessBitmap(false);

  masterBitmap.lockPixels();

  size_t size = sw*sh*4;
  void *data = malloc(size);
  SkColor *buffer_ptr = (SkColor *)data;

  int32_t loc = 0;
  SkColor current;
  for (int32_t y = sy; y<sh+sy; y++) {
    for (int32_t x = sx; x<sw+sx; x++) {
      current = masterBitmap.getColor(x, y);
      buffer_ptr[loc++] = SkColorSetARGBInline(
        SkColorGetA(current),
        SkColorGetB(current),
        SkColorGetG(current),
        SkColorGetR(current)
      );
    }
  }

  masterBitmap.unlockPixels();

// TODO: consider using masterBitmap.extractSubset
//       tried it before, but had issues with it pulling
//       the full row of pixels instead of a subset.
//  Also tried with SkPixelRef directly with the same result.
//  Perhaps using the GPU device will help with this?

  Local<Object> obj = Nan::New<Object>();
  obj->Set(Nan::New("width").ToLocalChecked(), Nan::New(sw));
  obj->Set(Nan::New("height").ToLocalChecked(), Nan::New(sh));
  obj->Set(Nan::New("data").ToLocalChecked(), Nan::NewBuffer((char *)data, size).ToLocalChecked());

  info.GetReturnValue().Set(obj);
}

NAN_METHOD(Context2D::PutImageData) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  Local<Object> buffer_obj = info[0]->ToObject();
  SkColor *buffer_ptr = (SkColor *)Buffer::Data(buffer_obj);
  size_t buffer_length = Buffer::Length(buffer_obj);

  int32_t sx = info[1]->Int32Value();
  int32_t sy = info[2]->Int32Value();
  int32_t dx = info[3]->Int32Value();
  int32_t dy = info[4]->Int32Value();
  int32_t dw = info[5]->Int32Value();
  int32_t dh = info[6]->Int32Value();
  int32_t w  = info[7]->Int32Value();

  ctx->canvas->flush();

  SkBitmap bitmap = ctx->canvas->getDevice()->accessBitmap(true);
  bitmap.lockPixels();
  SkColor *dest;

  size_t loc = 0;
  SkColor current;

  for (int32_t cy = 0; cy<dh; cy++) {
    for (int32_t cx = 0; cx<dw; cx++) {

      dest = (SkColor *)bitmap.getAddr(cx+dx+sx, cy+dy+sy);

      loc = (dy + cy)*w + dx + cx;

      assert(loc < buffer_length);

      current = buffer_ptr[loc];

      *dest = SkPreMultiplyARGB(
        SkColorGetA(current),
        SkColorGetB(current),
        SkColorGetG(current),
        SkColorGetR(current)
      );
    }
  }

  bitmap.unlockPixels();
}

NAN_METHOD(Context2D::SetLineWidth) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
  ctx->strokePaint.setStrokeWidth(SkDoubleToScalar(info[0]->NumberValue()));

  ctx->defaultLineWidth = false;
}

NAN_METHOD(Context2D::SetLineCap) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  uint32_t c = info[0]->Uint32Value();
  ctx->strokePaint.setStrokeCap((SkPaint::Cap)c);
}

NAN_METHOD(Context2D::SetLineJoin) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  uint32_t j = info[0]->Uint32Value();
  ctx->strokePaint.setStrokeJoin((SkPaint::Join)j);
}

NAN_METHOD(Context2D::GetMiterLimit) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
}

NAN_METHOD(Context2D::SetMiterLimit) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());

  SkScalar limit = SkDoubleToScalar(info[0]->NumberValue());

  ctx->strokePaint.setStrokeMiter(limit);
}

NAN_METHOD(Context2D::SetLineDash) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
}

NAN_METHOD(Context2D::GetLineDash) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
}

NAN_METHOD(Context2D::SetLineDashOffset) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
}

NAN_METHOD(Context2D::GetLineDashOffset) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.Holder());
}

