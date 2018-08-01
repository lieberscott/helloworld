// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Falling boxes with two static platforms


// A reference to our box2d world
var world;

// A list we'll use to track fixed objects
var boundaries = [];
// A list for all of our rectangles
var boxes = [];

function setup() {
  createCanvas(640,360);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(width/4,height-5,width/2-50,10));
  boundaries.push(new Boundary(3*width/4,height-50,width/2-50,10));

  var b = new Box(width/2,30);
  boxes.push(b);
}

function draw() {
  background(51);

  // We must always step through time!
  var timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);

  // Boxes fall from the top every so often
  if (random(1) < 0.2) {
    var b = new Box(width/2,30);
    boxes.push(b);
  }

  // Display all the boundaries
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the boxes
  for (var i = boxes.length-1; i >= 0; i--) {
    boxes[i].display();
    if (boxes[i].done()) {
      boxes.splice(i,1);
    }
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
class Box {
  constructor(x, y) {
    this.w = random(4, 16);
    this.h = random(4, 16);

    // Define a body
    this.bd = new box2d.b2BodyDef();
    this.bd.type = box2d.b2BodyType.b2_dynamicBody;
    this.bd.position = scaleToWorld(x,y);

    // Define a fixture
    this.fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    this.fd.shape = new box2d.b2PolygonShape();
    this.fd.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));

    // Some physics
    this.fd.density = 1.0;
    this.fd.friction = 0.5;
    this.fd.restitution = 0.2;

    // Create the body
    this.body = world.CreateBody(this.bd);
    // Attach the fixture
    this.body.CreateFixture(this.fd);

    // Some additional stuff
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
      this.body.SetAngularVelocity(random(-5,5));
  }

  // This function removes the particle from the box2d world
  killBody() {
    world.DestroyBody(this.body);
  }

  // Is the particle ready for deletion?
  done() {
    // Let's find the screen position of the particle
    this.pos = scaleToPixels(this.body.GetPosition());
    // Is it off the bottom of the screen?
    if (this.pos.y > height+this.w*this.h) {
      this.killBody();
      return true;
    }
    return false;
  }

  // Drawing the box
  display() {
    // Get the body's position
    this.pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    this.a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A fixed boundary class

  // A boundary is a simple rectangle with x,y,width,and height
class Boundary {
  // But we also have to make a body for box2d to know about it
  // Body b;
  constructor(x_,y_, w_, h_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;

    this.fd = new box2d.b2FixtureDef();
    this.fd.density = 1.0;
    this.fd.friction = 0.5;
    this.fd.restitution = 0.2;

    this.bd = new box2d.b2BodyDef();

    this.bd.type = box2d.b2BodyType.b2_staticBody;
    this.bd.position.x = scaleToWorld(this.x);
    this.bd.position.y = scaleToWorld(this.y);
    this.fd.shape = new box2d.b2PolygonShape();
    this.fd.shape.SetAsBox(this.w/(scaleFactor*2), this.h/(scaleFactor*2));
    this.body = world.CreateBody(this.bd).CreateFixture(this.fd);
  }
  // Draw the boundary, if it were at an angle we'd have to do something fancier
  display() {
    fill(127);
    stroke(0);
    rectMode(CENTER);
    rect(this.x,this.y,this.w,this.h);
  };
}
