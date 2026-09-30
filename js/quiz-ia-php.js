document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    { topic: 'PHP', text: 'Quelle balise ouvre un bloc de code PHP ?', answers: ['<php>', '<?php', '<script php>'], correct: 1, why: 'Un bloc PHP commence avec <?php et peut être intégré dans une page HTML.' },
    { topic: 'PHP', text: 'Quelle variable superglobale reçoit les champs d’un formulaire envoyé en POST ?', answers: ['$_GET', '$_FORM', '$_POST'], correct: 2, why: 'PHP place les données POST dans le tableau associatif $_POST.' },
    { topic: 'PHP', text: 'Quelle instruction affiche une valeur en PHP ?', answers: ['echo', 'show()', 'console.log()'], correct: 0, why: 'echo envoie du texte dans la réponse générée par le serveur.' },
    { topic: 'PHP', text: 'Quel opérateur compare à la fois la valeur et le type en PHP ?', answers: ['=', '==', '==='], correct: 2, why: '=== effectue une comparaison stricte ; = sert à affecter une valeur.' },
    { topic: 'PHP', text: 'Quelle fonction aide à afficher du texte sûr dans une page HTML ?', answers: ['htmlspecialchars()', 'var_dump()', 'count()'], correct: 0, why: 'htmlspecialchars() convertit notamment les caractères spéciaux pour éviter qu’ils soient interprétés comme du HTML.' },
    { topic: 'Outils IA', text: 'Quel outil conversationnel d’OpenAI peut aider à expliquer un concept ou rédiger un brouillon ?', answers: ['ChatGPT', 'MySQL', 'Visual Studio Code'], correct: 0, why: 'ChatGPT est un assistant conversationnel ; il faut vérifier les informations importantes qu’il propose.' },
    { topic: 'Outils IA', text: 'Quel outil est conçu pour suggérer du code directement dans un éditeur de programmation ?', answers: ['GitHub Copilot', 'Google Maps', 'phpMyAdmin'], correct: 0, why: 'GitHub Copilot propose des complétions de code dans les éditeurs compatibles. Le développeur doit relire et tester les suggestions.' },
    { topic: 'Outils IA', text: 'Quel outil peut générer des images à partir d’une description écrite ?', answers: ['Un générateur d’images comme DALL·E', 'Un gestionnaire de base de données', 'Un compilateur PHP'], correct: 0, why: 'Les outils de génération d’images transforment une consigne textuelle en image.' },
    { topic: 'Outils IA', text: 'Que faut-il faire avant de confier des données à un outil d’IA en ligne ?', answers: ['Éviter d’y saisir des informations personnelles ou confidentielles sans autorisation', 'Publier sa clé API pour faciliter la connexion', 'Désactiver toute vérification des réponses'], correct: 0, why: 'Respectez la confidentialité et les règles de votre organisation avant de transmettre des données à un service.' },
    { topic: 'PHP + IA', text: 'Dans une application PHP qui appelle un service d’IA, où placer la clé API ?', answers: ['Dans le code JavaScript visible de tous', 'Dans une configuration côté serveur protégée', 'Dans le texte de la page HTML'], correct: 1, why: 'La clé reste côté serveur afin que les visiteurs ne puissent pas la récupérer dans le navigateur.' }
  ];
  const form = document.getElementById('quiz-form');
  const container = document.getElementById('questions');
  const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  container.innerHTML = questions.map((q, i) => `<fieldset class="question-card" data-answer="${q.correct}"><legend><span class="question-number">${String(i + 1).padStart(2, '0')}</span><span><small>${escapeHtml(q.topic)}</small><br>${escapeHtml(q.text)}</span></legend>${q.answers.map((answer, j) => `<label class="answer"><input type="radio" name="q${i}" value="${j}"><span>${escapeHtml(answer)}</span></label>`).join('')}<p class="answer-feedback" aria-live="polite"></p></fieldset>`).join('');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const cards = [...container.querySelectorAll('.question-card')];
    const answered = cards.filter((card) => card.querySelector('input:checked')).length;
    const error = document.getElementById('quiz-error');
    if (answered !== cards.length) {
      error.hidden = false;
      error.textContent = `Répondez à toutes les questions (${answered}/${cards.length}).`;
      document.getElementById('quiz-result').hidden = true;
      return;
    }
    error.hidden = true;
    let score = 0;
    cards.forEach((card, i) => {
      const correct = Number(card.dataset.answer);
      const selected = Number(card.querySelector('input:checked').value);
      const ok = selected === correct;
      if (ok) score++;
      card.classList.toggle('correct', ok);
      card.classList.toggle('incorrect', !ok);
      card.querySelectorAll('.answer').forEach((label, j) => {
        label.classList.toggle('correct-answer', j === correct);
        label.classList.toggle('wrong-answer', j === selected && !ok);
      });
      const feedback = card.querySelector('.answer-feedback');
      feedback.textContent = `${ok ? 'Bonne réponse.' : `Réponse attendue : ${questions[i].answers[correct]}.`} ${questions[i].why}`;
      feedback.classList.toggle('success', ok);
      feedback.classList.toggle('error', !ok);
      card.querySelectorAll('input').forEach((input) => { input.disabled = true; });
    });
    const result = document.getElementById('quiz-result');
    const grade = score * 2;
    document.getElementById('result-title').textContent = `Votre résultat : ${grade}/20`;
    document.getElementById('result-message').textContent = grade >= 16 ? 'Très bien ! Vous maîtrisez les liens essentiels entre IA et PHP.' : grade >= 10 ? 'Bon début. Relisez les explications pour consolider quelques notions.' : 'Reprenez le résumé et les cours, puis essayez à nouveau.';
    document.getElementById('score-bar').style.width = `${grade * 5}%`;
    result.hidden = false;
    result.focus();
  });
  form.addEventListener('reset', () => {
    window.setTimeout(() => {
      container.querySelectorAll('input').forEach((input) => { input.disabled = false; });
      container.querySelectorAll('.question-card').forEach((card) => card.classList.remove('correct', 'incorrect'));
      container.querySelectorAll('.answer').forEach((label) => label.classList.remove('correct-answer', 'wrong-answer'));
      container.querySelectorAll('.answer-feedback').forEach((feedback) => { feedback.textContent = ''; feedback.className = 'answer-feedback'; });
      document.getElementById('quiz-error').hidden = true;
      document.getElementById('quiz-result').hidden = true;
      document.getElementById('score-bar').style.width = '0';
    });
  });
});
