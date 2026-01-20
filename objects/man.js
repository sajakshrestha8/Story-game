export default class Man {
  constructor(x, y, height, width) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.isOnGround = false;
    this.gravity = 1800;
    this.jumpVelocity = -720;
  }

  moveLeft(speed, deltaTime) {
    this.x -= speed * deltaTime;
  }

  moveRight(speed, deltaTime) {
    this.x += speed * deltaTime;
  }

  update(groundY, deltaTime) {
    this.vy += this.gravity * deltaTime;
    this.y += this.vy * deltaTime;

    if (this.y + this.height >= groundY) {
      this.y = groundY - this.height;
      this.vy = 0;
      this.isOnGround = true;
    }
  }

  jump() {
    if (this.isOnGround) {
      this.vy = this.jumpVelocity;
      this.isOnGround = false;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
