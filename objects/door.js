export class Door {
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
      const openSpeed = 60; // pixels per second
      this.currentHeight = this.currentHeight - openSpeed * deltaTime;
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
