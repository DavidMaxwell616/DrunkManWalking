function preload() {
  showLoader(this);
  this.load.animation('falling', '../assets/json/animations.json');

  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  this.scale.refresh();

  // this.load.image('splash', '../assets/images/splash.png');
  this.load.path = '../assets/images/';
  this.load.image('maxxdaddy', 'maxxdaddy.gif');
  this.load.image('background', 'background.png');
  this.load.image('walls', 'walls.svg');
  this.load.image('leftWall', 'left wall.png');
  this.load.image('rightWall', 'right wall.png');
  this.load.image('awning', 'awning.png');
  this.load.image('start', 'start.png');
  this.load.image('leftWall', 'leftWall.svg');
  this.load.image('rightWall', 'rightWall.svg');
  this.load.image('buildings', 'buildings.svg');
  this.load.image('street', 'street.svg');
  this.load.image('arrow', 'arrow.png');

  this.load.spritesheet('legs', 'legs/legsStrip.png', {
    frameWidth: 250,
    frameHeight: 150
  });
  this.load.image('body&legs', 'body&legs.png');
  this.load.image('head', 'head.png');
  this.load.image('body', 'torso.png');
  this.load.image('leftArm', 'leftArm.png');
  this.load.image('rightArm', 'rightArm.png');
  this.load.image('rightArm2', 'rightArm3.png');
  this.load.image('bottle', 'bottle.png');
  this.load.image('drinking', 'bottle_drinking.png');
  this.load.image('startover', 'startover.png');

  this.load.path = '../assets/images/falling/';
  for (let index = 1; index < 9; index++) {
    this.load.image('falling' + index, 'falling' + index + '.png');
  }
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