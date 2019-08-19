var config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 500,
  backgroundColor: '#001133',
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
let standing = true;
let corrector = 0;
let randomizer = 0;
let factor = 0;
let rotation = 0;
let guyRotation = 0;
let wobble = 10;
let fluctuation = 1;
let score = 0;
let scoreText;
let falling;

let bodyandlegs;
let head;
let legs;
let body;
let bottle;
let leftArm;
let leftArm2;
let leftArm3;
let rightArm;
let drunkardWalking;
let drunkardStanding;
let wobbleThreshold = 700;
let walking = false;
let timeToDrink;
let drinkCount = 0;
let drinking = false;
let drunkX = 0;

function preload() {
  this.load.spritesheet('legs', '../assets/images/legsStrip.png', {
    frameWidth: 250,
    frameHeight: 150
  });
  this.load.image('head', '../assets/images/head.png');
  this.load.image('body', '../assets/images/torso.png');
  this.load.image('leftArm', '../assets/images/leftArm.png');
  this.load.image('rightArm', '../assets/images/rightArm.png');
  this.load.image('bottle', '../assets/images/bottle.png');
  this.load.image('drinking', '../assets/images/bottle_drinking.png');
  this.load.animation('falling', '../assets/json/animations.json');
  this.load.path = '../assets/images/falling/';
  for (let index = 1; index < 9; index++) {
    this.load.image('falling' + index, 'falling' + index + '.png');
  }
}

function create() {
  let centerX = this.game.config.width / 2;
  let centerY = this.game.config.height / 2;
  head = this.add.image(0, -130, 'head');
  head2 = this.add.image(0, -130, 'head');
  head3 = this.add.image(0, -130, 'head');
  leftArm = this.add.image(40, -70, 'leftArm');
  leftArm2 = this.add.image(40, -70, 'leftArm');
  leftArm.name = "leftArm";
  leftArm3 = this.add.image(20, -105, 'drinking');
  leftArm3.name = "drinking";
  bottle = this.add.image(70, -50, 'bottle');
  bottle.name = "bottle";
  bottle2 = this.add.image(70, -50, 'bottle');
  rightArm = this.add.image(-25, -95, 'rightArm').setOrigin(1, 0);
  rightArm2 = this.add.image(-25, -95, 'rightArm2').setOrigin(1, 0);
  rightArm3 = this.add.image(-25, -95, 'rightArm').setOrigin(1, 0);
  body = this.add.image(-10, -70, 'body');
  legs = this.add.sprite(-10, 30, 'legs');
  body2 = this.add.image(-10, -70, 'body');
  bodyandlegs = this.add.image(-10, -10, 'body&legs');
  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('legs', {
      start: 0,
      end: 7
    }),
    frameRate: 10,
    repeat: -1
  });

  drunkX = centerX - 40;
  drunkardWalking = this.add.container(drunkX, centerY + 100, [body, legs, head, leftArm, rightArm, bottle, leftArm3]);
  drunkardWalking.setSize(64, 64);
  var child = drunkardWalking.getByName('drinking');
  child.visible = false;
  drunkardWalking.visible = true;

  scoreText = this.add.text(16, 16, 'score: 0', {
    fontFamily: 'arial',
    fontSize: '64px',
    fill: '#ff4500'
  });

  falling = this.add.sprite(0, 0, 'falling1')
  falling.visible = false;
  this.input.mouse.capture = true;
}

function update() {
  legs.anims.play('walk', true);
  stagger(this.input.x);
}

function stagger(mouseX) {
  let centerX = this.game.config.width / 2;

  if (standing) {
    timeToDrink = Math.floor(Math.random() * 1000);

    randomizer = Math.floor(Math.random() * 4);
    wobble -= 0.5;
    if (wobble < 3) {
      wobble = 3;
      fluctuation = 0.25;
    }

    score += .1;
    if (Math.floor(score) % 20 == 0)
      wobbleThreshold += 10;
    if (corrector < randomizer)
      corrector += .1;
    if (corrector > randomizer)
      corrector -= .1;
    factor = mouseX / 40 - 10 + rotation / wobble;

    if (timeToDrink > 990 && !drinking) {
      drunkardWalking.getByName('drinking').setVisible(true);
      drunkardWalking.getByName('leftArm').setVisible(false);
      drunkardWalking.getByName('bottle').setVisible(false);
      drinking = true;
    }
    if (drinking) {
      drinkCount++;
      if (drinkCount > 100) {
        drunkardWalking.getByName('drinking').setVisible(false);
        drunkardWalking.getByName('leftArm').setVisible(true);
        drunkardWalking.getByName('bottle').setVisible(true);
        drinking = false;
        if (wobbleThreshold > 0)
          wobbleThreshold -= 25;
        drinkCount = 0;
      }
    }
    rotation += (rotation + factor + corrector) / wobbleThreshold; // * fluctuation;
    drunkardWalking.rotation = rotation;
    scoreText.setText('score: ' + Math.floor(score) + ' ' + wobbleThreshold);
    head.rotation = drunkardWalking.rotation * -1;
    rightArm.rotation = drunkardWalking.rotation * 2;
    legs.rotation = drunkardWalking.rotation / 2 * -1;
    drunkardWalking.x = centerX - 40 + drunkardWalking.rotation;
    if (drunkardWalking.rotation > .5 || drunkardWalking.rotation < -.5) {
      drunkardWalking.visible = false;
      falling.y = drunkardWalking.y;
      if (drunkardWalking.rotation > .5) {
        falling.setScale(-1, 1);
        falling.x = drunkardWalking.x + 50;
      } else {
        falling.setScale(1, 1);
        falling.x = drunkardWalking.x - 50;
      }
      falling.visible = true;
      falling.play('falling');
      standing = false;
      walking = false;
    }

  }
}