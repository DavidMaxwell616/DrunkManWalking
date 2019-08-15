var config = {
  type: Phaser.AUTO,
  parent: 'phaser-test',
  width: 1000,
  height: 500,
  backgroundColor: '#001133',
  scene: {
    preload: preload,
    create: create,
  },
};

var game = new Phaser.Game(config);
var graphics;
var balls = [];

function preload() {

}

function create() {
  const centerX = this.game.config.width / 2;
  const centerY = this.game.config.height / 2;
  var graphics = this.add.graphics();
  graphics.fillStyle(0x9966ff, 1);
  graphics.fillCircle(200, 200, 20);
  for (var i = 0; i < 2000; i++) {
    balls.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      v: 1,
      a: Math.random() * 2 * Math.PI,
    });

    //   street = this.add.image(-734, 315, 'street').setOrigin(0, 0);
    // street.setScale(1, 1);
    // streetTween = this.tweens.add({
    //   targets: street,
    //   scale: .64,
    //   x: -309,
    //   y: 308,
    //   ease: 'Linear',
    //   repeat: -1,
    //   yoyo: false,
    //   duration: 2500,
    // });


    scoreText = this.add.text(16, 16, 'Score: 0', {
      fontFamily: 'arial',
      fontSize: '32px',
      fontStyle: 'bold',
      fill: '#ff4500'
    });
  }