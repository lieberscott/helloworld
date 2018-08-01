// Perlin noise in 2D
// By Daniel Shiffman
// https://www.youtube.com/watch?v=ikwNrFvnL3g&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=4
let inc = 0.01;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	var yoff = 0;
	loadPixels();
	background(0);
	for (let x = 0; x < width; x++) {
		var xoff = 0;
		for (let y = 0; y < height; y++) {
			var index = (x + y * width) * 4;
			var r = noise(xoff, yoff) * 255;
			pixels[index+0] = r;
			pixels[index+1] = r;
			pixels[index+2] = r;
			pixels[index+3] = 255;
			xoff += inc;
		}
		yoff += inc;
	}
  updatePixels();
}
