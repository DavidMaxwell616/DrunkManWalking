function mainMenuCreate(game) {
  maxxdaddy = game.add.image(game.width * 0.85, game.height * 0.95, 'maxxdaddy');
}

function mainMenuUpdate(game) {
  game.input.keyboard.on('keyup_SPACE', (event) => {
    gameCreate();
    startGame = true;
  });
}