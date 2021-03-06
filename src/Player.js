import Phaser from 'phaser';
import { BRICK, SHEEP, WHEAT, WOOD, ORE, KNIGHT, MONOPOLY, YEAR_OF_PLENTY, ROAD_BUILDING, VICTORY_POINT } from './globalConstants';


export default class Player {
  constructor(scene, playerDeck, cardDeck, name) {
    this.scene = scene;
    this.name = name;
    this.playerDeck = playerDeck;
    this.cardDeck = cardDeck;

    this.points = 0;
    this.turnNumber = scene.players.findIndex(player => player.name === name);

    // resource cards
    this[BRICK] = 0;
    this[SHEEP] = 0;
    this[WHEAT] = 0;
    this[WOOD] = 0;
    this[ORE] = 0;

    // dev cards
    this[KNIGHT] = 0;
    this[MONOPOLY] = 0;
    this[YEAR_OF_PLENTY] = 0;
    this[ROAD_BUILDING] = 0;
    this[VICTORY_POINT] = 0;

    this.knightsPlayed = 0;

    this.largestArmy = false;
    this.longestRoad = false;

    this.settlements = 0;
    this.unusedSettlements = 5;
    this.cities = 0;
    this.unusedCities = 4;
    this.road = 0;
    this.unusedRoads = 15;

    this.playerDeck.displayUnitPieces(scene, this.unusedRoads, this.unusedSettlements, this.unusedCities);

    // somehow keep track of what tiles I have settlements and cities on
  }

  get resourceCardsNum() {
    return this[BRICK] + this[SHEEP] + this[WHEAT] + this[WOOD] + this[ORE];
  }

  get developmentCardsNum() {
    return this[KNIGHT] + this[MONOPOLY] + this[YEAR_OF_PLENTY] + this[ROAD_BUILDING] + this[VICTORY_POINT];
  }

  getKnightsPlayed() {
    return this.knightsPlayed;
  }

  // display for opponents
  get publicPointsDisplay() {
    return this.points - this[VICTORY_POINT];
  }

  // display for this player
  get privatePointsDisplay() {
    return this.points;
  }

  addResourceCard(resourceCardKey, gameCardDeck) {
    this[resourceCardKey] += 1;
    this.playerDeck.addCard(this.scene, resourceCardKey, this[resourceCardKey]);
    gameCardDeck.removeCard(resourceCardKey);
  }

  removeResourceCard(resource) {
    this[resource] -= 1;
  }

  addDevelopmentCard(devCardKey, gameCardDeck) {
    this[devCardKey] += 1;
    this.playerDeck.addCard(this.scene, devCardKey, this[devCardKey]);
    gameCardDeck.removeCard(devCardKey);
  }

  useDevelopmentCard(devCard, gameCardDeck) {
    this[devCard] -= 1;
    if (devCard === KNIGHT) this.playKnightCard();
    if (devCard === MONOPOLY) this.playMonopolyCard();
    if (devCard === YEAR_OF_PLENTY) this.playYearOfPlentyCard();
    if (devCard === ROAD_BUILDING) this.playRoadBuildingCard();
  }

  playKnightCard() {
    if (this.knight === 0) return;
    this.knightsPlayed += 1;
    this.removeResourceCard(KNIGHT);
    // knight logic??
  }

  playMonopolyCard() {
    if (this.monopoly === 0) return;
    this.removeResourceCard(MONOPOLY);
    // monopoly logic??
  }

  playYearOfPlentyCard() {
    if (this.yearOfPlenty === 0) return;
    this.removeResourceCard(YEAR_OF_PLENTY);
    // year of plenty logic??
  }

  playRoadBuildingCard() {
    if (this.roadBuilding === 0) return;
    this.removeResourceCard(ROAD_BUILDING);
    // road building logic??
  }

  // playVictoryPointCard() {
  //   if (this[KNIGHT] === 0) return;
  //   this.knightsPlayed += 1;
  //   this.removeResourceCard(KNIGHT);
  //   // victory point logic??
  // }

  buildSettlement() {
    if (this.unusedSettlements === 0) return;
    this.settlements += 1;
    this.unusedSettlements -= 1;
    this.addPoints(this.scene);
    // build settlement logic
  }

  buildCity() {
    if (this.unusedCities === 0) return;
    this.cities += 1;
    this.unusedCities -= 1;
    this.settlements -= 1;
    this.unusedSettlements += 1;
    this.addPoints(this.scene);
    // build city logic
  }

  buildRoad() {
    if (this.unusedRoads === 0) return;
    this.roads += 1;
    this.unusedRoads -= 1;
    // build road logic
  }

  getNumberOfUnusedRoads() {
    return this.unusedRoads;
  }

  getNumberOfUnusedSettlements() {
    return this.unusedSettlements;
  }

  getNumberOfUnusedCities() {
    return this.unusedCities;
  }

  getLargestArmy(scene) {
    if (this.largestArmy) return;
    this.largestArmy = true;
    this.addPoints(this.scene, 2);
    // if in bank, remove from bank
    this.cardDeck.removeLargestArmy(scene);
    scene.players[this.turnNumber].setHasLargestArmy(true);
    // otherwise tell player who has it of event
  }

  loseLargestArmy() {
    if (!this.largestArmy) return;
    this.largestArmy = false;
    this.subtractTwoPoints();
    // logic...
  }

  getLongestRoad(scene) {
    if (this.longestRoad) return;
    this.longestRoad = true;
    this.addPoints(this.scene, 2);
    // if in bank, remove from bank
    this.cardDeck.removeLongestRoad(scene);
    scene.players[this.turnNumber].setHasLongestRoad(true);
    // otherwise tell player who has it of event
  }

  loseLongestRoad() {
    if (!this.longestRoad) return;
    this.longestRoad = false;
    this.subtractTwoPoints();
    // logic...
  }

  addPoints(scene, newPoints = 1) {
    this.points += newPoints;
    scene.players[this.turnNumber].setPoints(this.points);
    if (this.points >= 10) {
      // winning logic
    }
  }

  subtractTwoPoints(scene) {
    this.points -= 2;
    scene.players[this.turnNumber].setPoints(this.points);
  }

}
