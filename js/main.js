var Manager = require('./manager').Manager;
var manager = new Manager();
var manifest = require('./manifest').manifest;
var sh = require('./shell.js');
var fps = 30;

document.onmousedown = mousePressed;
function mousePressed(e){
}
init();

function init(){
  var scene = new sh('dispersion', window.innerWidth,window.innerHeight);
  var gl = scene.gl;
  gl.disable(gl.DEPTH_TEST);
  gl.clearColor(0.0,0.0,0.0,1.0);

  manager.setup(scene, manifest);
  render();
};

function render(){
  setTimeout(function(){
    window.requestAnimationFrame(render);
  }, 1000/fps); 

  manager.update();
  manager.render();
}


