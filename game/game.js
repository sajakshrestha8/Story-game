import GameState from "./gameState.js";
import Input from "./inputs.js";
import Renderer from "./renderer.js";
import Man from "../objects/man.js";
import Door from "../objects/door.js";
import Switch from "../objects/switch.js";
import Obstacle from "../objects/obstacle.js";
import LevelManager from "./levelManager.js";
import { getFloorBeneath, hitCanvasX } from "./Physics.js";
import { Floor } from "../objects/floor.js";

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
    this.obstacle = new Obstacle(0, 0, 20);

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
    hitCanvasX(this.character, this.canvas);

    if (!this.state.showPopup) {
      if (this.input.keys.left) this.character.moveLeft(240, dt);
      if (this.input.keys.right) this.character.moveRight(240, dt);
      if (this.input.keys.up) this.character.jump();
    }

    const floor = getFloorBeneath(this.character, this.levelManager.floors);
    if (!floor && this.character.y > this.canvas.height - 50) {
      this.state.gameOver();
    }

    this.character.update(floor?.y ?? this.canvas.height, dt);
  }

  render() {
    this.renderer.clear();
    this.renderer.drawGame(this);
    this.renderer.drawLevelText(this.levelManager.index + 1);

    if (this.state.showPopup) {
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
