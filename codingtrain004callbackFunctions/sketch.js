// seeing a callback function
// and handling file drops

let bgcolor;
let slider;
let input;
let fillCol;
let button;
let paragraphs;
let drag;

function setup() {
	createCanvas(600, 400);
	bgcolor = random(255);
	slider = createSlider(0, 100, 50);
	input = createInput("Golden State Warriors");
	fillCol = 255;
	// use selectAll for multiple DOM elements
	button = select("#firstBttn");
	// callback function
	button.mousePressed(changeColor);
	paragraphs = selectAll(".highlight");
	drag = select("#drag");
	// drag a file over the drag ID area
	drag.dragOver(highl);
	// change mind, drag file off drag ID area
	drag.dragLeave(unhighl);
	// drop file in drag ID area
	drag.drop(gotFile, unhighl);
}

function draw() {
	background(bgcolor);
	fill(fillCol);
	text(input.value(), 300, 20);
	ellipse(300, 200, slider.value() * 2, slider.value() * 2);
	for (let i = 0; i < paragraphs.length; i++) {
		// callback functions
		paragraphs[i].mouseOver(highlight);
		paragraphs[i].mouseOut(unhighlight);
	}

}

function changeColor() {
	bgcolor = color(random(255), random(255), random(255));
	fillCol = color(random(255), random(255), random(255));
}

function highlight() {
	this.style("background-color", '#F0F');
}

function unhighlight() {
	this.style("background-color", "#FFF");
}

function highl() {
	drag.style("background-color", "#CCC");
}

function unhighl() {
	drag.style("background-color", "#FFF");
}

function gotFile(file) {
	createP(file.name + " " + file.size);
	var img = createImg(file.data);
	img.size(100, 100);
}
