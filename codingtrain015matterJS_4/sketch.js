// matter.js with circles, boundaries, and constraints

// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Constraint = Matter.Constraint;

let engine;
let world;
let particles = [];
let boundaries = [];

function setup() {
	createCanvas(600, 600);
	// create an engine
  engine = Engine.create();
	world = engine.world;
	// Engine.run(engine); // in place of physics.update();
  boundaries.push(new Boundary(width / 2, height, width, 90, 0));

  let prev = null;
  for (let x = 100; x < 200; x += 20) {
    let p = new Particle(x, 100, 10);
    particles.push(p);
    if (prev) {
      let options = {
        bodyA: p.body,
        bodyB: prev.body,
        pointA: { // offset from center
          x: 0,
          y: 0
        },
        pointB: {
          x: 2,
          y: 2
        },
        length: 50,
        stiffness: 0.2
      }

      let constraint = Constraint.create(options);
      World.add(world, constraint); // tell physics engine to put the constraint in the world
    }
    prev = p;
  }
}

function draw() {
  background(51);
  Engine.update(engine); // to match frame rate for engine (60 fps, if in  setup) to draw() loop (30 fps)
	for (let i = 0; i < particles.length; i++) {
		particles[i].show();
    if (particles[i].isGone()) {
      // particles[i].deleteFromWorld();
      // particles.splice(i, 1);
      // i--;
    }
	}
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}

class Particle { // matter.js has its own boxes, but we are using our own class for greater control
  constructor(x, y, r) {
		this.options = { // options for matter.js objects
			friction: 0, // // for more options look here under properties: http://brm.io/matter-js/docs/classes/Body.html
			restitution: 0.6 // "bounciness" upon landing against another object
		};
    this.r = r;
    this.body = Bodies.circle(x, y, this.r, this.options); // using the matter.js object
    World.add(world, this.body); // add this particle to the matter.js physics world
  }

  show() {
    this.pos = this.body.position;
    this.ang = this.body.angle;
    push();
    translate(this.pos.x, this.pos.y); // translating relative to top left corner (I think)
		rotate(this.ang); // rotating relative to top left corner (I think)
		// rectMode(CENTER);
		strokeWeight(1);
		stroke(255);
		fill(127);
    ellipse(0, 0, this.r*2); // drawing relative to center, *2 because it's a reference to radius (otherwise they'd be above the boundaries)
		pop();
  }

  isGone() {
    return (this.body.position.x > width || this.body.position.x < 0);
  }

  deleteFromWorld() {
    World.remove(world, this.body); // how to remove an object from the matter.js physics engine world (so it isn't calculating deleted circles)
  }
}


class Boundary { // copied box object, added isStatic option and changed color
  constructor(x, y, w, h, a) {
		this.options = { // options for matter.js objects
			friction: 0, // // for more options look here under properties: http://brm.io/matter-js/docs/classes/Body.html
			restitution: 0.6, // "bounciness" upon landing against another object
      isStatic: true,
      angle: a
		};
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, this.w, this.h, this.options); // using the matter.js object
    console.log(this.body);
    World.add(world, this.body); // add this box to the matter.js world
  }

  show() {
    this.pos = this.body.position;
    this.ang = this.body.angle;
    push();
    translate(this.pos.x, this.pos.y); // translating relative to top left corner (I think)
		rotate(this.ang); // rotating relative to top left corner (I think)
		rectMode(CENTER);
    noStroke();
		fill(20, 155, 109);
    rect(0, 0, this.w, this.h); // drawing relative to center
		pop();
  }
}
