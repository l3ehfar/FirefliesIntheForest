#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

uniform sampler2D texture;

// varying vec4 vertColor;                   // this is our fragment color comming in
varying vec2 vTexCoord;										// this is our fragment (pixel) coords
uniform vec2 mouse;

uniform sampler2D texImg;
uniform float count;
uniform float brightness;




void main() {
  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  
  // pass image as texture from p5
  vec4 img = texture2D(texImg, uv);

  
	//calc distance to mouse
	float dist = sqrt((vTexCoord.x-mouse.x)*(vTexCoord.x-mouse.x)+(vTexCoord.y-mouse.y)*(vTexCoord.y-mouse.y))*count*brightness;
  
  // set the output color, it’s RGBA 0-1, not 0-255.
  
  vec4 col = vec4(img.r-dist,img.g-dist,img.b-dist, img.a); 
    gl_FragColor = col;

}