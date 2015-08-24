// TODO: remove this
#define SK_SUPPORT_LEGACY_GETDEVICE

#include <node.h>
#include <node_buffer.h>
#include <nan.h>

#define _USE_MATH_DEFINES 1

#include "context2d.h"
#include <SkSurface.h>
#include <SkPaint.h>
#include <SkPath.h>
#include <SkError.h>
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
#include <SkTypefaceCache.h>
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

void Context2D::Init(Local<Object> exports) {
  SkAutoGraphics ag;

  Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Context2D").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Non-standard
  Nan::SetPrototypeMethod(tpl, "toPngBuffer", ToPngBuffer);
  Nan::SetPrototypeMethod(tpl, "dumpState", DumpState);
  Nan::SetPrototypeMethod(tpl, "toBuffer", ToBuffer);
  Nan::SetPrototypeMethod(tpl, "getPixel", GetPixel);
  Nan::SetPrototypeMethod(tpl, "resize", Resize);
  Nan::SetPrototypeMethod(tpl, "addFont", AddFont);


  // Standard
  Nan::SetPrototypeMethod(tpl, "save", Save);
  Nan::SetPrototypeMethod(tpl, "restore", Restore);
  Nan::SetPrototypeMethod(tpl, "scale", Scale);
  Nan::SetPrototypeMethod(tpl, "rotate", Rotate);
  Nan::SetPrototypeMethod(tpl, "translate", Translate);
  Nan::SetPrototypeMethod(tpl, "transform", Transform);
  Nan::SetPrototypeMethod(tpl, "resetMatrix", ResetMatrix);
  Nan::SetPrototypeMethod(tpl, "setGlobalAlpha", SetGlobalAlpha);
  Nan::SetPrototypeMethod(tpl, "setGlobalCompositeOperation", SetGlobalCompositeOperation);
  Nan::SetPrototypeMethod(tpl, "setImageSmoothingEnabled", SetImageSmoothingEnabled);
  Nan::SetPrototypeMethod(tpl, "getImageSmoothingEnabled", GetImageSmoothingEnabled);
  Nan::SetPrototypeMethod(tpl, "setStrokeStyle", SetStrokeStyle);
  Nan::SetPrototypeMethod(tpl, "setFillStylePattern", SetFillStylePattern);
  Nan::SetPrototypeMethod(tpl, "setFillStylePatternCanvas", SetFillStylePatternCanvas);
  Nan::SetPrototypeMethod(tpl, "setFillStyle", SetFillStyle);
  Nan::SetPrototypeMethod(tpl, "setLinearGradientShader", SetLinearGradientShader);
  Nan::SetPrototypeMethod(tpl, "setRadialGradientShader", SetRadialGradientShader);
  Nan::SetPrototypeMethod(tpl, "setShadowOffsetX", SetShadowOffsetX);
  Nan::SetPrototypeMethod(tpl, "setShadowOffsetY", SetShadowOffsetY);
  Nan::SetPrototypeMethod(tpl, "setShadowBlur", SetShadowBlur);
  Nan::SetPrototypeMethod(tpl, "setShadowColor", SetShadowColor);
  Nan::SetPrototypeMethod(tpl, "clearRect", ClearRect);
  Nan::SetPrototypeMethod(tpl, "fillRect", FillRect);
  Nan::SetPrototypeMethod(tpl, "strokeRect", StrokeRect);
  Nan::SetPrototypeMethod(tpl, "beginPath", BeginPath);
  Nan::SetPrototypeMethod(tpl, "fill", Fill);
  Nan::SetPrototypeMethod(tpl, "stroke", Stroke);
  Nan::SetPrototypeMethod(tpl, "clip", Clip);
  Nan::SetPrototypeMethod(tpl, "isPointInPath", IsPointInPath);
  Nan::SetPrototypeMethod(tpl, "closePath", ClosePath);
  Nan::SetPrototypeMethod(tpl, "moveTo", MoveTo);
  Nan::SetPrototypeMethod(tpl, "lineTo", LineTo);
  Nan::SetPrototypeMethod(tpl, "quadraticCurveTo", QuadraticCurveTo);
  Nan::SetPrototypeMethod(tpl, "bezierCurveTo", BezierCurveTo);
  Nan::SetPrototypeMethod(tpl, "arcTo", ArcTo);
  Nan::SetPrototypeMethod(tpl, "rect", Rect);
  Nan::SetPrototypeMethod(tpl, "arc", Arc);
  Nan::SetPrototypeMethod(tpl, "ellipse", Ellipse);
  Nan::SetPrototypeMethod(tpl, "fillText", FillText);
  Nan::SetPrototypeMethod(tpl, "strokeText", StrokeText);
  Nan::SetPrototypeMethod(tpl, "measureText", MeasureText);
  Nan::SetPrototypeMethod(tpl, "setFont", SetFont);
  Nan::SetPrototypeMethod(tpl, "setTextAlign", SetTextAlign);
  Nan::SetPrototypeMethod(tpl, "getTextBaseline", GetTextBaseline);
  Nan::SetPrototypeMethod(tpl, "setTextBaseline", SetTextBaseline);
  Nan::SetPrototypeMethod(tpl, "drawImageBuffer", DrawImageBuffer);
  Nan::SetPrototypeMethod(tpl, "drawCanvas", DrawCanvas);
  Nan::SetPrototypeMethod(tpl, "createImageData", CreateImageData);
  Nan::SetPrototypeMethod(tpl, "getImageData", GetImageData);
  Nan::SetPrototypeMethod(tpl, "putImageData", PutImageData);
  Nan::SetPrototypeMethod(tpl, "setLineWidth", SetLineWidth);
  Nan::SetPrototypeMethod(tpl, "setLineCap", SetLineCap);
  Nan::SetPrototypeMethod(tpl, "setLineJoin", SetLineJoin);
  Nan::SetPrototypeMethod(tpl, "getMiterLimit", GetMiterLimit);
  Nan::SetPrototypeMethod(tpl, "setMiterLimit", SetMiterLimit);
  Nan::SetPrototypeMethod(tpl, "setLineDash", SetLineDash);
  Nan::SetPrototypeMethod(tpl, "getLineDash", GetLineDash);
  Nan::SetPrototypeMethod(tpl, "setLineDashOffset", SetLineDashOffset);
  Nan::SetPrototypeMethod(tpl, "getLineDashOffset", GetLineDashOffset);

  Local<Function> constructor = Nan::New(tpl->GetFunction());
  exports->Set(Nan::New("Context2D").ToLocalChecked(), constructor);

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

    SkDrawLooper* dl = SkBlurDrawLooper::Create(
      c,
      this->shadowBlur,
      this->shadowX,
      this->shadowY,
      SkBlurDrawLooper::kAll_BlurFlag | SkBlurDrawLooper::kOverrideColor_BlurFlag | SkBlurDrawLooper::kIgnoreTransform_BlurFlag
    );
    SkSafeUnref(paint->setLooper(dl));


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
  this->surface.reset(SkSurface::NewRaster(info));
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

void Context2D::New(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D* context = new Context2D(
    info[0]->Uint32Value(),
    info[1]->Uint32Value()
  );

  context->Wrap(info.This());
  info.GetReturnValue().Set(info.This());
}

void Context2D::Resize(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  int width = info[0]->Uint32Value() & 0xff;
  int height = info[1]->Uint32Value() & 0xff;

  ctx->resizeCanvas(width, height);
}

void Context2D::DumpState(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
  SkMatrix44 matrix(ctx->canvas->getTotalMatrix());
  matrix.dump();
  ctx->path.dump();
}

void Context2D::GetPixel(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::ToPngBuffer(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  ctx->canvas->flush();
  SkBitmap bitmap = ctx->canvas->getDevice()->accessBitmap(false);
  size_t size = bitmap.getSize();

  void *data = malloc(size);
  SkMemoryWStream stream(data, size);
  SkImageEncoder::EncodeStream(&stream, bitmap, SkImageEncoder::kPNG_Type, 100);

  Nan::MaybeLocal<v8::Object> buffer = Nan::NewBuffer((char *)data, size);

  info.GetReturnValue().Set(buffer.ToLocalChecked());
}


void Context2D::ToBuffer(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());


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


void Context2D::Save(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  ctx->canvas->save();
}

void Context2D::Restore(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  ctx->canvas->restore();
}

void Context2D::Scale(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  if (!info[0]->IsUndefined() && !info[1]->IsUndefined()) {
    ctx->canvas->scale(
      SkDoubleToScalar(info[0]->NumberValue()),
      SkDoubleToScalar(info[1]->NumberValue())
    );
  }
}

void Context2D::Rotate(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  if (!info[0]->IsUndefined()) {
    SkScalar rads = SkDoubleToScalar(DEGREES(info[0]->NumberValue()));
    ctx->canvas->rotate(rads);
  }
}

void Context2D::Translate(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  if (!info[0]->IsUndefined() && !info[0]->IsUndefined()) {
    SkScalar x = SkDoubleToScalar(info[0]->NumberValue());
    SkScalar y = SkDoubleToScalar(info[1]->NumberValue());

    ctx->canvas->translate(x, y);
  }
}

void Context2D::Transform(const Nan::FunctionCallbackInfo<Value>& info) {
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

    Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

    ctx->canvas->concat(m);
  }
}

void Context2D::ResetMatrix(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
  ctx->canvas->resetMatrix();
}

void Context2D::SetGlobalAlpha(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());\

  ctx->globalAlpha = (uint8_t)(info[0]->NumberValue()*255);

  if (ctx->globalAlpha > 255) {
    ctx->globalAlpha = 255;
  } else if (ctx->globalAlpha < 0) {
    ctx->globalAlpha = 0;
  }
}

void Context2D::SetGlobalCompositeOperation(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
  ctx->globalCompositeOperation = (SkXfermode::Mode)info[0]->IntegerValue();
}

void Context2D::SetImageSmoothingEnabled(const Nan::FunctionCallbackInfo<Value>& info) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
}

void Context2D::GetImageSmoothingEnabled(const Nan::FunctionCallbackInfo<Value>& info) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
}

void Context2D::SetStrokeStyle(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  // Clear off the old shader
  ctx->strokePaint.setShader(NULL);

  U8CPU a = (U8CPU)info[3]->Uint32Value();
  U8CPU r = (U8CPU)info[0]->Uint32Value();
  U8CPU g = (U8CPU)info[1]->Uint32Value();
  U8CPU b = (U8CPU)info[2]->Uint32Value();

  ctx->strokePaint.setColor(SkColorSetARGBInline(a,r,g,b));
}

void Context2D::SetFillStylePattern(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

  SkBitmapProcShader *shader = SkNEW_ARGS(SkBitmapProcShader, (src, repeatX, repeatY));
  ctx->paint.setShader(shader);
  shader->unref();
}

void Context2D::SetFillStylePatternCanvas(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
  Context2D *src = ObjectWrap::Unwrap<Context2D>(info[0]->ToObject());

  SkShader::TileMode repeatX = info[3]->BooleanValue() ?
                               SkShader::kRepeat_TileMode :
                               SkShader::kClamp_TileMode;

  SkShader::TileMode repeatY = info[4]->BooleanValue()?
                               SkShader::kRepeat_TileMode :
                               SkShader::kClamp_TileMode;

  SkMatrix matrix;
  matrix.setTranslate(SkIntToScalar(10), SkIntToScalar(0));

  SkAutoTUnref<SkImage> sourceImage(src->surface->newImageSnapshot());
  SkAutoTUnref<SkShader> shader(sourceImage->newShader(repeatX, repeatY, &matrix));

  ctx->paint.setShader(shader);
}

void Context2D::SetFillStyle(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  // Clear off the old shader
  ctx->paint.setShader(NULL);

  U8CPU a = info[3]->Uint32Value();
  U8CPU r = info[0]->Uint32Value();
  U8CPU g = info[1]->Uint32Value();
  U8CPU b = info[2]->Uint32Value();

  ctx->paint.setColor(SkColorSetARGBInline(a,r,g,b));
}

void Context2D::SetLinearGradientShader(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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


      SkShader *gradientShader = SkGradientShader::CreateLinear(
        points,
        colors,
        offsets,
        stopCount,
        SkShader::kRepeat_TileMode
      );

      ctx->paint.setShader(gradientShader);

      delete[] colors;
      delete[] offsets;

      gradientShader->unref();
    }
  }
}

void Context2D::SetRadialGradientShader(const Nan::FunctionCallbackInfo<Value>& info) {
   Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

      SkShader *gradientShader = SkGradientShader::CreateTwoPointConical(
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

      gradientShader->unref();

    }
  }
}

void Context2D::SetShadowOffsetX(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
  ctx->shadowX = SkDoubleToScalar(info[0]->NumberValue());
}

void Context2D::SetShadowOffsetY(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
  ctx->shadowY = SkDoubleToScalar(info[0]->NumberValue());
}

void Context2D::SetShadowBlur(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
  ctx->shadowBlur = SkDoubleToScalar(info[0]->NumberValue());
}

void Context2D::SetShadowColor(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  // Clear off the old shader
  ctx->shadowPaint.setShader(NULL);

  U8CPU a = info[3]->Uint32Value();
  U8CPU r = info[0]->Uint32Value();
  U8CPU g = info[1]->Uint32Value();
  U8CPU b = info[2]->Uint32Value();

  ctx->shadowPaint.setColor(SkColorSetARGBInline(a,r,g,b));
}

void Context2D::ClearRect(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
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

void Context2D::FillRect(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  SkRect rect = SkRect::MakeXYWH(
    SkDoubleToScalar(info[0]->NumberValue()),
	SkDoubleToScalar(info[1]->NumberValue()),
	SkDoubleToScalar(info[2]->NumberValue()),
	SkDoubleToScalar(info[3]->NumberValue())
  );

  SkPaint p, spaint(ctx->paint);
  p.setXfermodeMode(ctx->globalCompositeOperation);
  p.setAlpha(ctx->globalAlpha);

  int count;

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

void Context2D::StrokeRect(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::BeginPath(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
  ctx->path.rewind();
}

void Context2D::Fill(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  ctx->canvas->save();
  ctx->canvas->resetMatrix();

  ctx->canvas->drawPath(ctx->path, ctx->paint);

  ctx->canvas->restore();
}

void Context2D::Stroke(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::Clip(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  ctx->canvas->clipPath(ctx->path, SkRegion::kIntersect_Op, true);
}

void Context2D::IsPointInPath(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::ClosePath(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
  ctx->path.close();
}

void Context2D::MoveTo(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  SkMatrix m = ctx->canvas->getTotalMatrix();

  SkPoint pt;
  m.mapXY(
    SkDoubleToScalar(info[0]->NumberValue()),
    SkDoubleToScalar(info[1]->NumberValue()),
    &pt
  );

  ctx->path.moveTo(pt);
}

void Context2D::LineTo(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::QuadraticCurveTo(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::BezierCurveTo(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::ArcTo(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::Rect(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::Arc(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
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

void Context2D::Ellipse(const Nan::FunctionCallbackInfo<Value>& info) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
}

void Context2D::FillText(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::StrokeText(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::MeasureText(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
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

void Context2D::SetFont(const Nan::FunctionCallbackInfo<Value>& info) {
   Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());


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
//
   if (info[0]->IsString()) {
     String::Utf8Value family(info[0]);
     face = SkTypeface::CreateFromName(*family, style);
   } else if (info[0]->IsNumber()) {
       printf("wooops!\n");
     // SkFontID id = info[0]->Uint32Value();
     // face = SkTypefaceCache::FindByID(id);
   }
//
   if (face) {
     ctx->paint.setTypeface(face);
     ctx->strokePaint.setTypeface(face);
   }
}

void Context2D::SetTextAlign(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  SkPaint::Align align = (SkPaint::Align)info[0]->IntegerValue();
  ctx->paint.setTextAlign(align);
  ctx->strokePaint.setTextAlign(align);
}

void Context2D::GetTextBaseline(const Nan::FunctionCallbackInfo<Value>& info) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
}

void Context2D::SetTextBaseline(const Nan::FunctionCallbackInfo<Value>& info) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
}

void Context2D::AddFont(const Nan::FunctionCallbackInfo<Value>& info) {
  Local<Object> buffer_obj = info[0]->ToObject();
  char *buffer_data = Buffer::Data(buffer_obj);
  size_t buffer_length = Buffer::Length(buffer_obj);

  SkData *data = SkData::NewWithCopy((void *)buffer_data, buffer_length);
  SkStreamAsset *stream = SkNEW_ARGS(SkMemoryStream, (data));
  SkTypeface* face = SkTypeface::CreateFromStream(stream);

  SkTypefaceCache::Add(face, face->fontStyle());

  data->unref();

  info.GetReturnValue().Set(Nan::New(face->uniqueID()));
}

void Context2D::DrawImageBuffer(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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
    ctx->canvas->drawBitmapRectToRect(src, &srcRect, destRect, &spaint);
  ctx->canvas->restoreToCount(count);
}

void Context2D::DrawCanvas(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

    SkImage* image = src->surface->newImageSnapshot(SkSurface::kYes_Budgeted);
    ctx->canvas->drawImageRect(image, &srcRect, destRect, &spaint);

  ctx->canvas->restoreToCount(count);
}

void Context2D::CreateImageData(const Nan::FunctionCallbackInfo<Value>& info) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
}

void Context2D::GetImageData(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::PutImageData(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

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

void Context2D::SetLineWidth(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
  ctx->strokePaint.setStrokeWidth(SkDoubleToScalar(info[0]->NumberValue()));

  ctx->defaultLineWidth = false;
}

void Context2D::SetLineCap(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  uint32_t c = info[0]->Uint32Value();
  ctx->strokePaint.setStrokeCap((SkPaint::Cap)c);
}

void Context2D::SetLineJoin(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  uint32_t j = info[0]->Uint32Value();
  ctx->strokePaint.setStrokeJoin((SkPaint::Join)j);
}

void Context2D::GetMiterLimit(const Nan::FunctionCallbackInfo<Value>& info) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
}

void Context2D::SetMiterLimit(const Nan::FunctionCallbackInfo<Value>& info) {
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());

  SkScalar limit = SkDoubleToScalar(info[0]->NumberValue());

  ctx->strokePaint.setStrokeMiter(limit);
}

void Context2D::SetLineDash(const Nan::FunctionCallbackInfo<Value>& info) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
}

void Context2D::GetLineDash(const Nan::FunctionCallbackInfo<Value>& info) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
}

void Context2D::SetLineDashOffset(const Nan::FunctionCallbackInfo<Value>& info) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
}

void Context2D::GetLineDashOffset(const Nan::FunctionCallbackInfo<Value>& info) {
    // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(info.This());
}

