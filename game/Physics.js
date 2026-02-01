export const FALL_DEATH_OFFSET = 50;

export function getFloorBeneath(character, floors) {
  let closest = null;
  let minDist = Infinity;

  for (const floor of floors) {
    const overlap =
      character.x + character.width > floor.x &&
      character.x < floor.x + floor.width;

    if (!overlap) continue;

    const dist = floor.y - (character.y + character.height);
    if (dist >= -10 && dist < minDist) {
      minDist = dist;
      closest = floor;
    }
  }

  return closest;
}

export function hitCanvasX(character, canvas) {
  character.x = Math.max(
    0,
    Math.min(canvas.width - character.width, character.x)
  );
}
