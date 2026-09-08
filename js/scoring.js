// Turns raw answers into per-dimension scores and philosopher similarity ranking.

import { questions, optionValues, philosophers, sections } from './data.js';

// Each dimension has 4 questions worth up to ±2 each, so the raw sum maxes out
// at exactly ±8 — dividing by 8 maps it to [-1, 1] without needing the clamp,
// which is kept only as a safety net if question counts per section ever change.
export function computeScores(answers) {
  const scores = new Array(sections.length).fill(0);
  questions.forEach((q, i) => {
    if (answers[i] !== null) scores[q.s] += optionValues[answers[i]] * q.d;
  });
  return scores.map(s => Math.max(-1, Math.min(1, s / 8)));
}

export function matchPhilosophers(scores, count = 3) {
  const results = philosophers.map(p => {
    let dot = 0, magA = 0, magB = 0;
    for (let i = 0; i < sections.length; i++) {
      dot += scores[i] * p.vec[i];
      magA += scores[i] ** 2;
      magB += p.vec[i] ** 2;
    }
    return { ...p, similarity: dot / (Math.sqrt(magA) * Math.sqrt(magB) + 1e-9) };
  });
  results.sort((a, b) => b.similarity - a.similarity);
  return results.slice(0, count);
}
