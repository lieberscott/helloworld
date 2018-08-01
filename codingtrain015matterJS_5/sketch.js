// matter.js with circles, boundaries, and mouse constraints

// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

let engine;
let world;
let particles = [];
let boundaries = [];

let mConstraint;

function setup() {
	let canvas = createCanvas(600, 600); // p5's createCanvas() returns an object, with property "elt", which is the HTML element of the p5 canvas
	// create an engine
  engine = Engine.create();
	world = engine.world;
	Engine.run(engine); // in place of physics.update(); required to be put in show for mConstraint to to work (rather than in draw, don't know why)
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

  // allow Matter.js to recognize mouse; Mouse.create requires HTML element on which to recognize mouse (via Matter.js docs)
  let canvasmouse = Mouse.create(canvas.elt); // elt is property of createCanvas(), which we stored above in let canvas
  canvasmouse.pixelRatio = pixelDensity();
  let opts = {
    mouse: canvasmouse
  };
  mConstraint = MouseConstraint.create(engine, opts); // so we can manipulate objects with mouse
  World.add(world, mConstraint);
}

function draw() {
  background(51);
  // Engine.update(engine); // to match frame rate for engine (60 fps, if in  setup) to draw() loop (30 fps)
	for (let i = 0; i < particles.length; i++) {
		particles[i].show();
	}
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }

  if (mConstraint.body) { // if mConstraint has a body, it has clicked on an object; otherwise it will be null
    let pos = mConstraint.body.position;
    let m = mConstraint.mouse.position; // this is mouseX and mouseY (using the constraint info just for demostration purposes)
    let offset = mConstraint.constraint.pointB;
    fill(0, 255, 0);
    ellipse(pos.x, pos.y, 10, 10);
    stroke(255, 0, 0);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y); // connects line to exact point on circle where constraint is attached (rather than center of circle)
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
    line(0, 0, this.r, 0); // draw line from center to edge to see angular rotation

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
