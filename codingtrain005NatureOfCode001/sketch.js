 let w;

function setup() {
	createCanvas(400, 400);
	w = new Walker(200, 200);
	background(250);
}

function draw() {
	w.step();
	w.show();

}

class Walker {
  constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	step() {
		this.x += int(random(0, 3))-1;
		this.y += int(random(0, 3))-1;
	}

	show() {
		noStroke();
		fill(0, 100);
		ellipse(this.x, this.y, 2, 2);
	}
}
