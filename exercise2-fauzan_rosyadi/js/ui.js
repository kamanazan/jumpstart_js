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
  
  playerScoreContainer.textContent = parseInt(playerValue) + playerScore;
  computerScoreContainer.textContent = parseInt(computerValue) + computerScore;
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
}
