import { Door } from "./objects/door.js";
import { Floor } from "./objects/floor.js";
import Man from "./objects/man.js";
import Obstacle from "./objects/obstacle.js";
import Switch from "./objects/switch.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let isSwitchClicked = false;
let isDoorOpen = false;
let characterSpeed = 1;
let showPopup = false;
let levelCompleted = false;

console.log(ctx);
let keys = {
  left: false,
  right: false,
};

canvas.width = 1000;
canvas.height = 500;
const cHeight = 50;
const cWidth = 50;
const floorheight = 30;

const character = new Man(0, 0, cHeight, cWidth);
const obstacle = new Obstacle(
  50,
  50,
  canvas.width - 50,
  canvas.height - 50 - 50
);
const switchs = new Switch(10, 30, 500, canvas.height - 10 - 50);
const door = new Door(200, canvas.height - floorheight - 80, 80, 50);
const floor = new Floor(
  0,
  canvas.height - floorheight,
  floorheight,
  canvas.width
);

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
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

  if (!isSwitchClicked && isColliding(character, switchs)) {
    isSwitchClicked = true;
    isDoorOpen = true;
  }

  if (isSwitchClicked) {
    ctx.clearRect(switchs.x, switchs.y, switchs.width, switchs.height);
    door.openDoor();
    ctx.fillStyle = "green";
    ctx.fillRect(500, canvas.height - 5 - 50, 30, 5);
    obstacle.moveObstacle();
    characterSpeed = 0.5;
  }

  if (
    isSwitchClicked &&
    !isColliding(character, door) &&
    isColliding(character, obstacle)
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
}

window.addEventListener("keydown", (e) => {
  console.log(e);
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
        window.location.reload();
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

function gameLoop() {
  if (!showPopup) {
    if (keys.left === true && keys.right === false) {
      character.moveLeft(characterSpeed);
    }
    if (keys.left === false && keys.right === true) {
      character.moveRight(characterSpeed);
    }
  }
  door.update();
  character.update(canvas.height - floorheight);
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// canvas.addEventListener("");
