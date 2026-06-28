// Our quiz questions. In a real app these might come from a server —
// that's why we simulate "fetching" them with a Promise below,
// instead of just using this array directly.
const QUESTIONS = [
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Mapping", "Display Output Mode", "Direct Object Method"],
    correctIndex: 0
  },
  {
    question: "Which keyword creates a variable that can't be reassigned?",
    options: ["let", "var", "const", "static"],
    correctIndex: 2
  },
  {
    question: "What will 'typeof undefined' return?",
    options: ["'null'", "'undefined'", "'object'", "'NaN'"],
    correctIndex: 1
  },
  {
    question: "Which method adds an item to the end of an array?",
    options: [".shift()", ".unshift()", ".pop()", ".push()"],
    correctIndex: 3
  },
  {
    question: "What does '===' check that '==' does not?",
    options: ["Nothing, they're the same", "Type, in addition to value", "Only type, not value", "Variable scope"],
    correctIndex: 1
  }
];

// This function fakes a network request using a Promise.
// In a real app, this might be `fetch('/api/questions')`.
// We use setTimeout to simulate a short delay, so the loading
// spinner actually has something to show.
function fetchQuestions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(QUESTIONS);
    }, 1200); // 1.2 second fake "loading" delay
  });
}

// This wraps all the quiz state in a closure, the same idea as the
// counter demo: currentIndex and score are private and can only be
// changed through the functions returned here.
function createQuiz(questions) {
  let currentIndex = 0;
  let score = 0;

  return {
    getCurrentQuestion: () => questions[currentIndex],
    getProgress: () => ({ current: currentIndex + 1, total: questions.length }),
    getScore: () => score,

    // Checks the answer, updates score, and moves to the next question.
    // Returns whether the selected answer was correct.
    answer: function (selectedIndex) {
      const isCorrect = selectedIndex === questions[currentIndex].correctIndex;
      if (isCorrect) score++;
      currentIndex++;
      return isCorrect;
    },

    isFinished: () => currentIndex >= questions.length
  };
}

let quiz = null; // will hold our quiz instance once questions load

// DOM elements
const loadingState = document.getElementById('loadingState');
const quizArea = document.getElementById('quizArea');
const resultArea = document.getElementById('resultArea');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');
const scoreText = document.getElementById('scoreText');
const scoreMessage = document.getElementById('scoreMessage');
const restartBtn = document.getElementById('restartBtn');

// Renders the current question and its answer options onto the page.
function renderQuestion() {
  const q = quiz.getCurrentQuestion();
  const progress = quiz.getProgress();

  // Update progress bar + text
  const percent = ((progress.current - 1) / progress.total) * 100;
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `Question ${progress.current} of ${progress.total}`;

  questionText.textContent = q.question;
  optionsList.innerHTML = '';

  q.options.forEach((optionText, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = optionText;
    btn.addEventListener('click', () => handleAnswer(index, btn));
    optionsList.appendChild(btn);
  });
}

// Called when the user clicks an answer option.
// Shows correct/wrong feedback, then moves to the next question
// (or the result screen) after a short pause.
function handleAnswer(selectedIndex, clickedBtn) {
  const q = quiz.getCurrentQuestion();
  const allOptionBtns = optionsList.querySelectorAll('.option-btn');

  // Disable all options so the user can't click again mid-feedback
  allOptionBtns.forEach(btn => btn.disabled = true);

  // Highlight the correct answer green, and the wrong pick (if any) red
  allOptionBtns[q.correctIndex].classList.add('correct');
  if (selectedIndex !== q.correctIndex) {
    clickedBtn.classList.add('wrong');
  }

  quiz.answer(selectedIndex);

  // Wait briefly so the user can see the feedback before moving on
  setTimeout(() => {
    if (quiz.isFinished()) {
      showResult();
    } else {
      renderQuestion();
    }
  }, 800);
}

// Shows the final score screen.
function showResult() {
  quizArea.style.display = 'none';
  resultArea.style.display = 'block';

  const score = quiz.getScore();
  const total = QUESTIONS.length;

  scoreText.textContent = `You scored ${score} / ${total}`;

  if (score === total) {
    scoreMessage.textContent = "Perfect score! 🎉";
  } else if (score >= total / 2) {
    scoreMessage.textContent = "Good effort — review and try again!";
  } else {
    scoreMessage.textContent = "Keep practicing, you'll get there!";
  }
}

// Starts (or restarts) the whole quiz from scratch.
// This is where we use the Promise — showing a loading spinner
// while "fetching" the questions, then revealing the quiz.
function startQuiz() {
  loadingState.style.display = 'block';
  quizArea.style.display = 'none';
  resultArea.style.display = 'none';

  fetchQuestions().then((questions) => {
    quiz = createQuiz(questions);
    loadingState.style.display = 'none';
    quizArea.style.display = 'block';
    renderQuestion();
  });
}

// Extra feature: restart button rebuilds everything from scratch
restartBtn.addEventListener('click', startQuiz);

// Kick things off when the page loads
startQuiz();
