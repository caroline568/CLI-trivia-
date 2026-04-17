
const readline = require("readline");
const startGame = require("./game");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("==================================================");
console.log("   Welcome to the Software Engineering Fundamentals Quiz!");
console.log("==================================================");
console.log("Answer each question with A, B, C, or D.");
console.log("You have 15 seconds per question. Good luck!\n");

rl.question("Press ENTER to start...", () => {
  startGame(rl); 
});
GAME.JS
const questions = require("./questions");

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

let timerInterval = null;
let secondsLeft = 0;

const TIME_PER_QUESTION = 15;
let questionActive = false;

let gameStartTime = 0;

// START GAME
function startGame(rl) {
  gameStartTime = Date.now();
  askQuestion(rl);
}

// ASK QUESTION
function askQuestion(rl) {
  if (currentQuestion >= questions.length) {
    return endGame(rl);
  }

  const q = questions[currentQuestion];

  questionActive = true;
  secondsLeft = TIME_PER_QUESTION;

  console.log("\n--------------------------------------------------");
  console.log(`Question ${currentQuestion + 1} of ${questions.length}`);
  console.log(`⏱ You have ${secondsLeft} seconds`);
  console.log("\n" + q.question);

  //  Using map (required)
  q.options.map(opt => console.log(opt));

  // TIMER
  timerInterval = setInterval(() => {
    secondsLeft--;
    process.stdout.write(`⏳ ${secondsLeft}s left   \r`);

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);

      if (!questionActive) return;

      questionActive = false;

      console.log("\n⏰ Time's up!");
      console.log(`Correct answer: ${q.answer}`);

      userAnswers.push({
        question: q.question,
        correctAnswer: q.answer,
        userAnswer: "No answer",
        isCorrect: false
      });

      currentQuestion++;
      setTimeout(() => askQuestion(rl), 1000);
    }
  }, 1000);

  // USER INPUT
  rl.question("\nYour answer (A/B/C/D): ", (input) => {
    if (!questionActive) return;

    questionActive = false;
    clearInterval(timerInterval);

    const userAnswer = input.trim().toUpperCase();

    //  INPUT VALIDATION
    if (!["A", "B", "C", "D"].includes(userAnswer)) {
      console.log("⚠️ Invalid input. Please enter A, B, C, or D.");
      return askQuestion(rl);
    }

    const isCorrect = userAnswer === q.answer;

    if (isCorrect) {
      console.log(" Correct!");
      score++;
    } else {
      console.log(`❌ Wrong. Correct answer: ${q.answer}`);
    }

    userAnswers.push({
      question: q.question,
      correctAnswer: q.answer,
      userAnswer,
      isCorrect
    });

    currentQuestion++;
    setTimeout(() => askQuestion(rl), 800);
  });
}

// END GAME
function endGame(rl) {
  clearInterval(timerInterval);

  const totalTime = Math.floor((Date.now() - gameStartTime) / 1000);

  console.log("\n==================================================");
  console.log("               GAME OVER");
  console.log("==================================================\n");

  //  Array iteration 
  userAnswers.forEach((item, index) => {
    const status = item.isCorrect ? "✅" : "X";

    console.log(`${status} Q${index + 1}: ${item.question}`);
    console.log(`   Your answer   : ${item.userAnswer}`);
    console.log(`   Correct answer: ${item.correctAnswer}\n`);
  });

  console.log("--------------------------------------------------");
  console.log(`Final Score: ${score} / ${questions.length}`);
  console.log(`Total Time: ${totalTime} seconds`);

  const percentage = (score / questions.length) * 100;

  if (percentage === 100) {
    console.log("🏆 Perfect score!");
  } else if (percentage >= 70) {
    console.log(" Great job!");
  } else if (percentage >= 50) {
    console.log(" Keep practising!");
  } else {
    console.log(" Don't give up!");
  }

  rl.close();
}

module.exports = startGame;