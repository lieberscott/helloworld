// sequence
// 1. there is a button on the screen
// 2. when the button is pressed, we load loadFile()
// 3. loadFile calls a function loadStrings()
// 4. when the text is ready, we call fileLoaded();

let txt;
let input;

function loadFile() {
	loadStrings("rainbow.txt", fileLoaded); // fileLoaded is a function we write which launches once loadFile has completed
}

function fileLoaded(data) {
	// txt = data;
	createP(join(txt, "<br/>"));
}

function fileSelected(file) {
	createP(file.name + " " + file.size + " " + file.type);
	if (file.type == "text") {
	  createP(file.data); // actual contents of file
	}
	else {
		createP("I need a text file");
	}
}

function preload() {
	txt = loadStrings("rainbow.txt")
}

function setup() {
	noCanvas();
	input = select("#input");
	submit = select("#submit");
	submit.mousePressed(newText);

	createFileInput(fileSelected); // creates a "Choose File" button on screen; for multiple file handling check p5.js library
	let button = select("#loadRainbowText");
	button.mousePressed(loadFile); // loadFile is a function we write when mousePressed occurs
	// createP(join(txt, "<br/>"));
}

function newText() {
	let s = input.value();
	createP(s.length);
}
