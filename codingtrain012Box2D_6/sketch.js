// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Lollipop shapes (combining shapes)


// A reference to our box2d world
var world;

// A list we'll use to track fixed objects
var boundaries = [];
// A list for all of our rectangles
var pops = [];

function setup() {
  createCanvas(640,360);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(width/4,height-5,width/2-50,10,0));
  boundaries.push(new Boundary(3*width/4,height-50,width/2-50,10,0));
  boundaries.push(new Boundary(width-5,height/2,10,height,0));
  boundaries.push(new Boundary(5,height/2,10,height,0));
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

  // Display all the boxes
  for (var i = pops.length-1; i >= 0; i--) {
    pops[i].display();
    if (pops[i].done()) {
      pops.splice(i,1);
    }
  }
}

function mousePressed() {
  var p = new Lollipop(mouseX,mouseY);
  pops.push(p);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
function Lollipop(x, y) {
  this.w = 8;
  this.h = 24;
  this.r = 8;

  // Define a body
  var bd = new box2d.b2BodyDef();
  bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y);

  // Define fixture #1
  var fd1 = new box2d.b2FixtureDef();
  // Fixture holds shape
  fd1.shape = new box2d.b2PolygonShape();
  fd1.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));
  fd1.density = 1.0;
  fd1.friction = 0.5;
  fd1.restitution = 0.2;

  // Define fixture #2
  var fd2 = new box2d.b2FixtureDef();
  fd2.shape = new box2d.b2CircleShape();
  fd2.shape.m_radius = scaleToWorld(this.r);
  var offset = scaleToWorld(new box2d.b2Vec2(0,-this.h/2)); // offset circle to create lollipop shape
  fd2.shape.m_p = new box2d.b2Vec2(offset.x,offset.y);
  fd2.density = 1.0;
  fd2.friction = 0.5;
  fd2.restitution = 0.2;

  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
  this.body.CreateFixture(fd1);
  this.body.CreateFixture(fd2);

  // Some additional stuff
  this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
  this.body.SetAngularVelocity(random(-5,5)); // optionally set initial angular and linear velocities

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
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);

    rect(0,0,this.w,this.h);
    ellipse(0, -this.h/2, this.r*2, this.r*2);
    pop();
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
