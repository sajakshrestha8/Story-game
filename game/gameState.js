export default class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.switchTriggered = false;
    this.doorOpen = false;
    this.showPopup = false;
    this.levelCompleted = false;
  }

  triggerSwitch() {
    this.switchTriggered = true;
    this.doorOpen = true;
  }

  gameOver() {
    this.showPopup = true;
    this.levelCompleted = false;
  }

  completeLevel() {
    this.showPopup = true;
    this.levelCompleted = true;
  }
}
