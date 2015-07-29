HTML 3D Utility Library
====

**Download source code: [ZIP file](https://github.com/peteroupc/html3dutil/archive/master.zip)**

If you like this software, consider donating to me at this link: [http://upokecenter.dreamhosters.com/articles/donate-now-2/](http://upokecenter.dreamhosters.com/articles/donate-now-2/)

----

A public domain JavaScript library for easing the development of HTML 3D applications.

* Source code is available in the [project page](https://github.com/peteroupc/html3dutil).
* API documentation is found at: [https://peteroupc.github.io/html3dutil](https://peteroupc.github.io/html3dutil)

The file "glutil_min.js" is a minified single-file version of the library.  Include it in your HTML
as follows:

```html
  <script type="text/javascript" src="glutil_min.js"></script>
```

Overview
---------

For detailed instructions on using this library and a summary of the library's features, visit:

[https://peteroupc.github.io/html3dutil/tutorial-overview.html](https://peteroupc.github.io/html3dutil/tutorial-overview.html)

Demos
---------

### Simple Demos

* [demos/simple.html](https://peteroupc.github.io/html3dutil/demos/simple.html) - A simple demo using this library.
* [demos/triangle.html](https://peteroupc.github.io/html3dutil/demos/triangle.html) - Demonstrates drawing a triangle.

### Materials

* [demos/selfpulse.html](https://peteroupc.github.io/html3dutil/demos/selfpulse.html) - Demonstrates
a rotating, pulsating box.

### Shapes and meshes

* [demos/compositeMesh.html](https://peteroupc.github.io/html3dutil/demos/compositeMesh.html) - Demonstrates
combining multiple meshes into one.
* [demos/shapes.html](https://peteroupc.github.io/html3dutil/demos/shapes.html) - Demonstrates
the built-in shapes.
* [demos/newshapes.html](https://peteroupc.github.io/html3dutil/demos/newshapes.html) - Fancier
demo of some of the built-in shapes.
* [demos/builtinshapes.html](https://peteroupc.github.io/html3dutil/demos/builtinshapes.html) - Interactive demo of
the built-in shapes.
* [demos/platonic.html](https://peteroupc.github.io/html3dutil/demos/platonic.html) - A demo featuring the five
platonic solids.  Demonstrates how vertex and index arrays are built up to create geometric meshes.
* [demos/clock.html](https://peteroupc.github.io/html3dutil/demos/clock.html) - A demo
featuring a wall clock.

### Paths

* [demos/marchingdots.html](https://peteroupc.github.io/html3dutil/demos/marchingdots.html) - Demo
of a series of dots following a path like marching ants. Shows some of the functionality of graphics paths.
* [demos/polyclip.html](https://peteroupc.github.io/html3dutil/demos/polyclip.html) -
Similar to "marchingdots.html", but now uses the union of two circles as a path to demonstrate polygon
clipping.
* [demos/pathtube.html](https://peteroupc.github.io/html3dutil/demos/pathtube.html) - Demo
of a tube formed by a path curve.
* [demos/pathshapes.html](https://peteroupc.github.io/html3dutil/demos/pathshapes.html) - Demo
of 3D and 2D shapes generated by a 2D path.

### Curves and Surfaces

* [demos/surfaces.html](https://peteroupc.github.io/html3dutil/demos/surfaces.html) - Demonstrates
using evaluators to generate parametric surfaces.
* [demos/curves.html](https://peteroupc.github.io/html3dutil/demos/curves.html) - Demonstrates
using evaluators to generate parametric curves.
* [demos/surfacesexpr.html](https://peteroupc.github.io/html3dutil/demos/surfacesexpr.html) - Demonstrates
parametric surfaces, with a custom formula editor.
* [demos/curvesexpr.html](https://peteroupc.github.io/html3dutil/demos/curvesexpr.html) - Demonstrates
parametric curves, with a custom formula editor.
* [demos/implicit.html](https://peteroupc.github.io/html3dutil/demos/implicit.html) - Demonstrates
implicit surfaces.

### Textures

* [demos/textured.html](https://peteroupc.github.io/html3dutil/demos/textured.html) - Demonstrates loading textures
and applying them to 3D shapes.
* [demos/specular.html](https://peteroupc.github.io/html3dutil/demos/specular.html) - Demonstrates using
textures as specular reflection maps.
* [demos/gradient.html](https://peteroupc.github.io/html3dutil/demos/gradient.html) - Demonstrates generating a custom
texture -- a linear gradient from one color to another.

### Shaders

* [demos/squares.html](https://peteroupc.github.io/html3dutil/demos/squares.html) - Demonstrates shader-based filters.

### Particle Systems

* [demos/tris.html](https://peteroupc.github.io/html3dutil/demos/tris.html) - Demonstrates a particle system.
* [demos/fallingballs.html](https://peteroupc.github.io/html3dutil/demos/fallingballs.html) - Demonstrates falling balls
of different sizes.

### Loading 3D Models

* [demos/obj.html](https://peteroupc.github.io/html3dutil/demos/obj.html) - An object file loader.
* [demos/stl.html](https://peteroupc.github.io/html3dutil/demos/stl.html) - Demonstrates loading 3D models.

### Alternative Rendering

* [demos/surfaces2d.html](https://peteroupc.github.io/html3dutil/demos/surfaces2d.html) - Same as the surfaces.html
demo, but uses an experimental renderer using the HTML 2D Canvas instead of an HTML 3D context.  Only a limited
set of features are currently supported.

### Miscellaneous

* [demos/background.html](https://peteroupc.github.io/html3dutil/demos/background.html) - A demo
featuring a background with continuously drawn 3D shapes.
* [demos/animation.html](https://peteroupc.github.io/html3dutil/demos/animation.html) - A demo
illustrating a simple animation of 3D shapes.
* [demos/starfield.html](https://peteroupc.github.io/html3dutil/demos/starfield.html) - Demo of a star field.
* [demos/perspective.html](https://peteroupc.github.io/html3dutil/demos/perspective.html) - Demonstrates a perspective projection.

Other Sites
--------
* CodePlex: [https://html3dutil.codeplex.com/](https://html3dutil.codeplex.com/)
* Code Project: [http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library](http://www.codeproject.com/Tips/896839/Public-Domain-HTML-ThreeD-Library)
* SourceForge: [https://sourceforge.net/p/html3dutil](https://sourceforge.net/p/html3dutil)

Examples
---------
```javascript
  // Create the 3D scene; find the HTML canvas and pass it
  // to Scene3D.
  var scene=new Scene3D(document.getElementById("canvas"));
  // Create a box mesh 10 units in width, 20 units
  // in height, and 20 units in depth
  var mesh=Meshes.createBox(10,10,10);
  // Create a shape based on the mesh and give it a red color
  var shape=scene.makeShape(mesh).setColor("red");
  // Add the shape to the scene
  scene.addShape(shape);
  // Create a timer
  var timer={};
  // Set up the render loop
  GLUtil.renderLoop(function(time){
   // Set the perspective view.  Camera has a 45-degree field of view
   // and will see objects from 0.1 to 100 units away.
   scene.setPerspective(45,scene.getClientAspect(),0.1,100);
   // Move the camera back 40 units.
   scene.setLookAt([0,0,40]);
   // Update the shape's rotation
   var q=GLMath.quatFromTaitBryan(
     360*GLUtil.getTimePosition(timer,time,6000),
     360*GLUtil.getTimePosition(timer,time,12000),
     0
   );
   shape.setQuaternion(q);
   // Render the scene
   scene.render();
  });
```

History
---------

Version 1.5.1:

- Fixed bug in normal calculation
- Make certain changes to the demos to ensure compatibility with the
 next major version
- Fix curve returned by GraphicsPath#getCurves() so that closed paths
 remain smooth at their endpoints when a curve tube is generated from
 them

Version 1.5:

- Add support for specular maps and normal maps, including
 in the JSON mesh format and MTL material format.
- To support normal maps, extra methods for bitangents and
 tangents were added to the Mesh class.
- Added six new demos and modified several others
- Support 24-bit color versions of TGA files
- Scene3D now does frustum culling of its shapes
- Fixed vertex normal calculation in the recalcNormals()
 method of the Mesh class.
- Allow two-element arrays to be passed to the Mesh class's
 texCoord3() method.
- Add getBoundingBox method to the Mesh class.
- Add the setVisible method to the Shape and ShapeGroup
 classes.
- Allow reading OBJ files with negative reference numbers
- Add path.js (2D graphics paths) to extras
- Added an "axis" parameter to the SurfaceOfRevolution
 constructor and fromFunction method
- Add vec3negate, vec3negateInPlace, vec3mul, and plane
 and frustum methods to the GLMath class
- Deprecate the practice of setting shape materials directly
 to textures (calling the Shape#setMaterial method with a
 Texture object rather than a Material object).
- Deprecate certain properties of Transform that shouldn't
 be exposed as a public API and add corresponding methods
 for those properties
- Fix getPromiseResults
- Documentation added in many places
- "meshexamples.md" demo added and other demos edited
 or rearranged
- Other changes and fixes

Version 1.4:

- Fixed camera.js issues (thanks to the user "the-sz" on GitHub)
- Added an _extras_ folder with the following new scripts:
    - A CurveTube class for creating tubes from 3D curves
    - A parametric evaluator for surfaces of revolution and
      3 kinds of curves (_evaluators.js_)
    - A frame counter (moved from the demos)
    - A JSON converter and loader for 3D meshes (_meshjson.js_)
- Made _objmtl.js_ compatible with more MTL files
- Math.sin/Math.cos pairs were replaced with optimized
  versions throughout the code
- Add mat4transformVec3 method to GLMath
- Add BSplineCurve class
- Deprecate vertexBezier, normalBezier, colorBezier, and texCoordBezier
  methods of CurveEval and SurfaceEval
- Optimize SurfaceEval's evalSurface method when generating
  triangles
- Add primitiveCount and enumPrimitives methods to the Mesh
  class
- Add setMaterial and removeShape methods to the ShapeGroup class
- Default shader program now uses `modelViewMatrix` instead of
  separate `world` and `view` uniforms
- Fix JSON issues in GLUtil.loadFileFromUrl method
- Many new demos added
- Add graphics filters tutorial and expanded several other tutorials

See [older version history](https://peteroupc.github.io/html3dutil/tutorial-history.html).

About
-----------

Written in 2015 by Peter O.

Any copyright is dedicated to the Public Domain.
[http://creativecommons.org/publicdomain/zero/1.0/](http://creativecommons.org/publicdomain/zero/1.0/)

If you like this, you should donate to Peter O.
at: [http://upokecenter.dreamhosters.com/articles/donate-now-2/](http://upokecenter.dreamhosters.com/articles/donate-now-2/)
