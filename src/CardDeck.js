import { BRICK, SHEEP, WHEAT, WOOD, ORE, KNIGHT, MONOPOLY, YEAR_OF_PLENTY, ROAD_BUILDING, VICTORY_POINT } from './globalConstants';

export default class CardDeck {
  constructor() {
    this[WOOD] = 19;
    this[BRICK] = 19;
    this[SHEEP] = 19;
    this[WHEAT] = 19;
    this[ORE] = 19;

    this[KNIGHT] = 14;
    this[VICTORY_POINT] = 5;
    this[MONOPOLY] = 2;
    this[ROAD_BUILDING] = 2;
    this[YEAR_OF_PLENTY] = 2;
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

  removeCards(cardKey, numberOfCards) {
    this[cardKey] -= numberOfCards;
  }

  addCards(cardKey, numberOfCards) {
    this[cardKey] += numberOfCards;
  }

}
