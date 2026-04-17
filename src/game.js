const readline = require("readline");
const questions = require("./questions");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let score = 0;
let currentQuestion = 0;
let timerInterval;
let secondsLeft;

// ASK QUESTION FUNCTION
function askQuestion() {
  if (currentQuestion >= questions.length) {
    endGame();
    return;
  }

  const q = questions[currentQuestion];
  secondsLeft = 15;

  console.log("\n--------------------------------------------------");
  console.log(`Question ${currentQuestion + 1} of ${questions.length}`);
  console.log(`Time limit: ${secondsLeft} seconds`);
  console.log("\n" + q.question);

  q.options.forEach(option => console.log(option));

  timerInterval = setInterval(() => {
    secondsLeft--;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      console.log("\n Time's up!");
      console.log(`Correct answer: ${q.answer}`);
      currentQuestion++;
      askQuestion();
    }
  }, 1000);

  rl.question("\nYour answer (A/B/C/D): ", (input) => {
    clearInterval(timerInterval);

    const userAnswer = input.trim().toUpperCase();

    if (userAnswer === q.answer) {
      console.log(" Correct!");
      score++;
    } else {
      console.log(`X Incorrect. The correct answer was: ${q.answer}`);
    }

    currentQuestion++;
    askQuestion();
  });
}

// END GAME FUNCTION
function endGame() {
  clearInterval(timerInterval);

  console.log("\n==================================================");
  console.log("           GAME OVER - Here are your results");
  console.log("==================================================");

  const results = questions.map((q, index) => `Q${index + 1}: ${q.question}`);
  results.forEach(line => console.log(line));

  console.log(`\nFinal Score: ${score} out of ${questions.length}`);

  if (score === questions.length) {
    console.log(" Perfect score!");
  } else if (score >= 7) {
    console.log(" Great job!");
  } else if (score >= 5) {
    console.log(" Keep practising!");
  } else {
    console.log(" Keep at it — you'll get there!");
  }

  rl.close();
}

// EXPORT GAME START FUNCTION
function startGame() {
  askQuestion();
}

module.exports = startGame;