
function displayCardNumberOnTopOfCard(scene, cardPosition, numberOfCards, fontSize, textSetOriginX, textSetOriginY, circleOffsetX = 0, circleOffsetY = 0) {
  let graphics = scene.add.graphics();
  graphics.fillStyle = 0x000000;
  graphics.fillCircle(cardPosition.x + circleOffsetX, cardPosition.y + circleOffsetY, 20);

  let cardText = scene.add.text(cardPosition.x, cardPosition.y, numberOfCards, { fontSize });
  cardText.setOrigin(textSetOriginX, 0.5 + textSetOriginY); // this centers the text in the card
  return [graphics, cardText];
}



export {
  displayCardNumberOnTopOfCard
};
