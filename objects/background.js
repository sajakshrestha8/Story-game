export default class Background {
  constructor(imageSrc, canvasWidth, canvasHeight) {
    this.image = new Image();
    this.image.src = imageSrc;

    this.width = canvasWidth;
    this.height = canvasHeight;

    this.loaded = false;
    this.image.onload = () => {
      this.loaded = true;
    };
  }

  draw(ctx) {
    if (this.loaded) {
      ctx.drawImage(this.image, 0, 0, this.width, this.height);
    } else {
      ctx.fillStyle = "#87CEEB";
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }
}
