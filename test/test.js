var config = {
  type: Phaser.AUTO,
  parent: 'game',
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
  this.load.on('progress', function (value) {
    console.log(value);
  });

  this.load.on('fileprogress', function (file) {
    console.log(file.src);
  });

  this.load.on('complete', function () {
    console.log('complete');
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
  });
  this.load.on('progress', function (value) {
    console.log(value);
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
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
  this.load.image('walls', '../assets/images/walls.svg');
  this.load.animation('streetMove', '../assets/json/animations.json');
  this.load.animation('leftWallMove', '../assets/json/animations.json');
  this.load.animation('rightWallMove', '../assets/json/animations.json');
  //console.log(this.anims);
  this.load.path = '../assets/images/leftWall/';
  for (let index = 1; index < 201; index++) {
    this.load.image('leftWall' + index, index + '.svg');
  }
  this.load.path = '../assets/images/rightWall/';
  for (let index = 1; index < 201; index++) {
    this.load.image('rightWall' + index, index + '.svg');
  }
  this.load.path = '../assets/images/street/';
  for (let index = 1; index < 51; index++) {
    this.load.image('street' + index, index + '.svg');
  }
}

function create() {
  street = this.add.sprite(800, 500, 'street1').play('streetMove');

  // const walls = this.add.image(420, 250, 'walls');
  // walls.setScale(2);

  leftWall = this.add.sprite(800, 500, 'leftWall1').play('leftWallMove');

  rightWall = this.add.sprite(1400, -270, 'rightWall1').play('rightWallMove');

  //DrawShadows();
}

function DrawShadows() {
  //  Our BitmapData (same size as our canvas)
  bmd = this.make.bitmapData(this.width, this.height);

  let shadowOffsetLeft = 240;
  let shadowOffsetRight = 310;
  let shadowOffsetUp = 100;
  let shadowOffsetDown = 100;

  //  Add it to the world or we can't see it
  bmd.addToWorld();
  var ctx = bmd.context;
  var grd = bmd.context.createLinearGradient(
    this.world.centerX,
    this.world.centerY - shadowOffsetUp,
    this.world.centerX,
    this.world.centerY + shadowOffsetDown,
  );
  grd.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grd.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
  grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.moveTo(this.world.centerX, this.world.centerY);
  ctx.lineTo(
    this.world.centerX - shadowOffsetLeft,
    this.world.centerY + shadowOffsetDown,
  );
  ctx.lineTo(
    this.world.centerX + shadowOffsetRight,
    this.world.centerY + shadowOffsetDown,
  );
  ctx.fill();
  ctx.closePath();

  shadowOffsetUp = 297;
  shadowOffsetDown = 130;

  grd = bmd.context.createLinearGradient(
    this.world.centerX - shadowOffsetLeft,
    this.world.centerY,
    this.world.centerX + shadowOffsetRight,
    this.world.centerY,
  );
  grd.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grd.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
  grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.moveTo(this.world.centerX + 3, this.world.centerY);
  ctx.lineTo(
    this.world.centerX - shadowOffsetLeft,
    this.world.centerY - shadowOffsetUp,
  );
  ctx.lineTo(
    this.world.centerX - shadowOffsetRight,
    this.world.centerY + shadowOffsetDown,
  );
  ctx.fill();
  ctx.closePath();

  shadowOffsetUp = 390;
  shadowOffsetDown = 100;

  ctx.beginPath();
  ctx.moveTo(this.world.centerX, this.world.centerY);
  ctx.lineTo(
    this.world.centerX + shadowOffsetRight,
    this.world.centerY - shadowOffsetUp,
  );
  ctx.lineTo(
    this.world.centerX + shadowOffsetRight,
    this.world.centerY + shadowOffsetDown,
  );
  ctx.fill();
  ctx.closePath();
}

function update() {}

function actionOnClick() {}