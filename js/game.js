var config = {
  width: 1000,
  height: 500,
  type: Phaser.AUTO,
  backgroundColor: '#001133',
  parent: 'game',
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

var game = new Phaser.Game(config);

function create() {
  let centerX = this.game.config.width / 2;
  let centerY = this.game.config.height / 2;

  this.add.image(420, 250, 'walls').setScale(2);
  street = this.add.image(-734, 315, 'street').setOrigin(0, 0);
  street.setScale(1, 1);
  streetTween = this.tweens.add({
    targets: street,
    scale: .64,
    x: -309,
    y: 308,
    ease: 'Linear',
    repeat: -1,
    paused: true,
    yoyo: false,
    duration: 2500,
  });

  leftWall = this.add.sprite(-1473, -1340, 'leftWall').setOrigin(0, 0).setScale(1, 1);
  leftWallTween = this.tweens.add({
    targets: leftWall,
    scale: .07,
    x: 296,
    y: 190,
    ease: function (t) {
      return Math.pow(Math.sin(t * 1), 1);
    },
    repeat: -1,
    yoyo: false,
    paused: true,
    duration: 7500,
  });

  rightWall = this.add.sprite(456, -1226, 'rightWall').setOrigin(0, 0).setScale(1, 1);
  rightWallTween = this.tweens.add({
    targets: rightWall,
    scale: .065,
    x: 450,
    y: 195,
    ease: function (t) {
      // console.log('x: ' + Math.floor(rightWall.x), 'y: ' + Math.floor(rightWall.y),
      //   'scale: ' + rightWall.scale);
      return Math.pow(Math.sin(t * 1), 1);
    },
    paused: true,
    repeat: -1,
    yoyo: false,
    duration: 7500,
  });

  //  this.add.image(320, 210, 'buildings').setOrigin(0, 0).setScale(.5);

  DrawShadows(this);

  awning = this.add.sprite(centerX + 120, centerY + 40, 'awning').setScale(.3, .3);
  awningTween = this.tweens.add({
    targets: awning,
    scale: 0,
    x: centerX - 50,
    y: centerY + 55,
    ease: 'Quad.easeOut',
    paused: true,
    repeat: 0,
    yoyo: false,
    duration: 20000,
  });

  head = this.add.image(0, -130, 'head');
  head2 = this.add.image(0, -130, 'head');
  head3 = this.add.image(0, -130, 'head');
  leftArm = this.add.image(40, -70, 'leftArm');
  leftArm2 = this.add.image(40, -70, 'leftArm');
  bottle = this.add.image(70, -50, 'bottle');
  bottle2 = this.add.image(70, -50, 'bottle');
  drinking = this.add.image(20, -105, 'drinking');
  rightArm = this.add.image(-25, -95, 'rightArm').setOrigin(1, 0);
  rightArm2 = this.add.image(-25, -95, 'rightArm2').setOrigin(1, 0);
  rightArm3 = this.add.image(-25, -95, 'rightArm2').setOrigin(1, 0);
  body = this.add.image(-10, -70, 'body');
  legs = this.add.sprite(-10, 30, 'legs');
  body2 = this.add.image(-10, -70, 'body');
  legs2 = this.add.sprite(-10, 30, 'legs');
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
  start = this.add.image(-120, -110, 'start');
  start.name = 'start';
  start.setInteractive();
  this.input.on('gameobjectdown', onObjectClicked);
  drunkX = centerX - 40;
  drunkardWalking = this.add.container(drunkX, centerY + 100, [body, legs, head, leftArm, rightArm, bottle]);
  drunkardWalking.setSize(64, 64);
  drunkardWalking.visible = false;
  drunkardDrinking = this.add.container(drunkX, centerY + 100, [body2, legs2, head3, rightArm3, drinking]);
  drunkardDrinking.setSize(64, 64);
  drunkardDrinking.visible = false;
  drunkardStanding = this.add.container(drunkX, centerY + 100, [bodyandlegs, head2, leftArm2, rightArm2, start, bottle2]);
  drunkardStanding.setSize(64, 64);
  startover = this.add.image(800, 350, 'startover');
  startover.visible = false;
  startover.name = 'startover';
  startover.setInteractive();

  scoreText = this.add.text(16, 16, 'Score: 0', {
    fontFamily: 'arial',
    fontSize: '32px',
    fontStyle: 'bold',
    fill: '#ff4500'
  });
  gameOverText = this.add.text(centerX - 100, centerY - 100, 'GAME OVER\nYour Score: 0\nHigh Score: 0', {
    fontFamily: 'arial',
    fontSize: '32px',
    fontStyle: 'bold',
    fill: '#ff4500'
  });
  gameOverText.visible = false;

  falling = this.add.sprite(0, 0, 'falling1')
  falling.visible = false;
  maxxdaddy = this.add.image(this.game.config.width * 0.9, this.game.config.height * 0.95, 'maxxdaddy');
  this.input.mouse.capture = true;

}

function onObjectClicked(pointer, gameObject) {
  if (gameObject.name == 'start')
    walking = true;
}

function DrawShadows(game) {

  var bmd = this.game.textures.createCanvas('shadows', 1000, 500);
  const ctx = bmd.getContext('2d');
  let shadowOffsetLeft = 490;
  let shadowOffsetRight = 820;
  let shadowOffsetUp = 100;
  let shadowOffsetDown = 150;

  //ground shadow

  let centerX = this.game.config.width / 2;
  let centerY = this.game.config.height / 2;

  var grd = ctx.createLinearGradient(
    centerX,
    centerY - shadowOffsetUp,
    centerX,
    centerY + shadowOffsetDown,
  );
  grd.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grd.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
  grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX - shadowOffsetLeft,
    centerY + shadowOffsetDown,
  );
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX - shadowOffsetLeft,
    centerY + shadowOffsetDown,
  );
  ctx.lineTo(
    centerX + shadowOffsetRight,
    centerY + shadowOffsetDown,
  );
  ctx.fill();
  ctx.closePath();

  //left wall shadow

  shadowOffsetLeft = 320;
  shadowOffsetRight = 330;
  shadowOffsetUp = 270;
  shadowOffsetDown = 100;

  grd = ctx.createLinearGradient(
    centerX - shadowOffsetLeft,
    centerY,
    centerX + shadowOffsetRight,
    centerY,
  );
  grd.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grd.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
  grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX - shadowOffsetLeft,
    centerY - shadowOffsetUp,
  );
  ctx.lineTo(
    centerX - shadowOffsetRight,
    centerY + shadowOffsetDown,
  );
  ctx.fill();
  ctx.closePath();

  //right wall shdow

  shadowOffsetLeft = 220;
  shadowOffsetRight = 530;
  shadowOffsetUp = 495;
  shadowOffsetDown = 100;
  centerX = this.game.config.width / 2;

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + shadowOffsetRight,
    centerY - shadowOffsetUp,
  );
  ctx.lineTo(
    centerX + shadowOffsetRight,
    centerY + shadowOffsetDown,
  );
  ctx.fill();
  ctx.closePath();
  bmd.refresh();

  game.add.image(centerX - 50, centerY + 50, 'shadows').setScale(1.2);

}

function update() {
  if (!walking)
    return;
  drunkardStanding.visible = false;
  drunkardWalking.visible = true;
  streetTween.resume();
  awningTween.resume();
  leftWallTween.resume();
  rightWallTween.resume();
  legs.anims.play('walk', true);
  stagger(this.input.x);
}


function stagger(mouseX) {
  let centerX = this.game.config.width / 2;

  if (standing) {
    timeToDrink = Math.floor(Math.random() * 1000);

    randomizer = Math.floor(Math.random() * 4);
    wobble -= 0.5;
    if (wobble < wobbleThreshold) {
      wobble = wobbleThreshold;
      fluctuation = 0.25;
    }

    score++;

    if (corrector < randomizer)
      corrector += .1;
    if (corrector > randomizer)
      corrector -= .1;
    factor = mouseX / 40 - 10 + rotation / wobble;
    if (timeToDrink == 999 && !drinking) {
      drunkardWalking.visible = false;
      drunkardDrinking.visible = true;
      drinking = true;
    }
    if (drinking) {
      drinkCount++;
      console.log(drinkCount)
      if (drinkCount > 100) {
        drunkardDrinking.visible = false;
        drunkardWalking.visible = true;
        drinking = false;
        wobbleThreshold += .2;
        drinkCount = 0;
      }
    }
    rotation += (rotation + factor + corrector) / 1000; // * fluctuation;
    drunkardWalking.rotation = rotation;
    scoreText.setText('score: ' + score);
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
      streetTween.pause();
      awningTween.pause();
      leftWallTween.pause();
      rightWallTween.pause();
      gameOverText.visible = true;
      if (score > highScore)
        highScore = score;
      gameOverText.setText('GAME OVER\nYour Score: ' + score + '\nHigh Score: ' + highScore);
      startover.visible = true;
      rotation = 0;
      standing = false;
      walking = false;
    }

  }
}