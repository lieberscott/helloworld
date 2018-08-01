let spring;
let bob;
let restDist;

function setup() {
	createCanvas(400, 400);
	restDist = 200;
	spring = new Spring();
	bob = new Mover(width/2, 220); // input values for location of the bob
}

function draw() {
	background(240);

	spring.act(bob);

	bob.move();
	bob.display();

}

class Spring {
	constructor() {
		this.loc = createVector(width/2, 0);
	}
	act(ball) {
		line(this.loc.x, this.loc.y, ball.loc.x, ball.loc.y); // draw spring
		this.force = p5.Vector.sub(ball.loc, this.loc);
		this.distance = this.force.mag(); // distance from origin to bob's current location
		this.force.normalize(); // direction of force (is bob scrunched or stretched?)
		this.k = 0.1; // springyness of spring
		this.stretch = (this.distance - restDist) * (this.k) * (-1); // dist from bob's restLoc to current loc
		this.force.mult(this.stretch);
		bob.applyForce(this.force);
	}
}

class Mover {
	constructor(x, y) {
		this.loc = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	move() {
		this.vel.add(this.acc);
		this.vel.mult(0.99); // spring slows and eventually stops
		this.loc.add(this.vel);
	}

	display() {
		stroke(1);
		fill(255);
		ellipse(this.loc.x, this.loc.y, 20, 20);
		this.acc.mult(0);

	}
}
