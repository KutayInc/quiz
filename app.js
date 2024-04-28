const start = document.getElementById("start-page");
const game = document.getElementById("game-page");
const reset = document.getElementById("reset");
const question = document.getElementById("question");
let gameData = [];
const answers = document.getElementById("answers");
const answerA = document.getElementById("answer-a");
const answerB = document.getElementById("answer-b");
const answerC = document.getElementById("answer-c");
const answerD = document.getElementById("answer-d");
const answerArr = [answerA, answerB, answerC, answerD];
const resultPage = document.getElementById("result-page");
const result = document.getElementById("result");
let score = 0;
const scoreDiv = document.getElementById("scoreDiv");
const showScore = document.getElementById("showScore");
const empty = document.getElementById("empty");
const realAnswer = document.getElementById("real-answer");
const realAnswerh2 = document.getElementById("real-answer-h2");

fetch("data.json")
  .then((response) => response.json())
  .then((data) =>
    data.forEach((element) => {
      gameData.push(element);
    })
  )
  .catch((error) => {
    console.error(error);
  });

function startGame() {
  score = 0;
  showScore.innerHTML = score;
  newQuestion();
  empty.style.display = "none";
}

//get new question from array randomly, then remove it from array
function newQuestion() {
  const random = Math.floor(Math.random() * gameData.length);
  start.style.display = "none";
  game.style.display = "flex";
  resultPage.style.display = "none";
  empty.style.display = "none";
  if (gameData.length <= 0) {
    start.style.display = "none";
    game.style.display = "none";
    resultPage.style.display = "none";
    empty.style.display = "flex";
  }
  question.innerHTML = gameData[random].question;
  for (let i = 0; i < gameData[random].options.length; i++) {
    answerArr[i].innerHTML = gameData[random].options[i];
  }
  for (let i = 0; i < gameData[random].options.length; i++) {
    if (gameData[random].right_answer === gameData[random].options[i]) {
      answerArr[i].classList.add("correct");
      realAnswer.innerHTML = gameData[random].right_answer;
      for (let j = 0; j < gameData[random].options.length; j++) {
        if (j !== i) {
          answerArr[j].classList.remove("correct");
        }
      }
    }
  }
  gameData.splice(random, 1);
}

//reset the data
function resetGame() {
  score = 0;
  showScore.innerHTML = score;
  gameData = [];
  fetch("data.json")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((element) => {
        gameData.push(element);
      })
    )
    .catch((error) => {
      console.error(error);
    });
  start.style.display = "block";
  game.style.display = "none";
  empty.style.display = "none";
}

answers.addEventListener("click", function (e) {
  game.style.display = "none";
  resultPage.style.display = "flex";
  if (e.target.classList.contains("correct")) {
    result.innerHTML = "Doğru!";
    score++;
    showScore.innerHTML = score;
    realAnswerh2.style.display = "none";
  } else {
    result.innerHTML = "Yanlış!";
    showScore.innerHTML = score;
    realAnswerh2.style.display = "flex";
  }
});
