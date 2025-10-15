const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreText = document.getElementById('score');
const progressBar = document.getElementById('progress');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Earth", correct: false },
      { text: "Venus", correct: false }
    ]
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Vincent Van Gogh", correct: false },
      { text: "Michelangelo", correct: false }
    ]
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Tokyo", correct: true },
      { text: "Kyoto", correct: false },
      { text: "Osaka", correct: false },
      { text: "Nagoya", correct: false }
    ]
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Carbon Dioxide", correct: true },
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false }
    ]
  },
  {
    question: "Which ocean is the largest?",
    answers: [
      { text: "Pacific Ocean", correct: true },
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false }
    ]
  }
];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
  updateScore();
  updateProgress();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer.correct, button));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add('hide');
  answerButtons.innerHTML = '';
}

function selectAnswer(correct, button) {
  if (correct) {
    score++;
    correctSound.play();
    button.style.backgroundColor = '#43cea2';
    button.style.color = 'white';
  } else {
    wrongSound.play();
    button.style.backgroundColor = '#e74c3c';
    button.style.color = 'white';
  }
  Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
  nextButton.classList.remove('hide');
  updateScore();
}

function updateScore() {
  scoreText.innerText = `Score: ${score}`;
}

function updateProgress() {
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  progressBar.style.width = progress + '%';
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    updateProgress();
  } else {
    progressBar.style.width = '100%';
    questionElement.innerText = `🎉 Quiz Over! Final Score: ${score}/${questions.length}`;
    answerButtons.innerHTML = '';
    nextButton.innerText = "Play Again";
    nextButton.onclick = startQuiz;
  }
});

startQuiz();
