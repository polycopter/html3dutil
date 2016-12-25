# H3DU.FrameBuffer

[Back to documentation index.](index.md)

### H3DU.FrameBuffer(context, width, height) <a id='H3DU_FrameBuffer'></a>

<b>Deprecated: This class is likely to become a private class.
Use the FrameBufferInfo class instead, which is not coupled to WebGL
contexts.</b>

Represents an off-screen frame buffer.

When H3DU.FrameBuffer's
constructor is called, it will create a texture buffer with the given
width and height and a depth buffer with the same dimensions,
and will bind both to the frame buffer. The frame buffer currently
bound to the WebGL context will remain unchanged.

#### Parameters

* `context` (Type: WebGLRenderingContext | object)<br>
    WebGL context to associate with this buffer, or an object, such as H3DU.Scene3D, that implements a no-argument <code>getContext</code> method that returns a WebGL context.
* `width` (Type: Number)<br>
    Width, in pixels, of the frame buffer. Fractional values are rounded up.
* `height` (Type: Number)<br>
    Height, in pixels, of the frame buffer. Fractional values are rounded up.

### Members

* [this.height](#H3DU_FrameBuffer_this_height)
* [this.width](#H3DU_FrameBuffer_this_width)

### Methods

* [bind](#H3DU_FrameBuffer_H3DU_FrameBuffer_bind)
* [dispose](#H3DU_FrameBuffer_H3DU_FrameBuffer_dispose)
* [getContext](#H3DU_FrameBuffer_H3DU_FrameBuffer_getContext)
* [resize](#H3DU_FrameBuffer_H3DU_FrameBuffer_resize)
* [unbind](#H3DU_FrameBuffer_H3DU_FrameBuffer_unbind)

### H3DU.FrameBuffer.this.height <a id='H3DU_FrameBuffer_this_height'></a>

The frame buffer's height.

### H3DU.FrameBuffer.this.width <a id='H3DU_FrameBuffer_this_width'></a>

The frame buffer's width.

### H3DU.FrameBuffer#bind() <a id='H3DU_FrameBuffer_H3DU_FrameBuffer_bind'></a>

Has no effect. (Previously, bound this frame buffer to the WebGL context associated with
it.)

#### Return Value

This object. (Type: <a href="H3DU_FrameBuffer.md">H3DU.FrameBuffer</a>)

### H3DU.FrameBuffer#dispose() <a id='H3DU_FrameBuffer_H3DU_FrameBuffer_dispose'></a>

Disposes all resources from this frame buffer object.

#### Return Value

Return value. (Type: void)

### H3DU.FrameBuffer#getContext() <a id='H3DU_FrameBuffer_H3DU_FrameBuffer_getContext'></a>

Gets the WebGL context associated with this frame buffer.

#### Return Value

Return value. (Type: WebGLRenderingContext)

### H3DU.FrameBuffer#resize(width, height) <a id='H3DU_FrameBuffer_H3DU_FrameBuffer_resize'></a>

Resizes the frame buffer to a new width and height,
if either differs from the current width or height.

#### Parameters

* `width` (Type: Number)<br>
    New width, in pixels, of the frame buffer. Fractional values are rounded up.
* `height` (Type: Number)<br>
    New height, in pixels, of the frame buffer. Fractional values are rounded up.

#### Return Value

This object. (Type: <a href="H3DU_FrameBuffer.md">H3DU.FrameBuffer</a>)

### H3DU.FrameBuffer#unbind() <a id='H3DU_FrameBuffer_H3DU_FrameBuffer_unbind'></a>

Has no effect. (Previously, unbound this frame buffer from its associated WebGL context.)

#### Return Value

Return value. (Type: void)