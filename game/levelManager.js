import { levels } from "../levels.js";
import { Floor } from "../objects/floor.js";

/** Raises platforms slightly so they line up with the background horizon (smaller y = higher on screen). */
const FLOOR_Y_OFFSET = -34;

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
    this.totalLevel = levels.length;

    this.updateFloors(level.floors);

    const defaultGroundY = this.floors[0].y;

    /** Level JSON uses the same y as floor entries; world y includes horizon offset. */
    const worldGround = (raw) => raw + FLOOR_Y_OFFSET;

    const manGround =
      level.man.groundY != null ? worldGround(level.man.groundY) : defaultGroundY;
    const doorGround =
      level.door.groundY != null ? worldGround(level.door.groundY) : defaultGroundY;
    const switchGround =
      level.switch.groundY != null ? worldGround(level.switch.groundY) : defaultGroundY;
    const obstacleGround =
      level.obstacle.groundY != null ? worldGround(level.obstacle.groundY) : defaultGroundY;

    this.door.reset(level.door.x, doorGround - this.door.height);
    this.switchs.reset(level.switch.x, switchGround - this.switchs.height);
    this.switchs.isVisible = true;
    this.obstacle.reset(level.obstacle.x, obstacleGround - this.obstacle.radius);
    this.character.reset(
      level.man.x,
      manGround - this.character.height + this.character.feetInset
    );

    return level;
  }

  updateFloors(floorData) {
    this.floors = floorData.map(
      (f) =>
        new Floor(
          f.x,
          f.y + FLOOR_Y_OFFSET,
          f.width,
          f.height,
          f.speed || 0
        )
    );
  }

  nextLevel() {
    this.index++;
    return this.index < levels.length;
  }
}
