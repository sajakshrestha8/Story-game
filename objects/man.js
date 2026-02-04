export default class Man {
  constructor(x, y, width, height, imageSrc, frameWidth, frameHeight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.vy = 0;
    this.isOnGround = false;
    this.gravity = 1800;
    this.jumpVelocity = -800;

    this.image = new Image();
    this.image.src = imageSrc;

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrames = 4;
    this.frameSpeed = 10;
    this.frameTimer = 0;

    this.loaded = false;
    this.image.onload = () => (this.loaded = true);
  }

  moveLeft(speed, deltaTime) {
    this.x -= speed * deltaTime;
    this.isMoving = true;
  }

  moveRight(speed, deltaTime) {
    this.x += speed * deltaTime;
    this.isMoving = true;
  }

  update(groundY, dt) {
    this.vy += this.gravity * dt;
    this.y += this.vy * dt;

    if (this.y + this.height >= groundY) {
      this.y = groundY - this.height;
      this.vy = 0;
      this.isOnGround = true;
    }

    if (!this.isOnGround) {
      this.frameY = 2;
      this.maxFrames = 2;
    } else if (this.isMoving) {
      this.frameY = 0;
      this.frameX = 7;
      this.maxFrames = 4;
    } else {
      this.frameY = 0;
      this.maxFrames = 4;
    }

    this.frameTimer += dt;
    if (this.frameTimer >= 1 / this.frameSpeed) {
      this.frameX = (this.frameX + 1) % this.maxFrames;
      this.frameTimer = 0;
    }
  }

  jump() {
    if (this.isOnGround) {
      this.vy = this.jumpVelocity;
      this.isOnGround = false;
    }
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    if (!this.loaded) return;

    ctx.drawImage(
      this.image,

      this.frameX * this.frameWidth,
      this.frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,

      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
