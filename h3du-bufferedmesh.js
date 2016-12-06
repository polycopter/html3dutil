/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://peteroupc.github.io/
*/
/* global H3DU, H3DU.Mesh */

/**
* A geometric mesh in the form of buffer objects.
* @deprecated This class is likely to become a private class.
* Use the MeshBuffer class instead, which is not coupled to WebGL
* contexts.
* @class
* @alias H3DU.BufferedMesh
* @param {H3DU.Mesh} mesh A geometric mesh object.
* @param {WebGLRenderingContext|object} context A WebGL context to
*  create a buffer from, or an object, such as H3DU.Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context. (Note that this constructor uses
*  a WebGL context rather than a shader program because
*  buffer objects are not specific to shader programs.)
*/
H3DU.BufferedMesh = function(mesh, context){
 "use strict";
 context=H3DU._toContext(context);
 if(mesh instanceof H3DU.MeshBuffer){
  this._bounds=mesh._bounds;
 } else {
  this._bounds=mesh.getBoundingBox();
 }
 this._initialize(mesh,context);
};
/** @private */
H3DU.BufferedMesh.prototype._initialize=function(mesh, context){
 "use strict";
 var smb=(mesh instanceof H3DU.MeshBuffer) ? mesh :
   new H3DU.MeshBuffer(mesh);
 this.arrayObjectExt=context.getExtension("OES_vertex_array_object");
 this.arrayObjectExtContext=context;
 this.smb=smb;
 this.verts=context.createBuffer();
 if(!this.verts)throw new Error("can't create buffer");
 this.indices=context.createBuffer();
 if(!this.indices)throw new Error("can't create face buffer");
 this.vao=null;
 if(this.arrayObjectExt){
   this.vao=this.arrayObjectExt.createVertexArrayOES();
 }
 var vertexBuffer=null;
 var attribs=smb._getAttributes();
 for(var i=0;i<attribs.length;i++){
  var vb=attribs[i][2];
  if(vb && vertexBuffer && vertexBuffer!==vb){
    // TODO: Support multiple vertex buffers in one mesh buffer
    throw new Error("Not yet supported");
  } else if(vb){
    vertexBuffer=vb;
  }
 }
 if(!vertexBuffer){
  vertexBuffer=new Float32Array([]);
 }
 context.bindBuffer(context.ARRAY_BUFFER, this.verts);
 context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indices);
 context.bufferData(context.ARRAY_BUFFER,
    vertexBuffer, context.STATIC_DRAW);
 context.bufferData(context.ELEMENT_ARRAY_BUFFER,
    smb.indices, context.STATIC_DRAW);
 var type=context.UNSIGNED_SHORT;
 if(smb.indexBufferSize === 4){
  type=context.UNSIGNED_INT;
 } else if(smb.indexBufferSize === 1){
  type=context.UNSIGNED_BYTE;
 }
  this.type=type;
  this.context=context;
  this._lastKnownProgram=null;
  this._attribLocations=[];
};
/** @private */
H3DU.BufferedMesh.prototype._getVaoExtension=function(context){
 "use strict";
if(this.arrayObjectExtContext===context){
  return this.arrayObjectExt;
 } else {
  return context.getExtension("OES_vertex_array_object");
 }
};
/** @private */
H3DU.BufferedMesh.prototype._getBounds=function(){
 "use strict";
return this._bounds;
};
/**
 * Returns the WebGL context associated with this object.
 * @deprecated
 * @returns {WebGLRenderingContext} Return value.
* @memberof! H3DU.BufferedMesh#
*/
H3DU.BufferedMesh.prototype.getContext=function(){
 "use strict";
return this.context;
};
/** @private */
H3DU.BufferedMesh.prototype.getFormat=function(){
 "use strict";
 return this.smb.format;
};

/**
* Deletes the vertex and index buffers associated with this object.
* @memberof! H3DU.BufferedMesh#
*/
H3DU.BufferedMesh.prototype.dispose=function(){
 "use strict";
if(this.verts !== null)
  this.context.deleteBuffer(this.verts);
 if(this.indices !== null)
  this.context.deleteBuffer(this.indices);
 if(this.vao !== null){
  this.arrayObjectExt.deleteVertexArrayOES(this.vao);
 }
 this.verts=null;
 this.indices=null;
 this.smb=null;
 this.vao=null;
 this._lastKnownProgram=null;
 this._attribLocations=[];
};
/** @private */
H3DU.BufferedMesh.prototype._getAttribLocations=function(program,context){
 "use strict";
if(this._lastKnownProgram!==program){
  this._lastKnownProgram=program;
  var attrs=this.smb._getAttributes();
  this._attribLocations=[];
  var ix=false;
  for(var i=0;i<attrs.length;i++){
    var loc=program.get(attrs[i][0]);
    if((loc===null || typeof loc==="undefined"))loc=-1;
    if(loc===-1)ix=true;
    this._attribLocations[i]=loc;
  }
  return true;
 }
 return false;
};

/**
 * @private */
H3DU.BufferedMesh.prototype._prepareDraw=function(program, context){
  "use strict";
var rebind=this._getAttribLocations(program,context);
  var vaoExt=this._getVaoExtension(context);
  if(this.vao) {
   vaoExt.bindVertexArrayOES(this.vao);
  } else {
   rebind=true;
  }
  if(rebind) {
   context.bindBuffer(context.ARRAY_BUFFER, this.verts);
   context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indices);
   var attrs=this.smb._getAttributes();
   for(var i=0;i<this._attribLocations.length;i++){
    var attrib=this._attribLocations[i];
    if(attrib>=0){
     context.enableVertexAttribArray(attrib);
     context.vertexAttribPointer(attrib, attrs[i][3],
         context.FLOAT, false,attrs[i][4]*4, attrs[i][1]*4);
    }
   }
   program._disableOthers(attrs);
  }
};
/**
* Binds the buffers in this object to attributes according
* to their data format, and draws the elements in this mesh
* according to the data in its buffers.
* @param {H3DU.ShaderProgram} program A shader program object to get
* the IDs from for attributes named "position", "normal",
* "colorAttr", and "uv", and the "useColorAttr" uniform.
* @memberof! H3DU.BufferedMesh#
*/
H3DU.BufferedMesh.prototype.draw=function(program) {
"use strict";
  // Binding phase

  var context=program.getContext();
  if(this.verts === null || this.face === null){
   throw new Error("mesh buffer disposed");
  }
  if(context!==this.context){
   throw new Error("can't bind mesh: context mismatch");
  }
  this._prepareDraw(program,context);
  // Drawing phase
  var primitive=context.TRIANGLES;
  if((this.smb.format&H3DU.Mesh.LINES_BIT)!==0)primitive=context.LINES;
  if((this.smb.format&H3DU.Mesh.POINTS_BIT)!==0)primitive=context.POINTS;
  context.drawElements(primitive,
    this.smb.facesLength,
    this.type, 0);
  var vaoExt=this._getVaoExtension(context);
  if(this.vao) {
   vaoExt.bindVertexArrayOES(null);
  }
};
/**
 * Gets the number of vertices composed by all shapes in this mesh.
* @returns {Number} Return value.
* @memberof! H3DU.BufferedMesh#
*/
H3DU.BufferedMesh.prototype.vertexCount=function(){
 "use strict";
 return this.smb.numVertices;
};
/**
 * Gets the number of primitives (triangles, lines,
* and points) composed by all shapes in this mesh.
* @returns {Number} Return value.
* @memberof! H3DU.BufferedMesh#
*/
H3DU.BufferedMesh.prototype.primitiveCount=function(){
 "use strict";
 return this.smb.primitiveCount();
};

/** @private */
H3DU.BufferedMesh._MeshLoader=function(){
 "use strict";
this.meshes=[];
};
/** @private */
H3DU.BufferedMesh._MeshLoader.prototype.draw=function(meshBuffer,prog){
 "use strict";
if(meshBuffer instanceof H3DU.BufferedMesh){
  // NOTE: Using H3DU.BufferedMesh objects directly in Shapes is deprecated
  meshBuffer.draw(prog);
 } else {
  var context=prog.getContext();
  for(var i=0;i<this.meshes.length;i++){
   var m=this.meshes[i];
   if(m[0]===meshBuffer && m[1]===context){
    m[2].draw(prog);
    return;
   }
  }
  var bm=new H3DU.BufferedMesh(meshBuffer,prog);
  this.meshes.push([meshBuffer,context,bm]);
  bm.draw(prog);
 }
};
/** @private */
H3DU.BufferedMesh._MeshLoader.prototype.dispose=function(){
  "use strict";
for(var i=0;i<this.meshes.length;i++){
   this.meshes[i][2].dispose();
  }
  this.meshes=[];
};
