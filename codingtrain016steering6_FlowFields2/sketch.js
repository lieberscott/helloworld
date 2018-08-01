// 3D Perlin noise flow chart (without vehicles);

let inc = 0.05;
let scl = 20; // cutting the canvass into boxes per 20 pixels
let cols;
let rows;

let zoff = 0; // 3rd dimension (slices of noise values which will change through time)

function setup() {
	createCanvas(600, 600);
	cols = floor(width/scl);
	rows = floor(height/scl);
}

function draw() {
	background(255);
	let yoff = 0;
	for (let y = 0; y < rows; y++) {
		let xoff = 0
		for (let x = 0; x < cols; x++) {
			let angle = noise(xoff, yoff, zoff) * TWO_PI; // 3D Perlin noise values
			let v = p5.Vector.fromAngle(angle);
			stroke(0);
			push();
			translate(x * scl, y * scl); // translate to top left corner of each box as reference point
			rotate(v.heading()); // rotate by the angle of the Perlin noise vector
			line(0, 0, scl, 0); // draw a line across top of box (comment out rotate() line above to see)
			pop();
			xoff += inc;
			// rect(x * scl, y * scl, scl, scl);
		}
		yoff += inc;
		zoff += 0.0001;
	}
}
