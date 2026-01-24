import { levels } from "./levels.js";
import { Door } from "./objects/door.js";
import { Floor } from "./objects/floor.js";
import Man from "./objects/man.js";
import Obstacle from "./objects/obstacle.js";
import Switch from "./objects/switch.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;
const cHeight = 50;
const cWidth = 50;
const floorheight = 30;

let currentLevelIndex = 0;
let currentLevel = levels[currentLevelIndex];
let isSwitchClicked = false;
let isDoorOpen = false;
let characterSpeed = 240;
let showPopup = false;
let levelCompleted = false;
let lastTime = 0;
let deltaTime = 0;
let floors = [];
let floorHeightY = canvas.height - floorheight;
let level = 0;

function drawLevel() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Level: " + (currentLevelIndex + 1), 20, 30);
}

function loadLevel(index) {
  const level = levels[index];

  floors = level.floors.map((f) => new Floor(f.x, f.y, f.width, f.height));

  const groundFloor = floors[0];
  floorHeightY = groundFloor.y;

  door.reset(level.door.x, floorHeightY - door.height);
  switchs.reset(level.switch.x, floorHeightY - switchs.height);
  obstacle.reset(level.obstacle.x, floorHeightY - obstacle.radius);
  character.reset(level.man.x, floorHeightY - character.height - 30);

  currentLevel = level;
}

let keys = {
  left: false,
  right: false,
};

// render objects

const character = new Man(0, 0, cHeight, cWidth);
const obstacle = new Obstacle(
  canvas.width - 100,
  canvas.height - 100,
  20,
  0,
  2 * Math.PI
);
const switchs = new Switch(550, canvas.height - floorheight - 20, 50, 20);
const door = new Door(80, canvas.height - floorheight - 80, 50, 80);
const floor = new Floor(
  0,
  canvas.height - floorheight,
  canvas.width,
  floorheight
);

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function getFloorBeneathCharacter() {
  let closestFloor = null;
  let closestDistance = Infinity;

  for (const floor of floors) {
    const isAboveFloor =
      character.x + character.width > floor.x &&
      character.x < floor.x + floor.width;

    const floorTop = floor.y;
    const characterBottom = character.y + character.height;

    if (isAboveFloor && floorTop >= characterBottom - 10) {
      const distance = floorTop - characterBottom;
      if (distance < closestDistance) {
        closestDistance = distance;
        closestFloor = floor;
      }
    }
  }

  return closestFloor;
}

function isCollidingCircleRect(circle, rect) {
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

  const dx = circle.x - closestX;
  const dy = circle.y - closestY;

  return dx * dx + dy * dy <= circle.radius * circle.radius;
}

function drawHitbox(obj) {
  ctx.strokeStyle = "black";
  ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  floor.draw(ctx);
  door.draw(ctx);
  obstacle.draw(ctx);
  switchs.draw(ctx);
  character.draw(ctx);
  floors.forEach((floor) => floor.draw(ctx));

  if (!isSwitchClicked && isColliding(character, switchs)) {
    isSwitchClicked = true;
    isDoorOpen = true;
    switchs.isOn = true;
  }

  if (isSwitchClicked && !showPopup) {
    door.openDoor();
    ctx.fillStyle = "green";
    obstacle.moveObstacle(deltaTime);
    characterSpeed = 120;
  }

  if (
    isSwitchClicked &&
    !isColliding(character, door) &&
    isCollidingCircleRect(obstacle, character)
  ) {
    levelCompleted = false;
    showPopup = true;
  }

  if (
    isSwitchClicked &&
    isDoorOpen &&
    isColliding(character, door) &&
    !levelCompleted
  ) {
    levelCompleted = true;
    showPopup = true;
    drawHitbox(door);
  }

  if (showPopup && true) {
    if (levelCompleted === true) {
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      ctx.fillRect(300, 180, 400, 140);

      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText("Level Completed", 420, 240);
      ctx.fillText("Press ENTER for Next Level", 380, 280);
    } else {
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      ctx.fillRect(300, 180, 400, 140);

      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText("Game Over", 420, 240);
      ctx.fillText("Press ENTER for restart", 380, 280);
    }
  }
  drawHitbox(door);
  drawHitbox(obstacle);
  drawLevel();
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
    case "a":
      keys.left = true;
      break;

    case "ArrowRight":
    case "d":
      keys.right = true;
      break;

    case "ArrowUp":
    case "w":
    case " ":
      character.jump();
      break;

    case "Enter":
      if (showPopup) {
        if (levelCompleted) {
          currentLevelIndex++;

          if (currentLevelIndex < levels.length) {
            loadLevel(currentLevelIndex);
            showPopup = false;
            switchs.isOn = false;
            isSwitchClicked = false;
            levelCompleted = false;
            characterSpeed = 240;
            obstacle.reset(canvas.width - 50, canvas.height - 50 - 50);
          } else {
            window.location.reload();
          }
        } else {
          window.location.reload();
        }
      }
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
    case "a":
      keys.left = false;
      break;

    case "ArrowRight":
    case "d":
      keys.right = false;
      break;

    case "ArrowUp":
    case "w":
    case "Space":
      character.jump();
      break;
  }
});

function gameLoop(currentTime) {
  deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
  lastTime = currentTime;

  if (!showPopup) {
    if (keys.left === true && keys.right === false) {
      character.moveLeft(characterSpeed, deltaTime);
    }
    if (keys.left === false && keys.right === true) {
      character.moveRight(characterSpeed, deltaTime);
    }
  }
  if (!showPopup) {
    door.update(deltaTime);

    const floorBeneath = getFloorBeneathCharacter();
    const landingY = floorBeneath
      ? floorBeneath.y
      : canvas.height - floorheight;

    character.update(landingY, deltaTime);
  }
  render();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
