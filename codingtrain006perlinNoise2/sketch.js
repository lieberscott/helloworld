// Perlin noise moving over time
let xoff;
let start = 0;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(0);
	xoff = start;
	for (let x = 0; x < width; x++) {
		let y = noise(xoff) * height;
		stroke(1);
		fill(255);
		ellipse(x, y, 2, 2);
		xoff += 0.02;
	}
	start += 0.02;
}
