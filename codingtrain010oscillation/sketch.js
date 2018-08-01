let a = 0;
let r = 0;
let aVel = 0;
let aAcc = 0.06;

function setup() {
	createCanvas(400, 400);
	background(255);
}

function draw() {
	aVel += aAcc;
	a += aVel;
	let x = r * cos(a);
	let y = r * sin(a);
	translate(width/2, height/2);
	fill(0);
	ellipse(x, y, 5, 5);
	r += 0.2;
	aVel = 0;

}
