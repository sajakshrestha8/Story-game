export default class Obstacle {
  constructor(x, y, radius, startAngle, endAngle, enabled) {
    this.x = x;
    this.y = y;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.radius = radius;
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

  moveObstacle(deltaTime, direction, speed) {
    if (direction === "left") {
      this.x = this.x - speed * deltaTime;
    } else {
      this.x = this.x + speed * deltaTime;
    }
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    ctx.fillStyle = "red";
    ctx.fill();
  }
}
