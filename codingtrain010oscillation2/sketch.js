// multiple pendulums with different periods and amplitudes
let pend = [];

function setup() {
	createCanvas(400, 400);
	for (let i = 0; i < 6; i++) {
		pend.push(new Pendulum());
	}
//	pend = new Pendulum();
	rectMode(CENTER);
}

function draw() {
	background(0);
	translate(width/2, height/2);
	stroke(255);
	fill(255, 100);
  ellipse(0, 0, 10, 10);
	for (let i = 0; i < pend.length; i++) {
		pend[i].swing();
		pend[i].display();
	}
}

class Pendulum { // amplitude * sin(period(degree increase/moment) * radians) = movement pattern
	constructor() {
		this.angleX = random(TWO_PI); // starting angle(radian) x
		this.angleY = random(TWO_PI); // starting angle(radian) y
		this.angleXiter = random(0.04, 0.08); // x-direction period (degree increase/frame)
		this.angleYiter = random(0.04, 0.08); // y-direction period (degree increase/frame)
		this.ampX = random(50, 200); // amplitude in x-direction
		this.ampY = random(50, 200); // amplitude in y-direction
		this.x; // x
		this.y; // y
	}

	swing() {
		this.angleX += this.angleXiter; // iterate the x-angle on each pass
		this.angleY += this.angleYiter; // iterate the y-angle on each pass
		this.x = this.ampX * sin(this.angleX);
		this.y = this.ampY * sin(this.angleY);
	}

	display() {
		ellipse(this.x, this.y, 16, 16);
		line(0, 0, this.x, this.y);
	}
}
