// perlin noise sin wave moving graph

let particles = [];
let yRadian;
let xpos;
let amplitude;

function setup() {
	createCanvas(600, 600);
	amplitude = height / 2; // amplitude is height of screen
	yRadian = PI; // starting radian for each circle (iterates below)
	xpos = 1; // xpos for each circle (iterates below)
	let xincrement = 10;
	let total = width / xincrement; // circles to fit screen
	for (let i = 0; i < total; i++) {
		particles[i] = new Particle(xpos, yRadian);
		yRadian += 0.1; // increment starting angle so they trail each other
		xpos += xincrement; // increment xpos so they span the screen
	}
}

function draw() {
	background(0);
	noStroke();
	fill(255, 200);
	// amplitude * sin(period * angle) = x
	translate(0, height/2);
	for (let i = 0; i < particles.length; i++) {
		particles[i].move();
		particles[i].draw();
	}
}

class Particle {
	constructor(xpos, radian) {
		this.radian = radian;
		this.x = xpos;
		this.y;
	}
	draw () {
		// this.y = amplitude * this.noiseMap();
		this.noise = noise(this.radian); // make it look funky (without this it's a standard sin graph)
		this.y = amplitude * this.noise * sin(this.radian);
    this.noiseMap = noise(this.noise, 0, 1, -1, 1);
		ellipse(this.x, this.y, 16, 16);
	}

	move() {
		this.radian += 0.01;
	}
}
