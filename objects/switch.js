export default class Switch {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isOn = false;
    this.isVisible = false;
  }

  toggle() {
    this.isOn = !this.isOn;
  }

  draw(ctx) {
    ctx.save();

    // Curently the switch is invisible
    if (!this.isVisible) {
      return;
    }

    // Switch background
    ctx.fillStyle = this.isOn ? "#4caf50" : "#aaa";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Knob
    const knobSize = this.height - 6;
    const knobX = this.isOn ? this.x + this.width - knobSize - 3 : this.x + 3;

    ctx.fillStyle = "#fff";
    ctx.fillRect(knobX, this.y + 3, knobSize, knobSize);

    ctx.restore();
  }

  isClicked(mx, my) {
    return (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    );
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.isVisible = false;
  }
}
