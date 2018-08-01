// steering behavior with moving target around circle
// steering = desiredV - currentV

let v;
let t;
let theta = 0;
let r = 350;

function setup() {
  createCanvas(600, 600);
  v = new Vehicle(0, 0);
  t = new Target(theta, r);
}

function draw() {
  background(51);
  stroke(255);
  strokeWeight(1);
  fill(51);

  let ball = createVector(t.x, t.y);

  push();
  translate(width/2, height/2);
  ellipse(0, 0, r, r);
  v.arrive(ball);
  v.update();
  v.display();
  t.update();
  t.display();
  pop();
}

class Vehicle {
  constructor(x, y) {
    this.loc = createVector(x, y);
    this.vel = createVector(-0.4, -2);
    this.acc = createVector(0, 0);
    this.r = 6;
    this.maxspeed = 1.5;
    this.maxforce = 1.5;
    this.desired = createVector(this.vel.x, this.vel.y);
  }

  arrive(target) { // idential to seek from previous example, but with the if-else statement added
    this.desired = p5.Vector.sub(target, this.loc);
    this.dist = this.desired.mag();

    if (this.dist < 25) { // decelerate when within 100 pixels
      let m = map(this.dist, 0, 25, 0, this.maxspeed);
      this.desired.setMag(m);
    }
    else {
      this.desired.setMag(this.maxspeed);
    }

    this.steer = p5.Vector.sub(this.desired, this.vel);
    this.steer.limit(this.maxforce);

    this.applyForce(this.steer);
  }

  update() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  display() {
    this.theta = this.vel.heading() + PI/2; // don't know what this line of code does
    fill(127);
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.loc.x, this.loc.y);
    rotate(this.theta);
    beginShape(); // ensures shape is pointing forward
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}

class Target {
  constructor(theta, r) {
    this.theta = theta;
    this.r = r;
    this.x = cos(this.theta) * r/2;
    this.y = sin(this.theta) * r/2;
  }

  update() {
    this.x = cos(this.theta) * r/2;
    this.y = sin(this.theta) * r/2;
    this.theta += 0.01;
  }

  display() {
    // push();
    // translate(width/2, height/2);
    ellipse(this.x, this.y, 10, 10);
    // pop();
  }

}
