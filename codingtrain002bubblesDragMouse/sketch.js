let bubbles = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
	for (let i = 0; i < bubbles.length; i++) {
		if (bubbles[i].contains(mouseX, mouseY)) {
			bubbles[i].changeColor(255);
		}
		else {
			bubbles[i].changeColor(0);
		}
		bubbles[i].move();
		bubbles[i].show();
		bubbles[i].contains(mouseX, mouseY);
	}

	if (bubbles.length > 10) {
		bubbles.splice(0, 1);
	}
}

function mouseDragged() {
	let r = 40;
	let b = new Bubble(mouseX, mouseY, r);
	bubbles.push(b);
}

 function mousePressed() {
	 for (let i = 0; i < bubbles.length; i++) {
		 if (bubbles[i].contains(mouseX, mouseY)) {
			 bubbles.splice(i, 1);
		 }
	 }
 }

class Bubble {
	// data
  constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.brightness = 0;
		this.dark = false;
	}

	// clicked(x, y) {
	// 	let d = dist(x, y, this.x, this.y);
	// 	if (d < this.r) {
	// 		if (this.dark) {
	// 		  this.brightness = 255;
	// 	  }
	// 		else {
	// 			this.brightness = 0;
	// 		}
	// 		this.dark = !this.dark;
	// 		console.log("CLICKED!");
	// 	}
	// }

	// functionlity
	move() {
    this.x += random(-2, 2);
		this.y += random(-2, 2);
	}

	changeColor(bright) {
		this.brightness = bright;
	}

	contains(x, y) {
		let d = dist(x, y, this.x, this.y);
		if (d < this.r) {
				return true;
			}
			else {
				return false;
			}
	}

	show() {
    stroke(255);
		strokeWeight(1);
		fill(this.brightness, 100);
		ellipse(this.x, this.y, this.r*2, this.r*2);

	}

}
