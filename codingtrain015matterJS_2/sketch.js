// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let world;
let boxes = [];
let boundaries = [];

function setup() {
	createCanvas(600, 600);
	// create an engine
  engine = Engine.create();
	world = engine.world;
	// Engine.run(engine); // in place of physics.update();
  boundaries.push(new Boundary(width * 0.6, height, width, 30, -0.3));
  boundaries.push(new Boundary(width * 0.2, 100, width, 30, 0.3));
	// World.add(world, ground); // add ground to the world (we now do this in the class)
	// add all of the bodies to the world
  // World.add(world, box1);
	// console.log(box1); // check everything that comes in the box

}

function mouseDragged() {
	boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
}

function draw() {
  background(51);
  Engine.update(engine); // to match frame rate for engine (60 fps, if in  setup) to draw() loop (30 fps)
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].show();
	}
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}

class Box { // matter.js has its own boxes, but we are using our own class for greater control
  constructor(x, y, w, h) {
		this.options = { // options for matter.js objects
			friction: 0.5, // // for more options look here under properties: http://brm.io/matter-js/docs/classes/Body.html
			restitution: 0.6 // "bounciness" upon landing against another object
		};
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, this.w, this.h, this.options); // using the matter.js object
    World.add(world, this.body); // add this box to the matter.js world
  }

  show() {
    this.pos = this.body.position;
    this.ang = this.body.angle;
    push();
    translate(this.pos.x, this.pos.y); // translating relative to top left corner (I think)
		rotate(this.ang); // rotating relative to top left corner (I think)
		rectMode(CENTER);
		strokeWeight(1);
		stroke(255);
		fill(127);
    rect(0, 0, this.w, this.h); // drawing relative to center
		pop();
  }
}


class Boundary { // copied box object, added isStatic option and changed color
  constructor(x, y, w, h, a) {
		this.options = { // options for matter.js objects
			friction: 0.5, // // for more options look here under properties: http://brm.io/matter-js/docs/classes/Body.html
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
