export class Door {
  constructor(x, y, height, width) {
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

  update() {
    if (this.state === "opening") {
      this.currentHeight = this.currentHeight - 1;
      if (this.currentHeight <= 0) {
        this.currentHeight = 0;
        this.state = "opened";
      }
    }
  }

  draw(ctx) {
    if (this.currentHeight <= 0) return;

    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.currentHeight);
  }
}
