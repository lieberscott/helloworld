// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let world;
let boxes = [];
let ground;

function setup() {
	createCanvas(600, 600);
	// create an engine
  engine = Engine.create();
	world = engine.world;
	// box1 = new Box(200, 100, 80, 80);
	Engine.run(engine); // in place of physics.update();
	let options = { // options for objects in matter.js
		isStatic: true // for more options (Friction, restitution, etc.) look here under properties: http://brm.io/matter-js/docs/classes/Body.html
	}
	ground = Bodies.rectangle(width/2, height, width, 90, options);
	World.add(world, ground); // add ground to the world (for boxes, we do this in the class)
	// add all of the bodies to the world
  // World.add(world, box1);
	// console.log(box1); // check everything that comes in the box

}

function mouseDragged() {
	boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
}

function draw() {
  background(51);
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].show();
	}
	strokeWeight(90);
	stroke(29, 155, 109);
	line(0, height, width, height); // draw the ground


	// box1.show();

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
