import { preload as preloadGame } from './preload.js';

const Phaser = globalThis.Phaser;

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });

    this.score = 0;
    this.highScore = 0;
    this.standing = true;
    this.corrector = 0;
    this.randomizer = 0;
    this.factor = 0;
    this.rotation = 0;
    this.wobble = 3;
    this.fluctuation = 1;
    this.wobbleThreshold = 200;
    this.fallAngle = 0.7;
    this.walking = false;
    this.drinkCount = 0;
    this.drinking = false;
    this.drunkX = 0;
    this.gracePeriod = 100;
    this.localStorageName = 'drunkmanwalking';
    this.nextTalkAt = 0;
    this.finishRevealScore = 130;
    this.finishScore = 150;
    this.hasWon = false;
  }

  preload() {
    preloadGame.call(this);
  }

  create() {
    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;

    this.add.image(420, 250, 'walls').setScale(2);
    this.street = this.add.image(-734, 315, 'street').setOrigin(0, 0);
    this.street.setScale(1, 1);
    this.streetTween = this.tweens.add({
      targets: this.street,
      scale: .64,
      x: -309,
      y: 308,
      ease: 'Linear',
      paused: true,
      repeat: -1,
      yoyo: false,
      duration: 2500,
    });

    this.leftWall = this.add.sprite(-1473, -1340, 'leftWall').setOrigin(0, 0).setScale(1, 1);
    this.leftWallTween = this.tweens.add({
      targets: this.leftWall,
      scale: .07,
      x: 296,
      y: 190,
      ease: function (t) {
        return Math.pow(Math.sin(t * 1), 1);
      },
      repeat: -1,
      yoyo: false,
      paused: true,
      duration: 7500,
    });

    this.rightWall = this.add.sprite(456, -1220, 'rightWall').setOrigin(0, 0).setScale(1, 1);
    this.rightWallTween = this.tweens.add({
      targets: this.rightWall,
      scale: .065,
      x: 450,
      y: 200,
      ease: function (t) {
        return Math.pow(Math.sin(t * 1), 1);
      },
      repeat: -1,
      paused: true,
      yoyo: false,
      duration: 7500,
    });

    //  this.add.image(320, 210, 'buildings').setOrigin(0, 0).setScale(.5);

    this.DrawShadows(this);

    const drawDoorTrapezoid = (points, color, alpha = 1) => {
      const shape = this.add.graphics();
      shape.fillStyle(color, alpha);
      shape.beginPath();
      shape.moveTo(points[0][0], points[0][1]);
      points.slice(1).forEach(([x, y]) => shape.lineTo(x, y));
      shape.closePath();
      shape.fillPath();
      return shape;
    };

    const doorwayGlow = drawDoorTrapezoid(
      [[-45, -48], [43, -60], [43, 60], [-45, 51]],
      0xff6a00,
      0.22
    );
    const pavementGlow = drawDoorTrapezoid(
      [[-46, 46], [43, 58], [43, 112], [-116, 70]],
      0xff6a00,
      0.16
    );
    const pavementLight = drawDoorTrapezoid(
      [[-28, 51], [29, 57], [29, 96], [-87, 64]],
      0xffa12b,
      0.22
    );
    const doorwayFrame = drawDoorTrapezoid(
      [[-34, -41], [32, -51], [32, 60], [-34, 52]],
      0x111111
    );
    const doorwayLight = drawDoorTrapezoid(
      [[-25, -35], [23, -43], [23, 55], [-25, 49]],
      0xff7b19
    );
    const doorwayCore = drawDoorTrapezoid(
      [[-17, -30], [15, -36], [15, 50], [-17, 45]],
      0xffc04d,
      0.8
    );
    const homeSign = this.add.text(-2, -68, 'HOME', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold italic',
      color: '#ffb13b',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5).setRotation(-0.2).setScale(0.82, 1);

    this.finishDoor = this.add.container(875, 293, [pavementGlow, pavementLight, doorwayGlow, doorwayFrame, doorwayLight, doorwayCore, homeSign]);
    this.finishDoor.setScale(1.35);
    this.finishDoor.visible = false;

    this.awning = this.add.sprite(this.centerX + 180, this.centerY + 40, 'awning').setScale(.3, .3);
    this.createAwningTween(true);

    const walkingHeadImage = this.add.image(0, 0, 'head');
    this.smileMouth = this.add.image(-5, 20, 'smile');
    this.talkingMouth = this.add.ellipse(-5, 23, 14, 7, 0x001133);
    this.talkingMouth.visible = false;
    this.head = this.add.container(0, -130, [walkingHeadImage, this.smileMouth, this.talkingMouth]);
    this.head.name = "head";
    const standingHeadImage = this.add.image(0, 0, 'head');
    this.standingSmileMouth = this.add.image(-5, 20, 'smile');
    this.head2 = this.add.container(0, -130, [standingHeadImage, this.standingSmileMouth]);
    this.head3 = this.add.image(0, -130, 'head');
    this.leftArm = this.add.image(40, -70, 'leftArm');
    this.leftArm2 = this.add.image(40, -70, 'leftArm');
    this.leftArm.name = "leftArm";
    this.leftArm3 = this.add.image(20, -105, 'drinking');
    this.leftArm3.name = "drinking";
    this.bottle = this.add.image(70, -50, 'bottle');
    this.bottle.name = "bottle";
    this.bottle2 = this.add.image(70, -50, 'bottle');
    this.rightArm = this.add.image(-25, -95, 'rightArm').setOrigin(1, 0);
    this.rightArm2 = this.add.image(-25, -95, 'rightArm2').setOrigin(1, 0);
    this.rightArm3 = this.add.image(-25, -95, 'rightArm').setOrigin(1, 0);
    this.body = this.add.image(-10, -70, 'body');
    this.body.name = "body";
    this.legs = this.add.sprite(-10, 30, 'legs');
    this.legs.name = "legs";
    this.body2 = this.add.image(-10, -70, 'body');
    this.bodyandlegs = this.add.image(-10, -10, 'body&legs');
    this.bodyandlegs.name = "body&legs";


    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('legs', {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    this.start = this.add.image(-120, -110, 'start');
    this.start.name = 'start';
    this.start.setInteractive();
    this.input.on('gameobjectdown', this.onObjectClicked, this);
    this.drunkX = this.centerX;
    this.drunkardWalking = this.add.container(this.drunkX, this.centerY + 100, [this.body, this.legs, this.head, this.leftArm, this.rightArm, this.bottle, this.leftArm3]);
    this.drunkardWalking.setSize(64, 64);
    var child = this.drunkardWalking.getByName('drinking');
    child.visible = false;
    this.drunkardWalking.visible = false;
    this.drunkardStanding = this.add.container(this.drunkX, this.centerY + 100, [this.bodyandlegs, this.head2, this.leftArm2, this.rightArm2, this.start, this.bottle2]);
    this.drunkardStanding.setSize(64, 64);
    // drunkardStanding.visible = false;
    // awning.visible = false;
    this.startover = this.add.image(800, 350, 'startover');
    this.startover.visible = false;
    this.startover.name = 'startover';
    this.startover.setInteractive();

    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontFamily: 'arial',
      fontSize: '32px',
      fontStyle: 'bold',
      fill: '#ff4500'
    });
    this.buzzText = this.add.text(16, 46, 'Buzz: 0', {
      fontFamily: 'arial',
      fontSize: '32px',
      fontStyle: 'bold',
      fill: '#ff4500'
    });
    this.gameOverText = this.add.text(this.centerX - 100, this.centerY - 100, 'GAME OVER\nYour Score: 0\nHigh Score: 0', {
      fontFamily: 'arial',
      fontSize: '32px',
      fontStyle: 'bold',
      fill: '#ff4500'
    });
    this.gameOverText.visible = false;
    this.highScore = localStorage.getItem(this.localStorageName) == null ? 0 :
      localStorage.getItem(this.localStorageName);

    this.falling = this.add.sprite(0, 0, 'falling1')
    this.falling.visible = false;
    this.maxxdaddy = this.add.image(this.game.config.width * 0.9, this.game.config.height * 0.95, 'maxxdaddy');

    this.crashSound = this.sound.add('crash', { volume: 0.8 });
    this.drinkingSound = this.sound.add('drinkingSound', { volume: 0.8 });
    this.snoreSound = this.sound.add('snore', { loop: true, volume: 0.65 });
    this.beforeStartMusic = this.sound.add('beforeStart', { loop: true, volume: 0.55 });
    this.betweenRoundsMusic = this.sound.add('betweenRounds', { loop: true, volume: 0.55 });
    this.talkSounds = [
      this.sound.add('talk1', { volume: 0.8 }),
      this.sound.add('talk2', { volume: 0.8 }),
      this.sound.add('talk3', { volume: 0.8 })
    ];
    this.beforeStartMusic.play();

    this.input.mouse.capture = true;
  }



  onObjectClicked(pointer, gameObject) {
    if (gameObject.name == 'start') {
      this.beforeStartMusic.stop();
      this.betweenRoundsMusic.stop();
      this.walking = true;
      this.scheduleNextTalk();
    } else if (gameObject.name == 'startover') {
      this.stopCharacterSounds();
      this.walking = true;
      this.scheduleNextTalk();
      this.drunkardStanding.visible = false;
      this.drunkardWalking.visible = true;
      this.streetTween.resume();
      this.leftWallTween.resume();
      this.rightWallTween.resume();
      this.createAwningTween(false);
      this.legs.anims.play('walk', true);
      this.falling.visible = false;
      this.gameOverText.visible = false;
      this.wobbleThreshold = 200;
      this.hasWon = false;
      this.finishDoor.visible = false;
      this.finishDoor.setPosition(1000, 293).setScale(1.35);
      this.startover.visible = false;
      this.standing = true;
      this.corrector = 0;
      this.randomizer = 0;
      this.factor = 0;
      this.rotation = 0;
      this.guyRotation = 0;
      this.wobble = 3;
      this.fluctuation = 1;
      this.score = 0;
      this.gracePeriod = 100;
      this.repositionBody();
    }
  }

  repositionBody() {
    this.drunkardWalking.rotation = 0;
    this.rightArm.rotation = 0;
    this.head.rotation = 0;
    this.body.rotation = 0;
    this.legs.rotation = 0;
  }

  createAwningTween(paused) {
    if (this.awningTween) {
      this.awningTween.stop();
    }

    this.awning.setPosition(this.centerX + 180, this.centerY + 40).setScale(0.3);
    this.awningTween = this.tweens.add({
      targets: this.awning,
      scale: 0,
      x: this.centerX - 50,
      y: this.centerY + 55,
      ease: 'Quad.easeOut',
      repeat: 0,
      yoyo: false,
      paused,
      duration: 20000
    });
  }

  scheduleNextTalk() {
    this.nextTalkAt = this.time.now + Phaser.Math.Between(6000, 14000);
  }

  playRandomTalk() {
    const talkIsPlaying = this.talkSounds.some((sound) => sound.isPlaying);

    if (this.time.now < this.nextTalkAt || talkIsPlaying || this.drinking) {
      return;
    }

    Phaser.Utils.Array.GetRandom(this.talkSounds).play();
    this.scheduleNextTalk();
  }

  updateTalkingMouth() {
    const talkIsPlaying = this.talkSounds.some((sound) => sound.isPlaying);
    this.talkingMouth.visible = talkIsPlaying;
    this.smileMouth.visible = !talkIsPlaying;

    if (talkIsPlaying) {
      const openAmount = 0.45 + Math.abs(Math.sin(this.time.now / 85)) * 0.8;
      this.talkingMouth.setScale(1, openAmount);
    }
  }

  stopCharacterSounds() {
    this.drinkingSound.stop();
    this.snoreSound.stop();
    this.beforeStartMusic.stop();
    this.betweenRoundsMusic.stop();
    this.talkSounds.forEach((sound) => sound.stop());
    this.talkingMouth.visible = false;
    this.smileMouth.visible = true;
  }

  onFallAnimationComplete() {
    if (!this.walking && !this.snoreSound.isPlaying) {
      this.snoreSound.play();
    }
  }

  updateFinishLine() {
    if (this.score < this.finishRevealScore) {
      return;
    }

    const progress = Phaser.Math.Clamp(
      (this.score - this.finishRevealScore) / (this.finishScore - this.finishRevealScore),
      0,
      1
    );

    const scale = Phaser.Math.Linear(1.35, 0.08, progress);
    const finishX = this.centerX - 43 * scale;
    const x = Phaser.Math.Linear(875, finishX, progress);
    const buildingBaseY = Phaser.Math.Linear(374, 320, progress);

    this.finishDoor.visible = true;
    this.finishDoor.setPosition(x, buildingBaseY - 60 * scale);
    this.finishDoor.setScale(scale);
  }

  hasReachedFinishLine() {
    if (!this.finishDoor.visible) {
      return false;
    }

    const doorwayRightEdge = this.finishDoor.x + 43 * this.finishDoor.scaleX;
    const playerFeetX = this.drunkardWalking.x;
    return doorwayRightEdge <= playerFeetX + 2;
  }

  winGame() {
    if (this.hasWon) {
      return;
    }

    this.hasWon = true;
    this.walking = false;
    this.standing = false;
    this.score = this.finishScore;
    this.updateFinishLine();
    this.stopCharacterSounds();
    this.betweenRoundsMusic.play();
    this.streetTween.pause();
    this.awningTween.pause();
    this.leftWallTween.pause();
    this.rightWallTween.pause();
    this.legs.anims.stop();
    this.drunkardWalking.rotation = 0;
    this.drunkardWalking.x = this.finishDoor.x + 43 * this.finishDoor.scaleX;

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem(this.localStorageName, this.highScore);
    }

    this.gameOverText.setText('YOU MADE IT HOME!\nScore: ' + this.score + '\nHigh Score: ' + this.highScore);
    this.gameOverText.visible = true;
    this.startover.visible = true;
  }

  DrawShadows(game) {

    var bmd = game.textures.createCanvas('shadows', 1000, 500);
    const ctx = bmd.getContext('2d');
    let shadowOffsetLeft = 490;
    let shadowOffsetRight = 820;
    let shadowOffsetUp = 100;
    let shadowOffsetDown = 150;

    //ground shadow

    let centerX = game.game.config.width / 2;
    let centerY = game.game.config.height / 2;

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

    shadowOffsetLeft = 320;
    shadowOffsetRight = 330;
    shadowOffsetUp = 270;
    shadowOffsetDown = 100;

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
    ctx.moveTo(centerX, centerY);
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
    shadowOffsetUp = 495;
    shadowOffsetDown = 100;
    centerX = game.game.config.width / 2;

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

  update() {
    if (!this.walking)
      return;

    this.playRandomTalk();
    this.updateTalkingMouth();
    this.updateFinishLine();
    this.drunkardStanding.visible = false;
    this.drunkardWalking.visible = true;
    if (this.streetTween.paused) {
      this.streetTween.resume();
      this.awningTween.resume();
      this.leftWallTween.resume();
      this.rightWallTween.resume();
      this.legs.anims.play('walk', true);
    }
    // let moveX = this.input.x+Lean;
    // stagger(moveX);
    var x = this.input.activePointer.isDown ? this.input.activePointer.downX : this.input.x;
    if (this.gracePeriod == 0)
      this.stagger(x);
    else this.gracePeriod--;
  }


  stagger(mouseX) {
    let centerX = this.game.config.width / 2;

    if (this.standing) {
      this.timeToDrink = Math.floor(Math.random() * 1000);

      this.randomizer = Math.random() * 2 - 1;
      this.wobble -= 0.5;
      if (this.wobble < 3) {
        this.wobble = 3;
        this.fluctuation = 0.25;
      }

      this.score += .1;
      this.updateFinishLine();
      if (this.hasReachedFinishLine()) {
        this.winGame();
        return;
      }
      if (Math.floor(this.score) % 20 == 0)
        this.wobbleThreshold += 1;
      if (this.corrector < this.randomizer)
        this.corrector += .1;
      if (this.corrector > this.randomizer)
        this.corrector -= .1;
      this.factor = (mouseX - centerX) / 40 + this.rotation / this.wobble;

      const talkIsPlaying = this.talkSounds.some((sound) => sound.isPlaying);
      if (this.timeToDrink > 990 && !this.drinking && !talkIsPlaying) {
        this.drunkardWalking.getByName('drinking').setVisible(true);
        this.drunkardWalking.getByName('leftArm').setVisible(false);
        this.drunkardWalking.getByName('bottle').setVisible(false);
        this.drinking = true;
        this.drinkingSound.play();
      }
      if (this.drinking) {
        this.drinkCount++;
        if (this.drinkCount > 100) {
          this.drunkardWalking.getByName('drinking').setVisible(false);
          this.drunkardWalking.getByName('leftArm').setVisible(true);
          this.drunkardWalking.getByName('bottle').setVisible(true);
          this.drinking = false;
          this.drinkingSound.stop();
          if (this.wobbleThreshold > 0)
            this.wobbleThreshold -= 25;
          this.drinkCount = 0;
        }
      }
      this.rotation += (this.rotation + this.factor + this.corrector) / this.wobbleThreshold; // * fluctuation;
      this.drunkardWalking.rotation = this.rotation;
      this.buzz = (200 - this.wobbleThreshold) / 200 * 100;
      this.scoreText.setText('score: ' + Math.floor(this.score));
      this.buzzText.setText('buzz: ' + Math.floor(this.buzz) + '%');
      this.head.rotation = this.drunkardWalking.rotation * -1;
      this.rightArm.rotation = this.drunkardWalking.rotation * 2;
      this.legs.rotation = this.drunkardWalking.rotation / 2 * -1;
      this.drunkardWalking.x = centerX + this.drunkardWalking.rotation;
      if (Math.abs(this.drunkardWalking.rotation) > this.fallAngle) {
        this.drunkardWalking.visible = false;
        this.falling.y = this.drunkardWalking.y;
        if (this.drunkardWalking.rotation > 0) {
          this.falling.setScale(-1, 1);
          this.falling.x = this.drunkardWalking.x + 50;
        } else {
          this.falling.setScale(1, 1);
          this.falling.x = this.drunkardWalking.x - 50;
        }
        this.falling.visible = true;
        this.stopCharacterSounds();
        this.crashSound.play();
        this.betweenRoundsMusic.play();
        this.falling.once('animationcomplete', this.onFallAnimationComplete, this);
        this.falling.play('falling');
        this.streetTween.pause();
        this.awningTween.pause();
        this.leftWallTween.pause();
        this.rightWallTween.pause();
        this.gameOverText.visible = true;
        this.score = Math.floor(this.score);
        localStorage.setItem(this.localStorageName, this.highScore);
        if (this.score > this.highScore)
          this.highScore = this.score;
        this.gameOverText.setText('GAME OVER\nYour Score: ' + this.score + '\nHigh Score: ' + this.highScore);
        this.startover.visible = true;
        this.rotation = 0;
        this.standing = false;
        this.walking = false;
      }

    }
  }

}
