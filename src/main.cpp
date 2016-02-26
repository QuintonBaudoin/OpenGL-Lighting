 
#include "LightingOBJApplication.h"
#include "LightingSphereApplication.h" 

int main() {
	
	// change startup application
	BaseApplication* app = new LightingOBJApplication();
	if (app->startup())
		app->run();
	app->shutdown();
	system("Pause");
	return 0;
}