const imgPicture = document.querySelector(".hangmn-box img")
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b")
const hintText = document.querySelector(".hint-text b");
const gameModal = document.querySelector(".game-modal")
let currentWord;
let wrongGuess=0;
const maxWrong=6;
let correctLetters=[];

const getRandomWord=()=>{
  const {word,hint}=wordRandoms[Math.floor(Math.random()*wordRandoms.length )];
  console.log(word,hint)
  currentWord=word;
  hintText.innerText=hint;
  wordDisplay.innerHTML=word.split("").map(()=> '<li class="letter"></li>').join("");
}

const gameOver=(Winning)=>{
  setTimeout(() =>{
    let modalText;
    let gifName
    let headingText

    if (Winning===true) {
      modalText = 'you found the word: ';
      gifName = 'victory';
      headingText = 'Congrats!';
    }
    else{
      modalText = 'the correct word was: ';
      gifName = 'lost';
      headingText = 'Game Over!';
    }
    gameModal.querySelector("img").src = `images/${gifName}.gif`;
    gameModal.querySelector("h4").innerText = headingText;
    gameModal.querySelector("p").innerHTML = `${modalText}<b>${currentWord}</b>`;
    gameModal.classList.add("show")
  },300)
}

const initgame=(button, clickedLettr) => {
  if (currentWord.includes(clickedLettr)) {
    [...currentWord].forEach((letter,index )=>{
      if (letter===clickedLettr) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText=letter
      wordDisplay.querySelectorAll("li")[index].classList.add=("guessed")
      }
    })
  } else {
    wrongGuess++
    imgPicture.src = `images/hangman-${wrongGuess}.svg`;
  }
  button.disabled=true
  guessesText.innerText= `${wrongGuess} / ${maxWrong}`;

  if (wrongGuess===maxWrong) return gameOver(false);
  if (correctLetters.length===currentWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
  let button = document.createElement("button")
  button.innerText = String.fromCharCode(i)
  keyboardDiv.appendChild(button)
  button.addEventListener('click',abc=> initgame(abc.target,String.fromCharCode(i)))
}
document.getElementById('resetbtn').addEventListener('click',function(){location.reload();});
getRandomWord()

