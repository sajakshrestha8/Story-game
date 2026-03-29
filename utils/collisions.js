export function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

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

export function rectRect(a, b) {
  const ra = a.getCollisionRect ? a.getCollisionRect() : a;
  const rb = b.getCollisionRect ? b.getCollisionRect() : b;
  return (
    ra.x < rb.x + rb.width &&
    ra.x + ra.width > rb.x &&
    ra.y < rb.y + rb.height &&
    ra.y + ra.height > rb.y
  );
}

export function circleRect(circle, rect) {
  const r = rect.getCollisionRect ? rect.getCollisionRect() : rect;
  const closestX = Math.max(r.x, Math.min(circle.x, r.x + r.width));
  const closestY = Math.max(r.y, Math.min(circle.y, r.y + r.height));

  const dx = circle.x - closestX;
  const dy = circle.y - closestY;

  return dx * dx + dy * dy <= circle.radius * circle.radius;
}
