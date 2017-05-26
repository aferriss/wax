precision highp float;
uniform sampler2D tex0;
uniform vec2 resolution;
uniform float time;
uniform float direction;

const float SIGMOID_CONTRAST = 7.0;
float colormap_red(float x) {
	if (x < 0.2523055374622345) {
		return (-5.80630393656902E+02 * x - 8.20261301968494E+01) * x + 2.53829637096771E+02;
	} else if (x < 0.6267540156841278) {
		return (((-4.07958939010649E+03 * x + 8.13296992114899E+03) * x - 5.30725139102868E+03) * x + 8.58474724851723E+02) * x + 2.03329669375107E+02;
	} else if (x < 0.8763731146612115) {
		return 3.28717357910916E+01 * x + 8.82117255504255E+00;
	} else {
		return -2.29186583577707E+02 * x + 2.38482038123159E+02;
	}
}

float colormap_green(float x) {
	if (x < 0.4578040540218353) {
		return ((4.49001704856054E+02 * x - 5.56217473429394E+02) * x + 2.09812296466262E+01) * x + 2.52987561849833E+02;
	} else {
		return ((1.28031059709139E+03 * x - 2.71007279113343E+03) * x + 1.52699334501816E+03) * x - 6.48190622715140E+01;
	}
}

float colormap_blue(float x) {
	if (x < 0.1239372193813324) {
		return (1.10092779856059E+02 * x - 3.41564374557536E+02) * x + 2.17553885630496E+02;
	} else if (x < 0.7535201013088226) {
		return ((((3.86204601547122E+03 * x - 8.79126469446648E+03) * x + 6.80922226393264E+03) * x - 2.24007302003438E+03) * x + 3.51344388740066E+02) * x + 1.56774650431396E+02;
	} else {
		return (((((-7.46693234167480E+06 * x + 3.93327773566702E+07) * x - 8.61050867447971E+07) * x + 1.00269040461745E+08) * x - 6.55080846112976E+07) * x + 2.27664953009389E+07) * x - 3.28811994253461E+06;
	}
}

vec4 colormap(float x) {
	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
	return vec4(r, g, b, 1.0);
}//float colormap_red(float x) {
//    if (x < 1.0 / 3.0) {
//        return 4.0 * x - 2.992156863;
//    } else if (x < 2.0 / 3.0) {
//        return 4.0 * x - 2.9882352941;
//    } else if (x < 2.9843137255 / 3.0) {
//        return 4.0 * x - 2.9843137255;
//    } else {
//        return x;
//    }
//}
//
//float colormap_green(float x) {
//    return 1.602642681354730 * x - 5.948580022657070e-1;
//}
//
//float colormap_blue(float x) {
//    return 1.356416928785610 * x + 3.345982835050930e-3;
//}
//
//vec4 colormap(float x) {
//    float r = clamp(colormap_red(x), 0.0, 1.0);
//    float g = clamp(colormap_green(x), 0.0, 1.0);
//    float b = clamp(colormap_blue(x), 0.0, 1.0);
//    return vec4(r, g+0.1, b-0.1, 1.0);
//}
//float colormap_red(float x) {
//	float v = ((((-2.83671754639782E+03 * x + 6.51753994553536E+03) * x - 5.00110948171466E+03) * x + 1.30359712298773E+03) * x - 2.89958300810074E+02) * x + 2.48458039402758E+02;
//	if (v < 8.0) {
//		return 8.0;
//	} else {
//		return v;
//	}
//}
//
//float colormap_green(float x) {
//	return (((((-1.36304822155833E+03 * x + 4.37691418182849E+03) * x - 5.01802019417285E+03) * x + 2.39971481269598E+03) * x - 5.65401491984724E+02) * x - 1.48189675724133E+01) * x + 2.50507618187374E+02;
//}
//
//float colormap_blue(float x) {
//	if (x < 0.3756393599187693) {
//		return (9.62948273917718E+01 * x - 1.96136874142438E+02) * x + 2.41033490809633E+02;
//	} else if (x < 0.6215448666633865) {
//		return 1.21184043778803E+02 * x + 1.35422939068100E+02;
//	} else if (x < 0.8830064316178203) {
//		return -1.53052165744713E+02 * x + 3.05873047350666E+02;
//	} else {
//		return -3.49468965517114E+02 * x + 4.79310344827486E+02;
//	}
//}
//
//vec4 colormap(float x) {
//	float r = clamp(colormap_red(x) / 255.0, 0.0, 1.0);
//	float g = clamp(colormap_green(x) / 255.0, 0.0, 1.0);
//	float b = clamp(colormap_blue(x) / 255.0, 0.0, 1.0);
//	return vec4(r, g, b, 1.0);
//}
//
float getVal(vec2 uv)
{
    return length(texture2D(tex0,uv).xyz);
}

vec3 contrast(vec3 x){
  return 1.0 / (1.0 + exp(-SIGMOID_CONTRAST * (x - 0.5)));   
}
    
vec2 getGrad(vec2 uv,float delta)
{
    vec2 d=vec2(delta,0);
    return vec2(
        getVal(uv+d.xy)-getVal(uv-d.xy),
        getVal(uv+d.yx)-getVal(uv-d.yx)
    )*500.;
}
float getChannel(vec4 channel, sampler2D tex, vec2 uv){
    return dot(texture2D(tex, uv ), channel);
}
vec4 calculateNormals(vec4 channel, sampler2D texIn, vec2 uv,vec2 resolution, float s, float nsize, float
    nstrenght)
{
  float offsetX = nsize*s/resolution.x;
  float offsetY = nsize*s/resolution.y;
	vec2 ovX = vec2(0.0, offsetX);
	vec2 ovY = vec2(0.0, offsetY);
    
	float X = (getChannel(channel,texIn, uv - ovX.yx)- getChannel(channel,texIn, uv + ovX.yx)) * nstrenght;
  float Y = (getChannel(channel,texIn, uv - ovY.xy)- getChannel(channel,texIn, uv + ovY.xy)) * nstrenght;
//  float Z = sqrt( saturate(dot(vec2(X,Y), vec2(X,Y))));
  float Z =(1.0 -  (dot(vec2(X,Y), vec2(X,Y))));
  float c = abs(X+Y);
  float ss = .025;
  vec3 xv = vec3(ss, X, 0);
  vec3 yv = vec3(0, Y, ss);
  //return vec4(normalize(cross(xv, -yv)).xzy, 0.0);
	return normalize(vec4(X,Y,Z,c));
}
void main( )
{
    vec2 res = resolution; 
    vec2 uv = gl_FragCoord.xy / res;
    
    float dir = radians(mod(time*5.0, 360.0));
    dir = radians(direction);
    vec2 angle = vec2(sin(dir), cos(dir));
//    angle -= mod(time*0.05,5.0)*angle;//1.0 + mod(time*0.1, 10.0);
    vec4 N = calculateNormals(vec4(1.0,0.0,0.0,0.0), tex0, uv, resolution, 1.0,
        2.0, 2.0);
    vec3 n = vec3(getGrad(uv,0.002/res.y),225.0);
    n.z = (1.0 - (dot(n.xy, n.xy)));
    
//    n=normalize(n);
    vec3 light = normalize(vec3(angle,1.0));
    float diff=clamp(dot(n,light),0.5,1.2);
    float spec=clamp(dot(reflect(light,n),vec3(0,0,-1.0)),0.0,1.0);
    spec=pow(spec,24.0)*1.5;
    
    vec4 fb = texture2D(tex0, uv);
    float depth = fb.r;
//    uv.x *= res.x / res.y; 
//    vec3 H = normalize(light + vec3(uv.xy+vec2(-1.0,-1.0), 1.0));
    vec3 H = normalize(light + vec3(uv-0.5-(-2.0 + mod(time*0.015, 6.0))*angle,1.0));
    float S = max(0.0, dot(vec3(N.xy, N.z), H));
    S = pow(S, 24.0)*1.9;
 
    float R = 1.0 - clamp(dot(N.xyz, normalize(vec3(angle*vec2(1.0), 1.0))), .0, 1.);
//    R *= 1.5;
    //fb = pow(fb, vec4(3.0));
//    fb =   colormap( fb.r);
//    fb.r = smoothstep(0.5, 0.8, fb.r);
    fb = vec4(vec4(N.xyz*0.5 + 0.5,1.0));//colormap(smoothstep(-.2, 1.0,pow(fb.r, 1.0))));
//    fb *= 1.0 -depth;
    vec2 offs = 1.0 / res;

//    fb.rgb += R*N.xyz;;
//    fb += vec4(0.0,depth*0.05,depth*0.1,0.0);
//    fb.rgb = mix(fb.rgb,vec3(1.0), smoothstep(-.2, 2.9, R));
    gl_FragColor.rgb = vec3(fb.rgb);//fb.rgb;// (fb.rgb);//mix(fb.rgb, vec3(0.1,0.1,0.1), smoothstep(-0.2, 2.9,R));
    gl_FragColor.a = 1.0;
//    fb.rgb = contrast(fb.rgb);
//	gl_FragColor = vec4(vec3(S), 1.0) ;//* diff + spec;
  //gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;
  //gl_FragColor =fb;// gl_FragColor * diff + spec;
}
