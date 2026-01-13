const emojiDetails = [
  {
    desctiption: "grinning face",
    emoji: "😀",
  },
  {
    desctiption: "grinning squinting face",
    emoji: "😆",
  },
  {
    desctiption: "face with tears of joy",
    emoji: "😂",
  },
  {
    desctiption: "smiling face with smiling eyes",
    emoji: "😊",
  },
  {
    desctiption: "smiling face with halo",
    emoji: "😇",
  },
  {
    desctiption: "smiling face with hearts",
    emoji: "🥰",
  },
  {
    desctiption: "kissing face",
    emoji: "😗",
  },
  {
    desctiption: "smiling face with tear",
    emoji: "🥲",
  },
  {
    desctiption: "winking face with tongue",
    emoji: "😜",
  },
  {
    desctiption: "face with peeking eye",
    emoji: "🫣",
  },
  {
    desctiption: "thinking face",
    emoji: "🤔",
  },
  {
    desctiption: "face with raised eyebrow",
    emoji: "🤨",
  },
  {
    desctiption: "expressionless face",
    emoji: "😑",
  },
  {
    desctiption: "face without mouth",
    emoji: "😶",
  },
  {
    desctiption: "face in clouds",
    emoji: "😶‍🌫️",
  },
  {
    desctiption: "smirking face",
    emoji: "😏",
  },
  {
    desctiption: "face with rolling eyes",
    emoji: "🙄",
  },
  {
    desctiption: "relieved face",
    emoji: "😌",
  },
  {
    desctiption: "drooling face",
    emoji: "🤤",
  },
  {
    desctiption: "sleeping face",
    emoji: "😴",
  },
  {
    desctiption: "face with thermometer",
    emoji: "🤒",
  },
  {
    desctiption: "face with head-bandage",
    emoji: "🤕",
  },
  {
    desctiption: "nauseated face",
    emoji: "🤢",
  },
  {
    desctiption: "sneezing face",
    emoji: "🤧",
  },
  {
    desctiption: "hot face",
    emoji: "🥵",
  },
  {
    desctiption: "cold face",
    emoji: "🥶",
  },
  {
    desctiption: "exploding head",
    emoji: "🤯",
  },
  {
    desctiption: "partying face",
    emoji: "🥳",
  },
  {
    desctiption: "smiling face with sunglasses",
    emoji: "😎",
  },
  {
    desctiption: "worried face",
    emoji: "😟",
  },
];

let currentEmojiIndex = 0;
let score = 0;
let seconds = 30;
let timer;

const guessInput = document.querySelector("#guess-input");
const resultElement = document.querySelector("#result");
const scoreElement = document.querySelector("#score");
const timerElement = document.querySelector("#timer");

function displayEmoji() {
  const descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `<span class='emoji'>${emojiDetails[currentEmojiIndex].emoji}</span>`;
  timerElement.textContent = `Time left: ${seconds}s`;
}

function checkGuess() {
  const guess = guessInput.value.trim().toLocaleLowerCase();
  const currentEmoji = emojiDetails[currentEmojiIndex].desctiption
    .trimEnd()
    .toLocaleLowerCase();

  if (guess === currentEmoji) {
    resultElement.textContent = "! Correct !";
    score++;
  } else {
    resultElement.textContent = "! Worng !";
  }

  scoreElement.textContent = `Score: ${score}`;
  guessInput.value = "";
  guessInput.focus();
  nextEmoji();
}

function nextEmoji() {
  setTimeout(()=>{
    currentEmojiIndex++;
  resultElement.textContent = "";
  if (currentEmojiIndex === emojiDetails.length) {
    currentEmojiIndex = 0;
  }
  seconds = 30;
  displayEmoji();
  },1000)
}

document.querySelector("#guess-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkGuess();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  displayEmoji();
  startTimer();
});


function startTimer(){
  timer = setInterval(()=>{
    seconds--;
    timerElement.textContent = `Time left: ${seconds}s`;
    if(seconds<=0){
    endGame();
  }
  }, 1000)
}

function endGame(){
  clearInterval(timer);
  guessInput.disabled = true;
  timerElement.textContent = `! Times up !`;
}