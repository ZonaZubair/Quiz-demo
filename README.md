<h1>🧠 Quiz Demo</h1>

<p>
A short multiple-choice quiz with a progress bar, instant feedback, and a restart option. Built to practice closures, DOM manipulation, event handling, and Promises.
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
| 🖥️ DOM Manipulation | Each question and its options are rendered dynamically as the user progresses |
| 🎯 Event Handling | Clicking an option triggers scoring, feedback, and moving to the next question |
| ⏳ Promises | Questions are "fetched" using a Promise wrapped around `setTimeout`, simulating a real network request with a loading state |

---

## ✨ Extra Features

- **Progress bar:"** shows how far through the quiz you are
- **Restart button:** retake the quiz from scratch after seeing your score
- **Instant visual feedback:** correct answer highlights green, wrong pick highlights red, before moving to the next question

---

## 🚀 How to Run

**Option 1: Just open it:**

No installation needed.

```
Open index.html in any browser
```

**Option 2: Local server:**

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`

---

## 🌐 Deployed

*(Add your live URL here if deployed — Netlify / Vercel / GitHub Pages)*

---

## 📁 Files

```
quiz/
├── index.html
├── script.js
└── README.md
```
