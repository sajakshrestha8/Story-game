export default class Man {
  constructor(x, y, height, width) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.isOnGround = false;
  }

  moveLeft(speed) {
    this.x -= speed;
  }

  moveRight(speed) {
    this.x += speed;
  }

  update(groundY) {
    this.vy += 0.5;
    this.y += this.vy;

    if (this.y + this.height >= groundY) {
      this.y = groundY - this.height;
      this.vy = 0;
      this.isOnGround = true;
    }
  }

  jump() {
    if (this.isOnGround) {
      this.vy = -12;
      this.isOnGround = false;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.height, this.width);
  }
}
