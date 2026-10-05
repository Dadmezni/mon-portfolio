/* guide-ats.js : démo Humain/IA et jeu des mots-clés de la section ATS */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var d = document.getElementById('atsDemo');
  if (d) {
    var btns = d.querySelectorAll('.ats-tabs button'), stage = d.querySelector('.ats-stage'), auto = null, touched = false;
    var set = function (m) {
      stage.classList.toggle('ia', m === 'i');
      btns.forEach(function (b) { var on = b.dataset.m === m; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    };
    btns.forEach(function (b) {
      b.addEventListener('click', function () { touched = true; clearInterval(auto); auto = null; set(b.dataset.m); });
    });
    if (!reduce && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !touched && !auto) {
            auto = setInterval(function () { set(stage.classList.contains('ia') ? 'h' : 'i'); }, 3200);
          } else if (!e.isIntersecting) { clearInterval(auto); auto = null; }
        });
      }, { threshold: .4 }).observe(d);
    }
  }

  var kw = document.getElementById('kw');
  if (kw) {
    var req = [].slice.call(kw.querySelectorAll('.kwr')), chips = kw.querySelectorAll('.kwc'),
        bar = kw.querySelector('.gauge i'), pct = kw.querySelector('#kwPct'), msg = kw.querySelector('#kwMsg');
    var update = function () {
      var on = {};
      chips.forEach(function (c) { if (c.classList.contains('on')) on[c.dataset.k] = true; });
      var hit = 0;
      req.forEach(function (r) { var h = !!on[r.dataset.k]; r.classList.toggle('hit', h); if (h) hit++; });
      var p = Math.round(hit / req.length * 100);
      pct.textContent = p + ' %';
      bar.style.width = p + '%';
      bar.style.background = p < 40 ? '#d6335b' : (p < 80 ? '#ee8a1f' : 'var(--ok)');
      msg.textContent = p === 0 ? 'Cliquez sur vos compétences.' :
        p < 40 ? 'Peu de correspondance avec l’offre.' :
        p < 80 ? 'Bon début : ajoutez les mots-clés manquants que vous maîtrisez.' :
        'Très bonne correspondance avec l’offre.';
    };
    chips.forEach(function (c) {
      c.addEventListener('click', function () { c.classList.toggle('on'); update(); });
    });
    update();
  }
})();