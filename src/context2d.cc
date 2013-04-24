#include <node.h>
#include "context2d.h"

#include <SkMatrix44.h>

using namespace node;
using namespace v8;

#define PROTOTYPE_METHOD(name, exportName) \
  tpl->PrototypeTemplate()->Set(String::NewSymbol(#exportName), \
       FunctionTemplate::New(name)->GetFunction()); \

#define METHOD(name) Handle<Value> Context2D::name(const Arguments& args)


void Context2D::Init(v8::Handle<v8::Object> exports) {
  Local<FunctionTemplate> tpl = FunctionTemplate::New(New);
  tpl->SetClassName(String::NewSymbol("Context2D"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  PROTOTYPE_METHOD(Save, save);
  PROTOTYPE_METHOD(Restore, restore);
  PROTOTYPE_METHOD(Scale, scale);
  PROTOTYPE_METHOD(Rotate, rotate);
  PROTOTYPE_METHOD(Translate, translate);
  PROTOTYPE_METHOD(Transform, transform);
  PROTOTYPE_METHOD(ResetMatrix, resetMatrix);
  PROTOTYPE_METHOD(SetGlobalAlpha, setGlobalAlpha);
  PROTOTYPE_METHOD(GetGlobalAlpha, getGlobalAlpha);
  PROTOTYPE_METHOD(SetGlobalCompositeOperation, setGlobalCompositeOperation);
  PROTOTYPE_METHOD(GetGlobalCompositeOperation, getGlobalCompositeOperation);
  PROTOTYPE_METHOD(SetImageSmoothingEnabled, setImageSmoothingEnabled);
  PROTOTYPE_METHOD(GetImageSmoothingEnabled, getImageSmoothingEnabled);
  PROTOTYPE_METHOD(SetStrokeStyle, setStrokeStyle);
  PROTOTYPE_METHOD(GetStrokeStyle, getStrokeStyle);
  PROTOTYPE_METHOD(SetFillStyle, setFillStyle);
  PROTOTYPE_METHOD(GetFillStyle, getFillStyle);
  PROTOTYPE_METHOD(CreateLinearGradient, createLinearGradient);
  PROTOTYPE_METHOD(CreatePattern, createPattern);
  PROTOTYPE_METHOD(SetShadowOffset, setShadowOffset);
  PROTOTYPE_METHOD(GetShadowOffset, getShadowOffset);
  PROTOTYPE_METHOD(SetShadowBlur, setShadowBlur);
  PROTOTYPE_METHOD(GetShadowBlur, getShadowBlur);
  PROTOTYPE_METHOD(SetShadowColor, setShadowColor);
  PROTOTYPE_METHOD(GetShadowColor, getShadowColor);
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
  PROTOTYPE_METHOD(GetFont, getFont);
  PROTOTYPE_METHOD(SetFont, setFont);
  PROTOTYPE_METHOD(GetTextAlign, getTextAlign);
  PROTOTYPE_METHOD(SetTextAlign, setTextAlign);
  PROTOTYPE_METHOD(GetTextBaseline, getTextBaseline);
  PROTOTYPE_METHOD(SetTextBaseline, setTextBaseline);
  PROTOTYPE_METHOD(DrawImage, drawImage);
  PROTOTYPE_METHOD(CreateImageData, createImageData);
  PROTOTYPE_METHOD(GetImageData, getImageData);
  PROTOTYPE_METHOD(PutImageData, putImageData);
  PROTOTYPE_METHOD(GetLineWidth, getLineWidth);
  PROTOTYPE_METHOD(SetLineWidth, setLineWidth);
  PROTOTYPE_METHOD(GetLineCap, getLineCap);
  PROTOTYPE_METHOD(SetLineCap, setLineCap);
  PROTOTYPE_METHOD(GetLineJoin, getLineJoin);
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

Context2D::Context2D() {
  this->canvas = new SkCanvas();
  this->paint = new SkPaint();
  this->path = NULL;
}

Context2D::~Context2D() {
  delete this->canvas;
}

METHOD(New) {
  HandleScope scope;

  Context2D* context = new Context2D();
  context->Wrap(args.This());

  return args.This();
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

  if (!args[0]->IsUndefined() && args[1]->IsUndefined()) {
    int x = args[0]->NumberValue();
    int y = args[1]->NumberValue();

    ctx->canvas->scale(SkIntToScalar(x), SkIntToScalar(y));
  }

  return scope.Close(Undefined());
}

METHOD(Rotate) {
  HandleScope scope;
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  if (!args[0]->IsUndefined() && args[1]->IsUndefined()) {
    double rads = args[0]->NumberValue();
    double degs = rads * 180/M_PI;
    ctx->canvas->rotate(degs);
  }

  return scope.Close(Undefined());
}

METHOD(Translate) {
  HandleScope scope;
  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());

  if (!args[0]->IsUndefined()) {
    int x = args[0]->NumberValue();
    int y = args[1]->NumberValue();

    ctx->canvas->translate(SkIntToScalar(x), SkIntToScalar(y));
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
    double a = args[0]->NumberValue();
    double b = args[1]->NumberValue();
    double c = args[2]->NumberValue();
    double d = args[3]->NumberValue();
    double e = args[4]->NumberValue();
    double f = args[5]->NumberValue();

    SkMatrix44 m;
    m.set3x3(
      a, b, c,
      d, e, f,
      0, 0, 1
    );

    Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());
    ctx->canvas->concat(m);
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

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetGlobalAlpha) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetGlobalCompositeOperation) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetGlobalCompositeOperation) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetImageSmoothingEnabled) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetImageSmoothingEnabled) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetStrokeStyle) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetStrokeStyle) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetFillStyle) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetFillStyle) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(CreateLinearGradient) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(CreatePattern) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetShadowOffset) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetShadowOffset) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetShadowBlur) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetShadowBlur) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetShadowColor) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetShadowColor) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(ClearRect) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(FillRect) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(StrokeRect) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(BeginPath) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(Fill) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(Stroke) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(Clip) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(IsPointInPath) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(ClosePath) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(MoveTo) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(LineTo) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(QuadraticCurveTo) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(BezierCurveTo) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(ArcTo) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(Rect) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(Arc) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(Ellipse) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(FillText) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(StrokeText) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(MeasureText) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetFont) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetFont) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetTextAlign) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetTextAlign) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetTextBaseline) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetTextBaseline) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(DrawImage) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(CreateImageData) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetImageData) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(PutImageData) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetLineWidth) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetLineWidth) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetLineCap) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetLineCap) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetLineJoin) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetLineJoin) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetMiterLimit) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetMiterLimit) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetLineDash) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetLineDash) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(SetLineDashOffset) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

METHOD(GetLineDashOffset) {
  HandleScope scope;

  Context2D *ctx = ObjectWrap::Unwrap<Context2D>(args.This());



  return scope.Close(Undefined());
}

