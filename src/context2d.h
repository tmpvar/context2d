#ifndef _CONTEXT_H_
#define _CONTEXT_H_

#define SK_DEBUG 1
#define SK_DUMP_ENABLED
#define DUMP_IMAGEREF_LIFECYCLE

#include <node.h>
#include <SkFontMgr.h>
#include <SkCanvas.h>
#include <SkPaint.h>
#include <SkPath.h>

#include <SkStream.h>
#include <SkDevice.h>
#include <SkData.h>
#include <SkImageEncoder.h>
#include <SkMatrix44.h>

using namespace node;
using namespace v8;


#define OBJECT_METHOD(name) static Handle<Value> name(const Arguments& args);


class Context2D : public ObjectWrap {

  public:
    static void Init(v8::Handle<v8::Object> exports);
    SkCanvas *canvas;
    SkPath path, subpath;
    SkPaint paint, shadowPaint, strokePaint;
    SkXfermode::Mode globalCompositeOperation;
    double globalAlpha, shadowX, shadowY, shadowBlur;
    bool defaultLineWidth;
  private:
    Context2D(int w, int h);
    ~Context2D();
    void setupShadow(SkPaint *paint);

    static Persistent<Function> constructor;
    OBJECT_METHOD(New);
    OBJECT_METHOD(ToPngBuffer);
    OBJECT_METHOD(ToBuffer);
    OBJECT_METHOD(GetPixel);
    OBJECT_METHOD(Resize);
    OBJECT_METHOD(DumpState);
    OBJECT_METHOD(AddFont);

    // state
    OBJECT_METHOD(Save); // push state on state stack
    OBJECT_METHOD(Restore); // pop state stack and restore state

    // transformations (default transform is the identity matrix)
    OBJECT_METHOD(Scale);
    OBJECT_METHOD(Rotate);
    OBJECT_METHOD(Translate);
    OBJECT_METHOD(Transform);
    OBJECT_METHOD(ResetMatrix);

    // compositing
    OBJECT_METHOD(SetGlobalAlpha);
    OBJECT_METHOD(GetGlobalAlpha);
    OBJECT_METHOD(SetGlobalCompositeOperation);
    OBJECT_METHOD(GetGlobalCompositeOperation);

    // gradients
    OBJECT_METHOD(SetLinearGradientShader);
    OBJECT_METHOD(SetRadialGradientShader);


    // image smoothing
    OBJECT_METHOD(SetImageSmoothingEnabled);
    OBJECT_METHOD(GetImageSmoothingEnabled);

    // colors and styles (see also the CanvasDrawingStyles interface)
    OBJECT_METHOD(SetStrokeStyle);
    OBJECT_METHOD(SetFillStylePattern);
    OBJECT_METHOD(SetFillStyle);
    OBJECT_METHOD(CreatePattern);

    // shadows
    OBJECT_METHOD(SetShadowOffsetX);
    OBJECT_METHOD(GetShadowOffsetX);
    OBJECT_METHOD(SetShadowOffsetY);
    OBJECT_METHOD(GetShadowOffsetY);
    OBJECT_METHOD(SetShadowBlur);
    OBJECT_METHOD(GetShadowBlur);
    OBJECT_METHOD(SetShadowColor);
    OBJECT_METHOD(GetShadowColor);

    // rects
    OBJECT_METHOD(ClearRect);
    OBJECT_METHOD(FillRect);
    OBJECT_METHOD(StrokeRect);

    // paths
    OBJECT_METHOD(BeginPath);
    OBJECT_METHOD(Fill);
    OBJECT_METHOD(Stroke);
    OBJECT_METHOD(Clip);
    OBJECT_METHOD(IsPointInPath);
    OBJECT_METHOD(ClosePath);
    OBJECT_METHOD(MoveTo);
    OBJECT_METHOD(LineTo);
    OBJECT_METHOD(QuadraticCurveTo);
    OBJECT_METHOD(BezierCurveTo);
    OBJECT_METHOD(ArcTo);
    OBJECT_METHOD(Rect);
    OBJECT_METHOD(Arc);
    OBJECT_METHOD(Ellipse);

    // text
    OBJECT_METHOD(FillText);
    OBJECT_METHOD(StrokeText);
    OBJECT_METHOD(MeasureText);
    OBJECT_METHOD(SetFont);
    OBJECT_METHOD(SetTextAlign);
    OBJECT_METHOD(GetTextBaseline);
    OBJECT_METHOD(SetTextBaseline);

    // drawing images
    OBJECT_METHOD(DrawImageBuffer);

    // pixel manipulation
    OBJECT_METHOD(CreateImageData);
    OBJECT_METHOD(GetImageData);
    OBJECT_METHOD(PutImageData);

    // line caps/joins
    OBJECT_METHOD(SetLineWidth);
    OBJECT_METHOD(SetLineCap);
    OBJECT_METHOD(SetLineJoin);
    OBJECT_METHOD(GetMiterLimit);
    OBJECT_METHOD(SetMiterLimit);

    // dashed lines
    OBJECT_METHOD(SetLineDash);
    OBJECT_METHOD(GetLineDash);
    OBJECT_METHOD(SetLineDashOffset);
    OBJECT_METHOD(GetLineDashOffset);

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