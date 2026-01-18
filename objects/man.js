const playerImg = new Image();
playerImg.src = "../assests/rendering-cartoon-fantasy-scene-illustration.jpg";
const scale = 1.5;

const GRAVITY = 0.8;
const JUMP_FORCE = 15;

export default class Man {
  constructor(height, width, x, y, vy) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.isOnGround = true;
  }

  moveLeft(speed) {
    this.x = this.x - speed;
  }

  moveRight(speed) {
    this.x = this.x + speed;
  }

  update() {
    this.vy = this.vy + GRAVITY;
    this.y = this.y + this.vy;
    if (this.y >= 900) {
      this.y = 900;
      this.vy = 0;
      this.isOnGround = true;
    }
  }

  jump() {
    if (this.isOnGround) {
      this.vy = this.vy - JUMP_FORCE;
      this.isOnGround = false;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      playerImg,
      this.x,
      this.y,
      this.width * scale,
      this.height * scale
    );
  }
}
