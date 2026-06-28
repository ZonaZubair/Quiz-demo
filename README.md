<h1>🧠 JavaScript Quiz Demo</h1>

<p=>
A topic-based JS quiz — pick a topic, answer 5 questions in a random order, see your score, and try again. Built to practice closures, DOM manipulation, event handling, and Promises.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-yellow" />
  <img src="https://img.shields.io/badge/Status-Complete-brightgreen" />
</p>

---

## 📌 What it demonstrates

| Concept | Where it shows up |
|---|---|
| 🔒 Closures | Quiz state (`currentIndex`, `score`) is kept private inside `createQuiz()`, only changed through the functions it returns |
| 🖥️ DOM Manipulation | Topics, questions, and options are all rendered dynamically |
| 🎯 Event Handling | Clicking a topic or an answer triggers the next step |
| ⏳ Promises | Questions are "fetched" using a Promise wrapped around `setTimeout`, simulating a real network request with a loading state |
| 🔀 Algorithms | Questions are shuffled using Fisher-Yates so the order is different each time, even on the same topic |

---

## 📚 Topics Covered

10 beginner-friendly JS topics, 5 questions each (50 questions total):

1. Variables & Data Types
2. Operators & Type Coercion
3. Functions & Scope
4. Arrays
5. Objects
6. Loops & Conditionals
7. DOM Basics
8. Events
9. ES6+ Syntax
10. Strings

---

## ✨ Extra Features

- **Topic selection:** choose what you want to be quizzed on
- **Randomized order:** questions are reshuffled every time, so the quiz doesn't feel repetitive
- **Progress bar:** shows how far through the quiz you are
- **Instant visual feedback:** correct answer highlights green, wrong pick highlights red
- **Restart:** retake the same topic with a fresh shuffle
- **Change topic:** go back and pick a different topic without reloading the page

---

## 🚀 How to Run

**Option 1: Just open it**

No installation needed.

```
Open index.html in any browser
```

**Option 2: Local server**

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`

---

## 🌐 Deployed

*(https://quiz-dw.netlify.app/)*

---

## 📁 Files

```
quiz/
├── index.html
├── questions.js   # the question bank, organized by topic
├── script.js      # quiz logic
└── README.md
```
