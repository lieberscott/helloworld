// gravitational force (like outer space)

let m;
let a;

function setup() {
	createCanvas(800, 800);
	m = new Mover();
	a = new Attractor();
}

function draw() {
	background(0);

  let grav = a.attract(m);
	m.applyForce(grav);
	m.move();
	a.display();
	m.display();

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
		// this is incorrect code
		// all these variables should be in this. notation
		// these are not registering anything (i don't think)
		// currently working on the ecosystem and don't want to mess around
		// without an active server so i can see what's happening
		let f = p5.Vector.sub(this.loc, mover.loc);
		let d = p5.Vector.mag(f); // distance between mover and attractor
		f.normalize(); // direction of gravitational force

		let strength = (this.g * this.mass * mover.mass) / (d * d); // magnitude

		f.mult(strength); // magnitude * direction

		return f;
	}
}

class Mover {
  constructor() {
		this.loc = createVector(width/2, height/6);
		this.vel = createVector(0, 0);
		this.acc = createVector(1, 0); // initial velocity for circular pattern
		this.mass = 20;
	}

  move() {
		this.vel.add(this.acc);
		this.loc.add(this.vel);
	}

	display() {
		stroke(1);
		fill(255);
		ellipse(this.loc.x, this.loc.y, 20, 20);
		this.acc.mult(0); // wipe acceleration so it doesn't accumulate
	}

	applyForce(force) {
		let newForce = force;
		this.acc.add(force);
	}
}
