import Phaser from 'phaser';
import GameScene from './scenes/GameScene';


const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 1000,
  scene: [GameScene]
};

export default new Phaser.Game(config);
