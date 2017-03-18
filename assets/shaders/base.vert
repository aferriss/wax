precision highp float;
attribute vec3 position;
//varying vec2 vUv;
//varying vec2 uv;
void main(){
  vec3 pos = position;
	gl_Position = vec4(pos, 1.0);
	//vUv = position * vec2(0.5,-0.5) + 0.5;
	//uv = position;
}
