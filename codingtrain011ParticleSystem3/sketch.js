// single particle system with inheritance of square particles!
let particles = []; // array of particles

function setup() {
	createCanvas(400, 400);
}

function draw() {

	let r = random(1);

	if (r < 0.5) {
		particles.push(new Particle(width/2, 50)); // add new Particle to particles[]
	}

	else {
		particles.push(new SqParticle(width/2, 50));
	}

	background(255);

	for (let p = particles.length - 1; p >= 0; p--) {
		particles[p].move();
		particles[p].draw();
	  if (particles[p].isDead()) { // if particle alpha goes to 0
		  particles.splice(p, 1);
	  }
  }
}


class Particle {
	constructor(x, y) { // hardcoded above as (width/2, 50)
		this.loc = createVector(x, y);
		this.vel = createVector(random(-1, 1), random(-0.5, 0.5));
		this.acc = createVector(0, 0.1);
		this.lifespan = 255; // alpha; will decrement in draw()
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

class SqParticle extends Particle { // inheritance!
	constructor(x, y) {
		super(x, y);
	}

	draw() {
		stroke(0, this.lifespan);
		fill(0, this.lifespan);
		rect(this.loc.x, this.loc.y, 12, 12);
		this.lifespan -= 2;
	}
}
