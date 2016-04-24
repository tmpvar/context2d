#include <node.h>

#include "context2d.h"

using namespace v8;
using namespace node;

NODE_MODULE(context2d, Context2D::Init);
