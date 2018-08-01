// PLINKO

// module aliases
let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let world;
let particles = [];
let boundaries = [];
let plinkos = [];
let cols = 10;
let rows = 10;

function setup() {
	createCanvas(600, 750);
  engine = Engine.create();
  world = engine.world;

  let spacing = width / cols;
  for (let i = 0; i < rows + 1; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * spacing;
      if (j % 2 == 1) {
        x += spacing/2;
      }
      let y = spacing + j * spacing;
      let p = new Plinko(x, y, 4);
      plinkos.push(p);
    }
  }

  // left, right, and bottom boundaries (so balls don't go offscreen)
  let bottom = new Boundary(width/2, height + 50, width, 100);
  let left = new Boundary(-50, height/2, 100, height);
  let right = new Boundary(width + 50, height/2, 100, height);
  boundaries.push(bottom);
  boundaries.push(left);
  boundaries.push(right);

  for (let i = 0; i < cols + 1; i++) { // buckets
    let x = i * spacing;
    let h = 100;
    let w = 10;
    let y = height - h/2;
    let b = new Boundary(x, y, w, h);
    boundaries.push(b);
  }
}

function draw() {
  if (frameCount % 60 == 1) {
    let p = new Particle(random(80, 520), 0, 15);
    particles.push(p);
  }

  background(51);
  Engine.update(engine);
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
  }

  for (let i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }

  for (let i = 3; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}

class Particle {
  constructor(x, y, r) {
    let options = {
      restitution: 0.8,
      friction: 0
    };
    this.x = x;
    this.y = y;
    this.r = r;
    this.body = Bodies.circle(this.x, this.y, this.r, options); // Matter.js circle object
    World.add(world, this.body); // add body to physics world
  }

  show() {
    fill(255);
    noStroke();
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}


class Plinko { // identical to Particle, but with isStatic option; can use inheritence instead
  constructor(x, y, r) {
    let options = {
      restitution: 1,
      friction: 0,
      isStatic: true
    };
    this.x = x;
    this.y = y;
    this.r = r;
    this.body = Bodies.circle(this.x, this.y, this.r, options); // Matter.js circle object
    World.add(world, this.body); // add body to physics world
  }

  show() {
    fill(98, 155, 210);
    stroke(255);
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}

class Boundary {
  constructor(x, y, w, h) {
    let options = {
      restitution: 0,
      friction: 1,
      isStatic: true
    };
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options); // Matter.js circle object
    World.add(world, this.body); // add body to physics world
  }

  show() {
    fill(255);
    noStroke();
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
