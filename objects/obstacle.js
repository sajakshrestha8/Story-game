export default class Obstacle {
  constructor(height, width, x, y, enabled) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.enabled = enabled;
  }

  createObstacle(enabled) {
    this.enabled = enabled;
    if (this.enabled) {
      this.x = this.x - 10;
    } else {
      this.x;
    }
  }

  moveObstacle() {
    this.x = this.x - 1;
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.height / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  }
}
