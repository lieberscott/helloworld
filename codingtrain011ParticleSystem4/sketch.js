// multiple particle systems (gushing hose of particles) based on mouse clicks!
// encapsulation AND inheritance and wind (applyForce)!

let partSystem = [];

function setup() {
	createCanvas(600, 480);
}

function draw() {
  background(255);

	let wind = createVector(0.1, 0); // new wind force

	if (partSystem.length > 0) {
	  for (let i = partSystem.length - 1; i >= 0; i--) {
	    partSystem[i].addPart();
			partSystem[i].applyForce(wind); // applyForce method added back in
	    partSystem[i].run();
	  }
  }
}

function mousePressed() { // add ParticleSystem on mouse click
	partSystem.push(new ParticleSystem(mouseX, mouseY));
}

class ParticleSystem { // ParticleSystem class now refers to Particle class
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.particles = []; // array of Particles for each ParticleSystem
	}

	applyForce(force) {
		for (this.i = 0; this.i < this.particles.length; this.i++) {
			this.particles[this.i].applyForce(force);
		}

	}

	addPart() { // when partSystem.length > 0, this runs in draw()
		this.particles.push(new Particle(this.x, this.y));
	}

	run() {
		for (let p = this.particles.length - 1; p >= 0; p--) {
			this.particles[p].move(); // move() is in Particle class
			this.particles[p].draw(); // draw() is in Particle class
		  if (this.particles[p].isDead()) { // isDead() is in Particle class
			  this.particles.splice(p, 1);
		  }
	  }
	}
}

class Particle {
	constructor(x, y) {
		this.loc = createVector(x, y);
		this.vel = createVector(random(-1, 1), random(-0.5, 0.5));
		this.acc = createVector(0, 0.1);
		this.lifespan = 255;
	}

	applyForce(force) {
		this.acc.add(force);
		this.vel.add(this.acc);
		this.loc.add(this.vel);
		this.acc.sub(force); // so acc doesn't increase. dirty solution to account for air resistence (w/o air resistence, particles would continue to increase in speed in x-direction)
	}

	isDead() {
		if (this.lifespan <= 0) {
			return true;
		}
		else {
			return false;
		}
	}

	move() {
		this.vel.add(this.acc);
		this.loc.add(this.vel);
	}

	draw() {
		stroke(0, this.lifespan);
		fill(0, this.lifespan);
		ellipse(this.loc.x, this.loc.y, 12, 12);
		this.lifespan -= 2;

	}
}

class SqParticle extends Particle {
	constructor(x, y) {
		super(x, y);

		draw(stroke, this.lifespan);
		fill(0, this.lifespan);
		rect(this.loc.x, this.loc.y, 12, 12);
		this.lifepsan -= 2;
	}
}
