var config = {
  type: Phaser.AUTO,
  parent: 'phaser-test',
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

let street1;
let button;
let leftWall1;
let rightWall1;
let walls;

function preload() {
  var progressBar = this.add.graphics();
  var progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(340, 270, 320, 50);
  this.load.on('progress', function (value) {});

  this.load.on('fileprogress', function (file) {});

  this.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
  });
  this.load.on('progress', function (value) {
    progressBar.clear();
    progressBar.fillStyle(0xff8c00, 1);
    progressBar.fillRect(350, 280, 300 * value, 30);
    percentText.setText(parseInt(value * 100) + '%');
  });

  var width = this.cameras.main.width;
  var height = this.cameras.main.height;
  var loadingText = this.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff'
    }
  });
  loadingText.setOrigin(0.5, 0.5);

  var percentText = this.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  percentText.setOrigin(0.5, 0.5);
  // var walls = this.load.image('walls', '../assets/images/walls.png');
  // walls.width = 1000;
  this.load.animation('streetMove', '../assets/json/animations.json');
  this.load.animation('rightWallMove', '../assets/json/animations.json');
  this.load.animation('leftWallMove', '../assets/json/animations.json');
  this.load.path = '../assets/images/street/';
  for (let index = 1; index < 51; index++) {
    this.load.image('street' + index, index + '.svg');
  }

  this.load.path = '../assets/images/leftWall/';
  for (let index = 1; index < 201; index++) {
    this.load.image('leftWall' + index, index + '.svg');
  }

  this.load.path = '../assets/images/rightWall/';
  for (let index = 1; index < 201; index++) {
    this.load.image('rightWall' + index, index + '.svg');
  }
}

function create() {
  street = this.add.sprite(840, 500, 'street1').play('streetMove');

  //const walls = this.add.image(420, 250, 'walls');
  //walls.setScale(2);

  leftWall = this.add.sprite(-500, -267, 'leftWall1').play('leftWallMove');

  rightWall = this.add.sprite(1500, -267, 'rightWall1').play('rightWallMove');

  // var shadow = this.add.graphics();
  // shadow.fillStyle(0x000000);
  // shadow.fillRect(430, 270, 120, 50);
  DrawShadows(this);
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


function update() {}

function actionOnClick() {}