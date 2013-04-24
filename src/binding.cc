#include <node.h>

#include "context2d.h"

using namespace v8;
using namespace node;

void InitializeBinding(Handle<Object> exports) {
  Context2D::Init(exports);
}

NODE_MODULE(context2d, InitializeBinding);
