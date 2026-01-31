export function drawPopup(ctx, canvas, completed) {
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.fillRect(300, 180, 400, 140);

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(completed ? "Level Completed" : "Game Over", 420, 240);

  ctx.fillText("Press ENTER", 440, 280);
}
