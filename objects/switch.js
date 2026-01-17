export default class Switch {
  constructor(h, w, x, y) {
    this.h = h;
    this.w = w;
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.fillStyle = "brown";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
