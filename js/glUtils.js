/*var createTexture = require('gl-texture2d');
var createFbo = require('gl-fbo');

module.exports = {


	SetupTexture: function(ctx, TexSrc){
		var Tex;
		// console.log(TexSrc);
		this.setFiltersLinear = function(){
			this.Tex.magFilter = ctx.LINEAR;
			this.Tex.minFilter = ctx.LINEAR;
		};

		this.setFiltersNearest = function(){
			this.Tex.magFilter = ctx.NEAREST;
			this.Tex.minFilter = ctx.NEAREST;
		};

		this.createTexture = function(){
			this.Tex = createTexture(ctx, TexSrc);
			this.setFiltersLinear();
			// this.Tex.generateMipmap();
			return this.Tex;
		};
	},

	SetupFbo: function(ctx, FboWidth, FboHeight){
		var Fbo;

		this.setFiltersLinear = function(){
			this.Fbo.color[0].magFilter = ctx.LINEAR;
			this.Fbo.color[0].minFilter = ctx.LINEAR;
		};

		this.setFiltersNearest = function(){
			this.Fbo.color[0].magFilter = ctx.NEAREST;
			this.Fbo.color[0].minFilter = ctx.NEAREST;
		};

		this.createFbo = function(){
			this.Fbo = createFbo(ctx, [FboWidth, FboHeight]);
			this.setFiltersLinear();
			return this.Fbo;
		};
	},
	resizeGL: function(shell, x, y, w, h){
		shell.element.style.left = x.toString() + 'px';
		shell.element.style.top = y.toString() + 'px';

		shell.element.style.width = w.toString() + 'px';
		shell.element.width = w.toString() + 'px';

		shell.element.style.height = h.toString() + 'px';
		shell.element.height = h.toString() + 'px';
	},

  getUniformLocation : function(shader, name){
    for(var i = 0; i<shader.uniforms.length; i++){
      if('name' in shader.uniforms[i]){
        return shader.uniforms[i].location;
      } else {
        return -1;
      }
    }
  },
  
  setUniform2f : function(shader, name, v1, v2){
    var loc = getUniformLocation(shader, name);
   if (loc != -1){
    glUniform2f(loc, v1, v2);
   }  

  }
	// loadAllShaders: function(ctx, ShaderObj){
	// 	var allShaders = {};
	// 	for( var sh in ShaderObj){
	// 		allShaders[sh] = new module.exports.SetupShader(ctx, ShaderObj[sh], sh).createShader();
	// 	}
	// 	return allShaders;
	// }
};
*/
