import { GameScene } from './GameScene.js';
import { SplashScene } from './SplashScene.js';

const Phaser = globalThis.Phaser;

const config = {
  width: 1000,
  height: 500,
  type: Phaser.AUTO,
  backgroundColor: '#001133',
  parent: 'game',
  scene: [SplashScene, GameScene]
};

new Phaser.Game(config);
