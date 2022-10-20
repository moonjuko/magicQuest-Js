import { getRandomInt } from "./index.js";
import { Player } from "./Player.js";

export class Columns {
  constructor(gameWidth, gameHeight, topOrBottom, whichImage) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.x = this.gameWidth;
    this.width = 170;
    this.speed = 5;
    this.highLight = false;
    this.top = topOrBottom;
    this.bottom = topOrBottom;

    this.bottomImage = new Image();
    this.bottomImage.src = "./assets/ivysDown.png";

    this.topImage = new Image();
    this.topImage.src = "./assets/ivysAbove.png";

    this.whichImageToDraw = whichImage;

    this.outsideCanvas = false;
  }

  //Judgment of whether it is off the screen
  offScreen() {
    if (this.x + this.width <= 0) {
      return true;
    } else {
      return false;
    }
  }

  update(deltaTime) {
    this.x -= this.speed;
  }

  render(ctx) {
    if (this.whichImageToDraw === 1) {
      ctx.drawImage(this.topImage, this.x, 0, this.width, this.top); //上のパイプの描画
      let bb = this.getBoundingBox();
      ctx.translate(bb.x, bb.y);
      // ctx.strokeRect(0, 0, bb.w, bb.h)
      ctx.resetTransform();
    } else if (this.whichImageToDraw === 2) {
      ctx.drawImage(
        this.bottomImage,
        this.x,
        this.gameHeight - this.bottom,
        this.width,
        this.bottom
      );
      let bb = this.getBoundingBox();
      ctx.translate(bb.x, bb.y);
      // ctx.strokeRect(0, 0, bb.w, bb.h)
      ctx.resetTransform();
    }
  }
 // creates bouding boxes dimentions around sprite image
  getBoundingBox() {
    if (this.whichImageToDraw === 1) {
      return {
        x: this.x + 50,
        y: -5,
        w: this.width - 100,
        h: this.top,
      };
    } else if (this.whichImageToDraw === 2) {
      return {
        x: this.x + 50,
        y: this.gameHeight - this.bottom + 10,
        w: this.width - 100,
        h: this.bottom,
      };
    }
  }
}
