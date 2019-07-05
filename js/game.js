const game = new Phaser.Game(1000, 500, Phaser.AUTO, 'game', {
  preload,
  create,
  update,
  render,
});

function create() {
  if (!startGame) mainMenuCreate();
  else gameCreate();
}

function gameCreate() {
  game.stage.backgroundColor = '#001133';

  // reset the score
  background = game.add.image(0, 0, 'background');
  background.width = game.width;
  background.height = game.height;

  street = game.add.image(-770, game.height * 0.6, 'street');
  street.width = game.width * 3.3;
  street.height = game.height;

  DrawWalls();

  leftWall = game.add.image(-200, -510, 'leftWall');
  leftWall.width = game.width * 0.7;
  leftWall.height = game.height * 2;

  rightWall = game.add.image(game.width / 2, -547, 'rightWall');
  rightWall.width = game.width * 0.7;
  rightWall.height = game.height * 2;

  awning = game.add.image(game.width * 0.565, game.height * 0.37, 'awning');
  awning.width = 200;
  awning.height = 160;

  DrawShadows();

  maxxdaddy.visible = false;

  scoreText = game.add.text(
    game.world.centerX,
    game.height * 0.95,
    'SCORE: 0',
    {
      fontSize: '18px',
      fill: '#eee',
    },
  );
}
function DrawWalls() {
  bmd = game.make.bitmapData(game.width, game.height);
  bmd.addToWorld();
  var ctx = bmd.context;
  ctx.moveTo(0, 0);
  ctx.lineTo(game.world.centerX, game.world.centerY);
  ctx.lineTo(0, game.world.centerY);
  ctx.fill();
  ctx.closePath();
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

  shadowOffsetUp = 300;
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
  ctx.moveTo(game.world.centerX, game.world.centerY);
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

  shadowOffsetUp = 300;
  shadowOffsetDown = 100;

  ctx.beginPath();
  ctx.moveTo(game.world.centerX, game.world.centerY);
  ctx.lineTo(
    game.world.centerX + shadowOffsetLeft,
    game.world.centerY - shadowOffsetUp,
  );
  ctx.lineTo(
    game.world.centerX + shadowOffsetRight,
    game.world.centerY + shadowOffsetDown,
  );
  ctx.fill();
  ctx.closePath();
}
// the game loop. Game logic lives in here.
// is called every frame
function update() {
  if (!startGame) {
    mainMenuUpdate();
    return;
  }
}

function clearLevel() {}

function restart() {}

function render() {
  //if (level1bkgd != null)
  //  game.debug.body(level1bkgd);
  //  game.debug.bodyInfo(player, 32, 132);
  //  game.debug.body(player);
  // bricks.forEach(brick => {
  //   game.debug.body(brick);
  // });
  // guards.forEach(guard => {
  //   game.debug.body(guard);
  // });
}

function restartGame() {
  game.state.start(game.state.current);
}
