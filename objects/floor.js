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
    const moving = this.speed > 0;
    const x = Math.floor(this.x);
    const y = Math.floor(this.y);
    const w = Math.ceil(this.width);
    const h = Math.ceil(this.height);

    ctx.save();
    ctx.imageSmoothingEnabled = false;

    const top = moving ? "#4a9fd4" : "#6b9e6b";
    const mid = moving ? "#2d7fb8" : "#4a7c4e";
    const deep = moving ? "#1a5a82" : "#2d3d28";
    const soil = moving ? "#0f3d5c" : "#1e2618";

    ctx.fillStyle = top;
    ctx.fillRect(x, y, w, 5);
    ctx.fillStyle = mid;
    ctx.fillRect(x, y + 5, w, Math.max(0, h - 14));
    ctx.fillStyle = deep;
    ctx.fillRect(x, y + h - 9, w, 5);
    ctx.fillStyle = soil;
    ctx.fillRect(x, y + h - 4, w, 4);

    for (let i = 0; i < w; i += 4) {
      if ((i >> 2) % 2 === 0) {
        ctx.fillStyle = moving ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.1)";
        ctx.fillRect(x + i, y + 1, 2, 3);
      }
    }

    ctx.strokeStyle = moving ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

    ctx.restore();
  }
}
