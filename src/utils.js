import {
  ORE, BRICK, WOOD, WHEAT, SHEEP,
  KNIGHT, MONOPOLY, YEAR_OF_PLENTY, ROAD_BUILDING, VICTORY_POINT,
  DEVELOPMENT, RESOURCE,
  BOARD_MIDDLELEFT_X_COORD, BOARD_MIDDLELEFT_Y_COORD, TILE_X_FULL_OFFSET, TILE_Y_FULL_OFFSET
} from './globalConstants';


function calculateTilePixelCoords(tileXPosition, tileYPosition) {
  const middleXOffset = TILE_X_FULL_OFFSET * tileXPosition;
  const nonMiddleXOffset = (TILE_X_FULL_OFFSET * tileXPosition) + ((TILE_X_FULL_OFFSET / 2) * Math.abs(tileYPosition));
  const tileXOffset = tileYPosition !== 0 ? nonMiddleXOffset : middleXOffset;
  const coordX = BOARD_MIDDLELEFT_X_COORD + tileXOffset;
  const coordY = BOARD_MIDDLELEFT_Y_COORD + (tileYPosition * TILE_Y_FULL_OFFSET);
  return { coordX, coordY };
}

function pickRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function randomizeArray(array) {
  let j;
  let temp;
  let a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}

function buttonHoverState(button) {
  button.setStyle({ fill: '#ff8c00' });
  document.body.style.cursor = 'pointer';
}

function buttonRestState(button, originalTextColor = '#000') {
  button.setStyle({ fill: originalTextColor });
  document.body.style.cursor = 'default';
}

function getCardType(cardKey) {
  switch (cardKey) {
    case ORE:
    case BRICK:
    case WHEAT:
    case WOOD:
    case SHEEP:
      return RESOURCE;
    case KNIGHT:
    case MONOPOLY:
    case ROAD_BUILDING:
    case YEAR_OF_PLENTY:
    case VICTORY_POINT:
      return DEVELOPMENT;
  }
}

export {
  calculateTilePixelCoords,
  pickRandomIndex,
  randomizeArray,
  buttonHoverState,
  buttonRestState,
  getCardType
};