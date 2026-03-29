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

    this.rowIdle = 0;
    this.rowRun = 1;
    this.rowJump = 2;

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrames = 12;
    this.frameSpeed = 10;
    this.frameTimer = 0;

    this.facingRight = true;
    this.isMoving = false;

    /**
     * Empty space below the drawn feet in each 64×64 frame (~20px), scaled to this.height (150).
     * Keeps the painted feet on the floor while the hitbox stays tall enough for the sprite.
     */
    this.feetInset = Math.round((20 * this.height) / 64);

    this.hitInsetX = Math.round((19 * this.height) / 64);
    this.hitWidth = Math.round((22 * this.height) / 64);

    this.loaded = false;
    this.image.onload = () => (this.loaded = true);
  }

  moveLeft(speed, deltaTime) {
    this.x -= speed * deltaTime;
    this.isMoving = true;
    this.facingRight = false;
  }

  moveRight(speed, deltaTime) {
    this.x += speed * deltaTime;
    this.isMoving = true;
    this.facingRight = true;
  }

  update(groundY, dt) {
    this.vy += this.gravity * dt;
    this.y += this.vy * dt;

    const feetY = this.y + this.height - this.feetInset;
    if (feetY >= groundY) {
      this.y = groundY - this.height + this.feetInset;
      this.vy = 0;
      this.isOnGround = true;
    } else {
      this.isOnGround = false;
    }

    if (!this.isOnGround) {
      this.frameY = this.rowJump;
      this.maxFrames = 12;
      this.frameSpeed = 14;
    } else if (this.isMoving) {
      this.frameY = this.rowRun;
      this.maxFrames = 12;
      this.frameSpeed = 14;
    } else {
      this.frameY = this.rowIdle;
      this.maxFrames = 12;
      this.frameSpeed = 8;
    }

    this.frameTimer += dt;
    const step = 1 / this.frameSpeed;
    while (this.frameTimer >= step) {
      this.frameTimer -= step;
      this.frameX = (this.frameX + 1) % this.maxFrames;
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

  /** Axis-aligned body box for collisions (matches painted character, not transparent margins). */
  getCollisionRect() {
    return {
      x: this.x + this.hitInsetX,
      y: this.y + this.feetInset,
      width: this.hitWidth,
      height: this.height - 2 * this.feetInset,
    };
  }

  draw(ctx) {
    if (!this.loaded) return;

    const sx = this.frameX * this.frameWidth;
    const sy = this.frameY * this.frameHeight;

    ctx.save();
    ctx.imageSmoothingEnabled = false;

    if (!this.facingRight) {
      ctx.translate(this.x + this.width, this.y);
      ctx.scale(-1, 1);
      ctx.drawImage(
        this.image,
        sx,
        sy,
        this.frameWidth,
        this.frameHeight,
        0,
        0,
        this.width,
        this.height
      );
    } else {
      ctx.drawImage(
        this.image,
        sx,
        sy,
        this.frameWidth,
        this.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    ctx.restore();
  }
}
