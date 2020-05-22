import Phaser from 'phaser';
import StartingMenuScene from './scenes/StartingMenuScene';
import GameScene from './scenes/GameScene';


const config = {
  type: Phaser.AUTO,
  // width: 1600,
  // height: 920,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [StartingMenuScene, GameScene]
};

export default new Phaser.Game(config);
