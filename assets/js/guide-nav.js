/* guide-nav.js : barre de navigation compacte
   - bouton Menu : toutes les étapes, groupées par phase, sans défilement horizontal
   - raccourcis de phases, étape en cours, flèches précédent / suivant
   - la progression des défis est intégrée à la barre (plus de barre séparée) */
(function () {
  var nav = document.getElementById('nav'), main = document.querySelector('main');
  if (!nav || !main) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PH = {
    pa: ['🔁', 'Résumé', '#d6335b', 'Résumé'],
    p0: ['🧭', 'Avant de commencer', '#475569', ''],
    p1: ['💻', 'Phase 1 · VS Code', '#007acc', 'VS Code'],
    p2: ['🐙', 'Phase 2 · Git + GitHub', '#6e40c9', 'GitHub'],
    p3: ['🚀', 'Phase 3 · Render', '#0b7a6b', 'Render'],
    pb: ['🎁', 'Bonus', '#b45309', 'Bonus']
  };

  /* ordre des blocs et phase de chaque étape */
  var seq = [], map = {}, cur = null;
  [].slice.call(main.children).forEach(function (el) {
    if (el.classList.contains('phase')) { cur = el.id; return; }
    if (el.classList.contains('step')) { map[el.id] = cur; seq.push(el); }
    else if (el.id === 'roadmap') seq.push(el);
  });
  function label(el) {
    if (el.id === 'roadmap') return '🗺️ Plan du parcours';
    var h = el.querySelector('h2'); if (!h) return el.id;
    var n = h.querySelector('.n'), t = h.cloneNode(true);
    t.querySelectorAll('.n,.ph').forEach(function (x) { x.remove(); });
    var num = n ? n.textContent.trim() : '';
    return (/^\d+$/.test(num) ? num + '. ' : (num ? num + ' ' : '')) + t.textContent.trim();
  }

  /* anciens liens (conservés : le reste du guide s'appuie dessus) */
  var old = {};
  [].slice.call(nav.querySelectorAll('a')).forEach(function (a) { old[a.getAttribute('href')] = a; });

  /* panneau du menu */
  var panel = document.createElement('div');
  panel.className = 'nv-panel'; panel.id = 'nvPanel'; panel.hidden = true;
  var grid = document.createElement('div'); grid.className = 'nv-grid'; panel.appendChild(grid);
  function group(color, title) {
    var g = document.createElement('div'); g.className = 'nv-g'; g.style.setProperty('--c', color);
    var h4 = document.createElement('h4'); h4.textContent = title; g.appendChild(h4); grid.appendChild(g); return g;
  }
  function link(el) {
    var a = old['#' + el.id] || document.createElement('a');
    a.href = '#' + el.id; a.textContent = label(el); a.removeAttribute('title'); return a;
  }
  var gStart = group('#475569', '🧭 Pour commencer');
  var rm = document.getElementById('roadmap'); if (rm) gStart.appendChild(link(rm));
  seq.forEach(function (el) { if (map[el.id] === 'pa' || map[el.id] === 'p0') gStart.appendChild(link(el)); });
  ['p1', 'p2', 'p3', 'pb'].forEach(function (k) {
    var els = seq.filter(function (el) { return map[el.id] === k; });
    if (!els.length) return;
    var g = group(PH[k][2], PH[k][0] + ' ' + PH[k][1]);
    els.forEach(function (el) { g.appendChild(link(el)); });
  });

  /* barre */
  var bar = document.createElement('div'); bar.className = 'nv-bar';
  var chips = ['pa', 'p1', 'p2', 'p3', 'pb'].map(function (k) {
    return '<a href="#' + k + '" data-p="' + k + '" style="--c:' + PH[k][2] + '">' + PH[k][0] + ' <span>' + PH[k][3] + '</span></a>';
  }).join('');
  bar.innerHTML = '<button type="button" class="nv-menu" aria-expanded="false" aria-controls="nvPanel"><span class="nv-ic" aria-hidden="true">☰</span><span class="nv-tx">Menu</span></button>' +
    '<div class="nv-ph">' + chips + '</div><div class="nv-cur" aria-live="polite"><b></b></div>' +
    '<div class="nv-pn"><button type="button" data-d="-1" aria-label="Étape précédente">‹</button><button type="button" data-d="1" aria-label="Étape suivante">›</button></div>' +
    '<div class="nv-pr"></div>';

  nav.textContent = '';
  nav.appendChild(bar); nav.appendChild(panel);

  /* progression des défis : on déplace l'élément existant dans la barre */
  var prog = document.getElementById('prog');
  if (prog) {
    var total = document.querySelectorAll('.step .challenge').length,
        pc = prog.querySelector('#pcount'), n0 = pc ? pc.textContent : '0',
        lab = prog.firstElementChild;
    if (lab) { lab.innerHTML = '✅ <span id="pcount">' + n0 + '</span>/' + total; lab.title = 'Défis réussis'; }
    bar.querySelector('.nv-pr').appendChild(prog);
  }

  /* menu : ouvrir / fermer */
  var btn = bar.querySelector('.nv-menu'), ic = bar.querySelector('.nv-ic'), tx = bar.querySelector('.nv-tx');
  function setOpen(o) {
    panel.hidden = !o; btn.setAttribute('aria-expanded', o);
    ic.textContent = o ? '✕' : '☰'; tx.textContent = o ? 'Fermer' : 'Menu';
    if (o) panel.scrollTop = 0;
  }
  btn.addEventListener('click', function () { setOpen(panel.hidden); });
  panel.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { setOpen(false); btn.focus(); } });
  document.addEventListener('click', function (e) { if (!panel.hidden && !nav.contains(e.target)) setOpen(false); });

  /* étape en cours + précédent / suivant */
  var curEl = null, lbl = bar.querySelector('.nv-cur b'), pn = bar.querySelectorAll('.nv-pn button'),
      chipEls = [].slice.call(bar.querySelectorAll('.nv-ph a')), ticking = false;
  function update() {
    var c = seq[0];
    seq.forEach(function (el) { if (el.getBoundingClientRect().top <= 110) c = el; });
    if (c === curEl) return;
    curEl = c; lbl.textContent = label(c);
    var ph = map[c.id];
    chipEls.forEach(function (a) { a.classList.toggle('on', a.dataset.p === ph); });
    var i = seq.indexOf(c);
    pn[0].disabled = i <= 0; pn[1].disabled = i >= seq.length - 1;
  }
  pn.forEach(function (b) {
    b.addEventListener('click', function () {
      var i = seq.indexOf(curEl) + (+b.dataset.d), t = seq[i];
      if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  });
  window.addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; update(); });
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();