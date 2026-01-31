export default class Renderer {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGame({ door, obstacle, switchs, character, levelManager }) {
    door.draw(this.ctx);
    obstacle.draw(this.ctx);
    switchs.draw(this.ctx);
    character.draw(this.ctx);
    if (levelManager && levelManager.floors) {
      levelManager.floors.forEach((f) => f.draw(this.ctx));
    }
  }

  drawLevelText(level) {
    this.ctx.fillStyle = "black";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Level: ${level}`, 20, 30);
  }
}
