// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A reference to our box2d world
let world;

// A list for all of our boxes
let boxes = [];

function setup() {
  createCanvas(640,360);

  // Initialize box2d physics and create the world
  world = createWorld(new box2d.b2Vec2(0,0));

}

function draw() {
  background(51);

  // We must always step through time!
  let timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);

  // Boxes fall from the top every so often
  if (isMousePressed) {
    let b = new Box(mouseX, mouseY);
    boxes.push(b);
  }
  // Display all the boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box

class Box {
	constructor(x, y) {
	  this.w = 16;
	  this.h = 16;

	   // Step 1: Define a body
	  this.bd = new box2d.b2BodyDef();
	  this.bd.type = box2d.b2BodyType.b2_dynamicBody; // options: dynamic (responds to physics), static (fixed), kinematic (user controlled)
	  this.bd.position = scaleToWorld(x,y);

	  // Step 2: Define a fixture
	  this.fd = new box2d.b2FixtureDef();
	  // Step 3: Give fixture a shape
	  this.fd.shape = new box2d.b2PolygonShape(); // Polygon Shape, Circle Shape, Chain Shape
	  this.fd.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));

	  // Some physics
	  this.fd.density = 1.0; // shouldn't be 0
	  this.fd.friction = 0.5; // 0-1
	  this.fd.restitution = 0.2; // 0-1

	  // Step 4: Create the body
	  this.body = world.CreateBody(this.bd);
	  // Step 5: Attach the fixture
	  this.body.CreateFixture(this.fd);
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
    translate(this.pos.x,this.pos.y);
    rotate(this.a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  };
}
