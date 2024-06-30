const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let gameInProgress = false;

document.addEventListener('keypress', () => {
    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${level}`;
        nextSequence();
        started = true;
        gameInProgress = true;
    }
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function () {
        if (gameInProgress) {
            const userChosenColor = this.id;
            userClickedPattern.push(userChosenColor);
            playSound(userChosenColor);
            animatePress(userChosenColor);
            checkAnswer(userClickedPattern.length - 1);
        }
    });
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").textContent = `Level ${level}`;
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    document.querySelector(`#${randomChosenColor}`).classList.add('pressed');
    setTimeout(() => {
        document.querySelector(`#${randomChosenColor}`).classList.remove('pressed');
    }, 100);
    playSound(randomChosenColor);
}

function playSound(name) {
    const audio = new Audio(`./Sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    const activeButton = document.querySelector(`#${currentColor}`);
    activeButton.classList.add('pressed');
    setTimeout(() => {
        activeButton.classList.remove('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        document.body.classList.add('game-over');
        document.querySelector("#level-title").textContent = `Game Over, Press Any Key to Restart`;
        gameInProgress = false;

        setTimeout(() => {
            document.body.classList.remove('game-over');
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
