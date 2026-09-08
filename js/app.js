// App entry point: owns quiz state and wires the data/scoring/narrative
// modules to the quiz and results renderers.

import { questions } from './data.js';
import { computeScores, matchPhilosophers } from './scoring.js';
import { generateWorldview, detectContradictions } from './narrative.js';
import { buildDots, renderQuestion, markSelected } from './quiz.js';
import { renderResults } from './results.js';

let currentQ = 0;
let answers = new Array(questions.length).fill(null);

function startQuiz() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('quiz').classList.add('active');
  buildDots();
  renderQuestion(currentQ, answers, selectOption);
}

function selectOption(idx) {
  answers[currentQ] = idx;
  markSelected(idx);
}

function nextQuestion() {
  if (answers[currentQ] === null) return;
  if (currentQ < questions.length - 1) {
    currentQ++;
    renderQuestion(currentQ, answers, selectOption);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQ > 0) {
    currentQ--;
    renderQuestion(currentQ, answers, selectOption);
  }
}

function showResults() {
  document.getElementById('quiz').classList.remove('active');
  document.getElementById('results').classList.add('active');
  window.scrollTo({ top: 0 });

  const scores = computeScores(answers);
  const matches = matchPhilosophers(scores);
  const worldviewParas = generateWorldview(scores);
  const tensions = detectContradictions(scores);

  renderResults(scores, matches, worldviewParas, tensions);
}

function retake() {
  answers = new Array(questions.length).fill(null);
  currentQ = 0;
  document.getElementById('results').classList.remove('active');
  document.getElementById('quiz').classList.add('active');
  buildDots();
  renderQuestion(currentQ, answers, selectOption);
  window.scrollTo({ top: 0 });
}

document.getElementById('startBtn').addEventListener('click', startQuiz);
document.getElementById('prevBtn').addEventListener('click', prevQuestion);
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('retakeBtn').addEventListener('click', retake);

document.addEventListener('keydown', (e) => {
  if (!document.getElementById('quiz').classList.contains('active')) return;
  if (e.key === 'ArrowRight' || e.key === 'Enter') nextQuestion();
  if (e.key === 'ArrowLeft') prevQuestion();
  if (e.key >= '1' && e.key <= '4') selectOption(parseInt(e.key) - 1);
});
