'use strict';

let score = 20;
let highscore = 0;
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let myInterval;

///
const removeHidden = function () {
  document.querySelector('.modal').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
};

///////////
const addHidden = () => {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
};

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const removeEvtLstnr = function (remove) {
  document.querySelector('.check').removeEventListener('click', remove);
};
const addEvtLstnr = function (add) {
  document.querySelector('.check').addEventListener('click', add);
};

const checkFunction = function () {
  let guess = Number(document.querySelector('.guess').value);

  /// When there's no input
  if (!guess) {
    displayMessage('⛔️ No number entered!');
  }
  // when guess is correct
  else if (guess === secretNumber) {
    displayMessage('🎉🎉🎉 Correct Number!!!');
    removeEvtLstnr(checkFunction);
    // document.querySelector('body').style.backgroundColor = '#218c74';
    document.querySelector('.number').style.width = '20rem';
    document.querySelector('.number').textContent = secretNumber;

    myInterval = setInterval(function () {
      let randomColor = Math.trunc(Math.random() * 16777215).toString(16);

      document.querySelector('body').style.backgroundColor = '#' + randomColor;
    }, 1000);

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = score;
    }
  }
  // When guess is wrong
  else if (guess !== secretNumber) {
    displayMessage(guess < secretNumber ? 'Too Low ☹️' : 'Too High 😅');
    score--;
    document.querySelector('.score').textContent = score;

    if (score < 1) {
      removeHidden();
    }
  }
};

const restartFunction = () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.number').textContent = '?';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  addEvtLstnr(checkFunction);
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#aaa69d';
  document.querySelector('.number').style.width = '10rem';

  ////////////
  clearInterval(myInterval);
};

///
document.querySelector('.check').addEventListener('click', checkFunction);

document.querySelector('.restart').addEventListener('click', restartFunction);

document.querySelector('.again').addEventListener('click', function () {
  addHidden();
  restartFunction();
  highscore = 0;
  document.querySelector('.highscore').textContent = highscore;
});
