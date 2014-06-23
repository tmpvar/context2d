#include <node.h>
#include <node_buffer.h>

#define _USE_MATH_DEFINES 1

#include "context2d.h"
#include <SkCanvas.h>
#include <SkPaint.h>
#include <SkPath.h>
#include <SkError.h>

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

#define PROTOTYPE_METHOD(name, exportName) \
  tpl->PrototypeTemplate()->Set(String::NewSymbol(#exportName), \
       FunctionTemplate::New(name)->GetFunction()); \

#define METHOD(name) Handle<Value> Context2D::name(const Arguments& args)
#define DEGREES(rads) ((rads) * (180/M_PI))

void Context2D::Init(v8::Handle<v8::Object> exports) {
  SkAutoGraphics ag;

  Local<FunctionTemplate> tpl = FunctionTemplate::New(New);
  tpl->SetClassName(String::NewSymbol("Context2D"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Non-standard
  PROTOTYPE_METHOD(ToPngBuffer, toPngBuffer);
  PROTOTYPE_METHOD(DumpState, dumpState);
  PROTOTYPE_METHOD(ToBuffer, toBuffer);
  PROTOTYPE_METHOD(GetPixel, getPixel);
  PROTOTYPE_METHOD(Resize, resize);
  PROTOTYPE_METHOD(AddFont, addFont);


  // Standard
  PROTOTYPE_METHOD(Save, save);
  PROTOTYPE_METHOD(Restore, restore);
  PROTOTYPE_METHOD(Scale, scale);
  PROTOTYPE_METHOD(Rotate, rotate);
  PROTOTYPE_METHOD(Translate, translate);
  PROTOTYPE_METHOD(Transform, transform);
  PROTOTYPE_METHOD(ResetMatrix, resetMatrix);
  PROTOTYPE_METHOD(SetGlobalAlpha, setGlobalAlpha);
  PROTOTYPE_METHOD(SetGlobalCompositeOperation, setGlobalCompositeOperation);
  PROTOTYPE_METHOD(SetImageSmoothingEnabled, setImageSmoothingEnabled);
  PROTOTYPE_METHOD(GetImageSmoothingEnabled, getImageSmoothingEnabled);
  PROTOTYPE_METHOD(SetStrokeStyle, setStrokeStyle);
  PROTOTYPE_METHOD(SetFillStylePattern, setFillStylePattern);
  PROTOTYPE_METHOD(SetFillStyle, setFillStyle);
  PROTOTYPE_METHOD(SetLinearGradientShader, setLinearGradientShader);
  PROTOTYPE_METHOD(SetRadialGradientShader, setRadialGradientShader);
  PROTOTYPE_METHOD(SetShadowOffsetX, setShadowOffsetX);
  PROTOTYPE_METHOD(SetShadowOffsetY, setShadowOffsetY);
  PROTOTYPE_METHOD(SetShadowBlur, setShadowBlur);
  PROTOTYPE_METHOD(SetShadowColor, setShadowColor);
  PROTOTYPE_METHOD(ClearRect, clearRect);
  PROTOTYPE_METHOD(FillRect, fillRect);
  PROTOTYPE_METHOD(StrokeRect, strokeRect);
  PROTOTYPE_METHOD(BeginPath, beginPath);
  PROTOTYPE_METHOD(Fill, fill);
  PROTOTYPE_METHOD(Stroke, stroke);
  PROTOTYPE_METHOD(Clip, clip);
  PROTOTYPE_METHOD(IsPointInPath, isPointInPath);
  PROTOTYPE_METHOD(ClosePath, closePath);
  PROTOTYPE_METHOD(MoveTo, moveTo);
  PROTOTYPE_METHOD(LineTo, lineTo);
  PROTOTYPE_METHOD(QuadraticCurveTo, quadraticCurveTo);
  PROTOTYPE_METHOD(BezierCurveTo, bezierCurveTo);
  PROTOTYPE_METHOD(ArcTo, arcTo);
  PROTOTYPE_METHOD(Rect, rect);
  PROTOTYPE_METHOD(Arc, arc);
  PROTOTYPE_METHOD(Ellipse, ellipse);
  PROTOTYPE_METHOD(FillText, fillText);
  PROTOTYPE_METHOD(StrokeText, strokeText);
  PROTOTYPE_METHOD(MeasureText, measureText);
  PROTOTYPE_METHOD(SetFont, setFont);
  PROTOTYPE_METHOD(SetTextAlign, setTextAlign);
  PROTOTYPE_METHOD(GetTextBaseline, getTextBaseline);
  PROTOTYPE_METHOD(SetTextBaseline, setTextBaseline);
  PROTOTYPE_METHOD(DrawImageBuffer, drawImageBuffer);
  PROTOTYPE_METHOD(CreateImageData, createImageData);
  PROTOTYPE_METHOD(GetImageData, getImageData);
  PROTOTYPE_METHOD(PutImageData, putImageData);
  PROTOTYPE_METHOD(SetLineWidth, setLineWidth);
  PROTOTYPE_METHOD(SetLineCap, setLineCap);
  PROTOTYPE_METHOD(SetLineJoin, setLineJoin);
  PROTOTYPE_METHOD(GetMiterLimit, getMiterLimit);
  PROTOTYPE_METHOD(SetMiterLimit, setMiterLimit);
  PROTOTYPE_METHOD(SetLineDash, setLineDash);
  PROTOTYPE_METHOD(GetLineDash, getLineDash);
  PROTOTYPE_METHOD(SetLineDashOffset, setLineDashOffset);
  PROTOTYPE_METHOD(GetLineDashOffset, getLineDashOffset);

  Persistent<Function> constructor = Persistent<Function>::New(tpl->GetFunction());
  exports->Set(String::NewSymbol("Context2D"), constructor);

}

Context2D::Context2D(uint32_t w, uint32_t h) {

  this->bitmap.setConfig(SkBitmap::kARGB_8888_Config, w, h);
  this->bitmap.allocPixels();

  this->device = new SkDevice(bitmap);
  this->canvas = new SkCanvas(device);
  this->canvas->clear(SkColorSetARGBInline(0, 0, 0, 0));

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
  this->canvas->unref();
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

    SkDrawLooper* dl = new SkBlurDrawLooper(
      this->shadowBlur,
      this->shadowX,
      this->shadowY,
      c,
      SkBlurDrawLooper::kAll_BlurFlag | SkBlurDrawLooper::kOverrideColor_BlurFlag | SkBlurDrawLooper::kIgnoreTransform_BlurFlag
    );
    SkSafeUnref(paint->setLooper(dl));


    return true;
  }
  return false;
}

void Context2D::resizeCanvas(uint32_t width, uint32_t height) {
  this->bitmap.setConfig(SkBitmap::kARGB_8888_Config, width, height);
  this->bitmap.allocPixels();

  SkSafeUnref(this->canvas);
  SkSafeUnref(this->device);

  this->device = new SkDevice(this->bitmap);
  this->canvas = new SkCanvas(this->device);
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

METHOD(New) {
  HandleScope scope;

  Context2D* context = new Context2D(
    args[0]->Uint32Value(),
    args[1]->Uint32Value()
  );

  context->Wrap(args.This());

  return args.This();
}

METHOD(Resize) {
  HandleScope scope;
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  int width = args[0]->Uint32Value() & 0xff;
  int height = args[1]->Uint32Value() & 0xff;

  ctx->resizeCanvas(width, height);

  return scope.Close(Undefined());
}

METHOD(DumpState) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  SkMatrix44 matrix(ctx->canvas->getTotalMatrix());
  matrix.dump();
  ctx->path.dump();

  return scope.Close(Undefined());
}

METHOD(GetPixel) {
  HandleScope scope;
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  Local<Object> obj = Object::New();

  SkBitmap bitmap = ctx->canvas->getDevice()->accessBitmap(false);

  ctx->canvas->flush();

  bitmap.lockPixels();

  // TODO: validity and bounds
  SkColor color = bitmap.getColor(
    args[0]->Int32Value(),
    args[1]->Int32Value()
  );

  obj->Set(String::NewSymbol("r"), Number::New(SkColorGetR(color)));
  obj->Set(String::NewSymbol("g"), Number::New(SkColorGetG(color)));
  obj->Set(String::NewSymbol("b"), Number::New(SkColorGetB(color)));
  obj->Set(String::NewSymbol("a"), Number::New(SkColorGetA(color)));

  bitmap.unlockPixels();

  return scope.Close(obj);
}

METHOD(ToPngBuffer) {
  HandleScope scope;
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  ctx->canvas->flush();
  SkBitmap bitmap = ctx->canvas->getDevice()->accessBitmap(false);
  size_t size = bitmap.getSize();

  void *data = malloc(size);
  SkMemoryWStream stream(data, size);
  SkImageEncoder::EncodeStream(&stream, bitmap, SkImageEncoder::kPNG_Type, 100);

  Buffer *buffer = Buffer::New((char *)data, size);

  Local<v8::Object> globalObj = v8::Context::GetCurrent()->Global();
  Local<Function> bufferConstructor = v8::Local<v8::Function>::Cast(globalObj->Get(v8::String::New("Buffer")));
  Handle<Value> constructorArgs[3] = { buffer->handle_, v8::Int32::New((int32_t)Buffer::Length(buffer)), v8::Integer::New(0) };
  Local<Object> actualBuffer = bufferConstructor->NewInstance(3, constructorArgs);

  free(data);

  return scope.Close(actualBuffer);
}


METHOD(ToBuffer) {
  HandleScope scope;
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());


  SkBitmap bitmap = ctx->canvas->getDevice()->accessBitmap(true);
  size_t size = bitmap.getSize();

  ctx->canvas->flush();
  bitmap.lockPixels();

  Buffer *buffer = Buffer::New(size);
  memcpy(Buffer::Data(buffer), (const char *)bitmap.getPixels(), size);
  bitmap.unlockPixels();

  Local<v8::Object> globalObj = v8::Context::GetCurrent()->Global();
  Local<Function> bufferConstructor = v8::Local<v8::Function>::Cast(globalObj->Get(v8::String::New("Buffer")));
  Handle<Value> constructorArgs[3] = { buffer->handle_, v8::Uint32::New((uint32_t)Buffer::Length(buffer)), v8::Integer::New(0) };
  Local<Object> actualBuffer = bufferConstructor->NewInstance(3, constructorArgs);

  return scope.Close(actualBuffer);
}


METHOD(Save) {
  HandleScope scope;
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  ctx->canvas->save();

  return scope.Close(Undefined());
}

METHOD(Restore) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  ctx->canvas->restore();

  return scope.Close(Undefined());
}

METHOD(Scale) {
  HandleScope scope;
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  if (!args[0]->IsUndefined() && !args[1]->IsUndefined()) {
    ctx->canvas->scale(
      SkDoubleToScalar(args[0]->NumberValue()),
      SkDoubleToScalar(args[1]->NumberValue())
    );
  }

  return scope.Close(Undefined());
}

METHOD(Rotate) {
  HandleScope scope;
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  if (!args[0]->IsUndefined()) {
	SkScalar rads = SkDoubleToScalar(DEGREES(args[0]->NumberValue()));
    ctx->canvas->rotate(rads);
  }

  return scope.Close(Undefined());
}

METHOD(Translate) {
  HandleScope scope;
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  if (!args[0]->IsUndefined() && !args[0]->IsUndefined()) {
    SkScalar x = SkDoubleToScalar(args[0]->NumberValue());
    SkScalar y = SkDoubleToScalar(args[1]->NumberValue());

    ctx->canvas->translate(x, y);
  }

  return scope.Close(Undefined());
}

METHOD(Transform) {
  HandleScope scope;

  if (!args[0]->IsUndefined() &&
      !args[1]->IsUndefined() &&
      !args[2]->IsUndefined() &&
      !args[3]->IsUndefined() &&
      !args[4]->IsUndefined() &&
      !args[5]->IsUndefined())
  {
    SkScalar a = SkDoubleToScalar(args[0]->NumberValue());
    SkScalar b = SkDoubleToScalar(args[1]->NumberValue());
    SkScalar c = SkDoubleToScalar(args[2]->NumberValue());
    SkScalar d = SkDoubleToScalar(args[3]->NumberValue());
    SkScalar e = SkDoubleToScalar(args[4]->NumberValue());
    SkScalar f = SkDoubleToScalar(args[5]->NumberValue());

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

    Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

    assert(ctx->canvas->concat(m));
  }

  return scope.Close(Undefined());
}

METHOD(ResetMatrix) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  ctx->canvas->resetMatrix();

  return scope.Close(Undefined());
}

METHOD(SetGlobalAlpha) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());\

  ctx->globalAlpha = (uint8_t)(args[0]->NumberValue()*255);

  if (ctx->globalAlpha > 255) {
    ctx->globalAlpha = 255;
  } else if (ctx->globalAlpha < 0) {
    ctx->globalAlpha = 0;
  }

  return scope.Close(Undefined());
}

METHOD(SetGlobalCompositeOperation) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  ctx->globalCompositeOperation = (SkXfermode::Mode)args[0]->IntegerValue();

  return scope.Close(Undefined());
}

METHOD(SetImageSmoothingEnabled) {
  HandleScope scope;

  // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetImageSmoothingEnabled) {
  HandleScope scope;

  // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetStrokeStyle) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  // Clear off the old shader
  ctx->strokePaint.setShader(NULL);

  U8CPU a = (U8CPU)args[3]->Uint32Value();
  U8CPU r = (U8CPU)args[0]->Uint32Value();
  U8CPU g = (U8CPU)args[1]->Uint32Value();
  U8CPU b = (U8CPU)args[2]->Uint32Value();

  ctx->strokePaint.setColor(SkColorSetARGBInline(a,r,g,b));

  return scope.Close(Undefined());
}

METHOD(SetFillStylePattern) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  if (!Buffer::HasInstance(args[0])) {
    return ThrowException(Exception::Error(
                String::New("First argument needs to be a buffer")));
  }

  Local<Object> buffer_obj = args[0]->ToObject();
  char *buffer_data = Buffer::Data(buffer_obj);

  int32_t w = args[1]->Int32Value();
  int32_t h = args[2]->Int32Value();

  SkShader::TileMode repeatX = args[3]->BooleanValue() ?
                               SkShader::kRepeat_TileMode :
                               SkShader::kClamp_TileMode;

  SkShader::TileMode repeatY = args[4]->BooleanValue()?
                               SkShader::kRepeat_TileMode :
                               SkShader::kClamp_TileMode;

  SkBitmap src;

  src.setConfig(SkBitmap::kARGB_8888_Config, w, h);
  src.setPixels(buffer_data);

  SkBitmapProcShader *shader = SkNEW_ARGS(SkBitmapProcShader, (src, repeatX, repeatY));
  ctx->paint.setShader(shader);
  shader->unref();

  return scope.Close(Undefined());
}

METHOD(SetFillStyle) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  // Clear off the old shader
  ctx->paint.setShader(NULL);

  U8CPU a = args[3]->Uint32Value();
  U8CPU r = args[0]->Uint32Value();
  U8CPU g = args[1]->Uint32Value();
  U8CPU b = args[2]->Uint32Value();

  ctx->paint.setColor(SkColorSetARGBInline(a,r,g,b));

  return scope.Close(Undefined());
}

METHOD(SetLinearGradientShader) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkPoint points[2] = {
    {
      SkDoubleToScalar(args[0]->NumberValue()),
      SkDoubleToScalar(args[1]->NumberValue())
    },
    {
      SkDoubleToScalar(args[2]->NumberValue()),
      SkDoubleToScalar(args[3]->NumberValue())
    }
  };

  SkColor* colors = NULL;
  SkScalar* offsets = NULL;


  if (args[4]->IsArray()) {
    Handle<Array> stops = Handle<Array>::Cast(args[4]);
    uint32_t stopCount = stops->Length();


    if (stopCount > 1) {

      colors = new SkColor[stopCount];
      offsets = new SkScalar[stopCount];

      Handle<Object> item;
      Handle<Array> color;

      for (uint32_t stop = 0; stop < stopCount; stop++) {
        item = stops->Get(stop)->ToObject();

        offsets[stop] = SkDoubleToScalar(
          item->Get(String::NewSymbol("offset"))->NumberValue()
        );

        color = Handle<Array>::Cast(item->Get(String::NewSymbol("color")));

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

  return scope.Close(Undefined());
}

METHOD(SetRadialGradientShader) {
 HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkPoint start = {
    SkDoubleToScalar(args[0]->NumberValue()),
    SkDoubleToScalar(args[1]->NumberValue())
  };

  SkScalar startRadius = SkDoubleToScalar(args[2]->NumberValue());

  SkPoint end = {
    SkDoubleToScalar(args[3]->NumberValue()),
    SkDoubleToScalar(args[4]->NumberValue())
  };

  SkScalar endRadius = SkDoubleToScalar(args[5]->NumberValue());


  SkColor* colors = NULL;
  SkScalar* offsets = NULL;


  if (args[6]->IsArray()) {
    Handle<Array> stops = Handle<Array>::Cast(args[6]);
    uint32_t stopCount = stops->Length();

    if (stopCount > 1) {

      colors = new SkColor[stopCount];
      offsets = new SkScalar[stopCount];

      Handle<Object> item;
      Handle<Array> color;

      for (uint32_t stop = 0; stop < stopCount; stop++) {
        item = stops->Get(stop)->ToObject();

        offsets[stop] = SkDoubleToScalar(
          item->Get(String::NewSymbol("offset"))->NumberValue()
        );

        color = Handle<Array>::Cast(item->Get(String::NewSymbol("color")));

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

  return scope.Close(Undefined());
}

METHOD(SetShadowOffsetX) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  ctx->shadowX = SkDoubleToScalar(args[0]->NumberValue());

  return scope.Close(Undefined());
}

METHOD(SetShadowOffsetY) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  ctx->shadowY = SkDoubleToScalar(args[0]->NumberValue());

  return scope.Close(Undefined());
}

METHOD(SetShadowBlur) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  ctx->shadowBlur = SkDoubleToScalar(args[0]->NumberValue());

  return scope.Close(Undefined());
}

METHOD(SetShadowColor) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  // Clear off the old shader
  ctx->shadowPaint.setShader(NULL);

  U8CPU a = args[3]->Uint32Value();
  U8CPU r = args[0]->Uint32Value();
  U8CPU g = args[1]->Uint32Value();
  U8CPU b = args[2]->Uint32Value();

  ctx->shadowPaint.setColor(SkColorSetARGBInline(a,r,g,b));


  return scope.Close(Undefined());
}

METHOD(ClearRect) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  SkCanvas *canvas = ctx->canvas;

  SkScalar x = SkDoubleToScalar(args[0]->NumberValue());
  SkScalar y = SkDoubleToScalar(args[1]->NumberValue());
  SkScalar w = SkDoubleToScalar(args[2]->NumberValue());
  SkScalar h = SkDoubleToScalar(args[3]->NumberValue());

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

  return scope.Close(Undefined());
}

METHOD(FillRect) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkRect rect = SkRect::MakeXYWH(
    SkDoubleToScalar(args[0]->NumberValue()),
	SkDoubleToScalar(args[1]->NumberValue()),
	SkDoubleToScalar(args[2]->NumberValue()),
	SkDoubleToScalar(args[3]->NumberValue())
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

  return scope.Close(Undefined());
}

METHOD(StrokeRect) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkScalar x = SkDoubleToScalar(args[0]->NumberValue());
  SkScalar y = SkDoubleToScalar(args[1]->NumberValue());
  SkScalar w = SkDoubleToScalar(args[2]->NumberValue());
  SkScalar h = SkDoubleToScalar(args[3]->NumberValue());

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

  return scope.Close(Undefined());
}

METHOD(BeginPath) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  ctx->path.rewind();

  return scope.Close(Undefined());
}

METHOD(Fill) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  ctx->canvas->save();
  ctx->canvas->resetMatrix();

  ctx->canvas->drawPath(ctx->path, ctx->paint);

  ctx->canvas->restore();
  return scope.Close(Undefined());
}

METHOD(Stroke) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkPaint stroke(ctx->strokePaint);
  SkMatrix im, m = ctx->canvas->getTotalMatrix();
  m.invert(&im);

  SkPaint layerPaint;
  layerPaint.setXfermodeMode(ctx->globalCompositeOperation);
  layerPaint.setAlpha(ctx->globalAlpha);

  SkPath fillPath;
  stroke.setAntiAlias(false);
  bool fill = false;

  if (!ctx->path.isLine(NULL) && (m.getScaleX() > 1 || m.getScaleY() > 1)) {
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

  return scope.Close(Undefined());
}

METHOD(Clip) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  ctx->canvas->clipPath(ctx->path, SkRegion::kIntersect_Op, true);

  return scope.Close(Undefined());
}

METHOD(IsPointInPath) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkScalar x = SkDoubleToScalar(args[0]->NumberValue());
  SkScalar y = SkDoubleToScalar(args[1]->NumberValue());

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

  return scope.Close(Boolean::New(contained));
}

METHOD(ClosePath) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  ctx->path.close();

  return scope.Close(Undefined());
}

METHOD(MoveTo) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkMatrix m = ctx->canvas->getTotalMatrix();

  SkPoint pt;
  m.mapXY(
    SkDoubleToScalar(args[0]->NumberValue()),
    SkDoubleToScalar(args[1]->NumberValue()),
    &pt
  );

  ctx->path.moveTo(pt);

  return scope.Close(Undefined());
}

METHOD(LineTo) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkMatrix m = ctx->canvas->getTotalMatrix();

  SkPoint pt;
  m.mapXY(
    SkDoubleToScalar(args[0]->NumberValue()),
    SkDoubleToScalar(args[1]->NumberValue()),
    &pt
  );

  if (ctx->path.isEmpty()) {
    ctx->path.moveTo(pt);
  }

  ctx->path.lineTo(pt);

  return scope.Close(Undefined());
}

METHOD(QuadraticCurveTo) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkScalar cpx = SkDoubleToScalar(args[0]->NumberValue());
  SkScalar cpy = SkDoubleToScalar(args[1]->NumberValue());
  SkScalar x = SkDoubleToScalar(args[2]->NumberValue());
  SkScalar y = SkDoubleToScalar(args[3]->NumberValue());

  SkMatrix m = ctx->canvas->getTotalMatrix();
  SkPoint cp, p;

  m.mapXY(cpx, cpy, &cp);
  m.mapXY(x, y, &p);


  if (ctx->path.isEmpty()) {
    ctx->path.moveTo(cp);
  }

  ctx->path.quadTo(cp, p);

  return scope.Close(Undefined());
}

METHOD(BezierCurveTo) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkScalar x1 = SkDoubleToScalar(args[0]->NumberValue());
  SkScalar y1 = SkDoubleToScalar(args[1]->NumberValue());
  SkScalar x2 = SkDoubleToScalar(args[2]->NumberValue());
  SkScalar y2 = SkDoubleToScalar(args[3]->NumberValue());
  SkScalar x3 = SkDoubleToScalar(args[4]->NumberValue());
  SkScalar y3 = SkDoubleToScalar(args[5]->NumberValue());

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

  return scope.Close(Undefined());
}

METHOD(ArcTo) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkMatrix m(ctx->canvas->getTotalMatrix());

  SkScalar tx = m.getTranslateX();
  SkScalar ty = m.getTranslateY();
  SkScalar sx = m.getScaleX();
  SkScalar sy = m.getScaleY();

  SkScalar x1 = SkDoubleToScalar(args[0]->NumberValue() * sx) + tx;
  SkScalar y1 = SkDoubleToScalar(args[1]->NumberValue() * sy) + ty;
  SkScalar x2 = SkDoubleToScalar(args[2]->NumberValue() * sx) + tx;
  SkScalar y2 = SkDoubleToScalar(args[3]->NumberValue() * sy) + ty;
  SkScalar r = SkDoubleToScalar(args[4]->NumberValue());

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
    return scope.Close(Undefined());
  } else if (!hasPoint) {
    ctx->path.moveTo(x1, y1);
  } else {

    ctx->path.arcTo(x1, y1, x2, y2, r);
    if (sx != 1 || sy != 1) {
      ctx->path.lineTo(x2, y2);
    }
  }

  return scope.Close(Undefined());
}

METHOD(Rect) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkScalar x = SkDoubleToScalar(args[0]->NumberValue());
  SkScalar y = SkDoubleToScalar(args[1]->NumberValue());
  SkScalar w = SkDoubleToScalar(args[2]->NumberValue());
  SkScalar h = SkDoubleToScalar(args[3]->NumberValue());

  SkMatrix m = ctx->canvas->getTotalMatrix();
  SkPath subpath;
  subpath.addRect(SkRect::MakeXYWH(x, y, w, h));
  subpath.transform(m);
  ctx->path.addPath(subpath);
  return scope.Close(Undefined());
}

METHOD(Arc) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  SkMatrix m = ctx->canvas->getTotalMatrix();

  SkScalar x = SkDoubleToScalar(args[0]->NumberValue());
  SkScalar y = SkDoubleToScalar(args[1]->NumberValue());
  SkScalar r = SkDoubleToScalar(args[2]->NumberValue());
  SkScalar sa = SkDoubleToScalar(args[3]->NumberValue());
  SkScalar ea = SkDoubleToScalar(args[4]->NumberValue());
  bool ccw = args[5]->BooleanValue();


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

  return scope.Close(Undefined());
}

METHOD(Ellipse) {
  HandleScope scope;

  // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(FillText) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  String::Utf8Value string(args[0]);
  SkScalar x = SkDoubleToScalar(args[1]->NumberValue());
  SkScalar y = SkDoubleToScalar(args[2]->NumberValue());
  size_t length = string.length();

  if (!args[3]->IsUndefined()) {
    SkScalar maxWidth = SkDoubleToScalar(args[3]->NumberValue());
    length = ctx->paint.breakText(*string, length, maxWidth);
  }

  ctx->canvas->drawText(*string, length, x, y, ctx->paint);

  return scope.Close(Undefined());
}

METHOD(StrokeText) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  String::Utf8Value string(args[0]);
  SkScalar x = SkDoubleToScalar(args[1]->NumberValue());
  SkScalar y = SkDoubleToScalar(args[2]->NumberValue());
  size_t length = string.length();

  if (!args[3]->IsUndefined()) {
    SkScalar maxWidth = SkDoubleToScalar(args[3]->NumberValue());
    length = ctx->strokePaint.breakText(*string, length, maxWidth);
  }

  ctx->canvas->drawText(*string, length, x, y, ctx->strokePaint);

  return scope.Close(Undefined());
}

METHOD(MeasureText) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  String::Utf8Value string(args[0]);

  SkRect bounds;

  SkScalar width = ctx->paint.measureText(
    *string,
    string.length(),
    &bounds
    // TODO: scale
  );


  Handle<Object> obj = Object::New();
  obj->Set(String::NewSymbol("width"), Number::New(width));
  obj->Set(String::NewSymbol("height"), Number::New(bounds.height()));

  return scope.Close(obj);
}

METHOD(SetFont) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());


  bool isBold = args[1]->BooleanValue();
  bool isItalic = args[2]->BooleanValue();

  SkScalar fontSize = SkDoubleToScalar(args[3]->NumberValue());
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

  if (args[0]->IsString()) {
    String::Utf8Value family(args[0]);
    face = SkTypeface::CreateFromName(*family, style);
  } else if (args[0]->IsNumber()) {
    SkFontID id = args[0]->Uint32Value();
    face = SkTypefaceCache::FindByID(id);
  }

  if (face) {
    ctx->paint.setTypeface(face);
    ctx->strokePaint.setTypeface(face);
  }

  return scope.Close(Undefined());
}

METHOD(SetTextAlign) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkPaint::Align align = (SkPaint::Align)args[0]->IntegerValue();
  ctx->paint.setTextAlign(align);
  ctx->strokePaint.setTextAlign(align);

  return scope.Close(Undefined());
}

METHOD(GetTextBaseline) {
  HandleScope scope;

  // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetTextBaseline) {
  HandleScope scope;

  // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(AddFont) {
  HandleScope scope;

  Local<Object> buffer_obj = args[0]->ToObject();
  char *buffer_data = Buffer::Data(buffer_obj);
  size_t buffer_length = Buffer::Length(buffer_obj);

  SkData *data = SkData::NewWithCopy((void *)buffer_data, buffer_length);
  SkAutoTUnref<SkStream> stream(SkNEW_ARGS(SkMemoryStream, (data)));
  SkTypeface* face = SkTypeface::CreateFromStream(stream);

  SkTypefaceCache::Add(face, face->style());

  data->unref();

  return scope.Close(Number::New(face->uniqueID()));
}

METHOD(DrawImageBuffer) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  Local<Object> buffer_obj = args[0]->ToObject();
  char *buffer_data = Buffer::Data(buffer_obj);

  SkScalar sx = SkDoubleToScalar(args[1]->NumberValue());
  SkScalar sy = SkDoubleToScalar(args[2]->NumberValue());
  SkScalar sw = SkDoubleToScalar(args[3]->NumberValue());
  SkScalar sh = SkDoubleToScalar(args[4]->NumberValue());
  SkScalar dx = SkDoubleToScalar(args[5]->NumberValue());
  SkScalar dy = SkDoubleToScalar(args[6]->NumberValue());
  SkScalar dw = SkDoubleToScalar(args[7]->NumberValue());
  SkScalar dh = SkDoubleToScalar(args[8]->NumberValue());
  int32_t w  = args[9]->Int32Value();
  int32_t h  = args[10]->Int32Value();

  SkBitmap src;

  src.setConfig(SkBitmap::kARGB_8888_Config, w, h);
  src.setPixels(buffer_data);

  SkRect srcRect = { sx, sy, sx+sw, sy+sh };
  SkRect destRect = { dx, dy, dx+dw, dy+dh };

  SkRect bounds = {
    0, 0,
    SkIntToScalar(ctx->canvas->getDevice()->width()),
	SkIntToScalar(ctx->canvas->getDevice()->height())
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

  return scope.Close(Undefined());
}

METHOD(CreateImageData) {
  HandleScope scope;

  // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  return scope.Close(Undefined());
}

METHOD(GetImageData) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  int32_t sx = args[0]->Int32Value();
  int32_t sy = args[1]->Int32Value();
  int32_t sw = args[2]->Int32Value();
  int32_t sh = args[3]->Int32Value();

  SkIRect srcRect = SkIRect::MakeXYWH(sx, sy, sw, sh);

  ctx->canvas->flush();
  SkBitmap masterBitmap = ctx->canvas->getDevice()->accessBitmap(false);

  masterBitmap.lockPixels();

  //pxref->readPixels(&bitmap, &srcRect);
  Buffer *buffer = Buffer::New(sw*sh*4);
  SkColor *buffer_ptr = (SkColor *)Buffer::Data(buffer);

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

  Local<v8::Object> globalObj = v8::Context::GetCurrent()->Global();
  Local<Function> bufferConstructor = v8::Local<v8::Function>::Cast(globalObj->Get(v8::String::New("Buffer")));
  Handle<Value> constructorArgs[3] = { buffer->handle_, v8::Uint32::New((uint32_t)Buffer::Length(buffer)), v8::Integer::New(0) };
  Local<Object> actualBuffer = bufferConstructor->NewInstance(3, constructorArgs);

  Handle<Object> obj = Object::New();
  obj->Set(String::NewSymbol("width"), Number::New(sw));
  obj->Set(String::NewSymbol("height"), Number::New(sh));
  obj->Set(String::NewSymbol("data"), actualBuffer);

  return scope.Close(obj);
}

METHOD(PutImageData) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  Local<Object> buffer_obj = args[0]->ToObject();
  SkColor *buffer_ptr = (SkColor *)Buffer::Data(buffer_obj);
  size_t buffer_length = Buffer::Length(buffer_obj);

  int32_t sx = args[1]->Int32Value();
  int32_t sy = args[2]->Int32Value();
  int32_t dx = args[3]->Int32Value();
  int32_t dy = args[4]->Int32Value();
  int32_t dw = args[5]->Int32Value();
  int32_t dh = args[6]->Int32Value();
  int32_t w  = args[7]->Int32Value();

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

  return scope.Close(Undefined());
}

METHOD(SetLineWidth) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
  ctx->strokePaint.setStrokeWidth(SkDoubleToScalar(args[0]->NumberValue()));

  ctx->defaultLineWidth = false;

  return scope.Close(Undefined());
}

METHOD(SetLineCap) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  uint32_t c = args[0]->Uint32Value();
  ctx->strokePaint.setStrokeCap((SkPaint::Cap)c);

  return scope.Close(Undefined());
}

METHOD(SetLineJoin) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  uint32_t j = args[0]->Uint32Value();
  ctx->strokePaint.setStrokeJoin((SkPaint::Join)j);

  return scope.Close(Undefined());
}

METHOD(GetMiterLimit) {
  HandleScope scope;

  // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetMiterLimit) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  SkScalar limit = SkDoubleToScalar(args[0]->NumberValue());

  ctx->strokePaint.setStrokeMiter(limit);

  return scope.Close(Undefined());
}

METHOD(SetLineDash) {
  HandleScope scope;

  // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetLineDash) {
  HandleScope scope;

  // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetLineDashOffset) {
  HandleScope scope;

  // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetLineDashOffset) {
  HandleScope scope;

  // Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

