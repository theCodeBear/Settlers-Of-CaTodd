import Phaser from 'phaser';
import { displayCardNumberOnTopOfCard } from './uiUtils';
import { getCardType } from '../utils';
import {
  BRICK, WOOD, SHEEP, WHEAT, ORE,
  KNIGHT, ROAD_BUILDING, YEAR_OF_PLENTY, MONOPOLY, VICTORY_POINT,
  ROAD, SETTLEMENT, CITY,
  EMPTY_DECK_ALPHA, DEVELOPMENT, RESOURCE
} from '../globalConstants';


const DECK_POSITIONS = {
  [BRICK]: { x: -326.25, y: 0 },
  [WOOD]: { x: -191.75, y: 0 },
  [SHEEP]: { x: -57.25, y: 0 },
  [WHEAT]: { x: 77.25, y: 0 },
  [ORE]: { x: 211.75, y: 0 },

  [KNIGHT]: { x: -326.25, y: 0 },
  [ROAD_BUILDING]: { x: -191.75, y: 0 },
  [YEAR_OF_PLENTY]: { x: -57.25, y: 0 },
  [MONOPOLY]: { x: 77.25, y: 0 },
  [VICTORY_POINT]: { x: 211.75, y: 0 },

  [ROAD]: { x: -326, y: 0 },
  [SETTLEMENT]: { x: -100, y: 0 },
  [CITY]: { x: 126, y: 0 },
};

const NEXT_CARD_OFFSET_X = 10;
const NEXT_CARD_OFFSET_Y = 5;
const SCALE_CARDS = 0.7;

const MAX_CARDS_TO_SHOW = 3;

export default class PlayerDeck {
  constructor(scene) {
    let windowHeight = window.innerHeight;
    this.cardContainers = {};
    this.cardContainers[DEVELOPMENT] = scene.add.container(25 + 326.25, windowHeight - 100);
    this.cardContainers[RESOURCE] = scene.add.container(25 + 326.25, windowHeight-300);
    this.piecesContainer = scene.add.container(25 + 326.25, windowHeight-420);

    this.showEmptyCardPile(scene, BRICK);
    this.showEmptyCardPile(scene, WOOD);
    this.showEmptyCardPile(scene, WHEAT);
    this.showEmptyCardPile(scene, SHEEP);
    this.showEmptyCardPile(scene, ORE);

    this.showEmptyCardPile(scene, KNIGHT);
    this.showEmptyCardPile(scene, ROAD_BUILDING);
    this.showEmptyCardPile(scene, YEAR_OF_PLENTY);
    this.showEmptyCardPile(scene, MONOPOLY);
    this.showEmptyCardPile(scene, VICTORY_POINT);
  }

  displayUnitPieces(scene, numberOfUnusedRoads, numberOfUnusedSettlements, numberOfUnusedCities) {
    // ROADS
    let roadSprite = scene.add.image(DECK_POSITIONS[ROAD].x, DECK_POSITIONS[ROAD].y, ROAD).setOrigin(0, 0.5);
    let roadCountText = scene.add.text(-230, 0, `x ${numberOfUnusedRoads}`, { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    this.piecesContainer.add([roadSprite, roadCountText]);

    // SETTLEMENTS
    let settlementSprite = scene.add.image(DECK_POSITIONS[SETTLEMENT].x, DECK_POSITIONS[SETTLEMENT].y, SETTLEMENT).setOrigin(0, 0.5);
    let settlementCountText = scene.add.text(0, 0, `x ${numberOfUnusedSettlements}`, { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    this.piecesContainer.add([settlementSprite, settlementCountText]);

    // CITIES
    let citySprite = scene.add.image(DECK_POSITIONS[CITY].x, DECK_POSITIONS[CITY].y, CITY).setOrigin(0, 0.5).setScale(1.2);
    let cityCountText = scene.add.text(225, 0, `x ${numberOfUnusedCities}`, { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    this.piecesContainer.add([citySprite, cityCountText]);
  }

  showEmptyCardPile(scene, imageKey) {
    const cardPosition = {
      x: DECK_POSITIONS[imageKey].x,
      y: DECK_POSITIONS[imageKey].y
    };
    let cardGhost = scene.add.image(cardPosition.x, cardPosition.y, imageKey)
    cardGhost.setScale(SCALE_CARDS)//.setOrigin(1);
    cardGhost.alpha = EMPTY_DECK_ALPHA;
    cardGhost.setOrigin(0, 0.5);
    let cardType = getCardType(imageKey);

    this.cardContainers[cardType].add(cardGhost);
  }

  addCard(scene, imageKey, updatedNumberOfCardType) {

    let numberOfCardsForOffset = updatedNumberOfCardType > MAX_CARDS_TO_SHOW ? MAX_CARDS_TO_SHOW : updatedNumberOfCardType;
    let uiArray = [];
    let shadowOffset = { x: -7, y: 5 };
    const cardPosition = {
      x: DECK_POSITIONS[imageKey].x + (numberOfCardsForOffset - 1) * NEXT_CARD_OFFSET_X,
      y: DECK_POSITIONS[imageKey].y + (numberOfCardsForOffset - 1) * NEXT_CARD_OFFSET_Y
    };

    if (updatedNumberOfCardType <= MAX_CARDS_TO_SHOW) {
      let cardShadow = scene.add.image(cardPosition.x + shadowOffset.x, cardPosition.y + shadowOffset.y, imageKey)
      cardShadow.setScale(SCALE_CARDS).setOrigin(0, 0.5);
      cardShadow.tint = 0x000000;
      cardShadow.alpha = 0.6;
      uiArray = uiArray.concat(cardShadow);

      let cardImage = scene.add.image(cardPosition.x, cardPosition.y, imageKey)
      cardImage.setScale(SCALE_CARDS)//.setOrigin(0.5, 1.5);
      cardImage.setOrigin(0, 0.5);
      uiArray = uiArray.concat(cardImage);
    }

    let cardNumbersUI = displayCardNumberOnTopOfCard(scene, cardPosition, updatedNumberOfCardType, '32px', -1.8, 0, 45, 0);
    uiArray = uiArray.concat(cardNumbersUI);

    let cardType = getCardType(imageKey);

    this.cardContainers[cardType].add(uiArray);
  }

}
