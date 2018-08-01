// The Nature of Code
// Daniel Shiffman
// Coding challenge: 3D blanket: DOES NOT WORK

let particles = [];
let springs = [];
let physics;
let cols = 20;
let rows = 20;
let w = 20;

function setup() {
  createCanvas(640,640);

  physics = new VerletPhysics2D(); // shortcut via helper file
  let gravity = new Vec2D(0, 0.5);
  let gb = new GravityBehavior(gravity);
  physics.addBehavior(gb);

  let x = 100;
  for (let i = 0; i < cols; i++) {
    let y = 10;
    particles[i] = [];
    for (let j = 0; j < rows; j++) {
      let p = new Particle(x, y);
      particles[i].push(p);
      physics.addParticle(p);
      y += w;
    }
    x += w;
  }

  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      let a = particles[i][j];
      let b1 = particles[i+1][j]; // particle to the right of a
      let b2 = particles[i][j+1]; // particle below a
      let s1 = new Spring(a, b1, w, 0.4); // (part1, part2, restingLength, strength)
      let s2 = new Spring(a, b2, w, 0.4);
      springs.push(s1);
      springs.push(s2);
      physics.addSpring(s1);
      physics.addSpring(s2);
    }
  }

  // connect last column by springs (comment out to see difference)
  for (let i = 0; i < rows - 1; i++) {
    let a = particles[cols - 1][i];
    let b = particles[cols - 1][i + 1];
    let s = new Spring(a, b, w, 0.4);
    springs.push(s);
    physics.addSpring(s);
  }

  // connect last row across by springs (comment out to see difference)
  for (let i = 0; i < cols - 1; i++) {
    let a = particles[i][rows - 1];
    let b = particles[i + 1][rows - 1];
    let s = new Spring(a, b, w, 0.4);
    springs.push(s);
    physics.addSpring(s);
  }

  let p0 = particles[0][0];
  p0.lock(); // lock the particle in place!
  let p19 = particles[cols - 1][0];
  p19.lock();
}

function draw() {
  background(51);

  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++) {
      particles[i][j].display();
    }
  }

  for (let s of springs) {
    s.display();
  }
  physics.update();
}

class Particle extends toxi.physics2d.VerletParticle2D {
  constructor(x, y) {
    super(x, y);
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, 3, 3);
  }
}

class Spring extends toxi.physics2d.VerletSpring2D {
  constructor(a, b) {
    super(a, b, w, 0.4);
  }

  display() {
    stroke(255);
    fill(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
