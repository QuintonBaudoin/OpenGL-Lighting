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
	
	vec3 A = normalize(vNormal.xyz);
	vec3 B = normalize(lightDirection);
	vec3 C = cameraPosition-vPosition.xyz;
	
	C = C/sqrt(C.x * C.x + C.y * C.y + C.z * C.z);

	float dotProd = A.x * B.x + A.y * B.y + A.z * B.z;


	vec3 D = (2 * dotProd * A) - B;

	vec3 Diffuse = Kd * dotProd * Id;
	vec3 Ambient = Ka * Ia;


	float refDotProd = D.x * C.x + D.y * C.y + D.z * C.z;
	vec3 Spec = Ks * pow(refDotProd,1) * Is;
	
	//Diffuse = vec3(0);
	//Ambient = vec3(0);
	//Spec = vec3(0);


	vec3 Total = Diffuse + Ambient + Spec;

	

	FragColour = vec4(Total.xyz, 1);
}