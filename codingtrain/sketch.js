// update 12/11/17 - frog and fly; frog repells fly
// as fly gets closer, repell force becomes stronger
// frog leaps on montecarlo formula, unrelated to fly
// also fly occassionally gets enough velocity to fly off screen and not come back

let fly;
let frog;
// let snake = [];
let count = 0;

function setup() {
	createCanvas(600, 480);
	rectMode(CENTER);
	fly = new Fly();
	frog = new Frog();
}

function draw() {
	background(0);

  let danger = frog.repell(fly);
	fly.applyForce(danger);

  if (count % 60 == 0) { // only leap once every 60 frames
		frog.leap();
		frog.bounce();
	}
	frog.display();
	fly.move();
	fly.bounce();
	fly.display();
	count++;
}

function montecarlo() { // by Daniel Shiffman
  // Have we found one yet
  let foundone = false;
  let hack = 0;  // let's count just so we don't get stuck in an infinite loop by accident
  while (!foundone && hack < 10000) {
    // Pick two random numbers
    let r1 = random(1);
    let r2 = random(1);
    let y = r1*r1;  // y = x*x (change for different results)
    // If r2 is valid, we'll use this one
    if (r2 < y) {
      foundone = true;
      return r1;
    }
    hack++;
  }
  // Hack in case we run into a problem (need to improve this)
  return 0;
}

/*
class Snake {
	constructor() {
		this.loc = createVector(width/4, height/4);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.col = color(60, 250, 90);
	}

	move() {

	}

	bounce() {

	}

	display() {
		noStroke();
		fill(color);


	}

}
*/

class Frog {
	constructor() {
		this.loc = createVector(width/2, height/2);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.mass = 20;
	}

	repell(obj) { // Repell = -1 * 6/d (gets stronger as distance gets smaller!)
		this.tempForce = p5.Vector.sub(this.loc, obj.loc); // direction
		this.tempMag = p5.Vector.mag(this.tempForce); // magnitude(distance)
	  this.tempForce.normalize(); // direction normalized
		this.tempNumb = -6/this.tempMag; // tempVariable to apply inverse mult
		this.tempForce.mult(this.tempNumb); // formula!

		return this.tempForce;
	}

	leap() { // frog leaps
		this.montex = montecarlo() * 50 * int(random(-2, 2));
		this.montey = montecarlo() * 50 * int(random(-2, 2));
		this.loc.x += this.montex;
		this.loc.y += this.montey;

	}

	bounce() {
		if (this.loc.x > width) {
			this.loc.x -= 100;
		} else if (this.loc.x < 0) {
			this.loc.x += 100;
		}

		if (this.loc.y > height) {
			this.loc.y -= 100;
		} else if (this.loc.y < 0) {
			this.loc.y += 100;
		}
	}

	display() {
		noStroke();
		fill(20, 200, 20);
		rect(this.loc.x, this.loc.y, this.mass, this.mass);
		this.acc.mult(0);
	}
}

class Fly {
  constructor() {
		this.loc = createVector(random(width), random(height));
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		// this.perx = random(5, 10);
		// this.pery = random(1)
	}

	applyForce(force) {
		this.acc.add(force);
	}

  move() {
		// this.tempx = noise(this.perx);
		// this.tempy = noise(this.pery);
		// this.acc.x = map(this.tempx, 0, 1, -0.01, 0.01);
		// this.acc.y = map(this.tempy, 0, 1, -0.01, 0.01);
		this.acc.x += random(-0.1, 0.1);
		this.acc.y += random(-0.1, 0.1);
		this.vel.add(this.acc);
		this.loc.add(this.vel);
		// this.perx += 0.005;
		// this.pery += 0.005;

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
		fill(150, 150);
		ellipse(this.loc.x, this.loc.y, 9, 9);
		this.acc.mult(0); // refresh acceleration so it doesn't accumulate
	}
}
