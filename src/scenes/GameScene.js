import Phaser from 'phaser';
import images from '../assetImports';


const FOREST_KEY = 'forest';
const DESERT_KEY = 'desert';
const BRICK_KEY = 'brick';
const SHEEP_KEY = 'sheep';
const WHEAT_KEY = 'wheat';
const ORE_KEY = 'ore';

const TILES_IN_GAME = 19;
const DESERT_SEVEN = 7;

const BOARD_MIDDLELEFT_X_COORD = 200;
const BOARD_MIDDLELEFT_Y_COORD = 500;
const TILE_X_FULL_OFFSET = 173;
const TILE_Y_FULL_OFFSET = 150;


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.board = undefined;
    this.resources = [
      DESERT_KEY,
      ORE_KEY, ORE_KEY, ORE_KEY,
      BRICK_KEY, BRICK_KEY, BRICK_KEY,
      SHEEP_KEY, SHEEP_KEY, SHEEP_KEY, SHEEP_KEY,
      WHEAT_KEY, WHEAT_KEY, WHEAT_KEY, WHEAT_KEY,
      FOREST_KEY, FOREST_KEY, FOREST_KEY, FOREST_KEY,
    ];
    this.resourceNumbers = [
      2,
      3, 3,
      4, 4,
      5, 5,
      6, 6,
      // 7,
      8, 8,
      9, 9,
      10, 10,
      11, 11,
      12
    ];
  }

  preload() {
    this.load.image(FOREST_KEY, images.forest);
    this.load.image(DESERT_KEY, images.desert);
    this.load.image(SHEEP_KEY, images.sheep);
    this.load.image(BRICK_KEY, images.brick);
    this.load.image(WHEAT_KEY, images.wheat);
    this.load.image(ORE_KEY, images.ore);
  }

  create() {
    this.cameras.main.setBackgroundColor('#37d');
    this.board = this.createBoardPositions();
    console.log('board:', this.board);
    let tiles = this.createAllTiles();
    console.log('tiles:', tiles);
    this.drawBoard();
    this.addResourceNumbersToGraphicTiles();
  }

  update() {
  }


  // OTHER CLASS METHODS

  createBoardPositions() {
    // starts on left middle tile at 0,0. Only x and y are final values.
    let board = [
      { coordX: 0, coordY: 0, x: 0, y: 0, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 1, y: 0, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 2, y: 0, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 3, y: 0, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 4, y: 0, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 0, y: -1, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 1, y: -1, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 2, y: -1, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 3, y: -1, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 0, y: -2, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 1, y: -2, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 2, y: -2, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 0, y: 1, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 1, y: 1, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 2, y: 1, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 3, y: 1, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 0, y: 2, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 1, y: 2, resource: '', number: 0 },
      { coordX: 0, coordY: 0, x: 2, y: 2, resource: '', number: 0 }
    ];
    return board;
  }

  drawBoard() {
    this.board.forEach(tile =>
      this.add.image(tile.coordX, tile.coordY, tile.resource)
    );
  }

  // custom class methods...
  createAllTiles() {
    let tiles = [];
    let resources = this.resources.slice();
    let resourceNumbers = this.resourceNumbers.slice();
    let resourcesLeft = TILES_IN_GAME;

    this.board.forEach(tile => {
      let resourceIndex = pickRandomTile(resourcesLeft);
      let resourceNumbersIndex = pickRandomTile(resourcesLeft);
      let { coordX, coordY } = calculateTilePixelCoords(tile.x, tile.y);

      if (resources[resourceIndex] === DESERT_KEY)
        resourceNumbersIndex = null;

      tiles = tiles.concat(
        Object.assign(tile, {
          coordX,
          coordY,
          resource: resources[resourceIndex],
          number: resourceNumbers[resourceNumbersIndex] || DESERT_SEVEN
        })
      );

      const desertWasntChosen = resourceNumbersIndex !== null;
      resources.splice(resourceIndex, 1);
      if (desertWasntChosen)
        resourceNumbers.splice(resourceNumbersIndex, 1);

      resourcesLeft--;
    });

    return tiles;
  }

  addResourceNumbersToGraphicTiles() {

  }

}


// methods outside of class

function calculateTilePixelCoords(tileXPosition, tileYPosition) {
  const middleXOffset = TILE_X_FULL_OFFSET * tileXPosition;
  const nonMiddleXOffset = (TILE_X_FULL_OFFSET * tileXPosition) + ((TILE_X_FULL_OFFSET / 2) * Math.abs(tileYPosition));
  const tileXOffset = tileYPosition !== 0 ? nonMiddleXOffset : middleXOffset;
  const coordX = BOARD_MIDDLELEFT_X_COORD + tileXOffset;
  const coordY = BOARD_MIDDLELEFT_Y_COORD + (tileYPosition * TILE_Y_FULL_OFFSET);
  return { coordX, coordY };
}

function pickRandomTile(totalTiles) {
  return Math.floor(Math.random() * totalTiles);
}
