'use strict';

// Selecting elements
const totalScore0El = document.getElementById('score--0');
const totalScore1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScoreEl0 = document.getElementById('current--0');
const currentScoreEl1 = document.getElementById('current--1');

let currentScore, activePlayer, totalScores, playing;

const init = () => {
  activePlayer = 0;
  currentScore = 0;
  totalScores = [0, 0];
  playing = true;

  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;
  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;

  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. generating a random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');

    diceEl.src = `dice-${diceRoll}.png`;

    // 3. Check for rolled 1: If false add dice roll to current score, and display new score.
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;

      //If true, switch to the next player.
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Add current score to total score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // 2. If total score is >= 100 current player wins
    if (totalScores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      // 3. Else switch players
    } else {
      switchPlayer();
    }
  }
});

// New game button - resets all fields
btnNew.addEventListener('click', init);
