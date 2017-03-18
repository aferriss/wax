precision highp float;
uniform sampler2D tex0;
uniform float time;
uniform vec2 resolution;

const float SIGMOID_CONTRAST = 6.0;

float diff(vec2 t, vec2 b){
 	vec3 t1 = texture2D(tex0, t).xyz;
    vec3 t2 = texture2D(tex0, b).xyz;
    return dot(t1, vec3(1.0)) - dot(t2, vec3(1.0));
}

float diff(vec2 t, vec2 b, vec2 v){
 	vec3 t1 = texture2D(tex0, t).xyz;
  vec3 t2 = texture2D(tex0, b).xyz;
  vec3 t3 = texture2D(tex0, v).xyz;
  return dot(t1, vec3(1.0)) - dot(t2, vec3(1.0)) - dot(t3, vec3(1.0));
}

vec3 contrast(vec3 x){
  return 1.0 / (1.0 + exp(-SIGMOID_CONTRAST * (x - 0.5)));   
}

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main( )
{
    vec2 res = resolution.xy;
    vec2 uv = gl_FragCoord.xy / res;
    uv = -1.0 + 2.0*uv;
    //uv *= 0.999;
    float fudge = rand(vec2(time*0.01));
    float dir = radians(mod(time*0.1, 360.0));
    vec2 angle = vec2(sin(dir), cos(dir))*1.5;
    //angle = vec2(0.25,0.25)*1.5;
    uv*= 0.9995;
    uv += angle*0.0002;
    //uv += angle.yx*0.0003;
    uv = uv*0.5 + 0.5;
    
    vec2 step = vec2(0.9 / res);
    
    vec2 topL = uv - step;
    vec2 topR = uv + vec2(step.x, -step.y);
    vec2 bottomL = uv + vec2(-step.x, step.y);
    vec2 bottomR = uv + step;
    
    vec2 top = uv + vec2(0.0,-step.y);
    vec2 bottom = uv + vec2(0.0,step.y);
    vec2 left = uv + vec2(-step.x, 0.0);
    vec2 right = uv + vec2(step.x, 0.0);
//    vec2 mAngle = angle*0.0009; 
//    top += mAngle;
//    bottom += mAngle;
//    left += mAngle;
//    right += mAngle;
//
//    topL += mAngle;
//    topR += mAngle;
//    bottomL += mAngle;
//    bottomR += mAngle;
    
//    vec2 gAngle = uv + vec2(step + angle*0.005);
//    float gGrad = diff(gAngle, -gAngle);    
    float gradient1 = diff(left, right);//*angle.x;
    float gradient2 = diff(top, bottom);//*angle.y;
    float gradient3 = diff(topL, bottomR);    
    float gradient4 = diff(topR, bottomL);    
//    float maxGrad = max(gradient1, max(gradient2, max(gradient3, gradient4)));
    //vec4 fc = vec4(length(gradient1)+length(gradient2)+length(gradient3)+length(gradient4))*0.2;
    vec4 fc = vec4(length(vec2(gradient1,  gradient2)))*0.6;
//   vec4 fc = vec4(length(maxGrad)*0.5); 
    if(time < 10.0 ){
        float r = rand(uv); 
        gl_FragColor = vec4(r,r,r,1.0);
    } else {
        vec4 old = texture2D(tex0, uv);
        fc.rgba = (fc.rgba * fc.a) + (old*1.25*(1.0 - fc.a));
        fc-= 0.1;
        float rrr = rand(gl_FragCoord.xy / res + time*0.001)*0.09;
        gl_FragColor = clamp(fc, vec4(0.0), vec4(1.0))+rrr;
    }
}
