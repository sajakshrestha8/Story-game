export default class Background {
  constructor(basePath, canvasWidth, canvasHeight) {
    this.basePath = basePath.replace(/\/$/, "");
    this.width = canvasWidth;
    this.height = canvasHeight;

    this.layers = [
      { img: new Image(), parallax: 0.35 },
      { img: new Image(), parallax: 0.5 },
      { img: new Image(), parallax: 0.68 },
      { img: new Image(), parallax: 0.85 },
    ];

    this.layers.forEach((layer, i) => {
      layer.img.src = `${this.basePath}/${i + 1}.png`;
    });
  }

  draw(ctx, focusX = 0) {
    const w = this.width;
    const h = this.height;

    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#87CEEB");
    sky.addColorStop(0.55, "#B8E0F0");
    sky.addColorStop(1, "#E8F4E8");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const t = Math.max(0, Math.min(1, focusX / w));

    this.layers.forEach((layer) => {
      const img = layer.img;
      if (!img.complete || img.naturalWidth === 0) return;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(w / iw, h / ih);
      const dw = iw * scale;
      const dh = ih * scale;

      const maxShift = Math.max(0, dw - w) * 0.5;
      const shift = (t - 0.5) * 2 * maxShift * layer.parallax;
      const ox = (w - dw) / 2 - shift;
      // Nudge layers down so the landscape meets the gameplay platforms (~y≈416).
      const oy = (h - dh) / 2 + 52;

      ctx.drawImage(img, ox, oy, dw, dh);
    });
  }
}
