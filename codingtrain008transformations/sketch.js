// transformations
// push() and pop() are stack (LIFO) structures

let angle = 0;

function setup() {
	createCanvas(400, 400);
	angleMode(DEGREES);
	rectMode(CENTER);
}

function draw() {
	background(0);

	push(); // save the transformation
	// order of operations matters
	// scale BEFORE rotate would make it rotate in opposite direction
	translate(200, 200); // translate makes a new reference point
	rotate(angle); // the canvas rotates from the reference point
	scale(mouseX / 100, mouseY / 100); // scales (x, y) based on mouse position
  // scale (-1, -1) // flips image (can be used to, for example, mirror images)
	fill(255, 100, 50);
	rect(0, 0, 100, 50);
	pop(); // undo/reset the transformation

  translate(300, 300);
	rotate(-angle * 2);
	fill(50, 100, 255);
	rect(0, 0, 100, 50);
	angle++; // increment the angle the canvas is rotated at

}
