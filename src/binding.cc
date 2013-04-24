#include <node.h>

#include "SkCanvas.h"
#include "SkRect.h"
#include "SkPaint.h"


using namespace v8;

Handle<Value> Add(const Arguments& args) {
  HandleScope scope;

  SkCanvas c;
  SkRect rect;
  SkPaint p;
  p.setColor(0xFFFF00FF);
  rect.set(0, 0, 150, 150);
  c.drawRect(rect, p);


  if (args.Length() < 2) {
    ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
    return scope.Close(Undefined());
  }

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    ThrowException(Exception::TypeError(String::New("Wrong arguments")));
    return scope.Close(Undefined());
  }

  Local<Number> num = Number::New(args[0]->NumberValue() +
      args[1]->NumberValue());
  return scope.Close(num);
}

void Init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("add"),
      FunctionTemplate::New(Add)->GetFunction());
}

NODE_MODULE(context2d, Init)