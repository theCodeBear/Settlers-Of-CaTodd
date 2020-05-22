

export default class CardDeck {
  constructor() {
    this.wood = 19;
    this.brick = 19;
    this.sheep = 19;
    this.wheat = 19;
    this.ore = 19;

    this.knights = 14;
    this.victoryPoints = 5;
    this.monopoly = 2;
    this.roadBuilding = 2;
    this.yearOfPlenty = 2;
  }

  howManyWood() {
    return this.wood;
  }

  howManyBrick() {
    return this.wood;
  }

  howManySheep() {
    return this.wood;
  }

  howManyWheat() {
    return this.wood;
  }

  howManyOre() {
    return this.wood;
  }

  howManyKnights() {
    return this.knights;
  }

  howManyVictoryPoints() {
    return this.knights;
  }

  howManyMonopoly() {
    return this.knights;
  }

  howManyRoadBuilding() {
    return this.knights;
  }

  howManyYearOfPlenty() {
    return this.knights;
  }

  removeCards(cardKey, numberOfCards) {
    this[cardKey] -= numberOfCards;
  }

  addCards(cardKey, numberOfCards) {
    this[cardKey] += numberOfCards;
  }

}
