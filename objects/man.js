const playerImg = new Image();
playerImg.src =
  "../assests/png-transparent-cartoon-character-animation-game-cartoon-characters-video-game-boy-cartoon.png";

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

  moveLeft() {
    this.x = this.x - 1;
  }

  moveRight() {
    this.x = this.x + 1;
  }

  update() {
    this.vy = this.vy + GRAVITY;
    this.y = this.y + this.vy;
    if (this.y >= 450) {
      this.y = 450;
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
    // ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  }
}
