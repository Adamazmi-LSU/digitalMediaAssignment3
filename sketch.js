let guy;
let green;
let lime;
let character;

function preload() {
  guy = loadImage("media/SpelunkyGuy.png");
  green = loadImage("media/Green.png");
  lime = loadImage("media/Lime.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  character = new Character(random(80, width-80),random(80, height-80));
  character.addAnimation("down", new SpriteAnimation(guy, 6, 5, 6));
  character.addAnimation("up", new SpriteAnimation(guy, 0, 5, 6));
  character.addAnimation("stand", new SpriteAnimation(guy, 0, 0, 1));
  character.addAnimation("right" , new SpriteAnimation(guy, 0, 9, 4));
  character.addAnimation("left" , new SpriteAnimation(guy, 0, 9, 4));
  character.currentAnimation = "stand";
  character2 = new Character(random(80, width-80),random(80, height-80));
  character2.addAnimation("down", new SpriteAnimation(green, 6, 5, 6));
  character2.addAnimation("up", new SpriteAnimation(green, 0, 5, 6));
  character2.addAnimation("stand", new SpriteAnimation(green, 0, 0, 1));
  character2.addAnimation("right" , new SpriteAnimation(green, 0, 9, 4));
  character2.addAnimation("left" , new SpriteAnimation(green, 0, 9, 4));
  character2.currentAnimation = "stand";
  character3 = new Character(random(80, width-80),random(80, height-80));
  character3.addAnimation("down", new SpriteAnimation(lime, 6, 5, 6));
  character3.addAnimation("up", new SpriteAnimation(lime, 0, 5, 6));
  character3.addAnimation("stand", new SpriteAnimation(lime, 0, 0, 1));
  character3.addAnimation("right" , new SpriteAnimation(lime, 0, 9, 4));
  character3.addAnimation("left" , new SpriteAnimation(lime, 0, 9, 4));
  character3.currentAnimation = "stand";
  
}

function draw() {
  background(220);

  character.draw();
  character2.draw();
  character3.draw();

}

function keyPressed() {
  character.keyPressed();
  character2.keyPressed();
  character3.keyPressed();
}

function keyReleased() {
  character.keyReleased();
  character2.keyReleased();
  character3.keyReleased();
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down": 
          this.y += 2;
          break;
        case "right":
          this.x += 2;
          break;
        case "left":
          this.x -= 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animations["left"].flipped = true;
        break;
    }
  }
  
  keyReleased() {
    if (keyCode === LEFT_ARROW){
      this.currentAnimation = "stand";
      this.animations["stand"].flipped = true;
    } else {
      this.currentAnimation = "stand";
      this.animations["stand"].flipped = false;
    } 
    
    //this.animations[this.currentAnimation].flipped = true;
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {

    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}