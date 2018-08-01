// vectors and vector classes
// velocity, acceleration

let b;
function setup() {
	createCanvas(400, 400);
	b = new Ball();
}

function draw() {
	background(0);
	b.move();
	b.bounce();
	b.display();

}

class Ball {
	constructor() {
		this.loc = createVector(width/2, height/2);
		this.vel = createVector(0, 0);
//		this.acc = createVector(0, 0);
//		this.topspeed = 3;
	}

	move() {
		this.acc = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
		this.vel.add(this.acc);
	//	constrain(this.vel, -this.topspeed, this.topspeed); // doesn't work
		this.loc.add(this.vel);
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
