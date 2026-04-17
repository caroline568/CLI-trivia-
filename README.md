# 🎮 CLI Trivia Game

## 📌 Overview

This is a Command-Line Interface (CLI) Trivia Game built using JavaScript (Node.js).
The application allows users to answer multiple-choice questions from topics such as HTML, CSS, CLI, and JavaScript, while tracking their score and performance.

---

## 🚀 Features

* Interactive CLI-based quiz
* Multiple-choice questions
* Real-time feedback (correct/incorrect answers)
* Countdown timer ⏱
* Score tracking system
* Persistent storage using file system (`scores.json`)
* Modular code structure (separated into multiple files)

---

## 🛠️ Technologies Used

* JavaScript (Node.js)
* `readline` module (for CLI interaction)
* `fs` module (for file storage)

---

## 📁 Project Structure

```
cli-trivia/
│
├── src/
│   ├── index.js        # Entry point
│   ├── game.js         # Game logic
│   ├── questions.js    # Question bank
│
├── scores.json         # Stores previous scores
├── package.json
├── README.md
```

---

## ▶️ How to Run the Application

### 1. Clone the repository

```bash
git clone https://github.com/caroline568/CLI-trivia-.git
cd CLI-trivia-
```

### 2. Install dependencies (if any)

```bash
npm install
```

### 3. Run the game

```bash
node src/index.js
```

---

## 🎯 How It Works

1. The game starts and displays a welcome message.
2. Questions are presented one at a time.
3. The user selects an answer (1–4).
4. Immediate feedback is given.
5. A timer runs in the background.
6. Final score is displayed at the end.
7. Score is saved to `scores.json`.

---

## 📊 Example Output

```
🎮 Welcome to the CLI Trivia Game!

Q1: What does HTML stand for?
1. Hyper Text Markup Language
2. High Text Machine Language
3. Home Tool Markup Language
4. Hyperlinks Text Mark Language

Your answer: 1
✅ Correct!
```

---

## 📌 Future Improvements

* Add difficulty levels (Easy, Medium, Hard)
* Add player names and leaderboard
* Randomize questions
* Add replay option
* Improve CLI styling

---

## 👩‍💻 Author

**Caroline Nyawira**

---

## 📄 License

This project is for educational purposes.
