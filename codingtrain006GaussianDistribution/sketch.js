// Gaussian Distribution

// array will span length of screen in for-loop at bottom of code
let dist = [];

// we will use count to map(draws, 0, count, 0, height)
let count = 0;

// max 400 (width of canvas)
let granularity = 50;

let r;
let barWidth;
let mean;
let sd;

function setup() {
	createCanvas(400, 400);

	// create granularity array, initialize each index at 0
	for (let i = 0; i < granularity; i++) {
		dist[i] = 0;
	}

  // same value, could use same variable, but used for different concepts in code
	r = int(width / granularity);
	barWidth = width/dist.length;

	mean = width / 2;
	sd = 50;
}

function draw() {

	background(250);
  let x = randomGaussian(mean, sd);
	count++;

	// round number so it corresponds to array index, then increment the index
	let f = round(x/r);
	dist[f]++;

	stroke(0);
	fill(175);

	for (let i = 0; i < dist.length; i++) {
		let m = map(dist[i], 0, count, 0, height);
		rect(i * barWidth, height - m, width / dist.length, m);
	}
}

// montecarlo function not used in this sketch
function montecarlo() {
  // We do this “forever” until we find a qualifying random value.
  while (true) {
   // Pick a random value.
   let r1 = random(1);
    // Assign a probability.
    let prob = r1;
    // Pick a second random value.
    let r2 = random(1);

    // Does it qualify? If so, we’re done!
    if (r2 < prob) {
      return r1;
    }
  }
}
