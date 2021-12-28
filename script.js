/* Variables declaration */

let randomNum, randomNum1, randomNum2, activePlayer, scores, playing;
let currentScoreSum, arrayValue;

let inputValue = document.querySelector('.input-value');
let newGameBtn = document.querySelector('.btn-new');
let rollBtn = document.querySelector('.btn-roll');
let holdBtn = document.querySelector('.btn-hold');
let setValueBtn = document.querySelector('.btn-set-value');
let name0 = document.querySelector('#name-0');
let name1 = document.querySelector('#name-1');
let dice1 = document.querySelector('.dice1');
let dice2 = document.querySelector('.dice2');
let scoreGoal = document.querySelector('.score-goal');
let currentScore0 = document.getElementById('current-0');
let currentScore1 = document.getElementById('current-1');
let globalScore0 = document.getElementById('score-0');
let globalScore1 = document.getElementById('score-1');
let playerPanel0 = document.querySelector('.player-panel-0');
let playerPanel1 = document.querySelector('.player-panel-1');


/* Functions */


/* Function for game initialisation */

const init = (treshValue = 100) => {
    dice1.getElementsByClassName.display = 'none';
    dice2.getElementsByClassName.display = 'none';
    playing = true;
    arrayValue = treshValue;
    scoreGoal.textContent = arrayValue;
    scores = [0, 0];
    activePlayer = 0;
    currentScoreSum = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    globalScore0.textContent = 0;
    globalScore1.textContent = 0;
    playerPanel0.classList.remove('active');
    playerPanel1.classList.remove('active');
    playerPanel0.classList.add('active');
    playerPanel0.classList.remove('winner');
    playerPanel1.classList.remove('winner');
    name0.textContent = 'Joueur 1';
    name1.textContent = 'Joueur 2';
}

/* Function Rolls */
const setValue = () => {
    if (inputValue.value !== null) {
        init(inputValue.value);
        inputValue.value = '';
    }
}

function switchPlayer() {
    console.log(`activeP: ${activePlayer}`)
    if (activePlayer === 1) {
        console.log(`activeP 0: ${activePlayer}`)
        activePlayer = 0;
        console.log(`activeP aft: ${activePlayer}`)
        playerPanel1.classList.toggle('active');
        playerPanel0.classList.toggle('active');
        currentScore1.textContent = 0;
    } else {
        activePlayer = 1;

        console.log(`activeP 1: ${activePlayer}`)
        playerPanel0.classList.toggle('active');
        playerPanel1.classList.toggle('active');
        currentScore0.textContent = 0;
    }
    inputValue.classList.toggle('active');
    dice1.style.display = 'block';
    dice2.style.display = 'block';
}

const rollDice = () => {
    if (playing) {
        console.info('Playing' + playing);
        randomNum1 = Math.floor(Math.random() * 6) + 1;
        randomNum2 = Math.floor(Math.random() * 6) + 1;
        randomNum = randomNum1 + randomNum2;
        dice1.style.display = "block";
        dice2.style.display = "block";
        dice1.src = "\\img\\dice" + randomNum1 + ".png";
        dice2.src = "\\img\\dice" + randomNum2 + ".png";
    }
    if (randomNum1 === 1 || randomNum2 === 1) {
        switchPlayer();
        currentScoreSum = 0;
    } else {
        currentScoreSum += randomNum;
        activePlayer ? currentScore1.textContent = currentScoreSum : currentScore0.textContent = currentScoreSum;
        console.log(`ternaire ${activePlayer}`);
    }
}

const holdscore = () => {
    if (playing) {
        scores[activePlayer] += currentScoreSum;
        if (activePlayer === 1) {
            globalScore1.textContent = scores[activePlayer];
        } else {
            globalScore0.textContent = scores[activePlayer];
            currentScoreSum = 0;
        }
    }

    if (scores[activePlayer] >= arrayValue) {
        document.querySelector('.player-panel-' + activePlayer).classList.add("winner");
        document.getElementById('name-' + activePlayer).textContent = 'WINNER !';
        document.querySelector('.player-panel-' + activePlayer).classList.remove("active");
        dice1.style.display = 'none';
        dice2.style.display = 'none';
        playing = false;
        console.log(`playing ${playing}`)
    } else {
        switchPlayer();
    }
}


/* addEventListener */

init();

setValueBtn.addEventListener('click', setValue)

rollBtn.addEventListener('click', rollDice);

holdBtn.addEventListener('click', holdscore);

newGameBtn.addEventListener('click', () => {
    init();
});