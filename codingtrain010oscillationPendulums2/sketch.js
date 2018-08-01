// series of pendulums
// NOT FINISHED (and I'm stuck)
// want all the pendulums to swing in this pattern
// https://www.youtube.com/watch?v=qMq-zd6hguc&index=1&list=PLRqwX-V7Uu6bR4BcLjHHTopXItSjRA7yG
// how?
// appears to have a complex mathmatical formula
// https://en.wikipedia.org/wiki/Pendulum_(mathematics)
// d^2(angle)/dt^2 + g/l*sin(angle) = 0
// second derivative of the angle divided by derivative of t (what is t?) + gravity/length*sin(angle)
// may make more sense to use a library

let pendulums = [];
let origin;
let armLength;
let angle; // used to calculate position, as well as force of gravity
let size;
let col;


function setup() {
	createCanvas(600, 600);
	origin = createVector(width/2, 0);
	armLength = 150;
	size = 20;
	for (let i = 0; i < 10; i++) {
		col = color(random(255), random(255), random(255));
		angle = PI / 4; // offset
		let startingX = origin.x + (armLength * sin(angle));
		let startingY = origin.y + (armLength * cos(angle));
		pendulums.push(new Pendulum(startingX, startingY, angle, armLength, size, col));
		armLength += 15;
		size += 0.5;
	}
}

function draw() {
	background(0);

	for (let i = 0; i < pendulums.length; i++) {
		pendulums[i].applyForce();
		pendulums[i].display();
	}
}

class Pendulum {
	constructor(x, y, ang, armLen, round, col) {
		this.loc = createVector(x, y);
		this.angle = ang;
		this.angVel = 0; // angular velocity
		this.angAcc = 0; // angular acceleration
		this.armLen = armLen;
		this.round = size;
		this.col = col;
	}

	applyForce() {
		this.gravity = -sin(this.angle); // F(pend) = G * mass * sin(angle)
		// A = F*M -> thus, A(pend) = F(pend) / mass -> thus, A(pend) = G * sin(angle)/mass (as you see from the series of equations, mass cancels itself out, which is why it is not included in calculations)
		this.angAcc = this.gravity / this.armLen;
		this.angVel += this.angAcc;
		this.angle += this.angVel;
		this.loc.x = origin.x + (this.armLen * sin(this.angle));
		this.loc.y = origin.y + (this.armLen * cos(this.angle));
	}

	display() {
		stroke(255);
		fill(this.col);
		line(origin.x, origin.y, this.loc.x, this.loc.y);
		ellipse(this.loc.x, this.loc.y, this.round, this.round);
		this.angVel *= 0.999;
	}
}
