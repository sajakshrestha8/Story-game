export default class Door {
  constructor(x, y, width, height) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.currentHeight = height;
    this.state = "closed";
  }

  openDoor() {
    if (this.state === "closed") {
      this.state = "opening";
    }
  }

  closeDoor() {
    if (this.state === "opened") {
      this.state = "closed";
    }
  }

  update(deltaTime) {
    if (this.state === "opening") {
      const openSpeed = 60;
      this.currentHeight = this.currentHeight - openSpeed * deltaTime;
      if (this.currentHeight <= 0) {
        this.currentHeight = 0;
        this.state = "opened";
      }
    }
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.state = "closed";
    this.currentHeight = this.height;
  }

  draw(ctx) {
    if (this.currentHeight <= 0) return;

    const x = Math.floor(this.x);
    const y = Math.floor(this.y + (this.height - this.currentHeight));
    const w = Math.ceil(this.width);
    const h = Math.ceil(this.currentHeight);

    ctx.save();
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = "#166534";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#14532d";
    ctx.fillRect(x + 2, y + 4, w - 4, h - 6);
    ctx.fillStyle = "#0f3d24";
    ctx.fillRect(x + 4, y + 8, w - 8, Math.max(0, h - 14));

    ctx.strokeStyle = "#052e16";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

    const kx = x + w - 9;
    const ky = y + Math.floor(h * 0.55);
    ctx.fillStyle = "#d4a017";
    ctx.fillRect(kx, ky, 5, 5);

    ctx.restore();
  }
}
