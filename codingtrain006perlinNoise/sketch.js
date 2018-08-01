// Perlin noise 1D

let ball;

function setup() {
	createCanvas(400, 400);
	ball = new Perlin();
}

function draw() {
	background(250);
	ball.nextMove();
	ball.nextShow();
}

class Perlin {
  constructor() {
	  this.tempx = 3;
		this.tempy = 1000;
    this.x;
	  this.y;

	}

	nextMove() {
    let nx = noise(this.tempx);
	  let ny = noise(this.tempy);
		this.x = map(nx, 0, 1, 0, width);
		this.y = map(ny, 0, 1, 0, height);
	}

  nextShow() {
		stroke(1);
		fill(78, 17, 201);
		ellipse(this.x, this.y, 40, 40);
		this.tempx += 0.002;
		this.tempy += 0.001;
	}


}
