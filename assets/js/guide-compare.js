/* guide-compare.js : sélecteur « quelle situation, quel outil ? » de la section CV / ATS / LinkedIn / portfolio */
(function () {
  var box = document.getElementById('cvPick');
  if (!box) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var A = {
    ats: ['🤖', 'CV ATS', 'Texte simple et mots-clés de l’offre : il doit passer le filtre avant qu’un humain le lise.', '#0e7490'],
    cl:  ['📄', 'CV classique', 'La version visuelle à présenter : entretien, contact direct, dossier professionnel.', '#ee8a1f'],
    li:  ['💼', 'LinkedIn', 'Un profil complet et à jour : on vous trouve sans que vous envoyiez quoi que ce soit.', '#6e40c9'],
    po:  ['🌐', 'Portfolio', 'Envoyez le lien : projets, démos et code. Une preuve vaut mieux qu’une phrase.', '#1f4260']
  };
  var out = box.querySelector('.pk-a'), btns = [].slice.call(box.querySelectorAll('.pk-q button')),
      cards = [].slice.call(document.querySelectorAll('.cv4-c')), timer = null, i = 0, touched = false;
  function show(t) {
    var a = A[t];
    btns.forEach(function (b) { var on = b.dataset.t === t; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    cards.forEach(function (c) { c.classList.toggle('pk', c.dataset.t === t); });
    out.style.setProperty('--c', a[3]);
    out.innerHTML = '<span class="pk-i">' + a[0] + '</span><div><b>' + a[1] + '</b><div>' + a[2] + '</div></div>';
  }
  btns.forEach(function (b, k) {
    b.addEventListener('click', function () { touched = true; clearInterval(timer); timer = null; i = k; show(b.dataset.t); });
  });
  show(btns[0].dataset.t);
  if (!reduce && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !touched && !timer) {
          timer = setInterval(function () { i = (i + 1) % btns.length; show(btns[i].dataset.t); }, 3500);
        } else if (!e.isIntersecting) { clearInterval(timer); timer = null; }
      });
    }, { threshold: .4 }).observe(box);
  }
})();