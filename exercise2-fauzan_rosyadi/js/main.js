// main.js
import { getComputerChoice, playRound, hasWinner } from './game.js';
import { updateScore, updateMessage, resetGame, stopGame } from './ui.js';


const savedPlayerScore = parseInt(window.localStorage.getItem('playerScore') || '0');
const savedComputerScore = parseInt(window.localStorage.getItem('computerScore') || '0');

updateScore(savedPlayerScore, savedComputerScore);
const check = hasWinner(savedPlayerScore, savedComputerScore);
if (check > 0) stopGame(check);

document.querySelectorAll('button.choice').forEach( node => {
  node.addEventListener('click', (event) => {
    const choice = event.target.dataset.choice;
    game(choice);
  })
})

document.querySelector('#reset-game').addEventListener('click', resetGame);
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
  
  const currentPlayerScore = parseInt(window.localStorage.getItem('playerScore') || '0');
  const currentComputerScore = parseInt(window.localStorage.getItem('computerScore') || '0');
  const winningCondition = hasWinner(currentPlayerScore, currentComputerScore);
  if (winningCondition > 0) {
    stopGame(winningCondition)
  }
}
