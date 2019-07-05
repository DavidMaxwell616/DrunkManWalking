function mainMenuCreate() {
    maxxdaddy = game.add.image(game.width * 0.85, game.height * 0.95, 'maxxdaddy');

  game.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function mainMenuUpdate() {
  if (game.spaceKey.isDown) {
    gameCreate();
    startGame = true;
  }
}