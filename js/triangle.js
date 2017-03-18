module.exports = Triangle;

function Triangle(gl){
    if (!(this instanceof Triangle)) {
        return new Triangle(gl)
    }  
    var ctx = this;
    ctx.gl = gl;
    ctx.buffer = ctx.gl.createBuffer(); 
    ctx.fillBuffer(ctx.buffer); 
} 

Triangle.prototype.fillBuffer = function(buffer){
  var ctx = this;
  ctx.gl.bindBuffer(ctx.gl.ARRAY_BUFFER,buffer);
  ctx.gl.bufferData(ctx.gl.ARRAY_BUFFER, new Float32Array([
    1.0,1.0, 0.0,
    -1.0,1.0,0.0,
    1.0,-1.0, 0.0,
    -1.0,-1.0,0.0
    ]), ctx.gl.STATIC_DRAW);
}

Triangle.prototype.bind = function(){
  var ctx = this;
  ctx.gl.bindBuffer(ctx.gl.ARRAY_BUFFER, ctx.buffer);
  ctx.gl.enableVertexAttribArray(0);
  ctx.gl.vertexAttribPointer(0,3,ctx.gl.FLOAT, false, 0,0);
  //ctx.gl.disableVertexAttribArray(0)
}

Triangle.prototype.draw = function(){
  var ctx = this;
  ctx.gl.drawArrays(ctx.gl.TRIANGLE_STRIP, 0,4);
}

Triangle.prototype.unbind = function(){
}
