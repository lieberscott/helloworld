// steering behavior avoiding borders
// steering = desiredV - currentV

let v;

function setup() {
  createCanvas(600, 600);
  v = new Vehicle(width/2, height/2);
}

function draw() {
  background(51);
  let mouse = createVector(mouseX, mouseY);

  // Draw ellipse at mouse location
  // fill(255);
  // stroke(0);
  // strokeWeight(2);
  // ellipse(mouse.x, mouse.y, 40, 40);

//  v.arrive(mouse);
  stroke(255);
  strokeWeight(1);
  fill(51);
  rect(52, 52, width-104, height-104);
  v.checkBoarders();
  v.update();
  v.display();
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

    if (this.dist < 100) { // decelerate when within 100 pixels
      let m = map(this.dist, 0, 100, 0, this.maxspeed);
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

  checkBoarders() {
    this.buffer = 50;
    if (this.loc.x < 0 + this.buffer) {
      this.desired = createVector(this.maxspeed, this.vel.y);
    }

    else if (this.loc.x > width - this.buffer) {
      this.desired = createVector(-this.maxspeed, this.vel.y);
    }

    if (this.loc.y < 0 + this.buffer) {
      this.desired = createVector(this.vel.x, this.maxspeed);
    }

    else if (this.loc.y > height - this.buffer) {
      this.desired = createVector(this.vel.x, -this.maxspeed);
    }

    if (this.desired != null) {

      this.desired.normalize();
      this.desired.setMag(this.maxspeed);

      this.steer = p5.Vector.sub(this.desired, this.vel);

      this.steer.limit(this.maxforce);

      this.applyForce(this.steer);
    }

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
