// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Revolute Joints

// A reference to our box2d world
var world;


// A list for all of our particles
var particles = [];

// An object to describe a Windmill (two bodies and one joint)
var windmill;


var text;

function setup() {
  text = createP("Click mouse to toggle motor.\nMotor: OFF");
  text.position(10,365);

  createCanvas(640,360);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Make the windmill at an x,y position
  windmill = new Windmill(width/2,175);
}

function draw() {
  background(51);

  // We must always step through time!
  var timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);

  if (random(1) < 0.1) {
    var sz = random(4,8);
    particles.push(new Particle(random(width/2-100,width/2+100),-20,sz));
  }


  // Display all the pairs
  for (var i = particles.length-1; i >= 0; i--) {
    particles[i].display();
    if (particles[i].done()) {
      particles.splice(i,1);
    }
  }

  // Draw the windmill
  windmill.display();

  var status = "OFF";
  if (windmill.motorOn()) status = "ON";

}

function mousePressed() {
  windmill.toggleMotor();

  var status = "OFF";
  if (windmill.motorOn()) status = "ON";
  text.html("Click mouse to toggle motor.\nMotor: " + status);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A circular particle

// Constructor
function Particle(x, y) {
  this.r = 8;

  // Define a body
  var bd = new box2d.b2BodyDef();
  bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y);

  // Define a fixture
  var fd = new box2d.b2FixtureDef();
  // Fixture holds shape
  fd.shape = new box2d.b2CircleShape();
  fd.shape.m_radius = scaleToWorld(this.r);

  // Some physics
  fd.density = 1.0;
  fd.friction = 0.1;
  fd.restitution = 0.3;

  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
  this.body.CreateFixture(fd);

  // Some additional stuff
  this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5,5));

  // This function removes the particle from the box2d world
  this.killBody = function() {
    world.DestroyBody(this.body);
  };

  // Is the particle ready for deletion?
  this.done = function() {
    // Let's find the screen position of the particle
    var pos = scaleToPixels(this.body.GetPosition());
    // Is it off the bottom of the screen?
    if (pos.y > height+this.r*2) {
      this.killBody();
      return true;
    }
    return false;
  };

  // Drawing the box
  this.display = function() {
    // Get the body's position
    var pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x,pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(0,0,this.r*2,this.r*2);
    // Let's add a line so we can see the rotation
    line(0,0,this.r,0);
    pop();
  };
}
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
function Box(x, y, w, h, lock) {
  this.w = w;
  this.h = h;

  // Define a body
  var bd = new box2d.b2BodyDef();
  if (lock) bd.type = box2d.b2BodyType.b2_staticBody;
  else bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y);

  // Define a fixture
  var fd = new box2d.b2FixtureDef();
  // Fixture holds shape
  fd.shape = new box2d.b2PolygonShape();
  fd.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));

  // Some physics
  fd.density = 1.0;
  fd.friction = 0.5;
  fd.restitution = 0.2;

  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
  this.body.CreateFixture(fd);

  // Some additional stuff
  this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5,5));

  // This function removes the particle from the box2d world
  this.killBody = function() {
    world.DestroyBody(this.body);
  };

  // Is the particle ready for deletion?
  this.done = function() {
    // Let's find the screen position of the particle
    var pos = scaleToPixels(this.body.GetPosition());
    // Is it off the bottom of the screen?
    if (pos.y > height+this.w*this.h) {
      this.killBody();
      return true;
    }
    return false;
  };

  // Drawing the box
  this.display = function() {
    // Get the body's position
    var pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x,pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  };
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Two particles connected with distance joints

// Constructor
function Windmill(x,y) {
  this.len = 32;

  this.box1 = new Box(x, y-20, 120, 10, false);
  this.box2 = new Box(x, y, 10, 40, true);

  // Define joint as between two bodies
  var rjd = new box2d.b2RevoluteJointDef();

  rjd.Initialize(this.box1.body, this.box2.body, this.box1.body.GetWorldCenter()); // 3rd argument is where they're connected

  // Turning on a motor (optional)
  rjd.motorSpeed = PI*2;       // how fast?
  rjd.maxMotorTorque = 1000.0; // how powerful?
  rjd.enableMotor = false;      // is it on?

  // There are many other properties you can set for a Revolute joint
  // For example, you can limit its angle between a minimum and a maximum
  // See box2d manual for more

  // Create the joint
    joint = world.CreateJoint(rjd);

  this.display = function() {
    this.box2.display();
    this.box1.display();

    // Draw anchor just for debug
    var anchor = scaleToPixels(this.box1.body.GetWorldCenter());
    fill(0);
    noStroke();
    ellipse(anchor.x, anchor.y, 8, 8);
  };

  // Turn the motor on or off
  this.toggleMotor = function() {
    joint.EnableMotor(!joint.IsMotorEnabled());
  };

  this.motorOn = function() {
    return joint.IsMotorEnabled();
  };
}
