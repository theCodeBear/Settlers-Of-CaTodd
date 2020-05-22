import Phaser from 'phaser';
import { BRICK, WOOD, SHEEP, WHEAT, ORE, KNIGHT, ROAD_BUILDING, YEAR_OF_PLENTY, MONOPOLY, VICTORY_POINT } from '../globalConstants';


const CARD_POSITIONS = {
  [BRICK]: { x: 0, y: 0 },
  [WOOD]: { x: 0, y: 160 },
  [SHEEP]: { x: 0, y: 320 },
  [WHEAT]: { x: 0, y: 480 },
  [ORE]: { x: 0, y: 640 },

  [KNIGHT]: { x: 200, y: 480 },
  [ROAD_BUILDING]: { x: 200, y: 640 },
  [YEAR_OF_PLENTY]: { x: 330, y: 640 },
  [MONOPOLY]: { x: 460, y: 640 },
  [VICTORY_POINT]: { x: 590, y: 640 }
};

const NEXT_CARD_OFFSET_X = 10;
const NEXT_CARD_OFFSET_Y = 5;
const SCALE_CARDS = 0.7;
const EMPTY_DECK_ALPHA = 0.4;

const MAX_CARDS_TO_SHOW = 3;

export default class PlayerDeck {
  constructor(scene) {
    this.container = scene.add.container(50, 100);
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

  showEmptyCardPile(scene, imageKey) {
    const cardPosition = {
      x: CARD_POSITIONS[imageKey].x,
      y: CARD_POSITIONS[imageKey].y
    };
    let cardShadow = scene.add.image(cardPosition.x, cardPosition.y, imageKey)
    cardShadow.setScale(SCALE_CARDS).setOrigin(0, 0);
    cardShadow.alpha = EMPTY_DECK_ALPHA;
    this.container.add(cardShadow);
  }

  addCard(scene, imageKey, updatedNumberOfCardType) {

    let numberOfCardsForOffset = updatedNumberOfCardType > MAX_CARDS_TO_SHOW ? MAX_CARDS_TO_SHOW : updatedNumberOfCardType;
    let uiArray = [];
    let shadowOffset = { x: -7, y: 5 };
    const cardPosition = {
      x: CARD_POSITIONS[imageKey].x + (numberOfCardsForOffset - 1) * NEXT_CARD_OFFSET_X,
      y: CARD_POSITIONS[imageKey].y + (numberOfCardsForOffset - 1) * NEXT_CARD_OFFSET_Y
    };

    if (updatedNumberOfCardType <= MAX_CARDS_TO_SHOW) {
      let cardShadow = scene.add.image(cardPosition.x + shadowOffset.x, cardPosition.y + shadowOffset.y, imageKey)
      cardShadow.setScale(SCALE_CARDS).setOrigin(0, 0);
      cardShadow.tint = 0x000000;
      cardShadow.alpha = 0.6;
      uiArray = uiArray.concat(cardShadow);

      let cardImage = scene.add.image(cardPosition.x, cardPosition.y, imageKey)
      cardImage.setScale(SCALE_CARDS).setOrigin(0, 0);
      uiArray = uiArray.concat(cardImage);
    }

    let graphics = scene.add.graphics();
    graphics.fillStyle = 0x000000;
    graphics.fillCircle(cardPosition.x + 45, cardPosition.y + 67, 20);
    uiArray = uiArray.concat(graphics);

    let cardText = scene.add.text(cardPosition.x, cardPosition.y, updatedNumberOfCardType, { fontSize: '32px' });
    cardText.setOrigin(-1.8, -1.5); // this somehow centers the text in the card
    uiArray = uiArray.concat(cardText);

    this.container.add(uiArray);
  }

}
