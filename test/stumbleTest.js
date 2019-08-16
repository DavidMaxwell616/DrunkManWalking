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
let legs;
let body;
let bottle;
let head;
let leftArm;
let rightArm;
let score = 0;
let drunkard;
let scoreText;
let falling;
let drunkardDrinking;

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
  this.load.image('drinking', '../assets/images/bottle drinking.png');
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
  leftArm = this.add.image(40, -70, 'leftArm');
  bottle = this.add.image(70, -50, 'bottle');
  drinking = this.add.image(70, -50, 'drinking');
  rightArm = this.add.image(-25, -90, 'rightArm').setOrigin(1, 0);
  body = this.add.image(-10, -70, 'body');
  legs = this.add.sprite(-10, 30, 'legs');
  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('legs', {
      start: 0,
      end: 7
    }),
    frameRate: 10,
    repeat: -1
  });
  drunkard = this.add.container(centerX, centerY, [body, legs, head, leftArm, rightArm, bottle]);
  drunkardDrinking = this.add.container(centerX, centerY, [body, legs, head, leftArm, rightArm, drinking]);
  drunkardDrinking.visible = false;

  scoreText = this.add.text(16, 16, 'score: 0', {
    fontFamily: 'arial',
    fontSize: '64px',
    fill: '#ff4500'
  });
  drunkard.setSize(64, 64);

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
  let centerY = this.game.config.height / 2;

  if (standing) {
    randomizer = Math.floor(Math.random() * 4);
    wobble -= 0.5;
    if (wobble < 3) {
      wobble = 3;
      fluctuation = 0.25;
    }

    score++;

    if (corrector < randomizer)
      corrector += .1;
    if (corrector > randomizer)
      corrector -= .1;
    factor = mouseX / 40 - 10 + rotation / wobble;

    rotation += (rotation + factor + corrector) / 1000; // * fluctuation;
    //    rotation -= .001;
    drunkard.rotation = rotation;
    scoreText.setText('score: ' + score);
    head.rotation = drunkard.rotation * -1;
    rightArm.rotation = drunkard.rotation * 2;
    legs.rotation = drunkard.rotation / 2 * -1;
    drunkard.x = centerX + drunkard.rotation;
    if (drunkard.rotation > .5 || drunkard.rotation < -.5) {
      drunkard.visible = false;
      falling.x = drunkard.x;
      falling.y = drunkard.y;
      falling.visible = true;
      falling.play('falling');
      //     //stopsounds;
      //     //show lying down sprite
      //     //road stop
      //     //leftwall stop;
      //     //right wall stop;
      //     //show game over
      //     //counter
      //     //show mouse
      rotation = 0;
      standing = false;
    }

  }
}