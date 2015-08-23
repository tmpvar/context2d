#ifndef _CONTEXT_H_
#define _CONTEXT_H_

// #define SK_DEBUG 1
// #define SK_DUMP_ENABLED
// #define DUMP_IMAGEREF_LIFECYCLE

#include <node.h>
#include <nan.h>

#include <SkSurface.h>
#include <SkCanvas.h>

using namespace node;

class Context2D : public Nan::ObjectWrap {

  public:
    static void Init(v8::Local<v8::Object> exports);
    void resizeCanvas(uint32_t width, uint32_t height);
    void *getTextureData();
    SkBitmap bitmap;
    SkCanvas *canvas;
    SkAutoTDelete<SkSurface> surface;
    // SkDevice *device;
    SkPath path, subpath;
    SkPaint paint, shadowPaint, strokePaint;
    SkXfermode::Mode globalCompositeOperation;
    SkScalar shadowX, shadowY, shadowBlur;
    uint8_t globalAlpha;
    bool defaultLineWidth;
  private:
    Context2D(uint32_t w, uint32_t h);
    ~Context2D();
    bool setupShadow(SkPaint *paint);

    static v8::Persistent<v8::Function> constructor;
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
