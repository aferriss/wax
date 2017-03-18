module.exports = Shell;

function Shell(id, w, h){
    if (!(this instanceof Shell)) {
        return new Shell(id, w, h); 
    }  
    var ctx = this; 
    ctx.canvas = document.createElement('canvas');
    ctx.canvas.id = id;
    ctx.canvas.width = w;
    ctx.canvas.height = h;
    ctx.gl = ctx.initGL();
    document.body.appendChild(ctx.canvas) ;
}

Shell.prototype.initGL = function(){
  var ctx = this;
  var gl = ctx.create3dContext(ctx.canvas);
  return gl;
}

Shell.prototype.create3dContext = function(canvas, opts){
  var names = ['webgl', 'experimental-webgl'];
  var context = null;
  for(var i = 0; i<names.length; i++){
    try {
      context = canvas.getContext(names[i], opts);
    } catch(e) {}
    if(context){
      break;
    }
  }
  return context;
}
