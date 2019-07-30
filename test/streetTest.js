var config = {
  type: Phaser.AUTO,
  parent: 'phaser-test',
  width: 1000,
  height: 500,
  backgroundColor: '#001133',
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

let street;
let button;
let leftWall;
let rightWall;
let walls;
let awning;
let awningShrink = 1;
let leftWallScale = 1;
let rightWallScale = 1;

function preload() {
  showLoader(this);

  // var walls = this.load.image('walls', '../assets/images/walls.png');
  // walls.width = 1000;
  this.load.animation('streetMove', '../assets/json/animations.json');

  this.load.path = '../assets/images/street/';
  for (let index = 1; index < 51; index++) {
    this.load.image('street' + index, index + '.svg');
  }
  this.load.path = '../assets/images/leftWall/';
  this.load.image('leftWall1', '1.svg');
  this.load.path = '../assets/images/rightWall/';
  this.load.image('rightWall1', '1.svg');

  this.load.path = '../assets/images/';
  this.load.image('awning', 'awning.png');

}

function create() {
  let centerX = this.game.config.width / 2;
  let centerY = this.game.config.height / 2;
  street = this.add.sprite(840, 500, 'street1');
  leftWall = this.add.sprite(-500, -267, 'leftWall1');
  rightWall = this.add.sprite(1500, -257, 'rightWall1');
  //const walls = this.add.image(420, 250, 'walls');
  //walls.setScale(2);
  DrawShadows(this);
  awning = this.add.sprite(centerX + 120, centerY + 40, 'awning');
  awningShrink = .3;
  awning.setScale(.3);
  street.anims.play('streetMove', true);
  scoreText = this.add.text(16, 16, 'Score: 0', {
    fontFamily: 'arial',
    fontSize: '32px',
    fontStyle: 'bold',
    fill: '#ff4500'
  });
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
  awning.alpha -= .0005;
  awningShrink -= .0002;
  awning.x -= .1;
  if (awning.alpha < 0)
    awning.visible = false;
  awning.setScale(awningShrink, awningShrink);

  scoreText.setText('leftWallScale: ' + leftWallScale);

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
}

function showLoader(game) {
  var progressBar = game.add.graphics();
  var progressBox = game.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(340, 270, 320, 50);
  game.load.on('progress', function (value) {});

  game.load.on('fileprogress', function (file) {});

  game.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
  });
  game.load.on('progress', function (value) {
    progressBar.clear();
    progressBar.fillStyle(0xff4500, 1);
    progressBar.fillRect(350, 280, 300 * value, 30);
    percentText.setText(parseInt(value * 100) + '%');
  });

  var width = game.cameras.main.width;
  var height = game.cameras.main.height;
  var loadingText = game.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff'
    }
  });
  loadingText.setOrigin(0.5, 0.5);

  var percentText = game.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  percentText.setOrigin(0.5, 0.5);
}