const guessButton = document.getElementById('guess');
const restartButton = document.getElementById('restart');

const drawnNumbers = [];
const limitNumber = 10;
let attempts = 1;
let secretNumber = randomNumber();

guessButton.addEventListener('click', handleGuess);
restartButton.addEventListener('click', restartGame);

function viewText(tag, text) {
  let field = document.querySelector(tag);
  field.textContent = text;
}

function initialMessage() {
  viewText('h1', 'Adivinhe o número secreto');
  viewText('p', 'Escolha entre um numero de 1 a 10');
}

initialMessage();

function isValidNumber(guess) {
  return guess >= 1 && guess <= limitNumber;
}

function handleGuess() {
  let guess = document.getElementById('chooseNumber').value;

  if (!isValidNumber(guess)) {
    viewText('p', 'Número inválido, insira um número entre 1 e 10');
    clearField();
    return;
  }

  if (guess == secretNumber) {
    viewText('h1', 'Parabéns você acertou!');
    let wordAttempt = attempts > 1 ? 'tentativas' : 'tentativa';
    let messageAttempt = `Você descobriu o número secreto com ${attempts} ${wordAttempt}`;
    viewText('p', messageAttempt);
    document.getElementById('restart').removeAttribute('disabled');
  } else {
    if (guess > secretNumber) {
      viewText('p', 'O número é MENOR do que o chute, tente novamente.');
    } else {
      viewText('p', 'O número é MAIOR do que o chute, tente novamente.');
    }
    attempts++;
    clearField();
  }
}

function randomNumber() {
  let guessNumber = parseInt(Math.random() * limitNumber + 1);
  let quantityElementsList = drawnNumbers.length;

  if (quantityElementsList == limitNumber) {
    drawnNumbers.length = 0;
  }

  if (drawnNumbers.includes(guessNumber)) {
    return randomNumber();
  } else {
    drawnNumbers.push(guessNumber);
    return guessNumber;
  }
}

function clearField() {
  guess = document.getElementById('chooseNumber');
  guess.value = '';
}

function restartGame() {
  secretNumber = randomNumber();
  clearField();
  attempts = 1;
  initialMessage();
  document.getElementById('restart').setAttribute('disabled', true);
}
