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

  this.load.image('walls', '../assets/images/walls.png');
  this.load.animation('streetMove', '../assets/json/animations.json');
  this.load.path = '../assets/images/street/';
  for (let index = 1; index < 51; index++) {
    this.load.image('street' + index, index + '.svg');
  }

  this.load.path = '../assets/images/leftWall/';
  this.load.image('leftWall1', '1.svg');
  this.load.path = '../assets/images/rightWall/';
  this.load.image('rightWall1', '1.svg');

  // this.load.animation('leftWallMove', '../assets/json/animations.json');
  // this.load.animation('rightWallMove', '../assets/json/animations.json');
  //console.log(this.anims);
  // this.load.path = '../assets/images/leftWall/';
  // for (let index = 1; index < 201; index++) {
  //   this.load.image('leftWall' + index, index + '.svg');
  // }
  // this.load.path = '../assets/images/rightWall/';
  // for (let index = 1; index < 201; index++) {
  //   this.load.image('rightWall' + index, index + '.svg');
  // }

  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  this.scale.refresh();

  // this.load.image('splash', '../assets/images/splash.png');
  this.load.path = '../assets/images/';
  this.load.image('maxxdaddy', 'maxxdaddy.gif');
  this.load.image('background', 'background.png');
  this.load.image('walls', 'walls.png');
  this.load.image('leftWall', 'left wall.png');
  this.load.image('rightWall', 'right wall.png');
  this.load.image('awning', 'awning.png');
  this.load.image('head', 'head.png');
  this.load.image('body&legs', 'body&legs.png');
  this.load.image('arms', 'arms.png');
  this.load.image('start', 'start.png');
  this.load.image('rightArm3', 'rightarm3.png');
  this.load.image('leftArm', 'leftArm.png');
  this.load.image('bottle', 'bottle.png');


}