// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flow Field Following - DOESN'T QUITE WORK

// Via Reynolds: http://www.red3d.com/cwr/steer/FlowFollow.html

// Flowfield object
let flowfield;
let v;
// let arrow;
// let a;

function setup() {
  createCanvas(600, 600);
  // Make a new flow field with "resolution" of 20
  flowfield = new FlowField(20);
	v = new Vehicle(1.5, 1.5);
  // arrow = loadShape("arrow.svg");
  // a = loadImage("arrow60.png");
}

function draw() {
  background(51);
  // Display the flowfield in "debug" mode
  translate(30,30);
	v.follow(flowfield);
	v.run();
  // flowfield.display();
  // saveFrame("ch6_exc6.png");
  // noLoop();
}
// Make a new flowfield
// function mousePressed() {
//   flowfield.init();
// }


// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flow Field Following

class FlowField {
  constructor(r) {
  // A flow field is a two dimensional array of PVectors
  this.field = [];
  this.resolution = r; // How large is each "cell" of the flow field
  // Determine the number of columns and rows based on sketch's width and height
  this.cols = width/r;
  this.rows = height/r;
  // this.field = createVector(this.cols, this.rows); // new PVector[cols][rows];
  this.init();
  }

  init() {
    // Reseed noise so we get a new flow field every time
    // noiseSeed((int)random(10000));
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
			this.field[i] = [];
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        //float theta = random(TWO_PI);
        let theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        let x = i * this.resolution;
        let y = j * this.resolution;
        let v = createVector(cos(theta), sin(theta));
        v.normalize();
        // Polar to cartesian coordinate transformation to get x and y components of the vector
        this.field[i].push(v);// new PVector(cos(theta),sin(theta));
        yoff += 1;
      }
      xoff += 0.1;
    }
  }

  // Draw every vector
  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        //drawVector(field[i][j],i*resolution,j*resolution,resolution-2);
        pushMatrix();
        //translate(i*resolution+arrow.width/2,j*resolution+arrow.height/2);
        translate(i * this.resolution, j * this.resolution);
        rotate(this.field[i][j].heading());
        imageMode(CENTER);
        //scale(0.2);
        image(a,0,0);
        //shape(arrow,-arrow.width/2,-arrow.height/2);
        //ellipse(0,0,8,8);
        popMatrix();
      }
    }

  }

  // Renders a vector object 'v' as an arrow and a position 'x,y'
  drawVector(v, x, y, scayl) {
    push();
    let arrowsize = 4;
    // Translate to position to render vector
    translate(x, y);
    stroke(0, 100);
    // Call vector heading function to get direction (note that pointing up is a heading of 0) and rotate
    rotate(v.heading());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    let len = v.mag() * scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    line(0, 0, len, 0);
    line(len, 0, len - arrowsize, len + arrowsize/2);
    line(len, 0, len - arrowsize, len - arrowsize/2);
    pop();
  }

  lookup(lookup) {
    let col = int(map(lookup.x/this.resolution, 0, this.cols - 1));
    let row = int(map(lookup.y/this.resolution, 0, this.rows - 1));
    return this.field[col][row]; // .get();
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flow Field Following

class Vehicle {
  constructor(ms, mf) {
	  // The usual stuff
		this.pos = createVector(30, 30);
	  this.vel = createVector(0, 0);
	  this.acc = createVector(0, 0);
	  this.maxforce = mf; // Maximum steering force
	  this.maxspeed = ms; // Maximum speed
    this.r = 3.0;
  }

  run() { // public void run() {
    this.update();
    this.borders();
    this.display();
  }

  // Implementing Reynolds' flow field following algorithm
  // http://www.red3d.com/cwr/steer/FlowFollow.html
  follow(flow) {
    // What is the vector at that spot in the flow field?
    this.desired = flow.lookup(this.pos);
    // Scale it up by maxspeed
    this.desired.mult(this.maxspeed);
    // Steering is desired minus velocity
    this.steer = p5.Vector.sub(this.desired, this.vel);
    this.steer.limit(this.maxforce);  // Limit to maximum steering force
    this.applyForce(this.steer);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acc.add(force);
  }

  // Method to update position
  update() {
    // Update velocity
    this.vel.add(this.acc);
    // Limit speed
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    // Reset accelertion to 0 each cycle
    this.acc.mult(0);
  }

  display() {
    // Draw a triangle rotated in the direction of velocity
    let theta = this.vel.heading() + radians(90);
    fill(175);
    stroke(0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape(TRIANGLES);
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape();
    pop();
  }

  // Wraparound
  borders() {
    if (this.pos.x < -this.r) {
			this.pos.x = width + this.r;
		}
    if (this.pos.y < -this.r) {
			this.pos.y = height + this.r;
		}

		if (this.pos.x > width + this.r) {
			this.pos.x = -this.r;
		}
    if (this.pos.y > height + this.r) {
			this.pos.y = -this.r;
		}
  }
}
