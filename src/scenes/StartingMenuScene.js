import Phaser from 'phaser';

export default class StartingMenuScene extends Phaser.Scene {
  constructor() {
    super('starting-menu-scene');
  }

  create() {
    this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 4,
      'Settlers of CaTodd',
      { fontSize: '64px', fill: '#fff' }
    ).setOrigin(0.5);
  }

  startMainGame(playerName) {
    this.scene.start('game-scene', { playerName });
  }

}
