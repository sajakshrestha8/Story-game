import { Door } from "./objects/door.js";
import { Floor } from "./objects/floor.js";
import Man from "./objects/man.js";
import Obstacle from "./objects/obstacle.js";
import Switch from "./objects/switch.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let isSwitchClicked = false;
let isDoorOpen = false;
console.log(ctx);
let keys = {
  left: false,
  right: false,
};

canvas.width = 1000;
canvas.height = 1000;
const cHeight = 50;
const cWidth = 30;

const character = new Man(cHeight, cWidth, 10, canvas.height - cHeight - 50, 0);
const obstacle = new Obstacle(
  50,
  50,
  canvas.width - 50,
  canvas.height - 50 - 50
);
const switchs = new Switch(10, 30, 500, canvas.height - 10 - 50);
const door = new Door(50, 30, 200, canvas.height - 50 - 50);
const floor = new Floor(30, canvas.width, 0, canvas.height - 50);

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
  }

  if (
    isSwitchClicked &&
    !isColliding(character, door) &&
    isColliding(character, obstacle)
  ) {
    alert("game over");
  }

  if (isSwitchClicked && isDoorOpen && isColliding(character, door)) {
    confirm("Level has been completed. Wanna move to next level?");
  }
  drawHitbox(door);
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
    case "Space":
      character.jump();
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
  if (keys.left === true && keys.right === false) {
    character.moveLeft(1);
  }
  if (keys.left === false && keys.right === true) {
    character.moveRight(1);
  }
  door.update();
  character.update();
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// canvas.addEventListener("");
