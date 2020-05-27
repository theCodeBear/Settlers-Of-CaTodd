import Phaser from 'phaser';
import {
  LARGEST_ARMY, LONGEST_ROAD
} from '../globalConstants';

const PLAYER_DISPLAY_WIDTH = 250;

export default class PlayerTotalsDisplay {
  constructor(name, place, color, scene) {
    this.container = scene.add.container(0, place * 300);
    this.playerOrder = place;
    this.color = color;
    this.name = name;
    this.points = 0;
    this.resourceCards = 0;
    this.developmentCards = 0;
    this.longestRoadSize = 0;
    this.largestArmySize = 0;
    this[LARGEST_ARMY] = false;
    this[LONGEST_ROAD] = false;
  }

  // setPlayerOrder(place) {
  //   this.playerOrder = place;
  // }

  setName(name) {
    this.name = name;
  }

  setPoints(points) {
    this.points = points;
  }

  setResourceCards(cardNumber) {
    this.resourceCards = cardNumber;
  }

  setDevelopmentCards(cardNumber) {
    this.developmentCards = cardNumber;
  }

  setLongestRoadSize(mostRoads) {
    this.longestRoadSize = mostRoads;
  }

  setLargestArmySize(knightsPlayed) {
    this.largestArmySize = knightsPlayed;
  }

  setHasLargestArmy(hasLargestArmy) {
    this[LARGEST_ARMY] = hasLargestArmy;
  }

  setHasLongestRoad(hasLongestRoad) {
    this[LONGEST_ROAD] = hasLongestRoad;
  }

  displayPlayer(scene, numberOfPlayers) {
    let startingX = this.playerOrder * (window.innerWidth / numberOfPlayers) + 25;

    let graphics = scene.add.graphics();
    graphics.fillStyle(this.color, 0.85);
    graphics.fillRect(startingX-25, 0, window.innerWidth / numberOfPlayers, 120);

    let name = scene.add.text(startingX, 0, this.name, { fontSize: '26px' });
    let points = scene.add.text(startingX + 350, 0, `VP ${this.points}`, { fontSize: '26px' });
    let resourceCards = scene.add.text(startingX, 60, `Cards: ${this.resourceCards}`, { fontSize: '20px' });
    let DevelopmentCards = scene.add.text(startingX, 90, `Dev: ${this.developmentCards}`, { fontSize: '20px' });
    let longestRoad = scene.add.text(startingX + 120, 60, `R: ${this.longestRoadSize}`, { fontSize: '20px', color: this[LONGEST_ROAD] ? '#ff8c00' : '#fff' });
    let army = scene.add.text(startingX + 120, 90, `A: ${this.largestArmySize}`, { fontSize: '20px', color: this[LARGEST_ARMY] ? '#ff8c00' : '#fff' });
    if (this[LONGEST_ROAD])
      scene.add.image(startingX + 310, 80, LONGEST_ROAD).setScale(0.3);
    if (this[LARGEST_ARMY])
      scene.add.image(startingX + 390, 80, LARGEST_ARMY).setScale(0.3);
  }

}
