// ui.js

const choiceIcon = {
  'rock': '✊',
  'paper': '✋',
  'scissors': '✌'
}
const playerScoreContainer = document.querySelector('#player-score');
const computerScoreContainer = document.querySelector('#computer-score');
const resultContainer = document.querySelector('#result-message');
const finalContainer = document.querySelector('#result-final');
const choicesContainer = document.querySelector('.choices');
const playerChoiceContainer = document.querySelector('#player-choice');
const computerChoiceContainer = document.querySelector('#computer-choice');

export function updateScore(playerScore, computerScore) {
  const playerValue = playerScoreContainer.textContent;
  const computerValue = computerScoreContainer.textContent;
  const newPlayerScore = parseInt(playerValue) + playerScore;
  const newComputerScore = parseInt(computerValue) + computerScore;
  playerScoreContainer.textContent = newPlayerScore;
  computerScoreContainer.textContent = newComputerScore;
  window.localStorage.setItem('playerScore', newPlayerScore);
  window.localStorage.setItem('computerScore', newComputerScore);
}

export function updateMessage(result, playerChoice, computerChoice) {
  resultContainer.textContent = result;
  playerChoiceContainer.classList.remove('hide');
  computerChoiceContainer.classList.remove('hide');
  
  playerChoiceContainer.classList.remove('player-animate');
  computerChoiceContainer.classList.remove('computer-animate');
  
  playerChoiceContainer.textContent = choiceIcon[playerChoice];
  computerChoiceContainer.textContent = choiceIcon[computerChoice];
  
  playerChoiceContainer.classList.add('player-animate');
  computerChoiceContainer.classList.add('computer-animate');
}

export function resetGame() {
  playerScoreContainer.textContent = '0';
  computerScoreContainer.textContent = '0'
  resultContainer.textContent = '';
  finalContainer.textContent = '';
  playerChoiceContainer.textContent = '';
  computerChoiceContainer.textContent = '';
  choicesContainer.classList.remove('hide');
  playerChoiceContainer.classList.add('hide');
  computerChoiceContainer.classList.add('hide');
  window.localStorage.setItem('playerScore', 0);
  window.localStorage.setItem('computerScore', 0);
}

export function stopGame(condition) {
  finalContainer.textContent = condition === 1 ? 'Player is the Winner' : 'Computer is the Winner';
  resultContainer.textContent = 'Press RESET to play again';
  choicesContainer.classList.add('hide');
}
