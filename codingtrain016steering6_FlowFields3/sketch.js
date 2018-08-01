// 3D Perlin noise flow chart with vehicles

let inc = 0.03;
let scl = 20; // cutting the canvass into boxes per 20 pixels
let cols;
let rows;
let parts = 50;

let zoff = 0; // 3rd dimension (slices of noise values which will change through time)
let particles = [];
let flowfield = []
let fr;

function setup() {
	createCanvas(600, 600);
	cols = floor(width/scl);
	rows = floor(height/scl);

	for (let i = 0; i < parts; i++) {
		particles.push(new Particle());
	}
	fr = createP('');
}

function draw() {
	background(255);
	let yoff = 0;
	for (let y = 0; y < rows; y++) {
		let xoff = 0
		for (let x = 0; x < cols; x++) {
			let index = (x + y * cols);
			let angle = noise(xoff, yoff, zoff) * TWO_PI; // 3D Perlin noise values
			let v = p5.Vector.fromAngle(angle);
			v.setMag(0.1); //
			flowfield[index] = v; // store each flowfield box in an array (which updates on draw), so particles can reference them
			stroke(0, 50);
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
  for (let i = 0; i < parts; i++) {
		particles[i].follow(flowfield); // particle will look up what field its on and apply the force
		particles[i].update();
		particles[i].show();
		particles[i].edges();
	}
	// fr.html(floor(frameRate())); // frameRate
}


class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxspeed = 2;
		this.col = color(random(255), random(255), random(255));
	}

	follow(vectors) { // flowfield array is passed in
		let x = floor(this.pos.x / scl);
		let y = floor(this.pos.y / scl);
		let index = x + y * cols; // find the array index the particle is on
		let force = vectors[index];
		this.applyForce(force);
	}

	update() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	show() {
		noStroke();
		fill(this.col);
		ellipse(this.pos.x, this.pos.y, 8, 8);
	}

	edges() {
		if (this.pos.x > width) {
			this.pos.x = 0;
		}
		if (this.pos.x < 0) {
			this.pos.x = width;
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
		}
		if (this.pos.y < 0) {
			this.pos.y = height;
		}
	}
}
