export class Player {
  //Automatically executed method for initialization
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.position = {
      x: 30,
      y: 20,
    };
    this.r = 100;
    this.gravity = 0.2;
    this.speed = 0;
    this.lift = -5;
    this.image = new Image();
    this.image.src = "./assets/fly.png";
    this.height = 200;
    this.width = 20;
    this.init();
  }
  init() {
    // define sprite images
    this.sprites = {
      fly: {
        src: "./assets/fly.png",
        frames: 3,
        fps: 6,
        frameSize: {
          width: 1520,
          height: 920,
        },
        image: null,
      },
    };

    // load images
    Object.values(this.sprites).forEach((sprite) => {
      sprite.image = new Image();
      sprite.image.src = sprite.src;
    });
  }

  up() {
    this.speed = this.lift;
  }

  update(deltaTime) {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        this.up();
      }
    });

    if (this.position.y < 0) {
      this.position.y = 0;
    }

    this.position.y += this.speed;
    this.speed += this.gravity;

    // makes sure player doesnt leave screen bottom
    if (this.position.y > this.gameHeight - this.r) {
      this.position.y = this.gameHeight - this.r;
    }
  }

  render(ctx) {
    //drawing bouding boxes
    let bb = this.getBoundingBox();

    ctx.translate(bb.x, bb.y);
    //ctx.strokeRect(0, 0, bb.w, bb.h)
    ctx.resetTransform();

    let coords = this.getImageSpriteCoordinates(this.sprites["fly"]);

    // draw image
    ctx.drawImage(
      this.sprites["fly"].image, // the image
      coords.sourceX, // source x
      coords.sourceY, // source y
      coords.sourceWidth, // source width
      coords.sourceHeight, // source height
      this.position.x, // destination x
      this.position.y, // destination y
      170, // destination width
      100 // destination height
    );
  }

  getImageSpriteCoordinates(sprite) {
    let frameX = Math.floor(
      ((performance.now() / 1000) * sprite.fps) % sprite.frames
    );

    let coords = {
      sourceX: frameX * sprite.frameSize.width,
      sourceY: 0,
      sourceWidth: sprite.frameSize.width,
      sourceHeight: sprite.frameSize.height,
    };

    return coords;
  }
  // creates bouding boxes dimentions around sprite image
  getBoundingBox() {
    return {
      x: this.position.x + 30,
      y: this.position.y + 5,
      w: 110,
      h: 80,
    };
  }
}
