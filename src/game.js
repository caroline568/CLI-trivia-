const readline = require("readline");
const questions = require("./questions");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

let timerInterval = null;
let secondsLeft = 0;

const TIME_PER_QUESTION = 15;
let questionActive = false;
// ask question
function askQuestion() {
  if (currentQuestion >= questions.length) {
    endGame();
    return;
  }

  const q = questions[currentQuestion];

  questionActive = true;
  secondsLeft = TIME_PER_QUESTION;

  console.log("\n--------------------------------------------------");
  console.log(`Question ${currentQuestion + 1} of ${questions.length}`);
  console.log(`Time limit: ${secondsLeft} seconds`);
  console.log("\n" + q.question);

  q.options.forEach(option => console.log(option));

  // TIMER
  timerInterval = setInterval(() => {
    secondsLeft--;

    process.stdout.write(`⏱ Time left: ${secondsLeft}s   \r`);

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);

      if (!questionActive) return;
      questionActive = false;

      console.log("\n\n⏰ Time's up!");
      console.log(`Correct answer: ${q.answer}`);

      userAnswers.push({
        question: q.question,
        correctAnswer: q.answer,
        userAnswer: "No answer",
        isCorrect: false
      });

      currentQuestion++;
      setTimeout(askQuestion, 1000);
    }
  }, 1000);

  // USER INPUT
  rl.question("\nYour answer (A/B/C/D): ", (input) => {
    if (!questionActive) return;

    questionActive = false;
    clearInterval(timerInterval);

    const userAnswer = input.trim().toUpperCase();

    const isCorrect = userAnswer === q.answer;

    if (isCorrect) {
      console.log("✅ Correct!");
      score++;
    } else {
      console.log(`❌ Wrong. Correct answer: ${q.answer}`);
    }

    userAnswers.push({
      question: q.question,
      correctAnswer: q.answer,
      userAnswer: userAnswer,
      isCorrect: isCorrect
    });

    currentQuestion++;
    setTimeout(askQuestion, 800);
  });
}
// end game
function endGame() {
  clearInterval(timerInterval);

  console.log("\n==================================================");
  console.log("           GAME OVER - RESULTS");
  console.log("==================================================\n");

  // SHOW FULL BREAKDOWN (FIXED)
  userAnswers.forEach((item, index) => {
    const status = item.isCorrect ? "✅" : "❌";

    console.log(`${status} Q${index + 1}: ${item.question}`);
    console.log(`   Your answer   : ${item.userAnswer}`);
    console.log(`   Correct answer: ${item.correctAnswer}`);
    console.log("");
  });

  console.log("--------------------------------------------------");
  console.log(`Final Score: ${score} / ${questions.length}`);

  const percentage = (score / questions.length) * 100;

  if (percentage === 100) {
    console.log(" Perfect score!");
  } else if (percentage >= 70) {
    console.log(" Great job!");
  } else if (percentage >= 50) {
    console.log(" Keep practising!");
  } else {
    console.log(" Keep at it — you'll get there!");
  }

  rl.close();
}
// start game
function startGame() {
  askQuestion();
}

module.exports = startGame;