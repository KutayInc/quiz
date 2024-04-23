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
const resultPage = document.getElementById("result-page");
const result = document.getElementById("result");
let score = 0;
const scoreDiv = document.getElementById("scoreDiv");
const showScore = document.getElementById("showScore");
const empty = document.getElementById("empty");

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
  question.innerHTML = gameData[random].soru;
  answerA.innerHTML = gameData[random].secenekler[0];
  answerB.innerHTML = gameData[random].secenekler[1];
  answerC.innerHTML = gameData[random].secenekler[2];
  answerD.innerHTML = gameData[random].secenekler[3];
  if (gameData[random].dogru_cevap === gameData[random].secenekler[0]) {
    answerA.classList.remove("wrong");
    answerA.classList.add("correct");
    answerB.classList.add("wrong");
    answerB.classList.remove("correct");
    answerC.classList.add("wrong");
    answerC.classList.remove("correct");
    answerD.classList.add("wrong");
    answerD.classList.remove("correct");
  } else if (gameData[random].dogru_cevap === gameData[random].secenekler[1]) {
    answerA.classList.add("wrong");
    answerA.classList.remove("correct");
    answerB.classList.remove("wrong");
    answerB.classList.add("correct");
    answerC.classList.add("wrong");
    answerC.classList.remove("correct");
    answerD.classList.add("wrong");
    answerD.classList.remove("correct");
  } else if (gameData[random].dogru_cevap === gameData[random].secenekler[2]) {
    answerA.classList.add("wrong");
    answerA.classList.remove("correct");
    answerB.classList.remove("correct");
    answerB.classList.add("wrong");
    answerC.classList.remove("wrong");
    answerC.classList.add("correct");
    answerD.classList.add("wrong");
    answerD.classList.remove("correct");
  } else if (gameData[random].dogru_cevap === gameData[random].secenekler[3]) {
    answerA.classList.add("wrong");
    answerA.classList.remove("correct");
    answerB.classList.remove("correct");
    answerB.classList.add("wrong");
    answerC.classList.add("wrong");
    answerC.classList.remove("correct");
    answerD.classList.remove("wrong");
    answerD.classList.add("correct");
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
  resultPage.style.display = "block";
  if (e.target.classList.contains("correct")) {
    result.innerHTML = "Doğru!";
    score++;
    showScore.innerHTML = score;
  } else {
    result.innerHTML = "Yanlış!";
    showScore.innerHTML = score;
  }
});
