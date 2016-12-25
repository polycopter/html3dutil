# H3DU.ShapeGroup

[Back to documentation index.](index.md)

### H3DU.ShapeGroup() <a id='H3DU_ShapeGroup'></a>

Represents a grouping of shapes. This object
can hold both @{link H3DU.Shape} objects and
other @{link H3DU.ShapeGroup} objects.

### Members

* [shapes](#H3DU_ShapeGroup_shapes)

### Methods

* [addShape](#H3DU_ShapeGroup_H3DU_ShapeGroup_addShape)
* [getBounds](#H3DU_ShapeGroup_H3DU_ShapeGroup_getBounds)
* [getMatrix](#H3DU_ShapeGroup_H3DU_ShapeGroup_getMatrix)
* [getTransform](#H3DU_ShapeGroup_H3DU_ShapeGroup_getTransform)
* [getVisible](#H3DU_ShapeGroup_H3DU_ShapeGroup_getVisible)
* [primitiveCount](#H3DU_ShapeGroup_H3DU_ShapeGroup_primitiveCount)
* [removeShape](#H3DU_ShapeGroup_H3DU_ShapeGroup_removeShape)
* [setMaterial](#H3DU_ShapeGroup_H3DU_ShapeGroup_setMaterial)
* [setMaterialParams](#H3DU_ShapeGroup_H3DU_ShapeGroup_setMaterialParams)
* [setPosition](#H3DU_ShapeGroup_H3DU_ShapeGroup_setPosition)
* [setQuaternion](#H3DU_ShapeGroup_H3DU_ShapeGroup_setQuaternion)
* [setScale](#H3DU_ShapeGroup_H3DU_ShapeGroup_setScale)
* [setShader](#H3DU_ShapeGroup_H3DU_ShapeGroup_setShader)
* [setTexture](#H3DU_ShapeGroup_H3DU_ShapeGroup_setTexture)
* [setTransform](#H3DU_ShapeGroup_H3DU_ShapeGroup_setTransform)
* [setVisible](#H3DU_ShapeGroup_H3DU_ShapeGroup_setVisible)
* [vertexCount](#H3DU_ShapeGroup_H3DU_ShapeGroup_vertexCount)

### H3DU.ShapeGroup#shapes <a id='H3DU_ShapeGroup_shapes'></a>

List of shapes contained in this group.
This property should only be used to access properties
and call methods on each shape, and not to add, remove
or replace shapes directly.

### H3DU.ShapeGroup#addShape(shape) <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_addShape'></a>

Adds a 3D shape to this shape group. Its reference, not a copy,
will be stored in the list of shapes.

#### Parameters

* `shape` (Type: <a href="H3DU_Shape.md">H3DU.Shape</a> | <a href="H3DU_ShapeGroup.md">H3DU.ShapeGroup</a>)<br>
    A 3D shape.

#### Return Value

This object. (Type: <a href="H3DU_ShapeGroup.md">H3DU.ShapeGroup</a>)

### H3DU.ShapeGroup#getBounds() <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_getBounds'></a>

Finds a bounding box that holds all vertices in this shape group.
 The bounding box is not guaranteed to be the
tightest, and the box will be transformed to world space
using the transforms of the shapes this group contains.

#### Return Value

An array of six numbers describing an
axis-aligned bounding box
that fits all vertices in the shape group. The first three numbers
are the smallest-valued X, Y, and Z coordinates, and the
last three are the largest-valued X, Y, and Z coordinates.
If the shape group has no vertices, returns the array [Inf, Inf, Inf, -Inf,
-Inf, -Inf]. (Type: Array.&lt;Number>)

### H3DU.ShapeGroup#getMatrix() <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_getMatrix'></a>

Gets a copy of the transformation needed to transform
this shape group's coordinates to world coordinates.

#### Return Value

A 4x4 matrix. (Type: <a href="H3DU_Transform.md">H3DU.Transform</a>)

### H3DU.ShapeGroup#getTransform() <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_getTransform'></a>

Gets a reference to the transform used by this shape group object.

#### Return Value

Return value. (Type: <a href="H3DU_Transform.md">H3DU.Transform</a>)

### H3DU.ShapeGroup#getVisible() <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_getVisible'></a>

Gets whether this shape group will be drawn on rendering.

#### Return Value

value True if this shape group will be visible; otherwise, false. (Type: Boolean)

### H3DU.ShapeGroup#primitiveCount() <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_primitiveCount'></a>

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this shape group.

#### Return Value

Return value. (Type: Number)

### H3DU.ShapeGroup#removeShape(shape) <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_removeShape'></a>

Removes all instances of a 3D shape from this shape group

#### Parameters

* `shape` (Type: <a href="H3DU_Shape.md">H3DU.Shape</a> | <a href="H3DU_ShapeGroup.md">H3DU.ShapeGroup</a>)<br>
    The 3D shape to remove.

#### Return Value

This object. (Type: <a href="H3DU_ShapeGroup.md">H3DU.ShapeGroup</a>)

### H3DU.ShapeGroup#setMaterial(material) <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_setMaterial'></a>

Sets the material used by all shapes in this shape group.

#### Parameters

* `material` (Type: <a href="H3DU_Material.md">H3DU.Material</a>)<br>
    The material to use.

#### Return Value

Return value. (Type: Object)

### H3DU.ShapeGroup#setMaterialParams(params) <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_setMaterialParams'></a>

Sets material parameters for all shapes in this shape group.

#### Parameters

* `params` (Type: Object)<br>
    An object described in H3DU.Material#setParams.

#### Return Value

This object. (Type: <a href="H3DU_Shape.md">H3DU.Shape</a>)

### H3DU.ShapeGroup#setPosition(x, y, z) <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_setPosition'></a>

Sets the relative position of the shapes in this group
from their original position.
See H3DU.Transform#setPosition
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `x` (Type: number | Array.&lt;Number>)<br>
    X coordinate or a 3-element position array, as specified in H3DU.Transform#setScale.
* `y` (Type: Number)<br>
    Y-coordinate.
* `z` (Type: Number)<br>
    Z-coordinate.

#### Return Value

This object. (Type: <a href="H3DU_Scene3D.md">H3DU.Scene3D</a>)

### H3DU.ShapeGroup#setQuaternion(quat) <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_setQuaternion'></a>

Sets this shape group's orientation in the form of a <a href="tutorial-glmath.md">quaternion</a>.
See H3DU.Transform#setQuaternion.
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `quat` (Type: Array.&lt;Number>)<br>
    A four-element array describing the rotation.

#### Return Value

This object. (Type: <a href="H3DU_Shape.md">H3DU.Shape</a>)

### H3DU.ShapeGroup#setScale(x, y, z) <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_setScale'></a>

Sets the scale of this shape group relative to its original
size. See H3DU.Transform#setScale.
This method will modify this shape group's transform
rather than the transform for each shape in the group.

#### Parameters

* `x` (Type: number | Array.&lt;Number>)<br>
    Scaling factor for this object's width, or a 3-element scaling array, as specified in H3DU.Transform#setScale.
* `y` (Type: Number)<br>
    Scaling factor for this object's height.
* `z` (Type: Number)<br>
    Scaling factor for this object's depth.

#### Return Value

This object. (Type: <a href="H3DU_Scene3D.md">H3DU.Scene3D</a>)

### H3DU.ShapeGroup#setShader(material) <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_setShader'></a>

Sets the shader program used by all shapes in this shape group.

#### Parameters

* `material` (Type: <a href="H3DU_ShaderInfo.md">H3DU.ShaderInfo</a>)<br>
    Source code for a WebGL shader program. <i>Using a <a href="H3DU_ShaderProgram.md">H3DU.ShaderProgram</a> here is deprecated.</i>

#### Return Value

Return value. (Type: Object)

### H3DU.ShapeGroup#setTexture(material) <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_setTexture'></a>

Sets the texture used by all shapes in this shape group.

#### Parameters

* `material` (Type: <a href="H3DU_Texture.md">H3DU.Texture</a> | String)<br>
    <a href="H3DU_Texture.md">H3DU.Texture</a> object, or a string with the URL of the texture data. In the case of a string the texture will be loaded via the JavaScript DOM's Image class. However, this method will not load that image if it hasn't been loaded yet.

#### Return Value

Return value. (Type: Object)

### H3DU.ShapeGroup#setTransform(transform) <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_setTransform'></a>

Sets the transform used by this shape group to a copy
of the given transform. Child
shapes can set their own transforms, in which case the
rendering process will multiply this shape group's transform
with the child shape's transform as it renders the child shape.

#### Parameters

* `transform` (Type: <a href="H3DU_Transform.md">H3DU.Transform</a>)<br>
    The transform to copy for the use of this shape group.

#### Return Value

Return value. (Type: Object)

### H3DU.ShapeGroup#setVisible(value) <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_setVisible'></a>

Sets whether this shape group will be drawn on rendering.

#### Parameters

* `value` (Type: Boolean)<br>
    True if this shape group will be visible; otherwise, false.

#### Return Value

This object. (Type: <a href="H3DU_ShapeGroup.md">H3DU.ShapeGroup</a>)

### H3DU.ShapeGroup#vertexCount() <a id='H3DU_ShapeGroup_H3DU_ShapeGroup_vertexCount'></a>

Gets the number of vertices composed by all shapes in this shape group.

#### Return Value

Return value. (Type: Number)