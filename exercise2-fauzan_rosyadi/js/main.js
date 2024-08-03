// main.js
import { getComputerChoice, playRound } from './game.js';
import { updateScore, updateMessage } from './ui.js';

// TODO: Select DOM elements

// TODO: Initialize game variables

// TODO: Add event listeners to choice buttons
document.querySelectorAll('button.choice').forEach( node => {
  node.addEventListener('click', (event) => {
    const choice = event.target.dataset.choice;
    game(choice);
  })
})
// Main game logic
function game(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = playRound(playerChoice, computerChoice);
  let msg
  let playerInc = 0;
  let computerInc = 0;
  if (result === 1) {
    msg = 'Player Win';
    playerInc = 1;
  } else if (result === -1) {
    msg = 'Computer Win';
    computerInc = 1
  } else {
    msg = 'Draw!';
  }
  updateMessage(msg, playerChoice, computerChoice);
  updateScore(playerInc, computerInc);
}
