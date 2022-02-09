'use strict';

//game elements
const rockElement = document.querySelector('.player-board #rock');
const paperElement = document.querySelector('.player-board #paper');
const scissorsElement = document.querySelector('.player-board #scissors');

//left window
const playerSelectionContainer = document.querySelector(
    '.player-selection .selection-container'
);
// right window
const comSelectionContainer = document.querySelector(
    '.com-selection .selection-container'
);
// middle window - winner announcer
const winnerContainer = document.querySelector('.winner');

// for getting a random game tool for computer
const gRockPaperScissors = [rockElement, paperElement, scissorsElement];

// scoreboard stats tracking
let playerWins = 0;
let draws = 0;
let comWins = 0;

// scoreboard elements
const playerScore = document.querySelector('.player span');
const drawScore = document.querySelector('.draws span');
const comScore = document.querySelector('.com span');

// click on game tool will display it in the left window
rockElement.addEventListener('click', () => {
    clickOnGameTool(rockElement);
});

paperElement.addEventListener('click', () => {
    clickOnGameTool(paperElement);
});
scissorsElement.addEventListener('click', () => {
    clickOnGameTool(scissorsElement);
});

// most DOM renders and updates happen here
function clickOnGameTool(gameElement) {
    //renders player selection to the left window
    playerSelectionContainer.innerHTML = gameElement.innerHTML;
    // gets one of the game tools
    const comToolSelection = gRockPaperScissors[getRandomInt(0, 3)];

    // after a brief delay, renders the random com selection on the right window
    setTimeout(() => {
        comSelectionContainer.innerHTML = comToolSelection.innerHTML;
    }, 500);

    // after another 1.5 seconds, an arow will point to the winning window
    const winner = checkWinner(gameElement, comToolSelection);
    setTimeout(() => {
        // depends on what returns to winner, an img element is inserted to to middle window, pointing at the winner
        switch (winner[0]) {
            case 'player':
                winnerContainer.innerHTML = `<img class="arrow" src="img/arrow-left.png" alt="arrow-left" />`;
                break;
            case 'com':
                winnerContainer.innerHTML = `<img class="arrow" src="img/arrow-right.png" alt="arrow-righ" />`;
                break;
            case 'equal':
                winnerContainer.innerHTML = `<img class="arrow" src="img/equal.png" alt="equal" />`;
                break;
        }
        // scoreboard is updated accordingly to the winner
        updateScoreboard(winner[0]);
    }, 650);

    // reset selections windows after 2.4 seconds
    setTimeout(() => {
        playerSelectionContainer.innerHTML = '';
        comSelectionContainer.innerHTML = '';
        winnerContainer.innerHTML = '';
    }, 2400);
}

//update scoreboard in DOM
function updateScoreboard(winner) {
    switch (winner) {
        case 'player':
            playerScore.textContent = ` ${playerWins}`;
            break;
        case 'equal':
            drawScore.textContent = ` ${draws}`;
            break;
        case 'com':
            comScore.textContent = ` ${comWins}`;
            break;
    }
}

// incremet winners score vars and returns an array [winner, winning tool]
function checkWinner(playerSelection, comSelection) {
    if (playerSelection === comSelection) {
        draws++;
        return ['equal', 'Tie'];
    }
    //player chose rock
    if (playerSelection === rockElement && comSelection === scissorsElement) {
        playerWins++;
        return ['player', 'Rock'];
    }
    if (playerSelection === rockElement && comSelection === paperElement) {
        comWins++;
        return ['com', 'Paper'];
    }
    //player chose paper
    if (playerSelection === paperElement && comSelection === rockElement) {
        playerWins++;
        return ['player', 'Paper'];
    }
    if (playerSelection === paperElement && comSelection === scissorsElement) {
        comWins++;
        return ['com', 'Scissors'];
    }
    //player chose scissors
    if (playerSelection === scissorsElement && comSelection === paperElement) {
        playerWins++;
        return ['player', 'Scissors'];
    }
    if (playerSelection === scissorsElement && comSelection === rockElement) {
        comWins++;
        return ['com', 'Rock'];
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
