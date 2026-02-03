export class Floor {
  constructor(x, y, width, height, speed = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = 1;
  }

  update(dt, canvasWidth) {
    if (this.speed === 0) return;

    this.x += this.speed * this.direction * dt;

    if (this.x <= 0) {
      this.x = 0;
      this.direction = 1;
    } else if (this.x + this.width >= canvasWidth) {
      this.x = canvasWidth - this.width;
      this.direction = -1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.speed > 0 ? "#5dade2" : "#566573";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
