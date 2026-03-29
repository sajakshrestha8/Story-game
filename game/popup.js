function roundRectPath(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

export function drawPopup(ctx, canvas, completed) {
  ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const boxW = 420;
  const boxH = 160;
  const bx = (canvas.width - boxW) / 2;
  const by = (canvas.height - boxH) / 2;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = "#f8fafc";
  roundRectPath(ctx, bx, by, boxW, boxH, 14);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = "rgba(148, 163, 184, 0.6)";
  ctx.lineWidth = 1;
  roundRectPath(ctx, bx, by, boxW, boxH, 14);
  ctx.stroke();

  ctx.fillStyle = "#0f172a";
  ctx.font = '600 22px system-ui, "Segoe UI", sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    completed ? "Level complete" : "Game over",
    canvas.width / 2,
    by + 58
  );

  ctx.font = '15px system-ui, "Segoe UI", sans-serif';
  ctx.fillStyle = "#475569";
  ctx.fillText("Press Enter to continue", canvas.width / 2, by + 108);
}
