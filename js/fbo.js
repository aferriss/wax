module.exports = {
    Fbo : function(shell, width, height){
      var ctx = this;
      ctx.shell = shell.shell;
      var gl = ctx.shell.gl;
      ctx.fbo = module.exports.CreateFbo(gl, width, height, gl.RGBA, gl.UNSIGNED_BYTE);
      
      ctx.begin = function(){
        gl.bindFramebuffer(gl.FRAMEBUFFER, ctx.fbo);
      };

      ctx.end = function(){
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      };

      ctx.draw = function(){
        ctx.getTexture().bind();
      };

      ctx.getTexture = function(){
        return ctx.fbo.texture;
      };
      
      ctx.resizeFbo = function(w, h){
        gl.bindTexture(gl.TEXTURE_2D, ctx.fbo.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, ctx.fbo.texture.format, w, h, 0, ctx.fbo.texture.format, ctx.fbo.texture.type, null);
      };
      
    },

  CreateFbo : function(gl, width, height, format, type){
    var fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    fbo.width = width;
    fbo.height = height;

    var rtt = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, rtt);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, type, null);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rtt, 0);
    gl.bindTexture(gl.TEXTURE_2D, null);
    //    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    rtt.format = format;
    rtt.type = type;
    fbo.texture = rtt;
    return fbo;
  }
}
