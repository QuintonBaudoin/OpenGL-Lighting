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

out vec4 FragColour;

void main() {
	
	vec3 N = normalize(vNormal.xyz);
	vec3 L = normalize(vec3(1,1,1));
	vec3 C = normalize(cameraPosition-vPosition.xyz);
	
	float dotProd = N.x * L.x + N.y * L.y + N.z * L.z;


	vec3 R = (2 * dotProd * N) - L;



	float refDotProd = R.x * C.x + R.y * C.y + R.z * C.z;
	float lambertTerm = max( 0, dot( N, L ) );
	float specularTerm = pow( max( 0, dot( R, C) ), specularPower );

	vec3 Spec = Ks * specularTerm * Is;
	vec3 Diffuse = Kd * lambertTerm * Id;
	vec3 Ambient = Ka * Ia;

	//Diffuse = vec3(0);
	//Ambient = vec3(0);
	//Spec = vec3(0);


	

	vec4 Colour;
	Colour.r = 1;
	Colour.g = 0;
	Colour.b = 0;
	
	vec3 Total = (Diffuse + Ambient + Spec);

	FragColour = vec4(Total.xyz, 1) + Colour;
}