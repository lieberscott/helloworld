// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// An array to keep track of how often random numbers are picked
let randomCounts = [];
let count = 0;

function setup() {
  createCanvas(800, 200);
  for (let i = 0; i < 20; i++) {
		randomCounts[i] = 0;
	}
}

function draw() {
  background(255);

  // Pick a random number and increase the count
  let index = int(montecarlo()*randomCounts.length);
	count++;
  randomCounts[index]++;

  // Draw a rectangle to graph results
  stroke(0);
  strokeWeight(2);
  fill(127);

  let w = width / randomCounts.length;

  for (let x = 0; x < randomCounts.length; x++) {
		// map to (height*6) to accentuate the height
		let m = map(randomCounts[x], 0, count, 0, height*6);
    rect(x * w, height - m, w - 1, m);
  }
}

// An algorithm for picking a random number based on monte carlo method
// Here probability is determined by formula y = x
function montecarlo() {
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
