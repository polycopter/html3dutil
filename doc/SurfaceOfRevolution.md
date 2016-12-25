# SurfaceOfRevolution

[Back to documentation index.](index.md)

### SurfaceOfRevolution(curve, minval, maxval, [axis]) <a id='SurfaceOfRevolution'></a>

Parametric evaluator for a surface of revolution, which results by revolving
an X/Y curve around an axis.

This class is considered a supplementary class to the
Public Domain HTML 3D Library and is not considered part of that
library.

To use this class, you must include the script "extras/evaluators.js"; the
class is not included in the "h3du_min.js" file which makes up
the HTML 3D Library. Example:

    &lt;script type="text/javascript" src="extras/evaluators.js">&lt;/script>

#### Parameters

* `curve` (Type: function)<br>
    Curve to rotate about the axis of rotation, as specified in the "axis" parameter. The curve function must contain a function named "evaluate", which takes the following parameter:<ul> <li><code>u</code> - A curve coordinate, generally from 0 to 1. </ul> The evaluator function returns an array of at least 2 elements: the first element is the X coordinate of the curve's position (corresponding to elevation), and the second element is the Y coordinate (corresponding to radius).

 If the curve function draws a curve that goes around the axis of rotation, such as a circle or ellipse, the V-coordinates given in _minval_ and _maxval_ must restrict the curve definition to no more than half of the curve.
* `minval` (Type: Number)<br>
    Smallest V-coordinate.
* `maxval` (Type: Number)<br>
    Largest V-coordinate. If _minval_ is greater than _maxval_, both values will be swapped.
* `axis` (Type: Array.&lt;Number>) (optional)<br>
    Axis of rotation, around which the curve will be rotated to generate the surface of revolution. If null or omitted, the positive Z-axis will be the axis of rotation. This parameter is a 3-element array describing the X, Y, and Z coordinates, respectively, of a 3D point. The axis of rotation will run in the direction from the origin to the point given in this parameter. This parameter need not be a unit vector (a <a href="H3DU_Math.md#H3DU_Math_vec3norm">"normalized" vector</a> with a length of 1).

### Methods

* [fromFunction](#SurfaceOfRevolution_fromFunction)
* [torus](#SurfaceOfRevolution_torus)

### (static) SurfaceOfRevolution.fromFunction(func, minval, maxval, [axis]) <a id='SurfaceOfRevolution_fromFunction'></a>

Creates a parametric evaluator for a surface of revolution
whose curve is the graph of a single-variable function.
The resulting surface will have a circular cross section
along its length.
Examples of surfaces generated by this technique are
cones, frustums, cylinders, spheres, and spheroids (the
bases of these surfaces won't be generated).

#### Parameters

* `func` (Type: function)<br>
    Function whose graph will be rotated about the axis of rotation, as specified in the "axis" parameter. The function takes a number as a single parameter and returns a number. The return value is effectively the radius of each part of the surface from beginning to end.
* `minval` (Type: Number)<br>
    Smallest parameter of the function. This is a number of units from the origin along the axis of rotation.
* `maxval` (Type: Number)<br>
    Largest parameter of the function. This is a number of units from the origin along the axis of rotation. If _minval_ is greater than _maxval_, both values will be swapped.
* `axis` (Type: Array.&lt;Number>) (optional)<br>
    Axis of rotation, around which the function graph will be rotated to generate the surface of revolution. If null or omitted, the positive Z-axis will be the axis of rotation. This parameter is a 3-element array describing the X, Y, and Z coordinates, respectively, of a 3D point. The axis of rotation will run in the direction from the origin to the point given in this parameter. This parameter need not be a unit vector (a <a href="H3DU_Math.md#H3DU_Math_vec3norm">"normalized" vector</a> with a length of 1).

#### Return Value

Return value. (Type: <a href="SurfaceOfRevolution.md">SurfaceOfRevolution</a>)

#### Example

The following creates an evaluator for a cone
which starts at the origin and runs 10 units along the Z axis.

    var surf=SurfaceOfRevolution.fromFunction(
     function(x) {
    "use strict"; return x/2; }, // use a constantly increasing function
    0, 10);

This is an evaluator for the same cone, but
shifted 3 units back.

    var surf=SurfaceOfRevolution.fromFunction(
     function(x) {
    "use strict"; x+=3; return x/2; },
    -3,7);

The following creates an evaluator for a cylinder
which runs from 5 to 10 units, and with a radius of 2 units.

    var surf=SurfaceOfRevolution.fromFunction(
     function(x) {
    "use strict"; return 2; }, // use a constant radius
    5, 10);

### (static) SurfaceOfRevolution.torus(outerRadius, innerRadius, [curve], [axis]) <a id='SurfaceOfRevolution_torus'></a>

Parametric evaluator for a torus, a special case of a surface of revolution.

#### Parameters

* `outerRadius` (Type: Number)<br>
    Radius from the center to the innermost part of the torus.
* `innerRadius` (Type: Number)<br>
    Radius from the inner edge to the innermost part of the torus.
* `curve` (Type: function) (optional)<br>
    Object describing a curve to serve as the cross section of the torus. The curve need not be closed; in fact, certain special surfaces can result by leaving the ends open. The curve function must contain a function named "evaluate", which takes the following parameter:<ul> <li><code>u</code> - A curve coordinate, generally from 0 to 1. </ul> The evaluator function returns an array of at least 2 elements: the first element is the X coordinate of the curve's position, and the second element is the Y coordinate. If null or omitted, uses a circular cross section.
* `axis` (Type: Array.&lt;Number>) (optional)<br>
    Axis of rotation, which the torus will pass through. If null or omitted, the positive Z-axis will be the axis of rotation. This parameter is a 3-element array describing the X, Y, and Z coordinates, respectively, of a 3D point. The axis of rotation will run in the direction from the origin to the point given in this parameter. This parameter need not be a unit vector (a <a href="H3DU_Math.md#H3DU_Math_vec3norm">"normalized" vector</a> with a length of 1).

#### Return Value

Return value. (Type: <a href="SurfaceOfRevolution.md">SurfaceOfRevolution</a>)