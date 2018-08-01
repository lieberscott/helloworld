// UNUSED

class Box {
  constructor(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h);
    this.w = w;
    this.h = h;
    World.add(world, box1);
  }

  show() {
    this.pos = this.body.position;
    this.angle = this.body.angle;
    push();
    translate(this.pos.x, this.pos.y);
    rect(0, 0, this.w, this.h);
  }

  push();


}
