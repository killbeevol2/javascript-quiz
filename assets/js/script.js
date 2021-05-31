// Declare all the variables
var startButton = document.querySelector("#start");
var timerBox = document.getElementById("timer");
var question = document.getElementById("question");
var main = document.getElementById("main");
var scoreList = document.querySelector(".score");
var score = 0;
var nextQuestionId = 0;
var time;
var storedScore = JSON.parse(localStorage.getItem("score"));
if (!storedScore) {
  var storedScore = [];
}

// Starts the game
function startGame() {
  time = 91;
  var timer = setInterval(function () {
    timerBox.innerHTML = "";
    time--;
    timerBox.textContent = time + " seconds left.";

    if (time < 1) {
      clearInterval(timer);
      timerBox.innerHTML = "<button id='startagain'>Play again</button>";
      question.innerHTML = "Game Over";
      enterScore();
      document
        .querySelector("#startagain")
        .addEventListener("click", function (event) {
          if ((event.target.id = "startagain")) {
            score = 0;
            nextQuestionId = 0;
          }

          startGame();
        });
    }
  }, 1000);

  nextQuestion(nextQuestionId);
}

// Show next question and clickable options
function nextQuestion(nextQuestionId) {
  question.innerHTML = questions[nextQuestionId].question;
  main.innerHTML = "";
  var answer1 = document.createElement("a");
  answer1.textContent = questions[nextQuestionId].a;
  main.appendChild(answer1);

  var answer2 = document.createElement("a");
  answer2.textContent = questions[nextQuestionId].b;
  main.appendChild(answer2);

  var answer3 = document.createElement("a");
  answer3.textContent = questions[nextQuestionId].c;
  main.appendChild(answer3);

  var answer4 = document.createElement("a");
  answer4.textContent = questions[nextQuestionId].d;
  main.appendChild(answer4);
  window.nextQuestionId++;
}

// Timer. Starts at 90 secs, remove 10 sec each time a wrong answer is clicked. Shows game over when the timer reaches 0.
startButton.addEventListener("click", function (event) {
  startGame();
});

// Sorts the highscore and shows it in li tags
function highScore() {
  storedScore.sort();
  storedScore.reverse();
  for (var i = 0; i < storedScore.length; i++) {
    var highScore = storedScore[i];
    var li = document.createElement("li");
    li.textContent = highScore;
    scoreList.appendChild(li);
  }
}

// Endgame
function enterScore() {
  time = 0;
  main.innerHTML = "";
  scoreList.innerHTML =
    "Your Score is : " +
    score +
    "<form>Enter your name : <input type='text' id='name' name='name' > <button> Send </button></form>";
}

// Check the result selected
main.addEventListener("click", function (event) {
  answer = event.target.textContent;
  correctAnswer = questions[nextQuestionId - 1].win;
  if (answer === correctAnswer) {
    score += 10;
  } else {
    time -= 10;
  }
  // console.log(answer);

  if (nextQuestionId < 10) {
    nextQuestion(nextQuestionId);
  } else {
    enterScore();
  }
});

//Enter name in the high score
scoreList.addEventListener("submit", function (event) {
  event.preventDefault();
  var name = document.getElementById("name");
  stores = storedScore.push(score + "pts -- " + name.value);
  localStorage.setItem("score", JSON.stringify(storedScore));
  scoreList.innerHTML = "";
  highScore();
});

highScore();
