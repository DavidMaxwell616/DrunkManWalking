const game = new Phaser.Game(1000, 500, Phaser.AUTO, 'game', {
  preload,
  create,
  update,
});

let street;
let button;
let leftWall;
let rightWall;
let walls;
let streetTween;
let lWallTween;
let rWallTween;

function preload() {
  game.load.image('street', '../assets/images/road.png');
  game.load.image('walls', '../assets/images/walls.png');
  game.load.image('leftWall', '../assets/images/left wall.png');
  game.load.image('rightWall', '../assets/images/right wall.png');
  game.load.image('button', '../assets/images/button.png');
}

function create() {
  game.stage.backgroundColor = '#001133';
  street = game.add.image(game.world.centerX + 70, game.world.centerY, 'street');
  street.anchor.x = .4;
  street.anchor.y = 0;
  street.scale.x = 1.3;
  street.scale.y = 1.3;

  walls = game.add.image(0, 0, 'walls');
  walls.width = game.width;
  walls.height = game.height;

  leftWall = game.add.image(-200, -510, 'leftWall');
  leftWall.width = game.width * 0.7;
  leftWall.height = game.height * 2;

  rightWall = game.add.image(game.width / 2, -547, 'rightWall');
  rightWall.width = game.width * 0.7;
  rightWall.height = game.height * 2;
  DrawShadows();
  button = game.add.button(50, 50, 'button', actionOnClick, this, 2, 1, 0);
  streetTween = game.add.tween(street.scale).to({
    x: -.2,
    y: .1
  }, 0, Phaser.Easing.Linear.None, true, true, 2500, 10);
  //tween.onComplete.add(onComplete, this);
}

function DrawShadows() {
  //  Our BitmapData (same size as our canvas)
  bmd = game.make.bitmapData(game.width, game.height);

  let shadowOffsetLeft = 240;
  let shadowOffsetRight = 310;
  let shadowOffsetUp = 100;
  let shadowOffsetDown = 100;

  //  Add it to the world or we can't see it
  bmd.addToWorld();
  var ctx = bmd.context;
  var grd = bmd.context.createLinearGradient(
    game.world.centerX,
    game.world.centerY - shadowOffsetUp,
    game.world.centerX,
    game.world.centerY + shadowOffsetDown,
  );
  grd.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grd.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
  grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.moveTo(game.world.centerX, game.world.centerY);
  ctx.lineTo(
    game.world.centerX - shadowOffsetLeft,
    game.world.centerY + shadowOffsetDown,
  );
  ctx.lineTo(
    game.world.centerX + shadowOffsetRight,
    game.world.centerY + shadowOffsetDown,
  );
  ctx.fill();
  ctx.closePath();

  shadowOffsetUp = 297;
  shadowOffsetDown = 130;

  grd = bmd.context.createLinearGradient(
    game.world.centerX - shadowOffsetLeft,
    game.world.centerY,
    game.world.centerX + shadowOffsetRight,
    game.world.centerY,
  );
  grd.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grd.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
  grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.moveTo(game.world.centerX + 3, game.world.centerY);
  ctx.lineTo(
    game.world.centerX - shadowOffsetLeft,
    game.world.centerY - shadowOffsetUp,
  );
  ctx.lineTo(
    game.world.centerX - shadowOffsetRight,
    game.world.centerY + shadowOffsetDown,
  );
  ctx.fill();
  ctx.closePath();

  shadowOffsetUp = 390;
  shadowOffsetDown = 100;

  ctx.beginPath();
  ctx.moveTo(game.world.centerX, game.world.centerY);
  ctx.lineTo(
    game.world.centerX + shadowOffsetRight,
    game.world.centerY - shadowOffsetUp,
  );
  ctx.lineTo(
    game.world.centerX + shadowOffsetRight,
    game.world.centerY + shadowOffsetDown,
  );
  ctx.fill();
  ctx.closePath();
}

function update() {
  // actionOnClick();
}

function actionOnClick() {
  // street.y -= .1;
  // street.x -= .75;

  // street.scale.x -= 0.01;
  // street.scale.y -= 0.01;
  // if (street.y < 294.9) {
  //   street.y = 299;
  //   street.x = game.world.centerX;
  //   street.scale.setTo(1, 1);
  // }
  // console.log(street.y);
  //leftWall.x += 0.1;
  //leftWall.scale.x -= .1;
  // leftWall.scale.y -= .1;

}