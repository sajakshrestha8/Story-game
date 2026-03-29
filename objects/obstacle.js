export default class Obstacle {
  constructor(x, y, radius, startAngle, endAngle, enabled) {
    this.x = x;
    this.y = y;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.radius = radius;
    this.direction = "left";
    this.enabled = enabled;
  }

  createObstacle(enabled) {
    this.enabled = enabled;
    console.log("enabled");
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
    const r = this.radius;
    const cx = Math.round(this.x);
    const cy = Math.round(this.y);

    ctx.save();
    ctx.imageSmoothingEnabled = false;

    ctx.beginPath();
    ctx.arc(cx, cy, r, this.startAngle, this.endAngle);
    ctx.fillStyle = "#b91c1c";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(Math.round(cx - r * 0.35), Math.round(cy - r * 0.35), r * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = "#fca5a5";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, r, this.startAngle, this.endAngle);
    ctx.strokeStyle = "#450a0a";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}
