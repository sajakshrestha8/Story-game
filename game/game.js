import GameState from "./gameState.js";
import Input from "./inputs.js";
import Renderer from "./renderer.js";
import Man from "../objects/man.js";
import Door from "../objects/door.js";
import Switch from "../objects/switch.js";
import Obstacle from "../objects/obstacle.js";
import LevelManager from "./levelManager.js";
import { getFloorBeneath, hitCanvasX } from "./Physics.js";
import { circleRect, rectRect } from "../utils/collisions.js";
import { drawPopup } from "./popup.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.state = new GameState();
    this.input = new Input();
    this.renderer = new Renderer(this.ctx, this.canvas);

    this.character = new Man(0, 0, 50, 50);
    this.door = new Door(0, 0, 50, 80);
    this.switchs = new Switch(0, 0, 50, 20);
    this.obstacle = new Obstacle(100, 200, 20, 0, Math.PI * 2, true);

    this.levelManager = new LevelManager({
      door: this.door,
      switchs: this.switchs,
      obstacle: this.obstacle,
      character: this.character,
      canvas: this.canvas,
    });

    this.currentLevel = this.levelManager.load(0);
    this.lastTime = 0;

    this.loadLevel(0);
    this.lastTime = 0;
  }

  update(dt) {
    this.levelManager.floors.forEach((f) => f.update(dt, this.canvas.width));
    hitCanvasX(this.character, this.canvas);

    if (!this.state.showPopup) {
      if (this.input.keys.left) this.character.moveLeft(240, dt);
      if (this.input.keys.right) this.character.moveRight(240, dt);
      if (this.input.keys.up) this.character.jump();
    }

    if (this.state.showPopup && this.input.keys.enter) {
      this.handleEnter();
      this.input.keys.enter = false;
    }

    const floor = getFloorBeneath(this.character, this.levelManager.floors);
    this.door.update(dt);

    if (floor && floor.speed > 0) {
      this.character.x += floor.speed * floor.direction * dt;
    }

    if (
      !floor &&
      this.character.y >= this.canvas.height - this.character.height
    ) {
      this.state.gameOver();
    }

    if (!this.switchs.isOn && rectRect(this.character, this.switchs)) {
      this.switchs.isOn = true;
      this.state.doorOpen = true;
      this.door.openDoor();
    }

    if (this.switchs.isOn && !this.state.showPopup) {
      if (this.obstacle.x - this.obstacle.radius <= 0) {
        this.obstacle.direction = "right";
        this.currentLevel.speed += 50;
      } else if (this.obstacle.x + this.obstacle.radius >= this.canvas.width) {
        this.obstacle.direction = "left";
        this.currentLevel.speed += 50;
      }

      const currentSpeed = this.currentLevel.speed || 150;
      this.obstacle.moveObstacle(dt, this.obstacle.direction, currentSpeed);

      if (
        circleRect(this.obstacle, this.character) &&
        !rectRect(this.character, this.door)
      ) {
        this.state.gameOver();
      }
    }

    if (
      this.switchs.isOn &&
      circleRect(this.obstacle, this.character) &&
      !rectRect(this.character, this.door)
    ) {
      this.state.gameOver();
    }

    if (
      !this.state.showPopup &&
      this.switchs.isOn &&
      this.state.doorOpen &&
      rectRect(this.character, this.door)
    ) {
      this.state.completeLevel();
    }

    this.character.update(floor?.y ?? this.canvas.height, dt);
  }

  handleEnter() {
    const wasLevelCompleted = this.state.levelCompleted;

    if (wasLevelCompleted) {
      const nextIndex = this.levelManager.index + 1;

      if (nextIndex < this.levelManager.totalLevel) {
        this.loadLevel(nextIndex);
        this.state.reset();
        this.switchs.isOn = false;
      } else {
        window.location.reload();
      }
    } else {
      window.location.reload();
    }
  }

  render() {
    this.renderer.clear();
    this.renderer.drawGame(this);
    this.renderer.drawLevelText(this.levelManager.index + 1);
    if (this.state.showPopup) {
      drawPopup(this.ctx, this.canvas, this.state.levelCompleted);
    }
    if (this.switchs.isOn) {
      this.renderer.drawHitbox(this.door);
    }
    if (!this.state.showPopup && this.state.levelCompleted) {
      drawPopup(this.ctx, this.canvas, this.state.levelCompleted);
    }
  }

  loop = (time) => {
    const dt = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;

    this.update(dt);
    this.render();

    requestAnimationFrame(this.loop);
  };

  loadLevel(index) {
    this.currentLevel = this.levelManager.load(index);
  }

  start() {
    requestAnimationFrame(this.loop);
  }
}

const game = new Game();
game.loadLevel(0);
game.start();
