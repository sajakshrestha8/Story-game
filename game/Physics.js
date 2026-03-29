export const FALL_DEATH_OFFSET = 50;

export function getFloorBeneath(character, floors) {
  let closest = null;
  let minDist = Infinity;

  const hx = character.x + (character.hitInsetX ?? 0);
  const hw = character.hitWidth ?? character.width;

  for (const floor of floors) {
    const overlap = hx + hw > floor.x && hx < floor.x + floor.width;

    if (!overlap) continue;

    const feet =
      character.y + character.height - (character.feetInset ?? 0);
    const dist = floor.y - feet;
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
