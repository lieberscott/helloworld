// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// How to make a custom *convex* polygon

// A reference to our box2d world
var world;

// A list we'll use to track fixed objects
var boundaries = [];
// A list for all of our rectangles
var polygons = [];

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
  for (var i = polygons.length-1; i >= 0; i--) {
    polygons[i].display();
    if (polygons[i].done()) {
      polygons.splice(i,1);
    }
  }
}

function mousePressed() {
  var cs = new CustomShape(mouseX,mouseY);
  polygons.push(cs);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
function CustomShape(x, y) {

  // Define a body
  var bd = new box2d.b2BodyDef();
  bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y);

  // Define a fixture
  var fd = new box2d.b2FixtureDef();

  // custom shape!
  var vertices = []; // vectors pointing from center of shape
  vertices[3] = scaleToWorld(-15, 25); // pass them in counterclockwise, after conversion they will be read by box2d as clockwise (as box2d requires)
  vertices[2] = scaleToWorld(15, 0);
  vertices[1] = scaleToWorld(20, -15);
  vertices[0] = scaleToWorld(-10, -10);

  // Fixture holds shape
  fd.shape = new box2d.b2PolygonShape();
  fd.shape.SetAsArray(vertices,vertices.length); // instead of setting with w and h, set shape as an array of vertices
  //println(fd.shape);

  //fd.shape.SetAsBox(scaleToWorld(10),scaleToWorld(10));

  // Some physics
  fd.density = 1.0;
  fd.friction = 0.5;
  fd.restitution = 0.2;

  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
  this.body.CreateFixture(fd);

  // Some additional stuff
  //this.body.SetLinearVelocity(new Vec2(random(-5, 5), random(2, 5)));
    //this.body.SetAngularVelocity(random(-5,5));

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
    var f = this.body.GetFixtureList();
    var ps = f.GetShape();

    rectMode(CENTER);
    push();
    translate(pos.x,pos.y);
    //println(pos.x + " " + pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(0,0,20,20);
    beginShape();
    // For every vertex, convert to pixel vector
    for (var i = 0; i < ps.m_count; i++) {
      var v = scaleToPixels(ps.m_vertices[i]);
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
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
  bd.position = scaleToWorld(this.x, this.y);
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
