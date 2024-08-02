'use strict';

let p1 = document.querySelector('.player--0');
let p2 = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const cScore1 = document.querySelector('#current--0');
const cScore2 = document.querySelector('#current--1');

let tscore = [0, 0];
let currentScore = 0;
let activePlayer = 0;
dice.classList.add('hidden');

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    p1.classList.toggle('player--active');
    p2.classList.toggle('player--active');
}

btnRoll.addEventListener('click', () => {
    dice.classList.remove('hidden');
    const roll = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${roll}.png`;
    if (roll !== 1) {
        currentScore += roll;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
});

btnHold.addEventListener('click', () => {
    tscore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = tscore[activePlayer];
    
    if (tscore[activePlayer] >= 100) {
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector('.btn--roll').disabled = true;
        document.querySelector('.btn--hold').disabled = true;
    } else {
        switchPlayer();
    }
});

btnNew.addEventListener('click', () => {
    tscore = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;

    p1.classList.remove('player--winner');
    p2.classList.remove('player--winner');
    p1.classList.add('player--active');
    p2.classList.remove('player--active');

    dice.classList.add('hidden');
    btnRoll.disabled = false;
    btnHold.disabled = false;
});
