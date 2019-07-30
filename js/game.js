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

  street = this.add.sprite(840, 500, 'street1');
  leftWall = this.add.sprite(-500, -267, 'leftWall1');
  rightWall = this.add.sprite(1500, -257, 'rightWall1');

  DrawShadows(this);

  awning = this.add.sprite(centerX + 120, centerY + 40, 'awning');
  awningShrink = .3;
  awning.setScale(.3);

  head = this.add.image(0, -130, 'head');
  head2 = this.add.image(0, -130, 'head');
  leftArm = this.add.image(40, -70, 'leftArm');
  leftArm2 = this.add.image(40, -70, 'leftArm');
  bottle = this.add.image(70, -50, 'bottle');
  bottle2 = this.add.image(70, -50, 'bottle');
  rightArm = this.add.image(-25, -95, 'rightArm').setOrigin(1, 0);
  rightArm2 = this.add.image(-25, -95, 'rightArm2').setOrigin(1, 0);
  body = this.add.image(-10, -70, 'body');
  legs = this.add.sprite(-10, 30, 'legs');
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
  drunkardWalking = this.add.container(centerX, centerY + 100, [body, legs, head, leftArm, rightArm, bottle]);
  drunkardWalking.setSize(64, 64);
  drunkardWalking.visible = false;
  drunkardStanding = this.add.container(centerX, centerY + 100, [bodyandlegs, head2, leftArm2, rightArm2, start, bottle2]);
  drunkardStanding.setSize(64, 64);

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

  shadowOffsetLeft = 220;
  shadowOffsetRight = 330;
  shadowOffsetUp = 397;
  shadowOffsetDown = 130;

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
  ctx.moveTo(centerX + 3, centerY);
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
  shadowOffsetUp = 490;
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
  street.anims.play('streetMove', true);
  legs.anims.play('walk', true);
  //leftWall.anims.play('leftWallMove', true);
  //rightWall.play('rightWallMove');
  stagger(this.input.x);
}


function stagger(mouseX) {
  let centerX = this.game.config.width / 2;

  if (standing) {
    randomizer = Math.floor(Math.random() * 4);
    wobble -= 0.5;
    if (wobble < 3) {
      wobble = 3;
      fluctuation = 0.25;
    }
    awning.alpha -= .0005;
    awningShrink -= .0002;
    awning.x -= .1;
    if (awning.alpha < 0)
      awning.visible = false;
    awning.setScale(awningShrink, awningShrink);

    rightWallScale -= .0005;
    rightWall.x -= .55;
    rightWall.y += .27;
    if (rightWallScale < .275) {
      rightWallScale = 1;
      rightWall.x = 1500;
      rightWall.y = -257;
    }
    rightWall.setScale(rightWallScale, rightWallScale);

    leftWallScale -= .0007;
    leftWall.x += .65;
    leftWall.y += .4;
    if (leftWallScale < .19) {
      leftWallScale = 1;
      leftWall.x = -500;
      leftWall.y = -267;
    }
    leftWall.setScale(leftWallScale, leftWallScale);

    score++;

    if (corrector < randomizer)
      corrector += .1;
    if (corrector > randomizer)
      corrector -= .1;
    factor = mouseX / 40 - 10 + rotation / wobble;

    rotation += (rotation + factor + corrector) / 1000; // * fluctuation;
    drunkardWalking.rotation = rotation;
    scoreText.setText('score: ' + score);
    head.rotation = drunkardWalking.rotation * -1;
    rightArm.rotation = drunkardWalking.rotation * 2;
    legs.rotation = drunkardWalking.rotation / 2 * -1;
    drunkardWalking.x = centerX + drunkardWalking.rotation;
    if (drunkardWalking.rotation > .5 || drunkardWalking.rotation < -.5) {
      drunkardWalking.visible = false;
      falling.x = drunkardWalking.x;
      falling.y = drunkardWalking.y;
      if (drunkardWalking.rotation > .5)
        falling.setScale(-1, 1);
      else
        falling.setScale(1, 1);
      falling.visible = true;
      falling.play('falling');
      street.anims.stop();
      leftWall.anims.stop();
      gameOverText.visible = true;
      if (score > highScore)
        highScore = score;
      gameOverText.setText('GAME OVER\nYour Score: ' + score + '\nHigh Score: ' + highScore);

      rotation = 0;
      standing = false;
      walking = false;
    }

  }
}