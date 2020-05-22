
const BOARD_MIDDLELEFT_X_COORD = 650;
const BOARD_MIDDLELEFT_Y_COORD = 450;
const TILE_X_FULL_OFFSET = 173;
const TILE_Y_FULL_OFFSET = 150;


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

export {
  calculateTilePixelCoords,
  pickRandomIndex,
  randomizeArray
};