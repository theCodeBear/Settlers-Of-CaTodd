import { displayCardNumberOnTopOfCard } from './ui/uiUtils';
import {
  BRICK, SHEEP, WHEAT, WOOD, ORE,
  KNIGHT, MONOPOLY, YEAR_OF_PLENTY, ROAD_BUILDING, VICTORY_POINT,
  LARGEST_ARMY, LONGEST_ROAD,
  DEV_CARD, EMPTY_DECK_ALPHA
} from './globalConstants';

const SCALE_BANK_CARDS = 0.5;
const BANK_TEXT = "The Bank";
const CARDS_UI_COORDS = {
  [WOOD]: { x: -258.75, y: 0 },
  [BRICK]: { x: -151.25, y: 0 },
  [SHEEP]: { x: -43.75, y: 0 },
  [WHEAT]: { x: 63.75, y: 0 },
  [ORE]: { x: 171.25, y: 0 },
  [DEV_CARD]: { x: -258.75, y: 120 },
};

const OTHER_CARD_UI_COORDS = {
  [LARGEST_ARMY]: { x: 60, y: 120 },
  [LONGEST_ROAD]: { x: 163, y: 120 }
};


export default class CardDeck {
  constructor(scene) {
    this[WOOD] = 19;
    this[BRICK] = 19;
    this[SHEEP] = 19;
    this[WHEAT] = 19;
    this[ORE] = 19;

    this[LARGEST_ARMY] = true;
    this[LONGEST_ROAD] = true;

    this[KNIGHT] = 14;
    this[VICTORY_POINT] = 5;
    this[MONOPOLY] = 2;
    this[ROAD_BUILDING] = 2;
    this[YEAR_OF_PLENTY] = 2;

    this.showEmptyCardPile(scene, WOOD);
    this.showEmptyCardPile(scene, BRICK);
    this.showEmptyCardPile(scene, SHEEP);
    this.showEmptyCardPile(scene, WHEAT);
    this.showEmptyCardPile(scene, ORE);
    this.showEmptyCardPile(scene, DEV_CARD);
  }

  howManyWood() {
    return this[WOOD];
  }

  howManyBrick() {
    return this[BRICK];
  }

  howManySheep() {
    return this[SHEEP];
  }

  howManyWheat() {
    return this[WHEAT];
  }

  howManyOre() {
    return this[ORE];
  }

  howManyDevCards() {
    return this.howManyKnights() + this.howManyMonopoly() + this.howManyVictoryPoints() + this.howManyRoadBuilding() + this.howManyYearOfPlenty();
  }

  howManyKnights() {
    return this[KNIGHT];
  }

  howManyVictoryPoints() {
    return this[VICTORY_POINT];
  }

  howManyMonopoly() {
    return this[MONOPOLY];
  }

  howManyRoadBuilding() {
    return this[ROAD_BUILDING];
  }

  howManyYearOfPlenty() {
    return this[YEAR_OF_PLENTY];
  }

  removeCard(cardKey) {
    if (this[cardKey] === 0) return;
    this[cardKey] -= 1;
  }

  addCards(cardKey, numberOfCards) {
    this[cardKey] += numberOfCards;
  }

  showBankUI(scene) {
    this.showCardsInBank(scene);
    this.show2VPCardsInBank(scene);
  }

  showEmptyCardPile(scene, imageKey) {
    const cardPosition = {
      x: CARDS_UI_COORDS[imageKey].x,
      y: CARDS_UI_COORDS[imageKey].y
    };
    let cardShadow = scene.add.image(cardPosition.x, cardPosition.y, imageKey)
    cardShadow.setScale(SCALE_BANK_CARDS).setOrigin(0, 1);
    cardShadow.alpha = EMPTY_DECK_ALPHA;
    scene.bankCardsUIContainer.add(cardShadow);
  }

  showCardsInBank(scene) {
    const bankText = scene.add.text(0, -100, BANK_TEXT, { fontSize: '32px' });
    bankText.setOrigin(0.5, 1);
    scene.bankCardsUIContainer.add(bankText);
    let bankResourceCards = [];
    let cardImage;
    for (let key in CARDS_UI_COORDS) {
      let numberOfCards = (key !== DEV_CARD) ? this[key] : this.howManyDevCards();
      if (numberOfCards === 0) continue;

      cardImage = scene.add.image(CARDS_UI_COORDS[key].x, CARDS_UI_COORDS[key].y, key);
      cardImage.setScale(SCALE_BANK_CARDS).setOrigin(0, 1);
      bankResourceCards = bankResourceCards.concat(cardImage);
      displayCardNumberOnTopOfCard(scene, CARDS_UI_COORDS[key], numberOfCards, '16px', -16.6, -15, 342, 255, 0);
    }
    scene.bankCardsUIContainer.add(bankResourceCards);
  }

  show2VPCardsInBank(scene) {
    if (this[LARGEST_ARMY])
      this.showLargestArmy(scene);
    if (this[LONGEST_ROAD])
      this.showLongestRoad(scene);
  }

  showLargestArmy(scene) {
    let largestArmyCoords = { x: OTHER_CARD_UI_COORDS[LARGEST_ARMY].x, y: OTHER_CARD_UI_COORDS[LARGEST_ARMY].y };
    let largestArmyCard = scene.add.image(largestArmyCoords.x, largestArmyCoords.y, LARGEST_ARMY);
    largestArmyCard.setScale(0.5).setOrigin(0, 1);
    largestArmyCard.name = LARGEST_ARMY;
    scene.bankCardsUIContainer.add(largestArmyCard);
  }

  showLongestRoad(scene) {
    let longestRoadCoords = { x: OTHER_CARD_UI_COORDS[LONGEST_ROAD].x, y: OTHER_CARD_UI_COORDS[LONGEST_ROAD].y };
    let longestRoadCard = scene.add.image(longestRoadCoords.x, longestRoadCoords.y, LONGEST_ROAD);
    longestRoadCard.setScale(0.5).setOrigin(0, 1);
    longestRoadCard.name = LONGEST_ROAD;
    scene.bankCardsUIContainer.add(longestRoadCard);
  }

  removeLargestArmy(scene) {
    this[LARGEST_ARMY] = false;
    scene.bankCardsUIContainer.getByName(LARGEST_ARMY).setVisible(false);
  }

  removeLongestRoad(scene) {
    this[LONGEST_ROAD] = false;
    scene.bankCardsUIContainer.getByName(LONGEST_ROAD).setVisible(false);
  }

}
