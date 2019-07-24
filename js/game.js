var config = {
  width: 1000,
  height: 500,
  type: Phaser.AUTO,
  backgroundColor: '#001133',
  parent: 'game',
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

var game = new Phaser.Game(config);

function create() {
  if (!startGame) mainMenuCreate(this);
  else gameCreate();
}

function gameCreate() {
  // reset the score
  // background = game.add.image(0, 0, 'background');
  // background.width = game.width;
  // background.height = game.height;
  street = this.add.sprite(840, 500, 'street1').play('streetMove');

  //const walls = this.add.image(420, 250, 'walls');
  //walls.setScale(2);

  leftWall = this.add.sprite(-500, -267, 'leftWall1').play('leftWallMove');

  rightWall = this.add.sprite(1500, -267, 'rightWall1').play('rightWallMove');

  // var shadow = this.add.graphics();
  // shadow.fillStyle(0x000000);
  // shadow.fillRect(430, 270, 120, 50);
  DrawShadows(this);

  street = game.add.image(game.world.centerX, game.world.centerY, 'street');
  street.anchor.x = .4;
  street.anchor.y = 0;

  // walls = game.add.image(0, 0, 'walls');
  // walls.width = game.width;
  // walls.height = game.height;

  // leftWall = game.add.image(-200, -510, 'leftWall');
  // leftWall.width = game.width * 0.7;
  // leftWall.height = game.height * 2;

  // rightWall = game.add.image(game.width / 2, -547, 'rightWall');
  // rightWall.width = game.width * 0.7;
  // rightWall.height = game.height * 2;

  // awning = game.add.image(game.width * 0.565, game.height * 0.37, 'awning');
  // awning.width = 200;
  // awning.height = 160;

  // DrawShadows();

  maxxdaddy.visible = false;

  bodyandlegs = game.add.image(game.world.centerX, game.world.centerY, 'body&legs');
  bodyandlegs.anchor.x = 0.5;
  bodyandlegs.anchor.y = 0;

  //arms = game.add.image(game.world.centerX, 300, 'arms');
  head = game.add.image(game.world.centerX + 10, game.world.centerY - 30, 'head');
  head.anchor.set(0.5);

  rightArm3 = game.add.image(game.world.centerX - 35, game.world.centerY + 25, 'rightArm3');
  rightArm3.anchor.set(0.5);

  leftArm = game.add.image(game.world.centerX + 43, game.world.centerY + 35, 'leftArm');
  leftArm.anchor.set(0.5);

  bottle = game.add.image(game.world.centerX + 70, game.world.centerY + 55, 'bottle');
  bottle.anchor.set(0.5);

  start = game.add.image(game.world.centerX - 70, game.world.centerY, 'start');
  start.anchor.set(0.5);
  start.inputEnabled = true;
  start.events.onInputDown.add(startWalking => walking = true, this);

  scoreText = game.add.text(
    game.world.centerX,
    game.height * 0.95,
    'SCORE: 0', {
      fontSize: '18px',
      fill: '#eee',
    },
  );
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
    mainMenuUpdate(this);
    return;
  }
  if (!walking)
    return;
  street.x = game.world.centerX;
  street.y -= .01;
  streetShrink -= .01
  //console.log(streetShrink);
  if (streetShrink < 0.5) {
    streetShrink = 1;
  }
  street.scale.setTo(streetShrink, streetShrink);
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