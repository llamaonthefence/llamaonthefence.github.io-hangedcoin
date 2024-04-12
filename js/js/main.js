//hangman keyboard
//var html = '';
///var c;
//for (var i = 65; 90 >= i; i++) {// A-65, Z-90
//  c = String.fromCharCode(i);
//  html += '<button onclick="setLetter(\'' + c + '\');">' + c + '</button>';
//}
//document.getElementById('letterbox').innerHTML = html;

//var setLetter = function(x) { 
  // Implement functionality here
//};

// alt method: create keyboard buttons

const difficultyModal = document.querySelector(".difficulty-modal")
const hangmanImg = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-letters");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector("#letterbox"); 
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const resetBtn = document.querySelector("#btn-reset");
const pauseBtn = document.querySelector("#btn-pause");
const pauseModal = document.querySelector(".pause-modal");
const resumeBtn = document.querySelector("#resume-btn");


let currentWord, correctLetters, wrongGuessCount; 

const handleDifficultySelection = (difficulty,event) => {
    difficultyModal.classList.add("hide"); // closes difficulty selection dialogue box 

    //event.preventDefault(); // prevents navigation when no difficulty button is clicked

    let scriptEas, scriptInt, scriptHar; // declare the levels variables to access word-lists: 

    // using "switch" + "case" statement to choose difficulty lvl  // https://www.w3schools.com/js/js_switch.asp
    switch (difficulty) {
        case "easy": 
            scriptEas = document.createElement("script"); 
            scriptEas.src = "js/word-list-eas.js";
            scriptEas.onload = function() {
                getRandomWordEas(); 
                console.log(wordListEas); // can comment out this console.log - used for debugging only
            }
            document.head.appendChild(scriptEas);  //-- added into HTML due to required sequence
            break; 
        
        case "intermediate": 
            scriptInt = document.createElement("script"); 
            scriptInt.src = "js/word-list-int.js";
            scriptInt.onload = function() {
                getRandomWord(); 
                console.log(wordListInt); // can comment out this console.log - used for debugging only
            }
            document.head.appendChild(scriptInt); 
            break; 

        case "hard":
            scriptHar = document.createElement("script"); 
            scriptHar.src = "js/word-list-har.js";
            scriptHar.onload = function() {
                getRandomWordHar(); 
                //console.log(wordListHar);
            }
            document.head.appendChild(scriptHar);
            break; 

        default:
            scriptInt = document.createElement("script"); 
            scriptInt.src = "js/word-list-int.js";
            scriptInt.onload = function() {
                getRandomWord(); 
                console.log("Intermediate word list loaded"); // can comment out this console.log - used for debugging only
            }
            document.head.appendChild(scriptInt); 
            break;
}}; 

// event listeners for difficulty buttons


// These didn't work with the buttons - why?? 
//document.getElementById("easy").addEventListener("click", () => handleDifficultySelection("easy"));
//document.getElementById("intermediate").addEventListener("click", () => handleDifficultySelection("intermediate"));
//document.getElementById("hard").addEventListener("click", () => handleDifficultySelection("hard"));

document.querySelectorAll(".levels-btn").forEach(button => {
    button.addEventListener("click", event => {
        const difficulty = event.currentTarget.id; 
        handleDifficultySelection(difficulty,event); 
    });
});

// Event listener that link to difficulty selection buttons: 
document.getElementById("easy").addEventListener("click", function() {
    updateTimerEas("80s", function() {
        alert("Your time is up! Catch 10 coins in the next game or lose a life!"); 
        //  set state to game end
        // set gameendstring = "your time is up..."
    // add button to alert --> "Proceed"
    });
});

document.getElementById("intermediate").addEventListener("click", function() { 
    updateTimerInt("120s", function() {
        alert("Too slow! Now, catch 20 coins in the next game or lose a life!");
    }); 
}); 

document.getElementById("hard").addEventListener("click", function() { 
    updateTimerHar("180s", function() {
        alert("You thought it was going to be easy? Catch 30 coins in the next game or lose a life!")
    }); 
});


const maxGuesses = 6; 

const resetGame = () => {
    // resets all game variable & UI elements 
    correctLetters=[];
    wrongGuessCount=0;
    hangmanImg.src = `images/gallows_0${wrongGuessCount}.png`
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; 
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show"); // closes dialogue box 
    const handlePlayAgain = () => {
        // Shows the difficulty modal by removing the hide class from handleDifficultySelection
        difficultyModal.classList.remove("hide");
    };
    
    playAgainBtn.addEventListener("click", handlePlayAgain);
};


// Gets a random word & hint from Easy wordList
const getRandomWordEas = () => {
    const { word, hint } = wordListEas[Math.floor(Math.random() * wordListEas.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint; 
    resetGame(); // for play-again button on Game Over
}

// Gets a random word & hint from Intermediate wordList
const getRandomWord = () => {
    const { word, hint } = wordListInt[Math.floor(Math.random() * wordListInt.length)];

    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint; 
    resetGame(); // for play-again button on Game Over
}

// Gets a random word & hint from Hard wordList
const getRandomWordHar = () => {
    const { word, hint } = wordListHar[Math.floor(Math.random() * wordListHar.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint; 
    resetGame(); // for play-again button on Game Over
}

const gameOver = (isWin) => {
    // Shows popup with relevant message after 600ms of game completion 
    setTimeout(() =>{
        const modalText = isWin ? `You got the correct word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isWin ? 'happy' : 'sad'}.png`;
        gameModal.querySelector("h4").innerText = `${isWin ? 'Congrats! You won!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    // Letter check: - if clicked letter exists in current word
    if (currentWord.includes(clickedLetter)) {
        // Show correct guesses on the word display 
        [...currentWord].forEach((letter, idx) =>{
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[idx].innerText = letter; 
                wordDisplay.querySelectorAll("li")[idx].classList.add("guessed");
            }
        });
        //console.log(clickedLetter, "exists in the current word");
    } else {
        wrongGuessCount++;
        //if wrong guessed letter, update hangman image
        hangmanImg.src = `images/gallows_0${wrongGuessCount}.png`
        //console.log(clickedLetter, "doesn't exist in the current word");
    }

    button.disabled = true; // disables clicked button in each round 
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;  // shouldn't this be part of 'else' function? 

    // calling gameOver function whichever condition is met: 
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

const handlePlayAgain = () => {
    difficultyModal.classList.remove("hide"); 
}; 

// Keyboard buttons & event listeners 
for (let i = 97; i <= 122; i++) {
    const btn = document.createElement("button"); 
    btn.innerText = String.fromCharCode(i); 
    keyboardDiv.appendChild(btn); 
    btn.addEventListener("click", evt => initGame(evt.target, String.fromCharCode(i)))
}

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);

// Reset button refreshes page
resetBtn.addEventListener("click", function(){
    location.reload(); 
});

// Pauses game and toggle pause-modal display 
pauseBtn.addEventListener("click", function() {
    var timer = document.getElementById("timer"); 
    var innermeter = timer.querySelector(".inner-meter");
    if (innermeter.style.animationPlayState === "paused") {
        innermeter.style.animationPlayState = "running";
    } else {
        innermeter.style.animationPlayState = "paused";
    }

    pauseModal.style.display = "flex"; 
    
    console.log("pause button clicked");  //for test
    console.log(pauseModal);  //for test 
});


resumeBtn.addEventListener("click", function() {
    var timer = document.getElementById("timer"); 
    var innermeter = timer.querySelector(".inner-meter");
    pauseModal.style.display = "none"; 
    // pauseModal.classList.remove("show"); 
    if (innermeter.style.animationPlayState === "paused") {
        innermeter.style.animationPlayState = "running";
    } else {
        innermeter.style.animationPlayState = "paused";
    }
    console.log("resume btn clicked");  // for test
});

