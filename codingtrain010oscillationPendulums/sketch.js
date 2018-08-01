let origin;
let bob;
let angle; // used to calculate position, as well as force pulling pendulum back to center
let aVel = 0; // angular velocity
let aAcc = 0; // angular acceleration
let mass = 10; // not used for our purposes, but would be helpful if wind or other forces are added

function setup() {
	createCanvas(600, 600);
	origin = createVector(width/2, 0);
	bob = createVector(width/2, angle);
	angle = PI/2; // arbitrary beginning point
}

function draw() {
	background(0);
	stroke(255);
	fill(255);
	let armLength = 150;
	bob.x = origin.x + armLength * sin(angle); // graph SOHCAHTOA to see how this works
	bob.y = armLength * cos(angle); // graph SOHCAHTOA to see how this works

	let gravity = -sin(angle) * 0.01; // F(pend) = G * mass * sin(angle)
	// A = F*M -> thus, A(pend) = F(pend) / mass -> thus, A(pend) = G * sin(angle)/mass (as you see from the series of equations, mass cancels itself out, which is why it is not included in calculations)

	let aAcc = gravity;
	aVel += aAcc;
	angle += aVel;
	// velocity.add(gravity); // these items are not necessary
	// bob.add(velocity);
	line(origin.x, origin.y, bob.x, bob.y);
	ellipse(bob.x, bob.y, 16, 16);
	aVel *= 0.99; // air resistence
}
