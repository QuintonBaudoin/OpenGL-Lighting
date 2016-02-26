// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;

uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;

uniform float specularPower;

uniform vec3 Ia;
uniform vec3 Id;
uniform vec3 Is;

uniform vec3 lightDirection;

uniform vec3 cameraPosition;
uniform vec3 lightPosition;

out vec4 FragColour;

void main() {
	
	vec3 N = normalize(vNormal.xyz); ///Normalizing the ... "normal" even though it should already be...
	vec3 L = normalize(lightPosition-vPosition.xyz);///setting a static light location
	vec3 C = normalize(cameraPosition-vPosition.xyz);//getting a camera location based on vertex location
	
	float dotProd = dot(N,L);

	vec3 R = (2 * dotProd * N) - L; //Gets the reflection of the 



	float refDotProd = R.x * C.x + R.y * C.y + R.z * C.z;
	float lambertTerm = max( 0, dot( N, L ) );
	float specularTerm = pow( max( 0, dot( R, C) ), specularPower );



	//Diffuse = vec3(0);
	//Ambient = vec3(0);
	//Spec = vec3(0);


	

	vec4 Colour;
	Colour.r = 1;
	Colour.g =1;
	Colour.b = 1;
	vec3 Spec = Ks * specularTerm * Is;
	vec3 Diffuse = Kd * lambertTerm * Id * Colour.rgb * vPosition.xyz;
	vec3 Ambient = Ka * Ia * Colour.rgb;
	vec3 Total = (Diffuse + Ambient + Spec) ;

	FragColour = vec4(Total.xyz, 1);
}