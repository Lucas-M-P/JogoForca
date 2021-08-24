var divSecretWord = document.querySelector(".secretWord");
var buttons = document.querySelectorAll(".letter");
var image = document.querySelector("#image");
var errors = 0;

var secretWord = "LUCAS";

for (let index = 0; index < secretWord.length; index++) {
    divSecretWord.textContent += "_";
}

buttons.forEach(element => {
    element.addEventListener("click", verifyLetter)
});

function verifyLetter(event){
    if(secretWord.toUpperCase().includes(event.target.textContent)){
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
}

function wrongLetter(event){
    event.target.style.backgroundColor = "lightcoral";
    event.target.removeEventListener("click", verifyLetter);

    errors++;
    image.src = "images/Forca" + errors + ".png";
}