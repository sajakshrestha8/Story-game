import { levels } from "../levels.js";
import { Floor } from "../objects/floor.js";

export default class LevelManager {
  constructor({ door, switchs, obstacle, character, canvas, floors }) {
    this.index = 0;
    this.canvas = canvas;
    this.door = door;
    this.switchs = switchs;
    this.obstacle = obstacle;
    this.character = character;
    this.floors = floors;
  }

  load(index) {
    this.index = index;
    const level = levels[index];

    this.updateFloors(level.floors);

    const groundY = this.floors[0].y;

    this.door.reset(level.door.x, groundY - this.door.height);
    this.switchs.reset(level.switch.x, groundY - this.switchs.height);
    this.obstacle.reset(level.obstacle.x, groundY - this.obstacle.radius);
    this.character.reset(level.man.x, groundY - this.character.height - 30);

    return level;
  }

  updateFloors(floorData) {
    this.floors = floorData.map(
      (f) => new Floor(f.x, f.y, f.width, f.height, f.speed || 0)
    );
  }

  nextLevel() {
    this.index++;
    return this.index < levels.length;
  }
}
