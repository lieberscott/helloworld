// Perlin noise to make a noisy sin function
// The Drunk sin function
// Inspired by Daniel Shiffman
// https://www.youtube.com/watch?v=y7sgcFhk6ZM&index=3&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD
let xoff;
let start = 0;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(0);
	xoff = start;
	for (let x = 0; x < width; x++) {
		// a will be used to distrort the sin function (the higher the multiplicative factor, the greater the distortion)
		let a = noise(xoff) * 200;
		// take sin of xoff, map it to height of canvas
		let b = map(sin(xoff), -1, 1, 0, height);
		// add a and b, and map it to height of canvass (there is likely a better optimization here I can use)
		let y = map(a + b, 0, height + 200, 0, height);
		stroke(1);
		fill(255);
		ellipse(x, y, 10, 10);
		xoff += 0.02;
	}
	start += 0.02;
}
// on every inner loop, xoff is incremented 400 times (width of screen)
// however, upon exiting the loop, xoff becomes its value at time(1), and the value of noise at time(1) is the new y value at x = 0
// and so on through every x on that execution of the inner loop
// the entire map is drawn again, with a new point at x location 400 (width)
// and it gives the appearance of motion
