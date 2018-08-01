// force

let balls;
let b2;
function setup() {
	createCanvas(400, 400);
	b = new Ball();
	b2 = new Ball();
}

function draw() {
	background(0);

	let gravity = createVector(0.01, 0);
	b.applyForce(gravity);
	b2.applyForce(gravity);

	let wind = createVector(0, 0.01);
	b.applyForce(wind);
	b2.applyForce(wind);



	b.move();
	b2.move();
	b.bounce();
	b2.bounce();
	b.display();
	b2.display();

}

class Ball {
	constructor() {
		this.loc = createVector(random(width), height/2);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.mass = 2;
//		this.topspeed = 3;
	}

  // Newton's 2nd law: F = MA
	applyForce(force) {
		// static method so as not to alter the original force vector (for calls on subsequent Objects)
		this.tempForce = p5.Vector.div(force, this.mass);

		this.acc.add(this.tempForce);
	}

	move() {
		this.vel.add(this.acc);
		this.loc.add(this.vel);
		// reset acceleration
		this.acc.mult(0);
	}

	bounce() {
		if ((this.loc.x > width) || (this.loc.x < 0)) {
			this.vel.x *= -1;
			this.acc.x *= -1;
		}
		if ((this.loc.y > height) || (this.loc.y < 0)) {
			this.vel.y *= -1;
			this.acc.y *= -1;
		}
	}

	display() {
		stroke(1);
		fill(255);
		ellipse(this.loc.x, this.loc.y, 16, 16);
	}
}
