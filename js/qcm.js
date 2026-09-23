/* ============================================
   QCM — Dhiaa Mezni
   Notation automatique sur 20 (adaptatif)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const storageKey = 'dhiaa-qcm-results-v1';
  const form = document.getElementById('quiz-form');
  if (!form) return;

  const questions = form.querySelectorAll('.question-card');
  const total = questions.length;
  const pointsPerQuestion = 20 / total;

  const errorEl = document.getElementById('quiz-error');
  const resultSection = document.getElementById('quiz-result');
  const resultTitle = document.getElementById('result-title');
  const resultMessage = document.getElementById('result-message');
  const scoreBar = document.getElementById('score-bar');
  const submitButton = form.querySelector('button[type="submit"]');

  const readResults = () => {
    try {
      const entries = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return Array.isArray(entries) ? entries : [];
    } catch {
      return [];
    }
  };

  const renderGradebook = () => {
    const students = new Map();
    readResults().forEach((entry) => {
      const key = entry.name.trim().toLocaleLowerCase('fr');
      if (!students.has(key)) students.set(key, { name: entry.name, attempts: [] });
      students.get(key).attempts.push(entry);
    });

    const body = document.getElementById('gradebook-body');
    body.replaceChildren();
    [...students.values()].sort((a, b) => a.name.localeCompare(b.name, 'fr')).forEach((student) => {
      const average = student.attempts.reduce((sum, attempt) => sum + attempt.score, 0) / student.attempts.length;
      const row = document.createElement('tr');
      const name = document.createElement('th');
      name.scope = 'row';
      name.textContent = student.name;
      const averageCell = document.createElement('td');
      averageCell.textContent = `${average.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}/20`;
      const count = document.createElement('td');
      count.textContent = String(student.attempts.length);
      const details = document.createElement('td');
      details.textContent = [...student.attempts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((attempt) => `${attempt.score}/20 · ${new Date(attempt.date).toLocaleString('fr-FR')}`)
        .join(' ; ');
      const actions = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'gradebook-delete';
      deleteButton.dataset.studentKey = student.name.trim().toLocaleLowerCase('fr');
      deleteButton.textContent = 'Supprimer';
      deleteButton.setAttribute('aria-label', `Supprimer les résultats de ${student.name}`);
      actions.append(deleteButton);
      row.append(name, averageCell, count, details, actions);
      body.append(row);
    });

    const hasEntries = students.size > 0;
    document.getElementById('gradebook-empty').hidden = hasEntries;
    document.getElementById('gradebook-table-wrap').hidden = !hasEntries;
  };

  renderGradebook();

  document.getElementById('gradebook-body').addEventListener('click', (event) => {
    const button = event.target.closest('.gradebook-delete');
    if (!button) return;
    const studentKey = button.dataset.studentKey;
    const remaining = readResults().filter((entry) => entry.name.trim().toLocaleLowerCase('fr') !== studentKey);
    try {
      localStorage.setItem(storageKey, JSON.stringify(remaining));
      renderGradebook();
    } catch {
      button.textContent = 'Suppression impossible';
      button.disabled = true;
    }
  });

  /* ---------- SUBMIT ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const answered = [...questions].filter((q) => q.querySelector('input[type="radio"]:checked')).length;
    if (answered < total) {
      errorEl.hidden = false;
      errorEl.textContent = `Veuillez répondre à toutes les questions (${answered}/${total} répondues).`;
      resultSection.hidden = true;
      return;
    }

    errorEl.hidden = true;
    let score = 0;

    questions.forEach((q) => {
      const correct = q.dataset.answer;
      const selected = q.querySelector('input[type="radio"]:checked');
      const feedback = q.querySelector('.answer-feedback');

      // Reset
      q.classList.remove('correct', 'incorrect');
      if (feedback) {
        feedback.textContent = '';
        feedback.className = 'answer-feedback';
      }
      q.querySelectorAll('.answer').forEach((lbl) => {
        lbl.classList.remove('correct-answer', 'wrong-answer');
      });

      if (selected && selected.value === correct) {
        score += pointsPerQuestion;
        q.classList.add('correct');
        if (feedback) {
          feedback.textContent = '✅ Bonne réponse';
          feedback.classList.add('success');
        }
        selected.closest('.answer').classList.add('correct-answer');
      } else {
        q.classList.add('incorrect');
        if (selected) {
          if (feedback) {
            feedback.textContent = '❌ Mauvaise réponse';
            feedback.classList.add('error');
          }
          selected.closest('.answer').classList.add('wrong-answer');
        } else if (feedback) {
          feedback.textContent = '⚠️ Aucune réponse sélectionnée';
          feedback.classList.add('error');
        }
        // Highlight correct answer
        const correctInput = q.querySelector(`input[value="${correct}"]`);
        if (correctInput) correctInput.closest('.answer').classList.add('correct-answer');
      }
    });

    // Arrondi à 2 décimales
    const finalScore = Math.round(score * 100) / 100;
    const displayScore = Number.isInteger(finalScore)
      ? finalScore
      : finalScore.toFixed(2).replace('.', ',');

    const studentName = document.getElementById('student-name').value.trim();
    const results = readResults();
    results.push({ name: studentName, score: finalScore, date: new Date().toISOString() });
    let storageError = false;
    try {
      localStorage.setItem(storageKey, JSON.stringify(results));
      renderGradebook();
    } catch {
      storageError = true;
    }

    // Affichage du résultat
    resultSection.hidden = false;
    resultTitle.textContent = `Votre note : ${displayScore} / 20`;

    let message = '';
    if (storageError) message = 'Note calculée, mais impossible de l’enregistrer dans ce navigateur.';
    else if (finalScore >= 18) message = '🏆 Excellent ! Maîtrise remarquable.';
    else if (finalScore >= 14) message = '🎉 Très bien ! Continuez comme ça.';
    else if (finalScore >= 10) message = '👍 Pas mal ! Encore un petit effort.';
    else if (finalScore >= 6) message = '📚 À revoir — relisez les corrections ci-dessus.';
    else message = '💪 Courage ! Reprenez les bases et recommencez.';

    resultMessage.textContent = message;
    submitButton.disabled = true;

    // Barre de progression
    if (scoreBar) {
      const pct = (finalScore / 20) * 100;
      scoreBar.style.width = '0%';
      requestAnimationFrame(() => {
        scoreBar.style.width = pct + '%';
      });
    }

    resultSection.focus();
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ---------- RESET ---------- */
  form.addEventListener('reset', () => {
    questions.forEach((q) => {
      q.classList.remove('correct', 'incorrect');
      q.querySelectorAll('.answer').forEach((lbl) => {
        lbl.classList.remove('correct-answer', 'wrong-answer');
      });
      const feedback = q.querySelector('.answer-feedback');
      if (feedback) {
        feedback.textContent = '';
        feedback.className = 'answer-feedback';
      }
    });
    resultSection.hidden = true;
    errorEl.hidden = true;
    submitButton.disabled = false;
  });
});
