import Game from './main';

const textInput = document.querySelector('#playerName');
const playButton = document.querySelector('#playButton');

let playerName = '';

textInput.addEventListener('keyup', (e) => {
  playerName = e.target.value;
  if (playerName.length > 1)
    playButton.style.display = 'block';
  else
    playButton.style.display = 'none';
});

playButton.addEventListener('click', () => {
  Game.scene.keys['starting-menu-scene'].startMainGame(playerName);
  textInput.style.display = 'none';
  playButton.style.display = 'none';
});