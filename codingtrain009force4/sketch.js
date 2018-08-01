// gravitational force (like outer space) with multiple objects!
let m = [];
let a;

function setup() {
	createCanvas(800, 800);
	// let minx = random(width / 3);
	// let maxx = random((2 * width) / 3);
	// let miny = random(height / 6);
	// let maxy = random(height / 3);
	for (let i = 0; i < 8; i++) {
		m[i] = new Mover(random(width), random(height), random(15, 25));
	}
	a = new Attractor();
}

function draw() {
	background(0);

		for (let i = 0; i < m.length; i++) {

		  let grav = a.attract(m[i]);
		  m[i].applyForce(grav);
			m[i].move();
			m[i].display();
		}

		a.display();

//  noLoop();

}

class Attractor {
	constructor() {
		this.loc = createVector(width/2, height/2);
		this.mass = 40;
		this.g = 0.4 // gravitational constant (we can make it up)

	}
	display() {
		stroke(1);
		fill(255);
		ellipse(this.loc.x, this.loc.y, 40, 40);
	}

	attract(mover) { // Fg = (G * m1 * m2) / (d^2)
		this.f = p5.Vector.sub(this.loc, mover.loc);
		this.d = p5.Vector.mag(this.f); // distance between mover and attractor
		this.f.normalize(); // direction of gravitational force

		let strength = (this.g * this.mass * mover.mass) / (this.d * this.d); // magnitude

		this.f.mult(strength); // magnitude * direction

		if (this.f > 25) { // limit strength of force so planets don't fly off screen
			this.f = 25;
		}
		if (this.f < 5) {
			this.f = 5;
		}

		return this.f;
	}
}

class Mover {
  constructor(x, y, m) {
		this.loc = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(1, 0); // initial velocity for circular pattern
		this.mass = m;
		this.col = color(random(255), random(255), random(255));
	}

  move() {
		this.vel.add(this.acc);
		this.loc.add(this.vel);
	}

	display() {
		stroke(1);
		fill(this.col, 150);
		ellipse(this.loc.x, this.loc.y, this.mass * 2, this.mass * 2);
		this.acc.mult(0); // wipe acceleration so it doesn't accumulate
	}

  // wrong, should use this. notation
	applyForce(force) {
		let newForce = force;
		this.acc.add(force);
	}
}
