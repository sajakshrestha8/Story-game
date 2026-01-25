import { isColliding } from "../script.js";

export function floorCollision(character, floors, direction) {
  for (const floor of floors) {
    if (isColliding(character, floor)) {
      if (direction === "right") {
        return (character.x = floor.x - character.width);
      } else if (direction === "left") {
        return (character.x = floor.x + floor.width);
      }
    }
  }
}
