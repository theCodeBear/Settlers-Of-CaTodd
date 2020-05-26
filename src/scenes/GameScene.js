import Phaser from 'phaser';
import assets from '../assetImports';
import Player from '../Player';
import PlayerDeck from '../ui/PlayerDeck';
import CardDeck from '../CardDeck';
import {
  calculateTilePixelCoords,
  pickRandomIndex,
  randomizeArray,
  buttonHoverState,
  buttonRestState
} from '../utils';
import {
  DESERT_TILE_IMG, ORE_TILE_IMG, BRICK_TILE_IMG, SHEEP_TILE_IMG, WHEAT_TILE_IMG, WOOD_TILE_IMG,
  DESERT_TILE_COLOR, ORE_TILE_COLOR, BRICK_TILE_COLOR, SHEEP_TILE_COLOR, WHEAT_TILE_COLOR, WOOD_TILE_COLOR,
  ORE, BRICK, WOOD, WHEAT, SHEEP,
  KNIGHT, MONOPOLY, YEAR_OF_PLENTY, ROAD_BUILDING, VICTORY_POINT,
  ROAD, SETTLEMENT, CITY,
  DEV_CARD, IMAGE, COLOR, OCEAN, BACKGROUND_COLOR
} from '../globalConstants';


const TILES_IN_GAME = 19;
const DESERT_CANT_BE_ROLLED = 0;


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.redoBoardButton;
    this.tileStyleChanger;
    this.player;
    this.playerDeck;
    this.cardDeck;
    this.bankCardsUIContainer;
    this.boardTileData = [];
    this.tileContainers = [];
    this.tileImageKeys = [];
    this.tileStyle;
    this.backgroundColorImage;
    this.backgroundOceanImage;
    this.backgroundStyle = IMAGE;
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
      [ORE]: 19,
      [BRICK]: 19,
      [SHEEP]: 19,
      [WHEAT]: 19,
      [WOOD]: 19
    };
    this.developmentCards = {
      [KNIGHT]: 14,
      [MONOPOLY]: 2,
      [ROAD_BUILDING]: 2,
      [YEAR_OF_PLENTY]: 2,
      [VICTORY_POINT]: 5
    };
  }

  init({ playerName }) {
    this.playerName = playerName;
  }

  preload() {
    // resource tile image sprites
    this.load.image(WOOD_TILE_IMG, assets.woodTileImg);
    this.load.image(DESERT_TILE_IMG, assets.desertTileImg);
    this.load.image(SHEEP_TILE_IMG, assets.sheepTileImg);
    this.load.image(BRICK_TILE_IMG, assets.brickTileImg);
    this.load.image(WHEAT_TILE_IMG, assets.wheatTileImg);
    this.load.image(ORE_TILE_IMG, assets.oreTileImg);
    // resource tile color sprites
    this.load.image(WOOD_TILE_COLOR, assets.woodTileColor);
    this.load.image(DESERT_TILE_COLOR, assets.desertTileColor);
    this.load.image(SHEEP_TILE_COLOR, assets.sheepTileColor);
    this.load.image(BRICK_TILE_COLOR, assets.brickTileColor);
    this.load.image(WHEAT_TILE_COLOR, assets.wheatTileColor);
    this.load.image(ORE_TILE_COLOR, assets.oreTileColor);
    // resource card images
    this.load.image(BRICK, assets.brickCard);
    this.load.image(SHEEP, assets.sheepCard);
    this.load.image(WHEAT, assets.wheatCard);
    this.load.image(WOOD, assets.woodCard);
    this.load.image(ORE, assets.oreCard);
    // development card images
    this.load.image(KNIGHT, assets.knightCard);
    this.load.image(ROAD_BUILDING, assets.roadBuildingCard);
    this.load.image(MONOPOLY, assets.monopolyCard);
    this.load.image(YEAR_OF_PLENTY, assets.yearOfPlentyCard);
    this.load.image(VICTORY_POINT, assets.victoryPointCard);
    // back of development card
    this.load.image(DEV_CARD, assets.devCard)
    // backgrounds
    this.load.image(OCEAN, assets.ocean);
    this.load.image(BACKGROUND_COLOR, assets.backgroundColor);
    // player pieces
    this.load.image(ROAD, assets.greenRoad);
    this.load.image(SETTLEMENT, assets.greenSettlement);
    this.load.image(CITY, assets.greenCity);
  }

  create() {
    this.initBackground();
    this.switchTileStyles();
    this.createBackgroundStyleToggle();
    this.makeGameBoard();
    this.createMenuButtons();
    console.log('resource cards', this.resourceCards);
    console.log('dev cards', this.developmentCards);

    this.bankCardsUIContainer = this.add.container(50 + 258.75, window.innerHeight - 650).setSize(517.5, 250);
    this.playerDeck = new PlayerDeck(this);
    this.cardDeck = new CardDeck(this);
    this.player = new Player(this, this.playerDeck, this.playerName);

    this.cardDeck.showBankUI(this);

    this.player.addResourceCard(BRICK, this.cardDeck);
    this.player.addResourceCard(BRICK, this.cardDeck);
    this.player.addResourceCard(BRICK, this.cardDeck);
    this.player.addResourceCard(BRICK, this.cardDeck);
    this.player.addResourceCard(BRICK, this.cardDeck);
    this.player.addResourceCard(SHEEP, this.cardDeck);
    this.player.addResourceCard(SHEEP, this.cardDeck);
    this.player.addResourceCard(WHEAT, this.cardDeck);
    this.player.addResourceCard(WOOD, this.cardDeck);
    this.player.addResourceCard(ORE, this.cardDeck);

    this.player.addDevelopmentCard(KNIGHT, this.cardDeck);
    this.player.addDevelopmentCard(ROAD_BUILDING, this.cardDeck);
    this.player.addDevelopmentCard(ROAD_BUILDING, this.cardDeck);
    this.player.addDevelopmentCard(ROAD_BUILDING, this.cardDeck);

    this.cardDeck.removeCard(YEAR_OF_PLENTY);

    this.manuallyUpdate();
  }

  // update() {
  // }


  // OTHER CLASS METHODS

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
      { coordX: 0, coordY: 0, x: 0, y: 0, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 1, y: 0, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 2, y: 0, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 3, y: 0, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 4, y: 0, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 0, y: -1, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 1, y: -1, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 2, y: -1, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 3, y: -1, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 0, y: -2, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 1, y: -2, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 2, y: -2, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 0, y: 1, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 1, y: 1, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 2, y: 1, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 3, y: 1, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 0, y: 2, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 1, y: 2, imageKeyIndex: 0, number: 0 },
      { coordX: 0, coordY: 0, x: 2, y: 2, imageKeyIndex: 0, number: 0 }
    ];
    return board;
  }

  createAllTiles() {
    let tiles = [];
    let tileImageKeyIndices = randomizeArray([...Array(19).keys()]);
    let resourceNumbers = this.resourceNumbers.slice();
    let resourcesLeft = TILES_IN_GAME;

    this.boardTileData.forEach((tile, i) => {
      let resourceNumbersIndex = pickRandomIndex(resourcesLeft - 1); // minus 1 because there is no desert resource number

      let { coordX, coordY } = calculateTilePixelCoords(tile.x, tile.y);

      // if desert tile key was chosen, set dice numbers index to null
      if (this.tileImageKeys[tileImageKeyIndices[i]] === DESERT_TILE_IMG || this.tileImageKeys[tileImageKeyIndices[i]] === DESERT_TILE_COLOR)
        resourceNumbersIndex = null;
      // set dice number to randomly chosen number or 0 (which won't be displayed) if desert tile was chosen
      const number = resourceNumbers[resourceNumbersIndex] || DESERT_CANT_BE_ROLLED;

      tiles = tiles.concat(
        this.setOneTileData(tile, coordX, coordY, tileImageKeyIndices[i], number)
      );

      // if desert wasn't chosen remove dice number from local dice numbers array
      const desertWasntChosen = resourceNumbersIndex !== null;
      if (desertWasntChosen)
        resourceNumbers.splice(resourceNumbersIndex, 1);

      resourcesLeft--;
    });

    return tiles;
  }

  drawBoard() {
    let tileImageKey;
    this.boardTileData.forEach((tile, i) => {
      this.tileContainers = this.tileContainers.concat(this.add.container(tile.coordX, tile.coordY));
      tileImageKey = this.tileImageKeys[tile.imageKeyIndex];
      let tileImage = this.add.image(0, 0, tileImageKey);
      this.tileContainers[i].add(tileImage);

      let graphics = this.add.graphics();

      if (tileImageKey !== DESERT_TILE_IMG && tileImageKey !== DESERT_TILE_COLOR) {
        graphics.fillStyle(0x000000, 0.9);
        graphics.fillCircle(0, 0, 35);
        this.addResourceNumbersToGraphicTiles(graphics, tile, i);
      }
    });
  }

  addResourceNumbersToGraphicTiles(graphics, tileData, index) {
    const textStyle = { fontSize: '32px', color: tileData.number === 6 || tileData.number === 8 ? '#ff8c00' : '#fff' };
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

  manuallyUpdate() {
    this.cardDeck.showBankUI(this);
  }

  createMenuButtons() {
    this.createRedoBoardButton();
    this.createTileStyleToggle();
  }

  // switch between color and image textures for tiles, update the tile data, redraw the game board
  switchTileStyles() {
    if (!this.tileStyle || this.tileStyle === COLOR) {
      this.tileStyle = IMAGE;
      this.tileImageKeys = [
        DESERT_TILE_IMG,
        ORE_TILE_IMG, ORE_TILE_IMG, ORE_TILE_IMG,
        BRICK_TILE_IMG, BRICK_TILE_IMG, BRICK_TILE_IMG,
        SHEEP_TILE_IMG, SHEEP_TILE_IMG, SHEEP_TILE_IMG, SHEEP_TILE_IMG,
        WHEAT_TILE_IMG, WHEAT_TILE_IMG, WHEAT_TILE_IMG, WHEAT_TILE_IMG,
        WOOD_TILE_IMG, WOOD_TILE_IMG, WOOD_TILE_IMG, WOOD_TILE_IMG,
      ];
    } else {
      this.tileStyle = COLOR;
      this.tileImageKeys = [
        DESERT_TILE_COLOR,
        ORE_TILE_COLOR, ORE_TILE_COLOR, ORE_TILE_COLOR,
        BRICK_TILE_COLOR, BRICK_TILE_COLOR, BRICK_TILE_COLOR,
        SHEEP_TILE_COLOR, SHEEP_TILE_COLOR, SHEEP_TILE_COLOR, SHEEP_TILE_COLOR,
        WHEAT_TILE_COLOR, WHEAT_TILE_COLOR, WHEAT_TILE_COLOR, WHEAT_TILE_COLOR,
        WOOD_TILE_COLOR, WOOD_TILE_COLOR, WOOD_TILE_COLOR, WOOD_TILE_COLOR,
      ];
    }
    this.boardTileData = this.boardTileData.map(tile => this.setOneTileData(tile, tile.coordX, tile.coordY, tile.imageKeyIndex, tile.number));
    this.drawBoard();
  }

  switchBackgroundStyles() {
    if (this.backgroundStyle === COLOR) {
      this.backgroundStyle = IMAGE;
      this.backgroundOceanImage.visible = true;
    } else {
      this.backgroundStyle = COLOR;
      this.backgroundOceanImage.visible = false;
    }
  }

  // draw plain color and image texture backgrounds (image texture on top so it will display)
  initBackground() {
    this.backgroundColorImage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, BACKGROUND_COLOR);
    let scaleX = this.cameras.main.width / this.backgroundColorImage.width;
    let scaleY = this.cameras.main.height / this.backgroundColorImage.height;
    let scale = Math.max(scaleX, scaleY);
    this.backgroundColorImage.setScale(scale).setScrollFactor(0);

    this.backgroundOceanImage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, OCEAN);
    scaleX = this.cameras.main.width / this.backgroundOceanImage.width;
    scaleY = this.cameras.main.height / this.backgroundOceanImage.height;
    scale = Math.max(scaleX, scaleY);
    this.backgroundOceanImage.setScale(scale).setScrollFactor(0);
  }

  createTileStyleToggle() {
    this.tileStyleChanger = this.add.text(900, 0, 'Change Tile Style', { fontSize: '32px', fill: '#000' });
    this.tileStyleChanger
      .setInteractive()
      .on('pointerover', () => buttonHoverState(this.tileStyleChanger))
      .on('pointerout', () => buttonRestState(this.tileStyleChanger))
      .on('pointerdown', () => this.switchTileStyles());
  }

  createBackgroundStyleToggle() {
    this.backgroundStyleChanger = this.add.text(1300, 0, 'Change Background Style', { fontSize: '32px', fill: '#000' });
    this.backgroundStyleChanger
      .setInteractive()
      .on('pointerover', () => buttonHoverState(this.backgroundStyleChanger))
      .on('pointerout', () => buttonRestState(this.backgroundStyleChanger))
      .on('pointerdown', () => this.switchBackgroundStyles());
  }

  createRedoBoardButton() {
    this.redoBoardButton = this.add.text(900, 50, 'Redo Board', { fontSize: '32px', fill: '#000' });
    this.redoBoardButton
      .setInteractive()
      .on('pointerover', () => buttonHoverState(this.redoBoardButton))
      .on('pointerout', () => buttonRestState(this.redoBoardButton))
      .on('pointerdown', () => this.makeGameBoard());
  }

  setOneTileData(tileDataObj, coordX, coordY, imageKeyIndex, number) {
    return Object.assign(tileDataObj, {
      coordX,
      coordY,
      imageKeyIndex,
      number
    });
  }

}
