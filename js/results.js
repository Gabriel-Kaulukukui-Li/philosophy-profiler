// Renders the results screen: dimension spectrums, philosopher cards,
// worldview paragraphs, and contradiction cards.

import { sections } from './data.js';

const RANK_LABELS = ["Closest Match", "Second Match", "Third Match"];

export function renderResults(scores, matches, worldviewParas, tensions) {
  renderSpectrums(scores);
  renderPhilosophers(matches);
  renderWorldview(worldviewParas);
  renderContradictions(tensions);
}

function renderSpectrums(scores) {
  const specDiv = document.getElementById('spectrums');
  specDiv.innerHTML = '';
  sections.forEach((sec, i) => {
    const pct = ((scores[i] + 1) / 2) * 100;
    const label = scores[i] < -0.15 ? sec.left : scores[i] > 0.15 ? sec.right : "Center";
    const fillStart = Math.min(pct, 50);
    const fillWidth = Math.abs(pct - 50);
    specDiv.innerHTML += `
      <div class="dim-block" style="animation: fadeUp 0.5s ease ${i * 0.06}s both;">
        <div class="dim-top">
          <div class="dim-name-wrap">
            <span class="dim-name">${sec.name}</span>
            <div class="dim-tooltip">${sec.tooltip}</div>
          </div>
          <span class="dim-result-label">${label}</span>
        </div>
        <div class="dim-poles"><span>${sec.left}</span><span>${sec.right}</span></div>
        <div class="dim-track">
          <div class="dim-fill" style="left:${fillStart}%;width:${fillWidth}%;background:${sec.color};opacity:0.3;"></div>
          <div class="dim-marker" style="left:${pct}%;border-color:${sec.color};"></div>
        </div>
      </div>`;
  });
}

function renderPhilosophers(matches) {
  const cardsDiv = document.getElementById('philosopherCards');
  cardsDiv.innerHTML = '';
  matches.forEach((m, i) => {
    const pct = Math.round(((m.similarity + 1) / 2) * 100);
    cardsDiv.innerHTML += `
      <div class="phil-card" style="animation: fadeUp 0.5s ease ${0.6 + i * 0.12}s both;">
        <div class="phil-rank">${RANK_LABELS[i]}</div>
        <div class="phil-name">${m.name}</div>
        <div class="phil-years">${m.years}</div>
        <div class="phil-pct">${pct}% alignment</div>
        <div class="phil-desc">${m.desc}</div>
      </div>`;
  });
}

function renderWorldview(worldviewParas) {
  document.getElementById('worldviewText').innerHTML = worldviewParas.map(p => `<p>${p}</p>`).join('');
}

function renderContradictions(tensions) {
  const cDiv = document.getElementById('contradictionsCards');
  if (tensions.length === 0) {
    cDiv.innerHTML = '<div class="no-contradictions">Your beliefs are remarkably consistent across all nine dimensions. No major contradictions detected.</div>';
  } else {
    cDiv.innerHTML = tensions.map((t, i) => `
      <div class="contra-card" style="animation: fadeUp 0.5s ease ${1.2 + i * 0.1}s both;">
        <div class="contra-dims">${t.dims}</div>
        <div class="contra-text">${t.text}</div>
      </div>`).join('');
  }
}
