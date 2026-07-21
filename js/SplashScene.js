const Phaser = globalThis.Phaser;

export class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SplashScene' });
  }

  preload() {
    this.load.image('splash', 'assets/images/splash.png');
  }

  create() {
    const { width, height } = this.scale;

    this.add.image(width / 2, height / 2, 'splash')
      .setDisplaySize(width, height);

    this.add.rectangle(width / 2, 78, width, 156, 0x001133, 0.62);

    this.add.text(width / 2, 18, 'Fubar Presents...', {
      fontFamily: 'Fontdiner Swanky, Cooper Black, serif',
      fontSize: '22px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(width / 2, 78, 'DRUNK MAN WALKING', {
      fontFamily: 'Fontdiner Swanky, Cooper Black, serif',
      fontSize: '62px',
      color: '#ff6a00',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5);

    const prompt = this.add.text(width / 2, height - 42, 'CLICK TO START', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '25px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#001133',
      strokeThickness: 6
    }).setOrigin(0.5);

    this.tweens.add({
      targets: prompt,
      alpha: 0.35,
      duration: 650,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    this.input.once('pointerdown', this.startGame, this);
    this.input.keyboard.once('keydown', this.startGame, this);
  }

  startGame() {
    if (this.starting) {
      return;
    }

    this.starting = true;
    this.input.enabled = false;
    this.cameras.main.fadeOut(350, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene');
    });
  }
}
