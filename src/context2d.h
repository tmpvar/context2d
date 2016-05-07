#ifndef _CONTEXT_H_
#define _CONTEXT_H_

// #define SK_DEBUG 1
// #define SK_DUMP_ENABLED
// #define DUMP_IMAGEREF_LIFECYCLE

#include <node.h>
#include <nan.h>

#include <SkSurface.h>
#include <SkCanvas.h>
#include <SkPath.h>
#include <SkTemplates.h>
#include <SkRefCnt.h>
#include <SkTypefaceCache.h>

// Ensure image encoders are linked
#include <SkForceLinking.h>
__SK_FORCE_IMAGE_DECODER_LINKING;

using namespace Nan;

class Context2D : public Nan::ObjectWrap {

  public:
    void resizeCanvas(uint32_t width, uint32_t height);
    void *getTextureData();
    SkBitmap bitmap;
    SkCanvas *canvas = nullptr;
    SkTypefaceCache typeFaceCache;
    sk_sp<SkSurface> surface;
    // SkDevice *device;
    SkPath path, subpath;
    SkPaint paint, shadowPaint, strokePaint;
    SkXfermode::Mode globalCompositeOperation;
    SkScalar shadowX, shadowY, shadowBlur;
    uint8_t globalAlpha;
    bool defaultLineWidth;

    static NAN_MODULE_INIT(Init) {
      v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
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

      constructor().Reset(Nan::GetFunction(tpl).ToLocalChecked());

      Nan::Set(
        target,
        Nan::New("Context2D").ToLocalChecked(),
        Nan::GetFunction(tpl).ToLocalChecked()
      );
    }


  private:
    Context2D(uint32_t w, uint32_t h);
    ~Context2D();
    bool setupShadow(SkPaint *paint);

    static inline Persistent<v8::Function> & constructor() {
      static Persistent<v8::Function> my_constructor;
      return my_constructor;
    }

    static NAN_METHOD(New);
    static NAN_METHOD(ToPngBuffer);
    static NAN_METHOD(ToBuffer);
    static NAN_METHOD(GetPixel);
    static NAN_METHOD(Resize);
    static NAN_METHOD(DumpState);
    static NAN_METHOD(AddFont);

    // state
    static NAN_METHOD(Save); // push state on state stack
    static NAN_METHOD(Restore); // pop state stack and restore state

    // transformations (default transform is the identity matrix)
    static NAN_METHOD(Scale);
    static NAN_METHOD(Rotate);
    static NAN_METHOD(Translate);
    static NAN_METHOD(Transform);
    static NAN_METHOD(ResetMatrix);

    // compositing
    static NAN_METHOD(SetGlobalAlpha);
    static NAN_METHOD(SetGlobalCompositeOperation);

    // gradients
    static NAN_METHOD(SetLinearGradientShader);
    static NAN_METHOD(SetRadialGradientShader);

    // image smoothing
    static NAN_METHOD(SetImageSmoothingEnabled);
    static NAN_METHOD(GetImageSmoothingEnabled);

    // colors and styles (see also the CanvasDrawingStyles interface)
    static NAN_METHOD(SetStrokeStyle);
    static NAN_METHOD(SetFillStylePattern);
    static NAN_METHOD(SetFillStylePatternCanvas);
    static NAN_METHOD(SetFillStyle);
    static NAN_METHOD(CreatePattern);

    // shadows
    static NAN_METHOD(SetShadowOffsetX);
    static NAN_METHOD(SetShadowOffsetY);
    static NAN_METHOD(SetShadowBlur);
    static NAN_METHOD(SetShadowColor);

    // rects
    static NAN_METHOD(ClearRect);
    static NAN_METHOD(FillRect);
    static NAN_METHOD(StrokeRect);

    // paths
    static NAN_METHOD(BeginPath);
    static NAN_METHOD(Fill);
    static NAN_METHOD(Stroke);
    static NAN_METHOD(Clip);
    static NAN_METHOD(IsPointInPath);
    static NAN_METHOD(ClosePath);
    static NAN_METHOD(MoveTo);
    static NAN_METHOD(LineTo);
    static NAN_METHOD(QuadraticCurveTo);
    static NAN_METHOD(BezierCurveTo);
    static NAN_METHOD(ArcTo);
    static NAN_METHOD(Rect);
    static NAN_METHOD(Arc);
    static NAN_METHOD(Ellipse);

    // text
    static NAN_METHOD(FillText);
    static NAN_METHOD(StrokeText);
    static NAN_METHOD(MeasureText);
    static NAN_METHOD(SetFont);
    static NAN_METHOD(SetTextAlign);
    static NAN_METHOD(GetTextBaseline);
    static NAN_METHOD(SetTextBaseline);

    // drawing images
    static NAN_METHOD(DrawImageBuffer);
    static NAN_METHOD(DrawCanvas);

    // pixel manipulation
    static NAN_METHOD(CreateImageData);
    static NAN_METHOD(GetImageData);
    static NAN_METHOD(PutImageData);

    // line caps/joins
    static NAN_METHOD(SetLineWidth);
    static NAN_METHOD(SetLineCap);
    static NAN_METHOD(SetLineJoin);
    static NAN_METHOD(GetMiterLimit);
    static NAN_METHOD(SetMiterLimit);

    // dashed lines
    static NAN_METHOD(SetLineDash);
    static NAN_METHOD(GetLineDash);
    static NAN_METHOD(SetLineDashOffset);
    static NAN_METHOD(GetLineDashOffset);

// interface CanvasPattern {
//   // opaque object
// };

// interface TextMetrics {
//   // x-direction
//   readonly attribute double width;
//   readonly attribute double actualBoundingBoxLeft;
//   readonly attribute double actualBoundingBoxRight;

//   // y-direction
//   readonly attribute double fontBoundingBoxAscent;
//   readonly attribute double fontBoundingBoxDescent;
//   readonly attribute double actualBoundingBoxAscent;
//   readonly attribute double actualBoundingBoxDescent;
//   readonly attribute double emHeightAscent;
//   readonly attribute double emHeightDescent;
//   readonly attribute double hangingBaseline;
//   readonly attribute double alphabeticBaseline;
//   readonly attribute double ideographicBaseline;

// };

// dictionary HitRegionOptions {
//   Path? path = null;
//   DOMString id = "";
//   DOMString? parentID = null;
//   DOMString cursor = "inherit";
//   // for control-backed regions:
//   Element? control = null;
//   // for unbacked regions:
//   DOMString? label = null;
//   DOMString? role = null;
// };

// [Constructor (Uint8ClampedArray data, unsigned long width, unsigned long height)]
// interface ImageData {
//   readonly attribute unsigned long width;
//   readonly attribute unsigned long height;
//   readonly attribute Uint8ClampedArray data;
// };


// [Constructor]
// interface Path {
//   void addPath(Path path, SVGMatrix? transformation, optional CanvasWindingRule w = "nonzero");
//   void addPathByStrokingPath(Path path, CanvasDrawingStyles styles, SVGMatrix? transformation);
//   void addText(DOMString text, CanvasDrawingStyles styles, SVGMatrix? transformation, double x, double y, optional double maxWidth);
//   void addPathByStrokingText(DOMString text, CanvasDrawingStyles styles, SVGMatrix? transformation, double x, double y, optional double maxWidth);
//   void addText(DOMString text, CanvasDrawingStyles styles, SVGMatrix? transformation, Path path, optional double maxWidth);
//   void addPathByStrokingText(DOMString text, CanvasDrawingStyles styles, SVGMatrix? transformation, Path path, optional double maxWidth);

// };

// enum CanvasWindingRule  { "nonzero", "evenodd" };

};

#endif
