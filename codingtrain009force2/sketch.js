// force with gravity applying equally to all items regardless of mass
// and wind force applying based on mass
// and a liquid with drag

let b = [];
let l;
function setup() {
	createCanvas(400, 400);
	for (let i = 0; i < 5; i++) {
		b[i] = new Ball();
	}
	// Liquid will provide drag, is its own object (last number is coefficient of friction)
	l = new Liquid(width/2, height/2, width/2, height/2, 0.05);
}

function draw() {
  background(0);
	l.display();

	let wind = createVector(0.01, 0);

	for (let i = 0; i < b.length; i++) {
		let gravity = createVector(0, 0.1);
		// hack: multiply gravity by b[i].mass so gravity applies equally to all objects
		// applyForce divides by mass, so mass will be neutralized for gravity
		// but still apply to other forces, like wind
		let temp = p5.Vector.mult(gravity, b[i].mass);
		b[i].applyForce(temp);
		b[i].applyForce(wind);

		if (b[i].isIn(l)) {
			b[i].dragForce(l);
		}

		b[i].move();
		b[i].bounce();
		b[i].display();
	}

}


class Ball {
	constructor() {
		this.loc = createVector(random(width), 0);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.mass = random(1, 4);
	}

  // Newton's 2nd law: F = MA | A = F/M
	applyForce(force) {
		// static method does not alter original force vector (for calls on subsequent Objects)
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
		fill(255, 100);
		// size based on mass (visual representation of mass)
		ellipse(this.loc.x, this.loc.y, this.mass * 10, this.mass * 10);
	}

  // check if ball is in the liquid area
	isIn(area) {
		if ((this.loc.x > area.x) && (this.loc.x < area.x + area.w) && (this.loc.y > area.y) && (this.loc.y < area.y + area.h)) {
			return true;
		}
		else {
			return false;
		}
	}

  // apply drag: Fd = -1/2(P)(v^2)(A)(Cd)(v(normalized))
	// we assume P, A = 1: then insert the other factors (Cd (coefficient of drag) comes from liquid object)
	dragForce(area) {
		this.speed = this.vel.mag();
		this.dragMag = area.drag * this.speed * this.speed; // Cd * v^2

		this.drag = this.vel.copy();
		this.drag.normalize();
		this.drag.mult(-1); // (-1) * (v(normalized))

		this.drag.mult(this.dragMag); // multiply the whole formula together
		this.applyForce(this.drag); // applyForce
	}
}

class Liquid {
	constructor(x, y, w, h, d) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.drag = d;
	}

	display() {
		noStroke();
		fill(175);
		rect(this.x, this.y, this.w, this.h);
	}
}
