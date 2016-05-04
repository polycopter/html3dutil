/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/
/* global GLMath, Mesh */
/**
* Contains methods that create meshes
* of various geometric shapes.
* @class
* @alias glutil.Meshes
*/
var Meshes={};

/**
* Creates a mesh of a box (rectangular prism), which
* will be centered at the origin.
* See the "{@tutorial shapes}" tutorial.
* Will create texture coordinates such that the same texture
* is used on each face of the box.
* @param {number} xSize Width of the box.
* @param {number} ySize Height of the box.
* @param {number} xSize Depth of the box.
* @param {boolean} inward If true, the normals generated by this
* method will point inward; otherwise, outward.  Should normally be false
* unless the box will be viewed from the inside.
* @return {Mesh} The generated mesh.
*/
Meshes.createBox=function(xSize,ySize,zSize,inward){
 // Position X, Y, Z, normal NX, NY, NZ, texture U, V
 "use strict";
xSize*=0.5;
 ySize*=0.5;
 zSize*=0.5;
 var vertices=[
-xSize,-ySize,zSize,-1.0,0.0,0.0,1.0,0.0,
-xSize,ySize,zSize,-1.0,0.0,0.0,1.0,1.0,
-xSize,ySize,-zSize,-1.0,0.0,0.0,0.0,1.0,
-xSize,-ySize,-zSize,-1.0,0.0,0.0,0.0,0.0,
xSize,-ySize,-zSize,1.0,0.0,0.0,1.0,0.0,
xSize,ySize,-zSize,1.0,0.0,0.0,1.0,1.0,
xSize,ySize,zSize,1.0,0.0,0.0,0.0,1.0,
xSize,-ySize,zSize,1.0,0.0,0.0,0.0,0.0,
xSize,-ySize,-zSize,0.0,-1.0,0.0,1.0,0.0,
xSize,-ySize,zSize,0.0,-1.0,0.0,1.0,1.0,
-xSize,-ySize,zSize,0.0,-1.0,0.0,0.0,1.0,
-xSize,-ySize,-zSize,0.0,-1.0,0.0,0.0,0.0,
xSize,ySize,zSize,0.0,1.0,0.0,1.0,0.0,
xSize,ySize,-zSize,0.0,1.0,0.0,1.0,1.0,
-xSize,ySize,-zSize,0.0,1.0,0.0,0.0,1.0,
-xSize,ySize,zSize,0.0,1.0,0.0,0.0,0.0,
-xSize,-ySize,-zSize,0.0,0.0,-1.0,1.0,0.0,
-xSize,ySize,-zSize,0.0,0.0,-1.0,1.0,1.0,
xSize,ySize,-zSize,0.0,0.0,-1.0,0.0,1.0,
xSize,-ySize,-zSize,0.0,0.0,-1.0,0.0,0.0,
xSize,-ySize,zSize,0.0,0.0,1.0,1.0,0.0,
xSize,ySize,zSize,0.0,0.0,1.0,1.0,1.0,
-xSize,ySize,zSize,0.0,0.0,1.0,0.0,1.0,
-xSize,-ySize,zSize,0.0,0.0,1.0,0.0,0.0];
 if(inward){
  for(var i=0;i<vertices.length;i+=8){
   vertices[i+3]=-vertices[i+3];
   vertices[i+4]=-vertices[i+4];
   vertices[i+5]=-vertices[i+5];
  }
 }
 var faces=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,
 13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23];
 return new Mesh(vertices,faces,Mesh.NORMALS_BIT | Mesh.TEXCOORDS_BIT);
};

/**
* Creates a mesh of a cylinder.  The cylinder's base will
* be centered at the origin and its height will run along the
* positive z-axis.  The base and top themselves will not be
* included in the mesh.
* See the "{@tutorial shapes}" tutorial.
* @param {number} baseRad Radius of the base of the cylinder. If 0,
* this function will create an approximation to a downward pointing cone.
* @param {number} topRad Radius of the top of the cylinder. If 0,
* this function will create an approximation to an upward pointing cone.
* @param {number} height Height of the cylinder.
* @param {number} slices Number of lengthwise "slices" the cylinder consists
* of, each slice going through the center of the cylinder.  This function will
* create a triangular prism if "slices" is 3
* and both radiuses are the same; a triangular pyramid if "slices" is
* 3 and either radius is zero; a rectangular prism if "slices" is 4
* and both radiuses are the same; and a rectangular pyramid if "slices"
* is 4 and either radius is zero. Must be 3 or greater.
* May be null or omitted, in which case the default is 32.
* @param {number} stacks Number of vertical stacks the cylinder consists of.
* May be null or omitted, in which case the default is 1.
* @param {boolean} flat If true, will generate normals such that the
* cylinder will be flat shaded; otherwise, will generate normals such that the
* cylinder will be smooth shaded.
* @param {boolean} inside If true, the normals generated by this
* method will point inward; otherwise, outward.  Should normally be false
* unless the cylinder will be viewed from the inside.
* @return {Mesh} The generated mesh.
*/
Meshes.createCylinder=function(baseRad, topRad, height, slices, stacks, flat, inside){
 "use strict";
var mesh=new Mesh();
 if((slices===null || typeof slices==="undefined"))slices=32;
 if((stacks===null || typeof stacks==="undefined"))stacks=1;
 if(slices<=2)throw new Error("too few slices");
 if(stacks<1)throw new Error("too few stacks");
 if(height<0)throw new Error("negative height");
 if((baseRad<=0 && topRad<=0) || height===0){
  // both baseRad and topRad are zero or negative,
  // or height is zero
  return mesh;
 }
 var normDir=(inside) ? -1 : 1;
 var sc=[0,1]; // sin(0), cos(0)
 var tc=[0];
 var twopi=GLMath.PiTimes2;
 for(var i=1;i<slices;i++){
  var t=i*1.0/slices;
  var angle=twopi*t;
  var cangle = Math.cos(angle);
  var sangle = (angle>=0 && angle<6.283185307179586) ? (angle<=3.141592653589793 ? Math.sqrt(1.0-cangle*cangle) : -Math.sqrt(1.0-cangle*cangle)) : Math.sin(angle);
  sc.push(sangle,cangle);
  tc.push(t);
 }
 sc.push(0,1);
 tc.push(1);
 var slicesTimes2=slices*2;
 if(height>0){
  var lastZ=0;
  var lastRad=baseRad;
  var slopeAngle=0,sinSlopeNorm,cosSlopeNorm;
  if(baseRad===topRad){
   sinSlopeNorm=0;
   cosSlopeNorm=normDir;
  } else {
   slopeAngle=Math.atan2(baseRad-topRad,height);
   cosSlopeNorm = Math.cos(slopeAngle);
   sinSlopeNorm = (slopeAngle>=0 && slopeAngle<6.283185307179586) ? (slopeAngle<=3.141592653589793 ? Math.sqrt(1.0-cosSlopeNorm*cosSlopeNorm) : -Math.sqrt(1.0-cosSlopeNorm*cosSlopeNorm)) : Math.sin(slopeAngle);
   sinSlopeNorm*=normDir;
   cosSlopeNorm*=normDir;
  }
  var recipstacks=1.0/(stacks);
  for(i=0;i<stacks;i++){
   var zStart=lastZ;
   var zEnd=(i+1==stacks) ? 1.0 : (i+1)*recipstacks;
   var zStartHeight=height*zStart;
   var zEndHeight=height*zEnd;
   var radiusStart=lastRad;
   var radiusEnd=baseRad+(topRad-baseRad)*zEnd;
   lastZ=zEnd;
   lastRad=radiusEnd;
   mesh.mode(Mesh.TRIANGLE_STRIP);
   mesh.texCoord2(1,zStart);
   mesh.normal3(0,cosSlopeNorm,sinSlopeNorm);
   mesh.vertex3(0,radiusStart,zStartHeight);
   mesh.texCoord2(1,zEnd);
   mesh.normal3(0,cosSlopeNorm,sinSlopeNorm);
   mesh.vertex3(0,radiusEnd,zEndHeight);
   for(var k=2,j=1;k<=slicesTimes2;k+=2,j++){
    var tx=tc[j];
    var x,y;
    x=sc[k];
    y=sc[k+1];
     mesh.texCoord2(1-tx,zStart);
     mesh.normal3(x*cosSlopeNorm,y*cosSlopeNorm,sinSlopeNorm);
     mesh.vertex3(x*radiusStart,y*radiusStart,zStartHeight);
     mesh.texCoord2(1-tx,zEnd);
     mesh.normal3(x*cosSlopeNorm,y*cosSlopeNorm,sinSlopeNorm);
     mesh.vertex3(x*radiusEnd,y*radiusEnd,zEndHeight);
   }
  }
 }
 return flat ? mesh.recalcNormals(flat,inside) : mesh;
};

Meshes.createLathe=function(points, slices, flat, inside){
 "use strict";
 // NOTE: Y-coordinate should not be the same from one point to the next
 var mesh=new Mesh();
 if(points.length<4)throw new Error("too few points");
 if((slices===null || typeof slices==="undefined"))slices=32;
 if(slices<=2)throw new Error("too few slices");
 if((points.length%1)!=0)throw new Error("points array length is not an even number");
for(var i=0;i<points.length;i+=2){
 if(points[i<<1]<0)throw new Error("point's x is less than 0")
}
 var sc=[0,1]; // sin(0), cos(0)
 var tc=[0];
 var i;
 var twopi=GLMath.PiTimes2;
 for(i=1;i<slices;i++){
  var t=i*1.0/slices;
  var angle=twopi*t;
  var cangle = Math.cos(angle);
  var sangle = (angle>=0 && angle<6.283185307179586) ? (angle<=3.141592653589793 ? Math.sqrt(1.0-cangle*cangle) : -Math.sqrt(1.0-cangle*cangle)) : Math.sin(angle);
  sc.push(sangle,cangle);
  tc.push(t);
 }
 sc.push(0,1);
 tc.push(1);
 var slicesTimes2=slices*2;
  var lastZ=0;
  var lastRad=baseRad;
  var stacks=(points.length/2)-1;
  var recipstacks=1.0/stacks;
  for(i=0;i<stacks;i++){
   var zStart=lastZ;
   var zEnd=(i+1==stacks) ? 1.0 : (i+1)*recipstacks;
   var index=i<<1;
   var zsh=points[index+1];
   var zeh=points[index+3];
   var zStartHeight=Math.min(zsh,zeh);
   var zEndHeight=Math.max(zsh,zeh);
   var radiusStart=points[index];
   var radiusEnd=points[index+2];
   lastZ=zEnd;
   lastRad=radiusEnd;
   mesh.mode(Mesh.TRIANGLE_STRIP);
   mesh.texCoord2(1,zStart);
   mesh.vertex3(0,radiusStart,zStartHeight);
   mesh.texCoord2(1,zEnd);
   mesh.vertex3(0,radiusEnd,zEndHeight);
   for(var k=2,j=1;k<=slicesTimes2;k+=2,j++){
    var tx=tc[j];
    var x,y;
    x=sc[k];
    y=sc[k+1];
     mesh.texCoord2(1-tx,zStart);
     mesh.vertex3(x*radiusStart,y*radiusStart,zStartHeight);
     mesh.texCoord2(1-tx,zEnd);
     mesh.vertex3(x*radiusEnd,y*radiusEnd,zEndHeight);
   }
  }
 return mesh.recalcNormals(flat,inside);
};

/**
* Creates a mesh of a closed cylinder.  The cylinder's base will
* be centered at the origin and its height will run along the
* positive z-axis.  The base and top will be included in the mesh if
* their radius is greater than 0.
* See the "{@tutorial shapes}" tutorial.
* @param {number} baseRad Radius of the base of the cylinder.
* See {@link glutil.Meshes.createCylinder}.
* @param {number} topRad Radius of the top of the cylinder.
* See {@link glutil.Meshes.createCylinder}.
* @param {number} height Height of the cylinder.
* @param {number} slices    Number of lengthwise "slices" the cylinder consists
* of. See {@link glutil.Meshes.createCylinder}.
* @param {number} stacks Number of vertical stacks the cylinder consists of.
* May be null or omitted, in which case the default is 1.
* @param {boolean} flat If true, will generate normals such that the
* cylinder will be flat shaded; otherwise, will generate normals such that the
* cylinder will be smooth shaded.
* @param {boolean} inside If true, the normals generated by this
* method will point inward; otherwise, outward.  Should normally be false
* unless the cylinder will be viewed from the inside.
* @return {Mesh} The generated mesh.
*/
Meshes.createClosedCylinder=function(baseRad,topRad,height,slices,stacks,flat, inside){
 "use strict";
var cylinder=Meshes.createCylinder(baseRad,topRad,height,slices,stacks,flat, inside);
 var base=Meshes.createDisk(0,baseRad,slices,2,!inside).reverseWinding();
 var top=Meshes.createDisk(0,topRad,slices,2,inside);
 // move the top disk to the top of the cylinder
 top.transform(GLMath.mat4translated(0,0,height));
 // merge the base and the top
 return cylinder.merge(base).merge(top);
};

/**
* Creates a mesh of a 2D disk.
* Assuming the Y axis points up, the X axis right,
* and the Z axis toward the viewer, the first vertex in the outer edge
* of the 2D disk will be at the 12 o'clock position.
* See the "{@tutorial shapes}" tutorial.
* @param {number} inner Radius of the hole in the middle of the
* disk.  If 0, no hole is created and the method will generate a regular
* polygon with n sides, where n is the value of "slices".  For example,
* if "inner" is 0 and "slices" is 3, the result will be an equilateral triangle;
* a square for 4 "slices", a regular pentagon for 5 "slices", and so on.
* @param {number} outer Outer radius of the disk.
* @param {number} slices Number of slices going around the disk.
* May be null or omitted; default is 16.
* @param {number} loops Number of concentric rings the disk makes up.
* May be null or omitted; default is 1.
* @param {boolean} inward If true, the normals generated by this
* method will point in the opposite direction of the positive z-axis; otherwise,
* in the same direction of the positive z-axis.  Default is false.
* @return The generated mesh.
*/
Meshes.createDisk=function(inner, outer, slices, loops, inward){
 "use strict";
return Meshes.createPartialDisk(inner,outer,slices,loops,0,360,inward);
};

/**
* Creates a mesh of a 2D disk or an arc of a 2D disk.
* See the "{@tutorial shapes}" tutorial.
* @param {number} inner Radius of the hole where the middle of the
* complete disk would be.  If 0, no hole is created.
* @param {number} outer Outer radius of the disk.
* @param {number} slices Number of slices going around the partial disk.
* May be null or omitted; default is 32.
* @param {number} loops Number of concentric rings the partial disk makes up.
* May be null or omitted; default is 1.
* @param {number} start Starting angle of the partial disk, in degrees.
* May be null or omitted; default is 0.
* 0 degrees is at the positive y-axis,
* and 90 degrees at the positive x-axis.
* Assuming the Y axis points up, the X axis right,
* and the Z axis toward the viewer, 0 degrees is at the 12 o'clock position,
* and 90 degrees at the 3 o'clock position.
* @param {number} sweep Arc length of the partial disk, in degrees.
* May be null or omitted; default is 360. May be negative.
* @param {boolean} inward If true, the normals generated by this
* method will point in the opposite direction of the positive z-axis; otherwise,
* in the same direction of the positive z-axis.  Default is false.
* @return The generated mesh.
*/
Meshes.createPartialDisk=function(inner, outer, slices, loops, start, sweep, inward){
 "use strict";
var mesh=new Mesh();
 if((slices===null || typeof slices==="undefined"))slices=32;
 if((loops===null || typeof loops==="undefined"))loops=1;
 if((start===null || typeof start==="undefined"))start=0;
 if((sweep===null || typeof sweep==="undefined"))sweep=360;
 if(slices<=2)throw new Error("too few slices");
 if(loops<1)throw new Error("too few loops");
 if(inner>outer)throw new Error("inner greater than outer");
 if(inner<0)inner=0;
 if(outer<0)outer=0;
 if(outer===0 || sweep === 0)return mesh;
 var fullCircle=(sweep===360 && start === 0);
 var sweepDir=sweep<0 ? -1 : 1;
 if(sweep<0)sweep=-sweep;
 sweep%=360;
 if(sweep===0)sweep=360;
 var sc=[];
 var tc=[];
 var i;
 var twopi=GLMath.PiTimes2;
 var arcLength=(sweep===360) ? twopi : sweep*GLMath.PiDividedBy180;
 start=start*GLMath.PiDividedBy180;
 if(sweepDir<0){
  arcLength=-arcLength;
 }
 for(var i=0;i<=slices;i++){
  var t=i*1.0/slices;
  var angle=(t===1 && arcLength===twopi) ? start : start+arcLength*t;
  angle=(angle<0) ? twopi-(-angle)%twopi : angle%twopi;
  var cangle = Math.cos(angle);
  var sangle = (angle>=0 && angle<6.283185307179586) ? (angle<=3.141592653589793 ? Math.sqrt(1.0-cangle*cangle) : -Math.sqrt(1.0-cangle*cangle)) : Math.sin(angle);
  sc.push(sangle,cangle);
  tc.push(t);
 }
 if(fullCircle){
  sc[0]=0;
  sc[1]=1;
  sc[sc.length-1]=1;
  sc[sc.length-2]=0;
  tc[0]=0;
  tc[tc.length-1]=1;
 }
 var slicesTimes2=slices*2;
 var height=outer-inner;
  var lastZ=0;
  var lastRad=inner;
  if(inward){
   mesh.normal3(0,0,-1);
  } else {
   mesh.normal3(0,0,1);
  }
  for(i=0;i<loops;i++){
   var zStart=lastZ;
   var zEnd=(i+1)/loops;
   var radiusStart=lastRad;
   var radiusEnd=inner+height*zEnd;
   var rso=radiusStart/outer;
   var reo=radiusEnd/outer;
   lastZ=zEnd;
   lastRad=radiusEnd;
   var triangleFanBase=(i===0 && inner === 0);
   mesh.mode((triangleFanBase) ?
     Mesh.TRIANGLE_FAN : Mesh.TRIANGLE_STRIP);
   var x,y,j,k,tx;
   if(triangleFanBase){
    var jStart=slicesTimes2/2;
    for(k=slicesTimes2,j=jStart;k>=0;k-=2,j--){
     tx=tc[j];
     x=sc[k];
     y=sc[k+1];
     if(k===slicesTimes2){
      mesh.texCoord2((1+(x*rso))*0.5,(1+(y*rso))*0.5);
      mesh.vertex3(x*radiusStart,y*radiusStart,0);
     }
     mesh.texCoord2((1+(x*reo))*0.5,(1+(y*reo))*0.5);
     mesh.vertex3(x*radiusEnd,y*radiusEnd,0);
    }
   } else {
    for(k=0,j=0;k<=slicesTimes2;k+=2,j++){
     tx=tc[j];
     x=sc[k];
     y=sc[k+1];
     mesh.texCoord2((1+(x*reo))*0.5,(1+(y*reo))*0.5);
     mesh.vertex3(x*radiusEnd,y*radiusEnd,0);
     mesh.texCoord2((1+(x*rso))*0.5,(1+(y*rso))*0.5);
     mesh.vertex3(x*radiusStart,y*radiusStart,0);
    }
   }
  }
  return mesh;
};

/**
* Creates a mesh of a torus (donut), centered at the origin.
* See the "{@tutorial shapes}" tutorial.
* @param {number} inner Inner radius (thickness) of the torus.
* @param {number} outer Outer radius of the torus (distance from the
* center to the innermost part of the torus).
* @param {number} lengthwise Number of lengthwise subdivisions.
* May be null or omitted; default is 16.
* @param {number} crosswise Number of crosswise subdivisions.
* May be null or omitted; default is 16.
* @param {boolean} flat If true, will generate normals such that the
* torus will be flat shaded; otherwise, will generate normals such that it
* will be smooth shaded.
* @param {boolean} inward If true, the normals generated by this
* method will point inward; otherwise, outward.  Default is false.
* @return {Mesh} The generated mesh.
*/
Meshes.createTorus=function(inner, outer, lengthwise, crosswise,flat,inward){
 "use strict";
var mesh=new Mesh();
 if((crosswise===null || typeof crosswise==="undefined"))crosswise=16;
 if((lengthwise===null || typeof lengthwise==="undefined"))lengthwise=16;
 if(crosswise<3)throw new Error("crosswise is less than 3");
 if(lengthwise<3)throw new Error("lengthwise is less than 3");
 if(inner<0||outer<0)throw new Error("inner or outer is less than 0");
 if(outer===0)return mesh;
 if(inner===0)return mesh;
 var tubeRadius=inner;
 var circleRad=outer;
 var twopi=GLMath.PiTimes2;
 var sci=[];
 var scj=[];
 var cangle,sangle,u;
 for(var i = 0; i < crosswise; i++){
  u = i*twopi/crosswise;
  cangle = Math.cos(u);
  sangle = (u>=0 && u<6.283185307179586) ? (u<=3.141592653589793 ? Math.sqrt(1.0-cangle*cangle) : -Math.sqrt(1.0-cangle*cangle)) : Math.sin(u);
  sci.push(sangle,cangle);
 }
 sci.push(sci[0]);
 sci.push(sci[1]);
 for(i = 0; i < lengthwise; i++){
  u = i*twopi/lengthwise;
  cangle = Math.cos(u);
  sangle = (u>=0 && u<6.283185307179586) ? (u<=3.141592653589793 ? Math.sqrt(1.0-cangle*cangle) : -Math.sqrt(1.0-cangle*cangle)) : Math.sin(u);
  scj.push(sangle,cangle);
 }
 scj.push(scj[0]);
 scj.push(scj[1]);
 for(var j = 0; j < lengthwise; j++){
  var v0 = (j)/lengthwise;
  var v1 = (j+1.0)/lengthwise;
  var sinr0=scj[j*2];
  var cosr0=scj[j*2+1];
  var sinr1=scj[j*2+2];
  var cosr1=scj[j*2+3];
  mesh.mode(Mesh.TRIANGLE_STRIP);
  for(i = 0; i <= crosswise; i++){
   u = i/crosswise;
   var sint=sci[i*2];
   var cost=sci[i*2+1];
   var x = (cost * (circleRad + cosr1 * tubeRadius));
   var y = (sint * (circleRad + cosr1 * tubeRadius));
   var z = (sinr1 * tubeRadius);
   var nx = (cosr1 * cost);
   var ny = (cosr1 * sint);
   var nz = (sinr1);
   mesh.normal3(nx, ny, nz);
   mesh.texCoord2(u, v1);
   mesh.vertex3(x, y, z);
   x = (cost * (circleRad + cosr0 * tubeRadius));
   y = (sint * (circleRad + cosr0 * tubeRadius));
   z = (sinr0 * tubeRadius);
   nx = (cosr0 * cost);
   ny = (cosr0 * sint);
   nz = (sinr0);
   mesh.normal3(nx, ny, nz);
   mesh.texCoord2(u, v0);
   mesh.vertex3(x, y, z);
  }
 }
 return flat ? mesh.recalcNormals(flat, inward) : mesh;
};

/**
* Creates a mesh of a 2D rectangle, centered at the origin.
* See the "{@tutorial shapes}" tutorial.
* @param {number} width Width of the rectangle.
* May be null or omitted; default is 1.
* @param {number} height Height of the rectangle.
* May be null or omitted; default is 1.
* @param {number} widthDiv Number of horizontal subdivisions.
* May be null or omitted; default is 1.
* @param {number} heightDiv Number of vertical subdivisions.
* May be null or omitted; default is 1.
* @param {boolean} inward If true, the normals generated by this
* method will point in the opposite direction of the positive z-axis; otherwise,
* in the same direction of the positive z-axis.  Default is false.
* @return {Mesh} The generated mesh.
*/
Meshes.createPlane=function(width, height, widthDiv, heightDiv,inward){
 "use strict";
var mesh=new Mesh();
 if((width===null || typeof width==="undefined"))width=1;
 if((height===null || typeof height==="undefined"))height=1;
 if((widthDiv===null || typeof widthDiv==="undefined"))widthDiv=1;
 if((heightDiv===null || typeof heightDiv==="undefined"))heightDiv=1;
 if(width<0||height<0)throw new Error("width or height is less than 0");
 if(heightDiv<=0 || widthDiv<=0)
  throw new Error("widthDiv or heightDiv is 0 or less");
 if(width===0 || height === 0)return mesh;
 var xStart=-width*0.5;
 var yStart=-height*0.5;
  if(inward){
   mesh.normal3(0,0,-1);
  } else {
   mesh.normal3(0,0,1);
  }
 for(var i=0;i<heightDiv;i++){
  mesh.mode(Mesh.TRIANGLE_STRIP);
  var iStart=i/heightDiv;
  var iNext=(i+1)/heightDiv;
  var y=yStart+height*iStart;
  var yNext=yStart+height*iNext;
  mesh.texCoord2(0,iNext);
  mesh.vertex3(xStart,yNext,0);
  mesh.texCoord2(0,iStart);
  mesh.vertex3(xStart,y,0);
  for(var j=0;j<widthDiv;j++){
   var jx=(j+1)/widthDiv;
   var x=xStart+width*jx;
   mesh.texCoord2(jx,iNext);
   mesh.vertex3(x,yNext,0);
   mesh.texCoord2(jx,iStart);
   mesh.vertex3(x,y,0);
  }
 }
 return mesh;
};
/**
* Creates a mesh of a sphere, centered at the origin.
* See the "{@tutorial shapes}" tutorial.
* @param {number} radius Radius of the sphere.
* May be null or omitted, in which case the default is 1.
* @param {number} slices Number of vertical sections the sphere consists
* of.  This function will create an octahedron if "slices" is 4 and "stacks" is 2.
* Must be 3 or greater. May be null or omitted, in which case the default is 16.
* @param {number} stacks Number of horizontal sections the sphere consists of.
* May be null or omitted, in which case the default is 16.
* @param {boolean} flat If true, will generate normals such that the
* sphere will be flat shaded; otherwise, will generate normals such that the
* sphere will be smooth shaded.
* @param {boolean} inside If true, the normals generated by this
* method will point inward; otherwise, outward.  Should normally be false
* unless the sphere will be viewed from the inside.
* @return {Mesh} The generated mesh.
*/
Meshes.createSphere=function(radius, slices, stacks, flat, inside){
 "use strict";
return Meshes._createCapsule(radius,0,slices,stacks,1,flat,inside);
};

/**
* Creates a mesh of a capsule, centered at the origin.
* The length of the capsule will run along the z-axis. (If the capsule
* has a high length and a very low radius, it will resemble a 3D line
* with rounded corners.)
* See the "{@tutorial shapes}" tutorial.
* @param {number} radius Radius of each spherical
* end of the capsule.
* May be null or omitted, in which case the default is 1.
* @param {number} length Length of the middle section.
* May be null or omitted, in which case the default is 1.
* If this value is 0, an approximation to a sphere will be generated.
* @param {number} slices Number of vertical sections the capsule consists
* of.  This function will create an octahedron if "slices" is 4 and "stacks" is 2.
* Must be 3 or greater. May be null or omitted, in which case the default is 16.
* @param {number} stacks Number of horizontal sections
* each spherical half consists of.
* May be null or omitted, in which case the default is 8.
* @param {number} middleStacks Number of vertical sections
* the middle of the capsule consists of.
* May be null or omitted, in which case the default is 1.
* @param {boolean} flat If true, will generate normals such that the
* capsule will be flat shaded; otherwise, will generate normals such that the
* capsule will be smooth shaded.
* @param {boolean} inside If true, the normals generated by this
* method will point inward; otherwise, outward.  Should normally be false
* unless the capsule will be viewed from the inside.
* @return {Mesh} The generated mesh.
*/
Meshes.createCapsule=function(radius, length, slices, stacks, middleStacks, flat, inside){
 "use strict";
if((stacks===null || typeof stacks==="undefined"))stacks=8;
 if(stacks<1)throw new Error("too few stacks");
 return Meshes._createCapsule(radius,length,slices,stacks*2,middleStacks,flat,inside);
};
/** @private */
Meshes._createCapsule=function(radius,length,slices,stacks,middleStacks,flat,inside){
 "use strict";
var mesh=new Mesh();
 if((slices===null || typeof slices==="undefined"))slices=16;
 if((stacks===null || typeof stacks==="undefined"))stacks=16;
 if((middleStacks===null || typeof middleStacks==="undefined"))middleStacks=1;
 if((radius===null || typeof radius==="undefined"))radius=1;
 if((length===null || typeof length==="undefined"))length=1;
 if(stacks<2)throw new Error("too few stacks");
 if(slices<=2)throw new Error("too few slices");
 if(middleStacks<1 && length>0)throw new Error("too few middle stacks");
 if(length<0)throw new Error("negative length");
 if(radius<0)throw new Error("negative radius");
 if(radius===0){
  // radius is zero
  return mesh;
 }
 var halfLength=length*0.5;
 var halfStacks=stacks/2;
 var normDir=(inside) ? -1 : 1;
 var sc=[0,1]; // sin(0), cos(0)
 var scStack=[];
 var texc=[];
 var tc=[0];
 var angle,s;
 var twopi=GLMath.PiTimes2;
 var pidiv2=GLMath.HalfPi;
 for(var i=1;i<slices;i++){
  var t=i*1.0/slices;
  angle=twopi*t;
  var cangle = Math.cos(angle);
  var sangle = (angle>=0 && angle<6.283185307179586) ? (angle<=3.141592653589793 ? Math.sqrt(1.0-cangle*cangle) : -Math.sqrt(1.0-cangle*cangle)) : Math.sin(angle);
  sc.push(sangle,cangle);
  tc.push(t);
 }
 sc.push(0,1);
 tc.push(1);
 var sphereRatio=(radius*2);
 sphereRatio/=sphereRatio+length;
 var zEnd=[];
 for(i=1;i<stacks;i++){
   var origt=i*1.0/stacks;
   angle=Math.PI*origt;
   var cangle = Math.cos(angle);
   var sangle = (angle>=0 && angle<6.283185307179586) ? (angle<=3.141592653589793 ? Math.sqrt(1.0-cangle*cangle) : -Math.sqrt(1.0-cangle*cangle)) : Math.sin(angle);
   scStack.push(sangle);
   zEnd.push(-cangle);
   var tex=origt;
   texc.push(tex);
 }
 scStack.push(0); // south pole
 texc.push(1); // south pole
 zEnd.push(1); // south pole
 var slicesTimes2=slices*2;
  var lastZeCen=-1;
  var lastRad=0;
  var lastRadNorm=0;
  var lastTex=0;
  function normAndVertex(m,normDir,x,y,z,offset){
   m.normal3(x*normDir,y*normDir,z*normDir);
   m.vertex3(x,y,z+offset);
  }
  for(i=0;i<stacks;i++){
   var zsCen=lastZeCen;
   var zeCen=zEnd[i];
   var texStart=lastTex;
   var texEnd=texc[i];
   var zStartHeight=radius*zsCen;
   var zEndHeight=radius*zeCen;
   var offset=(i<halfStacks) ? -halfLength : halfLength;
   var zStartNorm=normDir*zsCen;
   var zEndNorm=normDir*zeCen;
   var radiusStart=lastRad;
   var radiusStartNorm=lastRadNorm;
   var radiusEnd=radius*scStack[i];
   var radiusEndNorm=normDir*scStack[i];
   var txs=texStart;
   var txe=texEnd;
   if(length>0){
    txs=(i<halfStacks) ? texStart*sphereRatio :
     (1.0-(1.0-texStart)*sphereRatio);
    txe=(i<halfStacks) ? texEnd*sphereRatio :
     (1.0-(1.0-texEnd)*sphereRatio);
   }
   lastZeCen=zeCen;
   lastTex=texEnd;
   lastRadNorm=radiusEndNorm;
   lastRad=radiusEnd;
   if((i===stacks-1 || i === 0)){
    mesh.mode(Mesh.TRIANGLES);
   } else {
    mesh.mode(Mesh.TRIANGLE_STRIP);
    mesh.texCoord2(1,txs);
    normAndVertex(mesh,normDir,0,radiusStart,zStartHeight,offset);
    mesh.texCoord2(1,txe);
    normAndVertex(mesh,normDir,0,radiusEnd,zEndHeight,offset);
   }
   var lastTx=0;
   var lastX=0;
   var lastY=1;
   var txMiddle,tx,x,y;
   for(var k=2,j=1;k<=slicesTimes2;k+=2,j++){
    tx=tc[j];
    if(i===stacks-1){
     txMiddle=lastTx+(tx-lastTx)*0.5;
     mesh.texCoord2(1-lastTx,txs);
     normAndVertex(mesh,normDir,lastX*radiusStart,lastY*radiusStart,zStartHeight,offset);
     // point at south pole
     mesh.texCoord2(1-txMiddle,txe);
     normAndVertex(mesh,normDir,0,radiusEnd,zEndHeight,offset);
     x=sc[k];
     y=sc[k+1];
     mesh.texCoord2(1-tx,txs);
     normAndVertex(mesh,normDir,x*radiusStart,y*radiusStart,zStartHeight,offset);
     lastX=x;
     lastY=y;
     lastTx=tx;
    } else if(i===0){
     txMiddle=lastTx+(tx-lastTx)*0.5;
     // point at north pole
     mesh.texCoord2(1-txMiddle,txs);
     normAndVertex(mesh,normDir,0,radiusStart,zStartHeight,offset);
     mesh.texCoord2(1-lastTx,txe);
     normAndVertex(mesh,normDir,lastX*radiusEnd,lastY*radiusEnd,zEndHeight,offset);
     x=sc[k];
     y=sc[k+1];
     mesh.texCoord2(1-tx,txe);
     normAndVertex(mesh,normDir,x*radiusEnd,y*radiusEnd,zEndHeight,offset);
     lastX=x;
     lastY=y;
     lastTx=tx;
    } else {
     x=sc[k];
     y=sc[k+1];
     mesh.texCoord2(1-tx,txs);
     normAndVertex(mesh,normDir,x*radiusStart,y*radiusStart,zStartHeight,offset);
     mesh.texCoord2(1-tx,txe);
     normAndVertex(mesh,normDir,x*radiusEnd,y*radiusEnd,zEndHeight,offset);
    }
   }
   if(i+1===halfStacks && length>0){
    var sr2=sphereRatio*0.5;
    var hl=halfLength*2;
    var endr2=1.0-sr2;
    var he=1.0-sphereRatio;
    for(var m=0;m<middleStacks;m++){
     s=-halfLength+(m===0 ? 0 : (hl*m/middleStacks));
     var e=(m===middleStacks-1) ? halfLength : (-halfLength+hl*(m+1)/middleStacks);
     txs=sr2+(m===0 ? 0 : (he*m/middleStacks));
     txe=(m===middleStacks-1) ? endr2 : (sr2+he*(m+1)/middleStacks);
     mesh.mode(Mesh.TRIANGLE_STRIP);
     mesh.texCoord2(1,txs);
     normAndVertex(mesh,normDir,0,radiusEnd,zEndHeight,s);
     mesh.texCoord2(1,txe);
     normAndVertex(mesh,normDir,0,radiusEnd,zEndHeight,e);
     for(k=2,j=1;k<=slicesTimes2;k+=2,j++){
      tx=tc[j];
      x=sc[k];
      y=sc[k+1];
      mesh.texCoord2(1-tx,txs);
      normAndVertex(mesh,normDir,x*radiusEnd,y*radiusEnd,zEndHeight,s);
      mesh.texCoord2(1-tx,txe);
      normAndVertex(mesh,normDir,x*radiusEnd,y*radiusEnd,zEndHeight,e);
     }
    }
   }
  }
 return flat ? mesh.recalcNormals(flat,inside) : mesh.normalizeNormals();
};

    /**
    * Creates a mesh in the form of a two-dimensional n-pointed star.
    * @param {number} points Number of points in the star.
    * Must be 2 or greater.
    * @param {number} firstRadius First radius of the star.
    * Must be 0 or greater; this parameter and secondRadius
    * can't both be 0.
    * @param {number} secondRadius Second radius of the star.
    * Must be 0 or greater; this parameter and firstRadius
    * can't both be 0.
* @param {boolean} inward If true, the normals generated by this
* method will point in the opposite direction of the positive z-axis; otherwise,
* in the same direction of the positive z-axis.  Default is false.
    * @return {glutil.Mesh} The generated mesh.
    */
    Meshes.createPointedStar=function(points, firstRadius, secondRadius,inward){
     var mesh=new Mesh();
     if(points<2 || firstRadius<0 || secondRadius<0)return mesh;
     if(firstRadius<=0 && secondRadius<=0)return mesh;
     mesh.mode(Mesh.TRIANGLE_FAN);
     var outer=true;
     var startX=0;
     var startY=0;
     var deg360=GLMath.PiTimes2;
     var recipPts2=1.0/(points*2);
     var recipRadius=1.0/Math.max(firstRadius,secondRadius);
     mesh.normal3(0,0,inward ? -1 : 1).texCoord2(0.5,0.5).vertex2(0,0);
     for(var i=0;i<points*2;i++){
      var angle=deg360*i*recipPts2;
      var cangle = Math.cos(angle);
      var sangle = (angle>=0 && angle<6.283185307179586) ? (angle<=3.141592653589793 ? Math.sqrt(1.0-cangle*cangle) : -Math.sqrt(1.0-cangle*cangle)) : Math.sin(angle);
      var radius=(i&1) === 0 ? firstRadius : secondRadius;
      var x=-sangle*radius;
      var y=cangle*radius;
      var tcx=(1+x*recipRadius)*0.5;
      var tcy=(1+y*recipRadius)*0.5;
      if(i === 0){
       startX=x;
       startY=y;
      }
      mesh.texCoord2(tcx,tcy)
        .vertex2(x,y);
     }
     mesh.texCoord2(0.5*(1+startX*recipRadius),
        0.5*(1+startY*recipRadius))
       .vertex2(startX,startY);
     return mesh;
    }

this.Meshes=Meshes;
