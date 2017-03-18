precision highp float;
uniform sampler2D from;
//uniform sampler2D to;
//uniform float progress;
uniform vec2 resolution;

//varying vec2 vUv;

void main(){
	vec2 tc = gl_FragCoord.xy / resolution;
	vec4 tex = texture2D(from, tc);
	gl_FragColor = tex;//vec4(1.0,0.0,0.0,1.0);;
}
