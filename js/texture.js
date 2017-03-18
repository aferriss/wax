module.exports = {
 
  Texture : function(shell, texSrc){
    var ctx = this;  
    ctx.shell = shell;
    var gl = shell.gl;
    ctx.texture = module.exports.CreateTexture(gl, gl.RGBA, gl.UNSIGNED_BYTE, texSrc); 


    ctx.update = function(data){
      ctx.bind();
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    };
    
    ctx.getTexture = function(){
      return ctx.texture;
    }

    ctx.bind = function(){
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, ctx.texture);
    }
  },

  CreateTexture : function(gl, format, type, src){
    var t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, format, format, type, src);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.bindTexture(gl.TEXTURE_2D, null);
    return t;
  }
};
