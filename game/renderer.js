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

export default class Renderer {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGame({ door, obstacle, switchs, character, levelManager, background }) {
    background.draw(this.ctx, character.x);
    if (levelManager && levelManager.floors) {
      levelManager.floors.forEach((f) => f.draw(this.ctx));
    }
    door.draw(this.ctx);
    obstacle.draw(this.ctx);
    switchs.draw(this.ctx);
    character.draw(this.ctx);
  }

  drawLevelText(level, meta = {}) {
    const ctx = this.ctx;
    const pad = 14;
    const title = meta.title;
    const objective = meta.objective;
    ctx.save();
    ctx.textBaseline = "top";
    const label = title
      ? `Level ${level} — ${title}`
      : `Level ${level}`;
    const hint = "← → move   ↑ / W / Space jump";
    ctx.font = '600 15px system-ui, "Segoe UI", sans-serif';
    const w1 = ctx.measureText(label).width;
    ctx.font = '12px system-ui, "Segoe UI", sans-serif';
    const wObj = objective ? ctx.measureText(objective).width : 0;
    ctx.font = '12px system-ui, "Segoe UI", sans-serif';
    const w2 = ctx.measureText(hint).width;
    const w = Math.max(w1, wObj, w2);
    const boxW = Math.min(w + pad * 2, this.canvas.width - 24);
    const lines = 2 + (objective ? 1 : 0);
    const boxH = 18 + lines * 18;
    ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    roundRectPath(ctx, 12, 10, boxW, boxH, 8);
    ctx.fill();
    roundRectPath(ctx, 12, 10, boxW, boxH, 8);
    ctx.stroke();
    ctx.font = '600 15px system-ui, "Segoe UI", sans-serif';
    ctx.fillStyle = "#f8fafc";
    ctx.fillText(label, 12 + pad, 16);
    let yLine = 34;
    if (objective) {
      ctx.font = '12px system-ui, "Segoe UI", sans-serif';
      ctx.fillStyle = "rgba(226, 232, 240, 0.95)";
      ctx.fillText(objective, 12 + pad, yLine);
      yLine += 18;
    }
    ctx.font = '12px system-ui, "Segoe UI", sans-serif';
    ctx.fillStyle = "rgba(148, 163, 184, 0.95)";
    ctx.fillText(hint, 12 + pad, yLine);
    ctx.restore();
  }

  drawHitbox(obj) {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = "rgba(34, 197, 94, 0.85)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
    ctx.restore();
  }
}
