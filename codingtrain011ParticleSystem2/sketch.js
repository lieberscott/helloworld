// multiple particle systems (gushing hose of particles) based on mouse clicks!
// encapsulation

let partSystem = [];

function setup() {
	createCanvas(600, 480);
}

function draw() {
  background(255);

	if (partSystem.length > 0) {
	  for (let i = partSystem.length - 1; i >= 0; i--) {
	    partSystem[i].addPart();
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
