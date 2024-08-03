const choices = ['rock','paper','scissors'];

export function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

export function playRound(playerChoice, computerChoice) {
  if (playerChoice === 'rock') {
    switch(computerChoice) {
      case 'rock':
        return 0;
      case 'paper':
        return -1;
      case 'scissors':
        return 1;
    }
  } else if (playerChoice === 'paper') {
    switch(computerChoice) {
      case 'rock':
        return 1;
      case 'paper':
        return 0;
      case 'scissors':
        return -1;
    }
  } else if (playerChoice === 'scissors') {
    switch(computerChoice) {
      case 'rock':
        return -1;
      case 'paper':
        return 1;
      case 'scissors':
        return 0;
    }
  } else {
    console.error(playerChoice);
  }
}
