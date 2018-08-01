let bubbles = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < 2; i++) {
		bubbles[i] = new Bubbles(random(width), random(height));
	}
}

function draw() {
	background(0);

	for (let i = 0; i < bubbles.length; i++) {
		bubbles[i].update();
		bubbles[i].display();
		for (let j = 0; j < bubbles.length; j++) {
			if (i != j && bubbles[i].intersects(bubbles[j])) {
				bubbles[i].changeColor;
				bubbles[j].changeColor;
			}
		}
	}



	if (bubbles[0].intersects(bubbles[1])) {
		bubbles[0].changeColor();
		bubbles[1].changeColor();
	}

	// var d = dist(b1.x, b1.y, b2.x, b2.y);
  //
	// if (d < b1.r + b2.r) {
	// 	b1.changeColor();
	// 	b2.changeColor();
  //
	// }

}

class Bubble {

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = 48;
		this.col = color(255);
	}

  changeColor() {
		this.col = color(random(255), random(255), random(255));
	}

	display() {
		stroke(255);
		fill(this.col);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}

	intersects(other) {
		var d = dist(this.x, this.y, other.x, other.y);
		if (d < this.r + other.r) {
			return true;
		}
		else {
			return false;
		}
	}

	update() {
		this.x = this.x + random(-1, 1);
		this.y = this.y + random(-1, 1);
	}
}
