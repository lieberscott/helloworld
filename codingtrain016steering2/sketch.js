// steering behavior with deceleration near target
// steering = desired - velocity

let v;

function setup() {
  createCanvas(600, 600);
  v = new Vehicle(width/2, height/2);
}

function draw() {
  background(51);
  let mouse = createVector(mouseX, mouseY);

  // Draw ellipse at mouse location
  fill(255);
  stroke(0);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 40, 40);

  v.arrive(mouse);
  v.update();
  v.display();
}

class Vehicle {
  constructor(x, y) {
    this.loc = createVector(x, y);
    this.vel = createVector(0, -2);
    this.acc = createVector(0, 0);
    this.r = 6;
    this.maxspeed = 4;
    this.maxforce = 0.1;
  }

  update() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
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
