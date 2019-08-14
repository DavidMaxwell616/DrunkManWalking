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
let leftWall;
let rightWall;
let walls;
let awning;
let streetTween;
let awningTween;
let leftWallTween;
let rightWallTween;

function preload() {
  showLoader(this);

  var walls = this.load.image('walls', '../assets/images/walls.svg');
  this.load.path = '../assets/images/street/';

  this.load.image('street', '1.svg');

  this.load.path = '../assets/images/leftWall/';
  this.load.image('leftWall1', '1.svg');
  this.load.path = '../assets/images/rightWall/';
  this.load.image('rightWall1', '1.svg');

  this.load.path = '../assets/images/';
  this.load.image('awning', 'awning.png');

}

function create() {
  const walls = this.add.image(420, 250, 'walls');
  walls.setScale(2);
  const centerX = this.game.config.width / 2;
  const centerY = this.game.config.height / 2;
  street = this.add.image(-734, 315, 'street').setOrigin(0, 0);
  street.setScale(1, 1);
  streetTween = this.tweens.add({
    targets: street,
    scale: .64,
    x: -309,
    y: 308,
    ease: 'Linear',
    repeat: -1,
    yoyo: false,
    duration: 2500,
  });
  leftWall = this.add.sprite(-1473, -1340, 'leftWall1').setOrigin(0, 0).setScale(1, 1);
  leftWallTween = this.tweens.add({
    targets: leftWall,
    scale: .23,
    x: -10,
    y: -70,
    ease: function (k) {
      return k * (2 - k)
    },
    repeat: -1,
    yoyo: false,
    duration: 4500,
  });
  rightWall = this.add.sprite(456, -1220, 'rightWall1').setOrigin(0, 0).setScale(1, 1);
  rightWallTween = this.tweens.add({
    targets: rightWall,
    scale: .15,
    x: 452,
    y: 70,
    ease: function (k) {
      return k * (2 - k)
    },
    repeat: -1,
    yoyo: false,
    duration: 4500,
  });

  DrawShadows(this);
  awning = this.add.sprite(centerX + 120, centerY + 40, 'awning').setScale(.3, .3);
  awningTween = this.tweens.add({
    targets: awning,
    scale: 0,
    x: centerX - 30,
    y: centerY + 45,
    ease: 'Linear.easeOut',
    repeat: 0,
    yoyo: false,
    duration: 4500,
  });






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
  shadowOffsetUp = 220;
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
  // awning.alpha -= .0005;
  // awningShrink -= .0002;
  // awning.x -= .1;
  // if (awning.alpha < 0)
  //   awning.visible = false;
  // awning.setScale(awningShrink, awningShrink);

  // scoreText.setText('leftWallScale: ' + leftWallScale);

  // rightWallScale -= .0005;
  // rightWall.x -= .55;
  // rightWall.y += .27;
  // if (rightWallScale < .275) {
  //   rightWallScale = 1;
  //   rightWall.x = 1500;
  //   rightWall.y = -257;
  // }
  // rightWall.setScale(rightWallScale, rightWallScale);

  // leftWallScale -= leftWallShrink;
  // leftWall.x += leftWallShrink * 1900;
  // leftWall.y += leftWallShrink * 1650;
  // leftWallShrink -= leftWallScaleDrag;
  // //console.log(leftWallScale);

  // if (leftWallScale < .17) {
  //   leftWallScale = 1;
  //   leftWall.x = -1473;
  //   leftWall.y = -1340;
  //   leftWallShrink = .005;
  // }
  // leftWall.setScale(leftWallScale, leftWallScale);
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