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


function preload() {}

function create() {
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
  shadowOffsetUp = 297;
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