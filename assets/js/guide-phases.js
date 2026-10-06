/* guide-phases.js : badge de phase sur chaque étape, couleurs du menu, phase active au défilement */
(function () {
  var PH = { pa: ['#d6335b', '🔁 Résumé'], p0: ['#475569', '🧭 Intro'], p1: ['#007acc', '💻 VS Code'], p2: ['#6e40c9', '🐙 GitHub'], p3: ['#0b7a6b', '🚀 Render'], pb: ['#b45309', '🎁 Bonus'] };
  var order = [].slice.call(document.querySelectorAll('main > .phase, main > .step')), cur = null, map = {};
  order.forEach(function (el) {
    if (el.classList.contains('phase')) { cur = el.id; map[el.id] = el.id; return; }
    map[el.id] = cur;
    var h2 = el.querySelector('h2');
    if (h2 && cur && PH[cur] && !h2.querySelector('.ph')) {
      var b = document.createElement('span');
      b.className = 'ph'; b.style.setProperty('--c', PH[cur][0]); b.textContent = PH[cur][1];
      h2.appendChild(b);
    }
  });
  var nav = document.getElementById('nav');
  if (nav) nav.querySelectorAll('a').forEach(function (a) {
    var ph = map[a.getAttribute('href').slice(1)];
    if (ph && PH[ph]) { a.style.borderColor = PH[ph][0]; a.title = PH[ph][1]; }
  });
  var cards = [].slice.call(document.querySelectorAll('.rm-c'));
  function mark(p) { cards.forEach(function (c) { c.classList.toggle('on', c.dataset.p === p); }); }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) mark(map[e.target.id]); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    order.forEach(function (el) { io.observe(el); });
  }
})();