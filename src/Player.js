import Phaser from 'phaser';

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


export default class Player {
  constructor(scene, playerDeck) {
    this.scene = scene;
    this.playerDeck = playerDeck;

    this.points = 0;

    this[BRICK_CARD_KEY] = 0;
    this[SHEEP_CARD_KEY] = 0;
    this[WHEAT_CARD_KEY] = 0;
    this[WOOD_CARD_KEY] = 0;
    this[ORE_CARD_KEY] = 0;

    this.knight = 0;
    this.monopoly = 0;
    this.yearOfPlenty = 0;
    this.roadBuilding = 0;
    this.victoryPoint = 0;

    this.knightsPlayed = 0;

    this.largestArmy = false;
    this.longestRoad = false;

    this.settlements = 0;
    this.unusedSettlements = 5;
    this.cities = 0;
    this.unusedCities = 4;
    this.road = 0;
    this.unusedRoads = 15;

    // somehow keep track of what tiles I have settlements and cities on
  }

  get resourceCardsNum() {
    return this[BRICK_CARD_KEY] + this[SHEEP_CARD_KEY] + this[WHEAT_CARD_KEY] + this[WOOD_CARD_KEY] + this[ORE_CARD_KEY];
  }

  get developmentCardsNum() {
    return this.knights + this.monopoly + this.yearOfPlenty + this.roadBuilding + this.victoryPoints;
  }

  getKnightsPlayed() {
    return this.knightsPlayed;
  }

  // display for opponents
  get publicPointsDisplay() {
    return this.points - this.victoryPoint;
  }

  // display for this player
  get privatePointsDisplay() {
    return this.points;
  }

  addResourceCard(resourceCardKey) {
    this[resourceCardKey] += 1;
    this.playerDeck.createResourceCard(this.scene, resourceCardKey, this[resourceCardKey]);
  }

  removeResourceCard(resource) {
    this[resource] -= 1;
  }

  addDevelopmentCard(devCard) {
    this[devCard] += 1;
  }

  removeDevelopmentCard(devCard) {
    this[devCard] -= 1;
  }

  playKnightCard() {
    if (this.knight === 0) return;
    this.knightsPlayed += 1;
    this.removeResourceCard(KNIGHT_KEY);
    // knight logic??
  }

  playMonopolyCard() {
    if (this.monopoly === 0) return;
    this.removeResourceCard(MONOPOLY_KEY);
    // monopoly logic??
  }

  playYearOfPlentyCard() {
    if (this.yearOfPlenty === 0) return;
    this.removeResourceCard(YEAR_OF_PLENTY_KEY);
    // year of plenty logic??
  }

  playRoadBuildingCard() {
    if (this.roadBuilding === 0) return;
    this.removeResourceCard(ROAD_BUILDING_KEY);
    // road building logic??
  }

  // playVictoryPointCard() {
  //   if (this.knight === 0) return;
  //   this.knightsPlayed += 1;
  //   this.removeResourceCard(KNIGHT_KEY);
  //   // victory point logic??
  // }

  buildSettlement() {
    if (this.unusedSettlements === 0) return;
    this.settlements += 1;
    this.unusedSettlements -= 1;
    this.addPoints();
    // build settlement logic
  }

  buildCity() {
    if (this.unusedCities === 0) return;
    this.cities += 1;
    this.unusedCities -= 1;
    this.settlements -= 1;
    this.unusedSettlements += 1;
    this.addPoints();
    // build city logic
  }

  buildRoad() {
    if (this.unusedRoads === 0) return;
    this.roads += 1;
    this.unusedRoads -= 1;
    // build road logic
  }

  getLargestArmy() {
    if (this.largestArmy) return;
    this.largestArmy = true;
    this.addPoint(2);
    // logic...
  }

  loseLargestArmy() {
    if (!this.largestArmy) return;
    this.largestArmy = false;
    this.subtractTwoPoints();
    // logic...
  }

  getLongestRoad() {
    if (this.longestRoad) return;
    this.longestRoad = true;
    this.addPoints(2);
    // logic...
  }

  loseLongestRoad() {
    if (!this.longestRoad) return;
    this.longestRoad = false;
    this.subtractTwoPoints();
    // logic...
  }

  addPoints(newPoints = 1) {
    this.points += newPoints;
    if (this.points >= 10) {
      // winning logic
    }
  }

  subtractTwoPoints() {
    this.points -= 2;
  }

}
