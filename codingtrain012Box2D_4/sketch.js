// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Simple Chainshape


// A reference to our box2d world
var world;

// A list for all of our particles
var particles = [];

// An object to store information about the uneven surface
var surface;

function setup() {
  createCanvas(640,360);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Create the surface
  surface = new Surface();
}

function draw() {
  background(51);

  // We must always step through time!
  var timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);

  // particles fall from the top every so often
  if (random(1) < 0.5) {
    var sz = random(4,8);
    particles.push(new Particle(width/2,10,sz));
  }

  // Draw the surface
  surface.display();

  // Display all the particles
  for (let i = particles.length-1; i >= 0; i--) {
    particles[i].display();
    if (particles[i].done()) {
      particles.splice(i,1);
    }
  }
}


// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
class Particle {
  constructor(x,y,r) {
    this.r = r;

    // Define a body
    this.bd = new box2d.b2BodyDef();
    this.bd.type = box2d.b2BodyType.b2_dynamicBody;
    this.bd.position = scaleToWorld(x,y);

    // Define a fixture
    this.fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    this.fd.shape = new box2d.b2CircleShape();
    this.fd.shape.m_radius = scaleToWorld(this.r);

    // Some physics
    this.fd.density = 1.0;
    this.fd.friction = 0.1;
    this.fd.restitution = 0.3;

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
  };

  // Is the particle ready for deletion?
  done() {
    // Let's find the screen position of the particle
    this.transform = this.body.GetTransform();
    this.pos = scaleToPixels(this.transform.position);
    // Is it off the bottom of the screen?
    if (this.pos.y > height+this.r*2) {
      this.killBody();
      return true;
    }
    return false;
  };

  // Drawing the Particle
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
    ellipse(0,0,this.r*2,this.r*2);
    // Let's add a line so we can see the rotation
    line(0,0,this.r,0);
    pop();
  };
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A fixed boundary class

// An uneven surface boundary

class Surface {
  constructor() {
    this.surface = [];
    // Here we keep track of the screen coordinates of the chain
    this.surface.push(new box2d.b2Vec2(0, height/2));
    this.surface.push(new box2d.b2Vec2(width/2, height/2+50));
    this.surface.push(new box2d.b2Vec2(width, height/2));

    for (let i = 0; i < this.surface.length; i++) {
      this.surface[i] = scaleToWorld(this.surface[i]);
    }

    // This is what box2d uses to put the surface in its world
    this.chain = new box2d.b2ChainShape();
    this.chain.CreateChain(this.surface, this.surface.length);

    // Need a body to attach shape!
    this.bd = new box2d.b2BodyDef();
    this.body = world.CreateBody(this.bd);

    // Define a fixture
    this.fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    this.fd.shape = this.chain;

    // Some physics
    this.fd.density = 1.0;
    this.fd.friction = 0.1;
    this.fd.restitution = 0.3;

    // Attach the fixture
      this.body.CreateFixture(this.fd);
    }

  // A simple function to just draw the edge chain as a series of vertex points
  display() {
    strokeWeight(1);
    stroke(200);
    fill(200);
    beginShape();
    for (let i = 0; i < this.surface.length; i++) {
      this.v = scaleToPixels(this.surface[i]);
      vertex(this.v.x, this.v.y);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  };
}
