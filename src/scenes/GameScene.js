import Phaser from 'phaser';
import images from '../assetImports';
import Player from '../Player';
import PlayerDeck from '../ui/PlayerDeck';


const WOOD_KEY = 'wood';
const DESERT_KEY = 'desert';
const BRICK_KEY = 'brick';
const SHEEP_KEY = 'sheep';
const WHEAT_KEY = 'wheat';
const ORE_KEY = 'ore';

const BRICK_CARD_KEY = 'brickCard';
const SHEEP_CARD_KEY = 'sheepCard';
const WHEAT_CARD_KEY = 'wheatCard';
const WOOD_CARD_KEY = 'woodCard';
const ORE_CARD_KEY = 'oreCard';

const KNIGHT_KEY = 'knight';
const VICTORY_POINT_KEY = 'victoryPoint';
const MONOPOLY_KEY = 'monopoly';
const ROAD_BUILDING_KEY = 'roadBuilding';
const YEAR_OF_PLENTY_KEY = 'yearOfPlenty';

const TILES_IN_GAME = 19;
const DESERT_CANT_BE_ROLLED = 0;

const BOARD_MIDDLELEFT_X_COORD = 600;
const BOARD_MIDDLELEFT_Y_COORD = 450;
const TILE_X_FULL_OFFSET = 173;
const TILE_Y_FULL_OFFSET = 150;


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.redoBoardButon;
    this.player;
    this.playerDeck;
    this.boardTileData = [];
    this.tileContainers = [];
    this.resources = [
      DESERT_KEY,
      ORE_KEY, ORE_KEY, ORE_KEY,
      BRICK_KEY, BRICK_KEY, BRICK_KEY,
      SHEEP_KEY, SHEEP_KEY, SHEEP_KEY, SHEEP_KEY,
      WHEAT_KEY, WHEAT_KEY, WHEAT_KEY, WHEAT_KEY,
      WOOD_KEY, WOOD_KEY, WOOD_KEY, WOOD_KEY,
    ];
    this.resourceNumbers = [
      2,
      3, 3,
      4, 4,
      5, 5,
      6, 6,
      8, 8,
      9, 9,
      10, 10,
      11, 11,
      12
    ];
    this.numberDots = {
      '2': 1,
      '3': 2,
      '4': 3,
      '5': 4,
      '6': 5,
      '8': 5,
      '9': 4,
      '10': 3,
      '11': 2,
      '12': 1
    }
    this.resourceCards = {
      [ORE_KEY]: 19,
      [BRICK_KEY]: 19,
      [SHEEP_KEY]: 19,
      [WHEAT_KEY]: 19,
      [WOOD_KEY]: 19
    };
    this.developmentCards = {
      [KNIGHT_KEY]: 14,
      [MONOPOLY_KEY]: 2,
      [ROAD_BUILDING_KEY]: 2,
      [YEAR_OF_PLENTY_KEY]: 2,
      [VICTORY_POINT_KEY]: 5
    };
  }

  preload() {
    this.load.image(WOOD_KEY, images.forest);
    this.load.image(DESERT_KEY, images.desert);
    this.load.image(SHEEP_KEY, images.sheep);
    this.load.image(BRICK_KEY, images.brick);
    this.load.image(WHEAT_KEY, images.wheat);
    this.load.image(ORE_KEY, images.ore);

    this.load.image(BRICK_CARD_KEY, images.brickCard);
    this.load.image(SHEEP_CARD_KEY, images.sheepCard);
    this.load.image(WHEAT_CARD_KEY, images.wheatCard);
    this.load.image(WOOD_CARD_KEY, images.woodCard);
    this.load.image(ORE_CARD_KEY, images.oreCard);
  }

  create() {
    this.cameras.main.setBackgroundColor('#37d');
    this.makeGameBoard();
    this.createRedoBoard
    this.createRedoBoardButton();
    console.log('resource cards', this.resourceCards);
    console.log('dev cards', this.developmentCards);

    this.playerDeck = new PlayerDeck(this);
    this.player = new Player(this, this.playerDeck);

    this.player.addResourceCard(BRICK_CARD_KEY);
    this.player.addResourceCard(BRICK_CARD_KEY);
    this.player.addResourceCard(BRICK_CARD_KEY);
    this.player.addResourceCard(BRICK_CARD_KEY);
    this.player.addResourceCard(BRICK_CARD_KEY);
    this.player.addResourceCard(SHEEP_CARD_KEY);
    this.player.addResourceCard(SHEEP_CARD_KEY);
    // this.player.addResourceCard(WHEAT_CARD_KEY);
    this.player.addResourceCard(WOOD_CARD_KEY);
    // this.player.addResourceCard(ORE_CARD_KEY);
  }

  update() {
  }


  // OTHER CLASS METHODS

  createRedoBoardButton() {
    this.redoBoardButton = this.add.text(50, 50, 'Redo Board', { fontSize: '32px', fill: '#000' });
    this.redoBoardButton
      .setInteractive()
      .on('pointerover', () => this.redoBoardButtonHoverState())
      .on('pointerout', () => this.redoBoardButtonRestState())
      .on('pointerdown', () => {
        console.log('clicked redo');
        this.makeGameBoard();
      });
  }

  redoBoardButtonHoverState() {
    this.redoBoardButton.setStyle({ fill: '#ff8c00' });
    document.body.style.cursor = 'pointer';
  }

  redoBoardButtonRestState() {
    this.redoBoardButton.setStyle({ fill: '#000' });
    document.body.style.cursor = 'default';
  }

  makeGameBoard() {
    this.boardTileData = this.createBoardPositions();
    console.log('board:', this.boardTileData);
    let tiles = this.createAllTiles();
    console.log('tiles:', tiles);
    this.drawBoard();
  }

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
    this.boardTileData.forEach((tile, i) => {
      this.tileContainers = this.tileContainers.concat(this.add.container(tile.coordX, tile.coordY));
      let tileImage = this.add.image(0, 0, tile.resource);
      this.tileContainers[i].add(tileImage);

      let graphics = this.add.graphics();

      if (tile.resource !== DESERT_KEY) {
        graphics.fillStyle(0xffffff, 0.8);
        graphics.fillCircle(0, 0, 35);
        this.addResourceNumbersToGraphicTiles(graphics, tile, i);
      }
    });
  }

  addResourceNumbersToGraphicTiles(graphics, tileData, index) {
    const textStyle = { fontSize: '32px', color: tileData.number === 6 || tileData.number === 8 ? '#ff8c00' : '#000' };
    const resourceNumberText = this.add.text(0, 0, tileData.number, textStyle);
    resourceNumberText.setOrigin(0.5, 0.5);

    this.createNumberDots(graphics, tileData.number);

    this.tileContainers[index].add(graphics);
    this.tileContainers[index].add(resourceNumberText);
  }

  createNumberDots(graphics, resourceNumber) {
    const numberOfDots = this.numberDots[resourceNumber];
    let color, xOffset, yOffset = 20, radius = 2, alpha = 1.0;
    for (let i = 0; i < numberOfDots; i++) {
      color = resourceNumber === 6 || resourceNumber === 8 ? 0xff8c00 : 0x000000;
      xOffset = (i * 6) - ((numberOfDots - 1) * 3);
      graphics.fillStyle(color, alpha);
      graphics.fillCircle(xOffset, yOffset, radius);
    }
  }

  // custom class methods...
  createAllTiles() {
    let tiles = [];
    let resources = this.resources.slice();
    let resourceNumbers = this.resourceNumbers.slice();
    let resourcesLeft = TILES_IN_GAME;

    this.boardTileData.forEach(tile => {
      let resourceIndex = pickRandomTile(resourcesLeft);
      let resourceNumbersIndex = pickRandomTile(resourcesLeft - 1); // minus 1 because there is no desert resource number

      let { coordX, coordY } = calculateTilePixelCoords(tile.x, tile.y);

      if (resources[resourceIndex] === DESERT_KEY)
        resourceNumbersIndex = null;

      tiles = tiles.concat(
        Object.assign(tile, {
          coordX,
          coordY,
          resource: resources[resourceIndex],
          number: resourceNumbers[resourceNumbersIndex] || DESERT_CANT_BE_ROLLED
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
