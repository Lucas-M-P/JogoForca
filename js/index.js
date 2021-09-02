var divSecretWord = document.querySelector(".secretWord");
var buttons = document.querySelectorAll(".letter");
var image = document.querySelector("#image");
var modalMenu = document.querySelector("#modalMenu");
var modalEndGame =document.querySelector("#modalEndGame");
var buttonMenu = document.querySelector(".playButton");
var buttonEndGame = document.querySelector(".buttonEndGame");
var endGameTitle = document.querySelector("#endGameTitle");
var endGameSubTitle = document.querySelector("#endGameSubTitle");
var streakElement = document.querySelector(".streak");

var errors = 0;
var secretWord;
var streak = 0;

function getSecretWord(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var randomNumber = Math.floor(Math.random() * (max - min)) + min;
    return words[randomNumber].Word.toUpperCase();
}

window.addEventListener("load", () => {
    modalMenu.style.display = "block";
});

buttonMenu.addEventListener("click", startGame);

function startGame(event){
    event.preventDefault();
    divSecretWord.textContent = "";

    secretWord = getSecretWord(0, 2000);

    for (let index = 0; index < secretWord.length; index++) {
        if(secretWord[index] == "-"){
            divSecretWord.textContent += "-"
        }
        else{
            divSecretWord.textContent += "_";
        }
    }
    
    buttons.forEach(element => {
        element.addEventListener("click", verifyLetter)
        element.style.backgroundColor = "white";
    });

    setImage(errors);
    setStreak(streak);

    if(event.target.classList.contains("playButton")){
        modalMenu.style.display = "none";
    }
    else{
        modalEndGame.style.display = "none";
    }
}

function verifyLetter(event){
    if(secretWord.includes(event.target.textContent)){
        correctLetter(event.target.textContent, event);
    }
    else{
        wrongLetter(event);
    }
}

function correctLetter(letter, event){
    var arrayDivSecretWord = divSecretWord.textContent.split("");
    divSecretWord.textContent = "";

    for (let index = 0; index < secretWord.length; index++) {
        if(secretWord[index] == letter){
            arrayDivSecretWord[index] = letter;
            divSecretWord.textContent += arrayDivSecretWord[index];
        }
        else{
            divSecretWord.textContent += arrayDivSecretWord[index];
        }
    }

    event.target.style.backgroundColor = "lightgreen";
    event.target.removeEventListener("click", verifyLetter);
    verifyWinGame();
}

function wrongLetter(event){
    event.target.style.backgroundColor = "lightcoral";
    event.target.removeEventListener("click", verifyLetter);

    errors++;
    verifyGameOver(errors);
}

buttonEndGame.addEventListener("click", (event) => {
    startGame(event);
});

function verifyGameOver(){
    if(errors > 6){
        modalEndGame.style.display = "block";
        endGameTitle.textContent = "Game Over";
        endGameSubTitle.textContent = "Your streak is " + streak + ", can you raise it?";
        streak = 0;
        errors = 0;
    }
    else{
        setImage(errors);
    }
}

function verifyWinGame(){
    if(divSecretWord.textContent == secretWord){
        streak++;
        modalEndGame.style.display = "block";
        endGameTitle.textContent = "You Win";
        endGameSubTitle.textContent = "Your streak is " + streak + ". You can try a higher one!!!";
        setStreak(streak);
    }
}

function setImage(errors){
    image.src = "images/Forca" + errors + ".png";
}

function setStreak(streak){
    streakElement.textContent = "Streak: " + streak;
}