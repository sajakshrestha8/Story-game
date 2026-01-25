export class Floor {
  constructor(x, y, width, height, speed = 0) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = 1;
  }

  update(deltaTime) {
    if (this.speed === 0) return;

    this.x += this.speed * this.direction * deltaTime;

    if (this.x < 0 || this.x + this.width > 1000) {
      this.direction *= -1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "brown";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
