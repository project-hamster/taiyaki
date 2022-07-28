function run(argv){
	// get most front App name
	let frontmostAppName = "";
	let systemEvents = Application("System Events");
	for(let p of systemEvents.processes()){
		let app = Application(p.name());
		if(app.frontmost() === true){
			frontmostAppName = app.name();
		}
	}
	
	// change position of most front App
	let frontmostApp = Application(frontmostAppName);
	let window = frontmostApp.windows[0];
	window.bounds = {x: argv[0], y: argv[1], height: argv[2], width: argv[3]};
}