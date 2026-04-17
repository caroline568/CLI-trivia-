const readline = require("readline");
const startGame = require("./game");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("==================================================");
console.log("       Welcome to the Software Engineering Fundamentals Quiz!");
console.log("==================================================");
console.log("Answer each question with A, B, C, or D.");
console.log("You have 15 seconds per question. Good luck!\n");

rl.question("Press ENTER to start...", () => {
  rl.close();
  startGame();
});