// Renders the quiz screen: progress dots, current question, and options.

import { sections, questions, optionLabels } from './data.js';

export function buildDots() {
  const wrap = document.getElementById('progressDots');
  wrap.innerHTML = '';
  sections.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'progress-dot';
    d.id = 'dot-' + i;
    wrap.appendChild(d);
  });
}

export function updateDots(currentQ, answers) {
  const curSection = questions[currentQ].s;
  sections.forEach((_, i) => {
    const d = document.getElementById('dot-' + i);
    d.className = 'progress-dot';
    const sectionStart = questions.findIndex(q => q.s === i);
    const allAnswered = [0, 1, 2, 3].every(j => answers[sectionStart + j] !== null);
    if (allAnswered) d.classList.add('filled');
    if (i === curSection) d.classList.add('current');
  });
}

export function renderQuestion(currentQ, answers, onSelectOption) {
  const q = questions[currentQ];
  const sec = sections[q.s];

  document.getElementById('sectionLabel').textContent = sec.name;
  document.getElementById('progressText').textContent = `${currentQ + 1} / ${questions.length}`;
  document.getElementById('questionText').textContent = q.t;

  const optDiv = document.getElementById('options');
  optDiv.innerHTML = '';
  optionLabels.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn' + (answers[currentQ] === i ? ' selected' : '');
    btn.textContent = label;
    btn.addEventListener('click', () => onSelectOption(i));
    optDiv.appendChild(btn);
  });

  document.getElementById('prevBtn').disabled = currentQ === 0;
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.textContent = currentQ === questions.length - 1 ? 'See Results' : 'Next';
  nextBtn.disabled = answers[currentQ] === null;

  updateDots(currentQ, answers);
}

// Lightweight update used on option click, mirroring renderQuestion's selection
// state without rebuilding the option buttons (keeps click handlers stable).
export function markSelected(idx) {
  document.querySelectorAll('.option-btn').forEach((btn, i) => btn.classList.toggle('selected', i === idx));
  document.getElementById('nextBtn').disabled = false;
}
