import Man from "./objects/man.js";
import Obstacle from "./objects/obstacle.js";
import Switch from "./objects/switch.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let isSwitchClicked = false;
console.log(ctx);

canvas.width = 500;
canvas.height = 500;
const cHeight = 50;
const cWidth = 20;

const character = new Man(cHeight, cWidth, 10, canvas.height - cHeight);
const obstacle = new Obstacle(50, 50, canvas.width - 50, canvas.height - 50);
const switchs = new Switch(10, 30, 50, canvas.height - 10);

function isColliding(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.width > b.x &&
    a.y < b.y + b.h &&
    a.y + a.height > b.y
  );
}

function drawHitbox(obj) {
  ctx.strokeStyle = "black";
  ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  character.draw(ctx);
  obstacle.draw(ctx);
  switchs.draw(ctx);

  // collision
  if (!isSwitchClicked && isColliding(character, switchs)) {
    isSwitchClicked = true;
    console.log("Switch activated!");
  }

  if (isSwitchClicked) {
    ctx.fillStyle = "green";
    ctx.fillRect(50, canvas.height - 5, 30, 5);
  }

  drawHitbox(character);
  drawHitbox(switchs);
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
    case "a":
      character.moveLeft();
      break;

    case "ArrowRight":
    case "d":
      character.moveRight();
      break;
  }
});

function gameLoop() {
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// canvas.addEventListener("");
