function preload() {
  game.load.crossOrigin = 'anonymous';

  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.refresh();

  // game.load.image('splash', '../assets/images/splash.png');
  game.load.image('maxxdaddy', '../assets/images/maxxdaddy.gif');
  game.load.image('background', '../assets/images/background.png');
  game.load.image('walls', '../assets/images/walls.png');
  game.load.image('leftWall', '../assets/images/left wall.png');
  game.load.image('rightWall', '../assets/images/right wall.png');
  game.load.image('street', '../assets/images/road.png');
  game.load.image('awning', '../assets/images/awning.png');

}