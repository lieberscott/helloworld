// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// random interconnection of springs and particles

// Reference to physics world
var physics;

// A list of cluster objects
var cluster;

// Boolean that indicates whether we draw connections or not
var showPhysics = true;
var showParticles = true;

function setup() {

  text = createP("'p' to display or hide particles<br>'c' to display or hide connections<br>'n' for new graph");
  text.position(10,365);

  createCanvas(640,360);

  // Initialize the physics
  physics=new VerletPhysics2D();

  // Set the world's bounding box
  physics.setWorldBounds(new Rect(0,0,width,height));

  // Spawn a new random graph
  cluster = new Cluster(8, 100, new Vec2D(width/2, height/2));

}

function draw() {

  // Update the physics world
  physics.update();

  background(51);

  // Update physics
  physics.update();
  // Display all points
  if (showParticles) {
    cluster.display();
  }

  // If we want to see the physics
  if (showPhysics) {
    cluster.showConnections();
  }

}

// Key press commands
function keyPressed() {
  if (key == 'c' || key == 'C') {
    showPhysics = !showPhysics;
    if (!showPhysics) showParticles = true;
  }
  else if (key == 'p' || key == 'P') {
    showParticles = !showParticles;
    if (!showParticles) showPhysics = true;
  }
  else if (key == 'n' || key == 'N') {
    physics.clear();
    cluster = new Cluster(Math.floor(random(2, 20)), random(10, height-100), new Vec2D(width/2, height/2));
  }
}


// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Force directed graph
// Heavily based on: http://code.google.com/p/fidgen/

// Notice how we are using inheritance here!
// We could have just stored a reference to a VerletParticle object
// inside the Node object, but inheritance is a nice alternative

function Node(pos) {
  VerletParticle2D.call(this,pos);

  // Override the display method
  this.display = function(){
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(this.x,this.y,16,16);
  }
}

// Inherit from the parent class
Node.prototype = Object.create(VerletParticle2D.prototype);
Node.prototype.constructor = Node;


// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Force directed graph
// Heavily based on: http://code.google.com/p/fidgen/

function Cluster(n,d,center) {

  // A cluster is a grouping of nodes
  this.nodes = [];
  // Set the diameter
  this.diameter = d;

  // Create the nodes
  for (var i = 0; i < n; i++) {
    // We can't put them right on top of each other
    this.nodes.push(new Node(center.add(Vec2D.randomVector())));
  }

  // Connect all the nodes with a Spring
  for (var i = 0; i < this.nodes.length-1; i++) {
    for (var j = i+1; j < this.nodes.length; j++) {
      // A Spring needs two particles, a resting length, and a strength
      physics.addSpring(new VerletSpring2D(this.nodes[i], this.nodes[j], this.diameter, 0.01));
    }
    }

  this.display = function() {
    // Show all the nodes
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].display();
    }
  }


  // Draw all the internal connections
  this.showConnections = function() {
    stroke(255, 150);
    strokeWeight(2);
    for (var i = 0; i < this.nodes.length-1; i++) {
      for (var j = i+1; j < this.nodes.length; j++) {
        line(this.nodes[i].x, this.nodes[i].y, this.nodes[j].x, this.nodes[j].y);
      }
    }
  }
}
