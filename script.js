// TOPICS comes from questions.js (loaded before this file in index.html).
// Each topic has exactly 5 questions.

// Shuffles an array using the Fisher-Yates algorithm.
// This is what makes the question order different each time,
// even when the same topic is picked again.
function shuffle(array) {
  const result = [...array]; // don't mutate the original array
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Simulates fetching questions from a server using a Promise.
// In a real app this might be `fetch('/api/questions?topic=...')`.
// We use setTimeout to fake a short delay so the loading spinner
// actually has something to show.
function fetchQuestions(topicName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = shuffle(TOPICS[topicName]);
      resolve(questions);
    }, 900);
  });
}

// Wraps quiz state in a closure — same idea as the counter demo.
// currentIndex and score are private, only changed through
// the functions returned here.
function createQuiz(questions) {
  let currentIndex = 0;
  let score = 0;

  return {
    getCurrentQuestion: () => questions[currentIndex],
    getProgress: () => ({ current: currentIndex + 1, total: questions.length }),
    getScore: () => score,

    answer: function (selectedIndex) {
      const isCorrect = selectedIndex === questions[currentIndex].correctIndex;
      if (isCorrect) score++;
      currentIndex++;
      return isCorrect;
    },

    isFinished: () => currentIndex >= questions.length
  };
}

let quiz = null;
let currentTopic = null;

// DOM elements
const topicArea = document.getElementById('topicArea');
const topicList = document.getElementById('topicList');
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
const changeTopicBtn = document.getElementById('changeTopicBtn');

// Builds the topic picker buttons from the TOPICS object.
function renderTopicList() {
  topicList.innerHTML = '';

  Object.keys(TOPICS).forEach(topicName => {
    const btn = document.createElement('button');
    btn.className = 'topic-btn';
    btn.textContent = topicName;
    btn.addEventListener('click', () => startQuiz(topicName));
    topicList.appendChild(btn);
  });
}

// Renders the current question and its answer options.
function renderQuestion() {
  const q = quiz.getCurrentQuestion();
  const progress = quiz.getProgress();

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

// Called when the user clicks an answer.
// Shows correct/wrong feedback, then moves on after a short pause.
function handleAnswer(selectedIndex, clickedBtn) {
  const q = quiz.getCurrentQuestion();
  const allOptionBtns = optionsList.querySelectorAll('.option-btn');

  allOptionBtns.forEach(btn => btn.disabled = true);

  allOptionBtns[q.correctIndex].classList.add('correct');
  if (selectedIndex !== q.correctIndex) {
    clickedBtn.classList.add('wrong');
  }

  quiz.answer(selectedIndex);

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
  const total = TOPICS[currentTopic].length;

  scoreText.textContent = `You scored ${score} / ${total}`;

  if (score === total) {
    scoreMessage.textContent = "Perfect score! 🎉";
  } else if (score >= total / 2) {
    scoreMessage.textContent = "Good effort — review and try again!";
  } else {
    scoreMessage.textContent = "Keep practicing, you'll get there!";
  }
}

// Starts the quiz for a chosen topic.
// Questions are reshuffled every time this runs, so reopening the
// same topic gives a different order, not the exact same quiz.
function startQuiz(topicName) {
  currentTopic = topicName;

  topicArea.style.display = 'none';
  resultArea.style.display = 'none';
  quizArea.style.display = 'none';
  loadingState.style.display = 'block';

  fetchQuestions(topicName).then((questions) => {
    quiz = createQuiz(questions);
    loadingState.style.display = 'none';
    quizArea.style.display = 'block';
    renderQuestion();
  });
}

// Restart button: re-runs the same topic with a fresh shuffle
restartBtn.addEventListener('click', () => startQuiz(currentTopic));

// Change topic button: goes back to the topic picker
changeTopicBtn.addEventListener('click', () => {
  resultArea.style.display = 'none';
  topicArea.style.display = 'block';
});

// On page load, show the topic picker first
renderTopicList();
