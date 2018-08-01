// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Distance Joints


// A reference to our box2d world
var world;

// A list we'll use to track fixed objects
var boundaries = [];
// A list for all of our rectangles
var pairs = [];

function setup() {
  createCanvas(640,360);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(width/4,height-5,width/2-50,10));
  boundaries.push(new Boundary(3*width/4,height-50,width/2-50,10));

}

function draw() {
  background(51);

  // We must always step through time!
  var timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);

  // Display all the boundaries
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the pairs
  for (var i = pairs.length-1; i >= 0; i--) {
    pairs[i].display();
    if (pairs[i].done()) {
      pairs.splice(i,1);
    }
  }
}

function mousePressed() {
  var p = new Pair(mouseX,mouseY);
  pairs.push(p);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


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

// Two particles connected with distance joints

// Constructor
function Pair(x,y) {
  this.len = 32;

  // Step 1: Have 2 bodies ready to go
  this.p1 = new Particle(x,y);
  this.p2 = new Particle(x+random(-1,1),y+random(-1,1));

  var djd = new box2d.b2DistanceJointDef();
  // Step 2: Define the joint
  // Connection between previous particle and this one
  djd.bodyA = this.p1.body;
  djd.bodyB = this.p2.body;
  // Step 3: Configure parameters
  // Equilibrium length
  djd.length = scaleToWorld(this.len);
  // These properties affect how springy the joint is
  djd.frequencyHz = 3;  // Try a value less than 5 (0 for no elasticity)
  djd.dampingRatio = 0.1; // Ranges between 0 and 1 (1 for no springiness)

  // Make the joint.  Note we aren't storing a reference to the joint ourselves anywhere!
  // We might need to someday, but for now it's ok
  // Step 4: Create the joint
  var dj = world.CreateJoint(djd);

  this.done = function() {
    return this.p1.done() && this.p2.done();
  };

  this.display = function() {
    // Get the body's position
    var pos1 = scaleToPixels(this.p1.body.GetPosition());
    var pos2 = scaleToPixels(this.p2.body.GetPosition());

    stroke(200);
    strokeWeight(2);
    line(pos1.x,pos1.y,pos2.x,pos2.y);

    this.p1.display();
    this.p2.display();
  };
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A fixed boundary class

  // A boundary is a simple rectangle with x,y,width,and height
function Boundary(x_,y_, w_, h_) {
  // But we also have to make a body for box2d to know about it
  // Body b;

  this.x = x_;
  this.y = y_;
  this.w = w_;
  this.h = h_;

  var fd = new box2d.b2FixtureDef();
  fd.density = 1.0;
  fd.friction = 0.5;
  fd.restitution = 0.2;

  var bd = new box2d.b2BodyDef();

  bd.type = box2d.b2BodyType.b2_staticBody;
  bd.position.x = scaleToWorld(this.x);
  bd.position.y = scaleToWorld(this.y);
  fd.shape = new box2d.b2PolygonShape();
  fd.shape.SetAsBox(this.w/(scaleFactor*2), this.h/(scaleFactor*2));
  this.body = world.CreateBody(bd).CreateFixture(fd);

  // Draw the boundary, if it were at an angle we'd have to do something fancier
  this.display = function() {
    fill(127);
    stroke(200);
    rectMode(CENTER);
    rect(this.x,this.y,this.w,this.h);
  };
}
