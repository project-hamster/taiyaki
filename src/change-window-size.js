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
window.bounds = {x: 0, y:0, height: 500, width: 500};

for(i in this){
	console.log(i)
}