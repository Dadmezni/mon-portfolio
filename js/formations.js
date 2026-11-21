/* ===== PAGE FORMATIONS : données, recherche, filtres ===== */
(function () {
  'use strict';

  /* Pour ajouter une formation : ajoutez simplement une ligne dans COURSES. */
  var CATEGORIES = [
    { id: 'all',       label: 'Toutes' },
    { id: 'ia',        label: 'Intelligence artificielle' },
    { id: 'web',       label: 'Développement web' },
    { id: 'data',      label: 'Bases de données' },
    { id: 'ateliers',  label: 'Ateliers & évaluations' },
    { id: 'marketing', label: 'Marketing digital' }
  ];

  var CAT_SLOGANS = {
    all:       "Apprenez en construisant de vrais projets.",
    ia:        "L'intelligence artificielle, expliquée simplement.",
    web:       "Construisez des applications modernes, de l'idée à la mise en ligne.",
    data:      "Des données structurées, fiables et faciles à exploiter.",
    ateliers:  "Pratiquez, vérifiez, progressez.",
    marketing: "Créez, communiquez, convainquez."
  };

  var COURSES = [
    // Intelligence artificielle
    { cat: 'ia', title: "Comprendre l'IA", href: 'ia.html', slogan: "L'IA n'est plus un mystère : elle devient votre alliée.", desc: "Les concepts essentiels de l'intelligence artificielle, expliqués pas à pas." },
    { cat: 'ia', title: "Cours d'IA en arabe", href: 'iaCours.html', slogan: "الذكاء الاصطناعي بلغتك، خطوة بخطوة", lang: 'ar', desc: "Cours d'introduction à l'intelligence artificielle, en langue arabe." },
    { cat: 'ia', title: 'Machine Learning et RAG', href: 'rag.html', slogan: "Donnez une mémoire à vos modèles.", desc: "Principes du Machine Learning et de la génération augmentée par récupération (RAG)." },
    { cat: 'ia', title: "Histoire de l'IA et du RAG", href: 'ragHistoire.html', slogan: "Pour comprendre demain, remontez le fil d'hier.", desc: "Les grandes étapes qui ont mené de l'IA classique au RAG." },
    { cat: 'ia', title: 'Embeddings', href: 'embedding.html', slogan: "Quand les mots deviennent des coordonnées.", desc: "Comprendre les représentations vectorielles et leur rôle dans la recherche sémantique." },
    { cat: 'ia', title: 'Technologies et prompts', href: 'prompts.html', slogan: "Posez la bonne question, obtenez la bonne réponse.", desc: "Outils d'IA générative et bonnes pratiques pour écrire des prompts efficaces." },

    // Développement web
    { cat: 'web', title: 'Cours Laravel', href: 'laravelCours.html', slogan: "Du code élégant, des applications solides.", desc: "Les bases de Laravel et la structure d'une application, étape par étape." },
    { cat: 'web', title: 'Formation DevOps', href: 'devopsCours.html', slogan: "Codez, livrez, recommencez, sans friction.", desc: "Initiation aux pratiques DevOps : automatisation, déploiement et CI/CD." },
    { cat: 'web', title: 'Docker', href: 'Docker.html', slogan: "Construisez une fois, exécutez partout.", desc: "Conteneuriser une application et simplifier son déploiement." },
    { cat: 'web', title: 'Next.js', href: 'Next.js.html', slogan: "Des sites rapides, pensés pour le web moderne.", desc: "Construire des applications web modernes avec Next.js." },
    { cat: 'web', title: 'React', href: 'React.html', slogan: "Des interfaces vivantes, composant par composant.", desc: "Créer des interfaces dynamiques avec React." },
    { cat: 'web', title: 'HTML', href: 'HTML.html', slogan: "Donnez une structure claire à chaque page web.", desc: "Maîtriser les balises HTML et construire une page web accessible." },
    { cat: 'web', title: 'PHP — Développement web dynamique', href: 'PHP.html', slogan: "Transformez une page statique en véritable application web.", desc: "Apprendre PHP pour gérer les formulaires, les sessions et les données." },
    { cat: 'web', title: 'Python — Les bases du développement', href: 'Python.html', slogan: "Écrivez vos premiers programmes avec simplicité et clarté.", desc: "Découvrir Python, ses fondamentaux et ses usages en programmation." },
    { cat: 'web', title: 'Apprendre la programmation', href: 'Apprendre la programmation.html', slogan: "Passez de la logique à vos premiers programmes.", desc: "Acquérir les notions essentielles pour comprendre et écrire du code." },
    { cat: 'web', title: 'Cours Bootstrap 5', href: 'bootstrap-cours.html', slogan: "Un design responsive en un clin d'œil.", desc: "Concevoir des pages responsives avec Bootstrap 5." },
    { cat: 'web', title: 'Guide du portfolio', href: 'guide-portfolio.html', slogan: "Votre vitrine professionnelle, en ligne.", desc: "Créer et publier votre portfolio professionnel." },
    { cat: 'web', title: 'Formation DevOps — Laravel, PostgreSQL, Docker & Render', href: 'Formation DevOps — Laravel 13, PostgreSQL, Docker & Render.html', slogan: "De Laravel au déploiement, maîtrisez toute la chaîne.", desc: "Déployer une application Laravel avec PostgreSQL, Docker, GitHub Actions et Render." },

    // Bases de données
    { cat: 'data', title: 'PostgreSQL', href: 'PostgreSQL.html', slogan: "Des données bien rangées, des requêtes qui tiennent la route.", desc: "Modéliser et interroger une base de données relationnelle avec PostgreSQL." },
    { cat: 'data', title: 'MongoDB', href: 'mongodb.html', slogan: "Vos données, sans carcan.", desc: "Découvrir les bases de données orientées documents avec MongoDB." },

    // Ateliers et évaluations
    { cat: 'ateliers', title: 'Atelier pratique', href: 'round3-vscode.html', slogan: "Apprendre en pratiquant, une ligne à la fois.", desc: "Atelier guidé pour mettre en pratique les notions avec VS Code." },
    { cat: 'ateliers', title: 'Explication du code', href: 'explication-code-round3.html', slogan: "Comprendre chaque ligne, pas seulement la copier.", desc: "Lecture et explication détaillée du code de l'atelier." },
    { cat: 'ateliers', title: 'Quiz récapitulatif IA + PHP', href: 'quiz-ia-php.html', slogan: "Testez-vous, progressez, recommencez.", desc: "Testez vos connaissances en IA et en PHP." },
    { cat: 'ateliers', title: 'QCM PHP et IA', href: 'qcm.html', slogan: "Mesurez ce que vous savez vraiment.", desc: "Questions à choix multiples pour vous évaluer." },

    // Marketing digital
    { cat: 'marketing', title: 'Cours illustré', href: 'marketing-digital-visuel.html', slogan: "Le marketing digital, expliqué en images.", desc: "Introduction visuelle au marketing digital." },
    { cat: 'marketing', title: 'TP Canva', href: 'tp-canva.html', slogan: "Créez des visuels qui se remarquent.", desc: "Travaux pratiques de création visuelle avec Canva." }
  ];

  var grid = document.getElementById('course-grid');
  var filters = document.getElementById('course-filters');
  var search = document.getElementById('course-search');
  var info = document.getElementById('results-info');
  var catSlogan = document.getElementById('cat-slogan');
  if (!grid || !filters || !search || !catSlogan) return;

  var catLabel = {};
  CATEGORIES.forEach(function (c) { catLabel[c.id] = c.label; });

  var state = { cat: 'all', q: '' };

  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function matches(course) {
    if (state.cat !== 'all' && course.cat !== state.cat) return false;
    if (!state.q) return true;
    var hay = norm(course.title + ' ' + course.slogan + ' ' + course.desc + ' ' + catLabel[course.cat]);
    return state.q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
  }

  function countFor(id) {
    return COURSES.filter(function (c) { return id === 'all' || c.cat === id; }).length;
  }

  /* Filtres */
  function buildFilters() {
    CATEGORIES.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip';
      btn.dataset.cat = cat.id;
      btn.setAttribute('aria-pressed', 'false');

      var label = document.createElement('span');
      label.textContent = cat.label;
      var count = document.createElement('span');
      count.className = 'chip-count';
      count.textContent = countFor(cat.id);

      btn.appendChild(label);
      btn.appendChild(count);
      btn.addEventListener('click', function () { setCategory(cat.id); });
      filters.appendChild(btn);
    });
  }

  function setCategory(id) {
    state.cat = id;
    try {
      history.replaceState(null, '', id === 'all' ? location.pathname + location.search : '#' + id);
    } catch (e) { /* ignoré */ }
    render();
  }

  /* Cartes */
  function card(course) {
    var a = document.createElement('a');
    a.className = 'course-card';
    a.href = course.href;

    var cat = document.createElement('span');
    cat.className = 'course-cat';
    cat.textContent = catLabel[course.cat];

    var h = document.createElement('h2');
    h.textContent = course.title;
    if (course.lang) { h.lang = course.lang; a.setAttribute('hreflang', course.lang); }

    var slogan = document.createElement('p');
    slogan.className = 'course-slogan';
    slogan.textContent = course.slogan;
    if (course.lang) { slogan.lang = course.lang; slogan.dir = 'rtl'; }

    var p = document.createElement('p');
    p.className = 'course-desc';
    p.textContent = course.desc;

    var open = document.createElement('span');
    open.className = 'course-open';
    open.textContent = 'Ouvrir la formation →';

    a.appendChild(cat);
    a.appendChild(h);
    a.appendChild(slogan);
    a.appendChild(p);
    a.appendChild(open);
    return a;
  }

  function render() {
    var list = COURSES.filter(matches);

    grid.textContent = '';
    if (!list.length) {
      var empty = document.createElement('div');
      empty.className = 'empty-state';
      var msg = document.createElement('p');
      msg.textContent = 'Aucune formation ne correspond à votre recherche.';
      var reset = document.createElement('button');
      reset.type = 'button';
      reset.textContent = 'Réinitialiser les filtres';
      reset.addEventListener('click', function () {
        search.value = '';
        state.q = '';
        setCategory('all');
      });
      empty.appendChild(msg);
      empty.appendChild(reset);
      grid.appendChild(empty);
    } else {
      var frag = document.createDocumentFragment();
      list.forEach(function (c) { frag.appendChild(card(c)); });
      grid.appendChild(frag);
    }

    Array.prototype.forEach.call(filters.children, function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.cat === state.cat));
    });

    catSlogan.textContent = CAT_SLOGANS[state.cat] || '';
    info.textContent = list.length + (list.length > 1 ? ' formations' : ' formation');
  }

  /* Recherche */
  var timer;
  search.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      state.q = norm(search.value.trim());
      render();
    }, 120);
  });

  /* Raccourcis clavier : "/" ou Ctrl/Cmd+K pour chercher, Échap pour effacer */
  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement || {}).tagName);
    if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      search.focus();
      search.select();
    }
  });
  search.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && search.value) {
      search.value = '';
      state.q = '';
      render();
      e.stopPropagation();
    }
  });

  /* Filtre initial depuis l'URL (ex. formations.html#ia) */
  var hash = location.hash.replace('#', '');
  if (catLabel[hash]) state.cat = hash;

  buildFilters();
  render();

  window.addEventListener('hashchange', function () {
    var h = location.hash.replace('#', '');
    state.cat = catLabel[h] ? h : 'all';
    render();
  });
})();