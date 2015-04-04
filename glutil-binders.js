/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like lightsObject, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/

/**
* Contains classes that implement methods
* binding certain HTML 3D Library objects
* to WebGL contexts and programs.
*/

///////////////////////

function MaterialShadeBinder(mshade){
 this.mshade=mshade;
}
/**
 * Sets parameters for a shader program based on
 * the information in this material data object.  It will set
 * the following uniforms;
 * <ul>
 * <li>textureSize - Set to (0,0), since no textures are being used.
 * <li>mshin - Specular reflection exponent.
 * <li>ma - Ambient reflection.
 * <li>md - Diffuse reflection.
 * <li>ms - Specular reflection.
 * </ul>
 * @param {ShaderProgram} program A shader program object
 * where the locations of material-related uniforms will be retrieved.
 * @return {MaterialShadeBinder} This object.
 */
MaterialShadeBinder.prototype.bind=function(program){
 if(!this.mshade)return this;
 program.setUniforms({
 "textureSize":[0,0],
 "mshin":this.mshade.shininess,
 "ma":[this.mshade.ambient[0], this.mshade.ambient[1], this.mshade.ambient[2]],
 "md":[this.mshade.diffuse[0], this.mshade.diffuse[1], this.mshade.diffuse[2]],
 "ms":[this.mshade.specular[0],this.mshade.specular[1],this.mshade.specular[2]],
 "me":[this.mshade.emission[0],this.mshade.emission[1],this.mshade.emission[2]]
 });
 return this;
}

//////////////////////////

function LoadedTexture(textureImage, context){
  context=GLUtil._toContext(context);
  this.context=context;
  this.textureName=context.createTexture();
  // In WebGL, texture coordinates start at the upper left corner rather than
  // the lower left as in OpenGL and OpenGL ES, so we use this method call
  // to reestablish the lower left corner.
  context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, 1);
  context.bindTexture(context.TEXTURE_2D, this.textureName);
  context.texImage2D(context.TEXTURE_2D, 0,
    context.RGBA, context.RGBA, context.UNSIGNED_BYTE,
    textureImage.image);
  // generate mipmaps for power-of-two textures
  if(GLUtil._isPowerOfTwo(textureImage.image.width) &&
      GLUtil._isPowerOfTwo(textureImage.image.height)){
    context.generateMipmap(context.TEXTURE_2D);
  }
}

LoadedTexture.prototype.dispose=function(){
 if(this.textureName){
  this.context.deleteTexture(this.textureName);
 }
}

/////////////////////////////////

function TextureBinder(tex){
 this.texture=tex;
}
/**
 * Sets up information about this texture and its materials
 * to a WebGL program.  If the texture image isn't loaded yet,
 * sets up a task to load that image.
 * @param {ShaderProgram} program The WebGL program in which
 * uniform values related to the texture will be set up.
 */
Texture.prototype.bind=function(program){
 if(this.image!==null && this.textureName===null){
      // load the image as a texture
      this.textureName=new LoadedTexture(program.getContext());
 } else if(this.image===null && this.textureName===null){
      var thisObj=this;
      var prog=program;
      this.loadImage().then(function(e){
        // try again loading the image
        thisObj.bind(prog);
      });
      return;
 }
 if (this.textureName!==null) {
      var uniforms={};
      if(this.anisotropic==null){
       // Try to load anisotropic filtering extension
       this.anisotropic=context.getExtension("EXT_texture_filter_anisotropic") ||
         context.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
         context.getExtension("MOZ_EXT_texture_filter_anisotropic");
       if(this.anisotropic==null){
        this.anisotropic={};
       }
      } 
      uniforms["textureSize"]=[this.width,this.height];
      program.setUniforms(uniforms);
      var ctx=program.getContext()
      ctx.activeTexture(ctx.TEXTURE0);
      ctx.bindTexture(ctx.TEXTURE_2D,
        this.textureName);
      // Set texture parameters
      if(typeof this.anisotropic.TEXTURE_MAX_ANISOTROPY_EXT!="undefined"){
       // Set anisotropy if anisotropic filtering is supported
       context.texParameteri(context.TEXTURE_2D,
        ext.TEXTURE_MAX_ANISOTROPY_EXT,
        context.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT));      
      }
      // set magnification
      context.texParameteri(context.TEXTURE_2D,
       context.TEXTURE_MAG_FILTER, context.LINEAR);
      if(this.powerOfTwo){
       // Enable mipmaps if texture's dimensions are powers of two
       context.texParameteri(context.TEXTURE_2D,
         context.TEXTURE_MIN_FILTER, context.LINEAR_MIPMAP_LINEAR);
       context.texParameteri(context.TEXTURE_2D,
         context.TEXTURE_WRAP_S, context.REPEAT);
       context.texParameteri(context.TEXTURE_2D,
        context.TEXTURE_WRAP_T, context.REPEAT);
      } else {
       context.texParameteri(context.TEXTURE_2D,
        context.TEXTURE_MIN_FILTER, context.LINEAR);
       // Other textures require this wrap mode
       context.texParameteri(context.TEXTURE_2D,
        context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
       context.texParameteri(context.TEXTURE_2D,
        context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
      }
    }
}


//////////////////////////

function LightsBinder(lights){
 this.lights=lights;
}

/**
 * Sets parameters for a shader program based on
 * the information in this light source object.
 * @param {ShaderProgram} program A shader program object
 * where locations of lighting uniforms will come from.
 * @return {LightsBinder} This object.
 */
LightsBinder.prototype.bind=function(program){
 var lightsObject=this.lights;
 if(!lightsObject)return this;
 if(!program)return this;
 var uniforms={};
 uniforms["sceneAmbient"]=lightsObject.sceneAmbient.slice(0,3);
 for(var i=0;i<lightsObject.lights.length;i++){
  var lt=lightsObject.lights[i]
  uniforms["lights["+i+"].diffuse"]=[lt.diffuse[0],lt.diffuse[1],lt.diffuse[2],1];
  uniforms["lights["+i+"].specular"]=[lt.specular[0],lt.specular[1],lt.specular[2],1];
  uniforms["lights["+i+"].position"]=lightsObject.lights[i].position;
 }
 // Set empty values for undefined lights up to MAX_LIGHTS
 for(var i=lightsObject.lights.length;i<Lights.MAX_LIGHTS;i++){
  uniforms["lights["+i+"].diffuse"]=[0,0,0,1];
  uniforms["lights["+i+"].specular"]=[0,0,0,1];
  uniforms["lights["+i+"].position"]=[0,0,0,0];
 }
 program.setUniforms(uniforms);
 return this;
}


///////////////////////

var Binders={};
Binders.getMaterialBinder=function(material){
 if(material){
 if(material instanceof MaterialShade){
  return new MaterialShadeBinder(material);
 }
 if(material instanceof Texture){
  return new TextureBinder(material);
 }
 }
 // Return an empty binding object
 return {bind:function(program){}};
}