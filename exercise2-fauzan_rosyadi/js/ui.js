// ui.js
import {playRound} from "./game.js";

const choiceIcon = {
  'rock': '✊',
  'paper': '✋',
  'scissors': '✌'
}
const playerScoreContainer = document.querySelector('#player-score');
const computerScoreContainer = document.querySelector('#computer-score');
const resultContainer = document.querySelector('#message');
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
  playerChoiceContainer.textContent = choiceIcon[playerChoice];
  computerChoiceContainer.textContent = choiceIcon[computerChoice];
 
}

export function resetGame() {
  playerScoreContainer.textContent = '0';
  computerScoreContainer.textContent = '0'
  resultContainer.textContent = '';
  playerChoiceContainer.textContent = '';
  computerChoiceContainer.textContent = '';
  window.localStorage.setItem('playerScore', 0);
  window.localStorage.setItem('computerScore', 0);
}
