export default class Input {
  constructor() {
    this.keys = { left: false, right: false, up: false };

    window.addEventListener("keydown", (e) => this.onKeyDown(e));
    window.addEventListener("keyup", (e) => this.onKeyUp(e));
  }

  onKeyDown(e) {
    if (["ArrowLeft", "a"].includes(e.key)) this.keys.left = true;
    if (["ArrowRight", "d"].includes(e.key)) this.keys.right = true;
    if (["ArrowUp", "w", " "].includes(e.key)) this.keys.up = true;
  }

  onKeyUp(e) {
    if (["ArrowLeft", "a"].includes(e.key)) this.keys.left = false;
    if (["ArrowRight", "d"].includes(e.key)) this.keys.right = false;
    if (["ArrowUp", "w", " "].includes(e.key)) this.keys.up = false;
  }
}
