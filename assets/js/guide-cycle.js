/* guide-cycle.js : cycle complet A -> J avec une illustration animée par étape + boucle de mise à jour */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(x) { return String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function ln(x, y, w, c, d) { return '<rect class="cl" style="--d:' + d + 's" x="' + x + '" y="' + y + '" width="' + w + '" height="4" rx="2" fill="' + c + '"/>'; }
  function tile(x, y, col, em, t, s, d) {
    return '<g class="fi" style="--d:' + d + 's"><rect x="' + x + '" y="' + y + '" width="96" height="50" rx="10" fill="' + col + '"/>' +
      '<text x="' + (x + 22) + '" y="' + (y + 32) + '" font-size="22" text-anchor="middle">' + em + '</text>' +
      '<text x="' + (x + 42) + '" y="' + (y + 24) + '" font-size="11" font-weight="700" fill="#fff">' + t + '</text>' +
      '<text x="' + (x + 42) + '" y="' + (y + 38) + '" font-size="8.5" fill="#fff" opacity=".92">' + s + '</text></g>';
  }
  var MONO = 'font-family="Consolas,Menlo,monospace"';
  function tx(x, y, s, t, o) { return '<text x="' + x + '" y="' + y + '" font-size="' + s + '" ' + (o || 'fill="var(--ink)"') + '>' + t + '</text>'; }

  /* ---------- Illustrations (viewBox 220 x 130) ---------- */
  var ILL = {
    A: '<g transform="translate(12,26)"><path d="M0 8a6 6 0 0 1 6-6h18l8 9h42a6 6 0 0 1 6 6v46a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z" fill="#e08a1e"/><path d="M0 24a6 6 0 0 1 6-6h68a6 6 0 0 1 6 6v36a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z" fill="#f7b04d"/></g>' +
      '<g ' + MONO + ' font-size="10.5" fill="var(--ink)"><text x="100" y="30" font-weight="700">portfolio/</text>' +
      '<text class="fi" style="--d:.2s" x="100" y="48">├ index.html</text><text class="fi" style="--d:.5s" x="100" y="66">├ css/style.css</text>' +
      '<text class="fi" style="--d:.8s" x="100" y="84">├ img/</text><text class="fi" style="--d:1.1s" x="100" y="102">└ README.md</text></g>',
    B: tile(8, 10, '#007acc', '💻', 'VS Code', 'éditeur', 0) + tile(116, 10, '#c2410c', '🔀', 'Git', 'historique', .4) +
      tile(8, 70, '#6e40c9', '🐙', 'GitHub', 'dépôt', .8) + tile(116, 70, '#0b7a6b', '🚀', 'Render', 'hébergeur', 1.2),
    C: '<rect x="6" y="10" width="86" height="104" rx="7" fill="#1e1e1e"/><rect x="6" y="10" width="86" height="14" rx="7" fill="#3c3c3c"/><circle cx="16" cy="17" r="2.5" fill="#ff5f56"/><circle cx="24" cy="17" r="2.5" fill="#ffbd2e"/><circle cx="32" cy="17" r="2.5" fill="#27c93f"/>' +
      ln(14, 32, 36, '#569cd6', 0) + ln(20, 42, 60, '#9cdcfe', .3) + ln(20, 52, 46, '#ce9178', .6) + ln(20, 62, 62, '#9cdcfe', .9) + ln(20, 72, 34, '#ce9178', 1.2) + ln(14, 82, 28, '#569cd6', 1.5) + ln(14, 92, 48, '#6a9955', 1.8) +
      '<path class="flw" d="M95 62h18" stroke="var(--c)" stroke-width="2.5" fill="none"/>' +
      '<rect x="116" y="10" width="98" height="104" rx="7" fill="var(--card)" stroke="var(--c)" stroke-width="2.5"/><rect x="116" y="10" width="98" height="16" rx="7" fill="var(--c)"/><rect x="134" y="14" width="72" height="8" rx="4" fill="#fff" opacity=".85"/>' +
      '<rect x="124" y="32" width="82" height="26" rx="4" fill="var(--c)" opacity=".85"/><circle cx="138" cy="45" r="8" fill="#fff"/><rect x="152" y="40" width="46" height="4" rx="2" fill="#fff"/><rect x="152" y="48" width="30" height="3" rx="1.5" fill="#fff" opacity=".7"/>' +
      '<rect x="124" y="64" width="24" height="22" rx="3" fill="var(--line)"/><rect x="152" y="64" width="24" height="22" rx="3" fill="var(--line)"/><rect x="180" y="64" width="26" height="22" rx="3" fill="var(--line)"/>' +
      '<rect x="146" y="92" width="62" height="16" rx="8" fill="var(--ok)"/>' + tx(177, 103, 8.5, 'Live Server', 'fill="#fff" font-weight="700" text-anchor="middle"'),
    D: ['#007acc', '#6e40c9', '#d6335b', '#ee8a1f'].map(function (c, i) { return '<circle class="sw" style="--d:' + (i * .5) + 's" cx="' + (24 + i * 24) + '" cy="24" r="9" fill="' + c + '"/>'; }).join('') +
      '<rect x="12" y="50" width="82" height="64" rx="8" fill="var(--line)"/><circle cx="53" cy="74" r="11" fill="var(--c)" opacity=".85"/><path d="M30 114c0-14 10-20 23-20s23 6 23 20z" fill="var(--c)" opacity=".85"/>' + tx(53, 126, 8, 'img/photo.jpg', 'fill="var(--ink)" text-anchor="middle"') +
      '<rect x="108" y="10" width="104" height="108" rx="8" fill="var(--card)" stroke="var(--line)" stroke-width="2"/><rect class="pal" x="114" y="16" width="92" height="40" rx="5"/><circle cx="130" cy="36" r="9" fill="#fff"/><rect x="146" y="30" width="50" height="5" rx="2.5" fill="#fff"/><rect x="146" y="40" width="34" height="4" rx="2" fill="#fff" opacity=".7"/>' +
      '<rect x="114" y="62" width="28" height="26" rx="3" fill="var(--line)"/><rect x="146" y="62" width="28" height="26" rx="3" fill="var(--line)"/><rect x="178" y="62" width="28" height="26" rx="3" fill="var(--line)"/>' +
      '<rect x="114" y="96" width="80" height="5" rx="2.5" fill="var(--line)"/><rect x="114" y="106" width="56" height="5" rx="2.5" fill="var(--line)"/>',
    E: '<rect x="6" y="40" width="58" height="54" rx="8" fill="var(--card)" stroke="#ee8a1f" stroke-width="2.5"/>' + tx(35, 36, 9, 'Dossier', 'fill="var(--ink)" font-weight="700" text-anchor="middle"') +
      '<rect x="16" y="52" width="18" height="6" rx="3" fill="#ee8a1f"/><rect x="16" y="64" width="30" height="6" rx="3" fill="#ee8a1f"/><rect x="16" y="76" width="22" height="6" rx="3" fill="#ee8a1f"/>' +
      '<path class="flw" d="M66 67h18" stroke="var(--c)" stroke-width="2.5" fill="none"/>' + tx(75, 58, 8.5, 'add', 'fill="var(--ink)" font-weight="700" text-anchor="middle"') +
      '<rect x="86" y="40" width="58" height="54" rx="8" fill="var(--card)" stroke="#6e40c9" stroke-width="2.5"/>' + tx(115, 36, 9, 'Staging', 'fill="var(--ink)" font-weight="700" text-anchor="middle"') +
      '<rect x="96" y="52" width="18" height="6" rx="3" fill="#6e40c9"/><rect x="96" y="64" width="30" height="6" rx="3" fill="#6e40c9"/><rect x="96" y="76" width="22" height="6" rx="3" fill="#6e40c9"/>' +
      '<path class="flw" d="M146 67h30" stroke="var(--c)" stroke-width="2.5" fill="none"/>' + tx(161, 58, 8, 'commit', 'fill="var(--ink)" font-weight="700" text-anchor="middle"') +
      '<circle class="pls" cx="198" cy="67" r="16" fill="var(--c)"/>' + tx(198, 73, 16, '✓', 'fill="#fff" font-weight="700" text-anchor="middle"') + '<text x="198" y="100" font-size="9" ' + MONO + ' fill="var(--ink)" text-anchor="middle">a1b2c3d</text>' + tx(110, 122, 9, 'Chaque commit = un point de sauvegarde', 'fill="var(--ink)" text-anchor="middle"'),
    F: '<rect x="14" y="6" width="192" height="118" rx="8" fill="var(--card)" stroke="var(--c)" stroke-width="2.5"/>' + tx(24, 24, 11, 'New repository', 'fill="var(--ink)" font-weight="700"') +
      tx(24, 40, 8, 'Repository name', 'fill="var(--ink)" opacity=".7"') + '<rect x="24" y="44" width="172" height="16" rx="4" fill="var(--bg)" stroke="var(--line)"/>' + '<text x="30" y="56" font-size="10" ' + MONO + ' fill="var(--ink)">portfolio</text><rect class="cb" x="82" y="48" width="1.5" height="9" fill="var(--ink)"/>' +
      '<circle cx="31" cy="76" r="5" fill="none" stroke="var(--c)" stroke-width="2"/><circle cx="31" cy="76" r="2.5" fill="var(--c)"/>' + tx(40, 79, 9, 'Public', 'fill="var(--ink)" font-weight="700"') +
      '<circle cx="86" cy="76" r="5" fill="none" stroke="var(--line)" stroke-width="2"/>' + tx(95, 79, 9, 'Private', 'fill="var(--ink)" opacity=".6"') +
      '<rect x="26" y="88" width="9" height="9" rx="2" fill="none" stroke="#d6335b" stroke-width="1.5"/>' + tx(40, 96, 8.5, 'Pas de README, pas de .gitignore', 'fill="#d6335b" font-weight="700"') +
      '<rect class="pls" x="24" y="102" width="104" height="16" rx="5" fill="var(--ok)"/>' + tx(76, 113, 8.5, 'Create repository', 'fill="#fff" font-weight="700" text-anchor="middle"'),
    G: '<rect x="8" y="34" width="62" height="42" rx="5" fill="#1e1e1e" stroke="var(--c)" stroke-width="2.5"/>' + ln(14, 42, 34, '#9cdcfe', 0) + ln(14, 52, 46, '#ce9178', .4) + ln(14, 62, 28, '#569cd6', .8) + '<path d="M2 80h74l-6 9H8z" fill="var(--c)" opacity=".85"/>' +
      '<path class="flw" d="M78 56h68" stroke="var(--c)" stroke-width="2.5" fill="none"/><circle class="mvd" style="--dx:64px" cx="80" cy="56" r="4" fill="var(--accent)"/>' + tx(112, 46, 10, 'git push', 'fill="var(--ink)" font-weight="700" text-anchor="middle"') +
      '<g fill="var(--c)"><circle cx="164" cy="56" r="14"/><circle cx="182" cy="48" r="18"/><circle cx="198" cy="57" r="12"/><rect x="154" y="56" width="56" height="16" rx="8"/></g>' + tx(184, 92, 9, 'GitHub', 'fill="var(--ink)" font-weight="700" text-anchor="middle"') +
      '<rect x="20" y="102" width="180" height="10" rx="5" fill="var(--line)"/><rect class="prg" x="20" y="102" width="180" height="10" rx="5" fill="var(--ok)"/>' + tx(110, 125, 8.5, 'main → origin/main', 'fill="var(--ink)" text-anchor="middle" ' + MONO),
    H: '<rect x="14" y="6" width="192" height="118" rx="8" fill="var(--card)" stroke="var(--c)" stroke-width="2.5"/>' + tx(24, 24, 11, 'New Static Site', 'fill="var(--ink)" font-weight="700"') +
      tx(24, 42, 8.5, 'Branch', 'fill="var(--ink)"') + '<rect x="108" y="34" width="88" height="12" rx="3" fill="var(--bg)" stroke="var(--line)"/>' + tx(114, 43, 8.5, 'main', 'fill="var(--ink)" ' + MONO) +
      tx(24, 60, 8.5, 'Build Command', 'fill="var(--ink)"') + '<rect x="108" y="52" width="88" height="12" rx="3" fill="var(--bg)" stroke="var(--line)"/>' + tx(114, 61, 8.5, '(laisser vide)', 'fill="var(--ink)" opacity=".5"') +
      tx(24, 78, 8, 'Publish Directory', 'fill="var(--ink)" font-weight="700"') + '<rect class="hl" x="108" y="70" width="88" height="12" rx="3" fill="var(--bg)" stroke="#ee8a1f" stroke-width="2"/>' + tx(114, 79, 10, '.', 'fill="var(--ink)" font-weight="700" ' + MONO) +
      '<rect class="pls" x="24" y="98" width="110" height="18" rx="5" fill="var(--c)"/>' + tx(79, 110, 8.5, 'Create Static Site', 'fill="#fff" font-weight="700" text-anchor="middle"'),
    I: '<rect x="8" y="10" width="150" height="108" rx="7" fill="var(--card)" stroke="var(--c)" stroke-width="2.5"/><rect x="8" y="10" width="150" height="16" rx="7" fill="var(--c)"/><rect x="24" y="14" width="124" height="8" rx="4" fill="#fff" opacity=".9"/>' + tx(30, 20.5, 6.5, 'https://mon-site.onrender.com', 'fill="#14235c" ' + MONO) +
      '<rect x="16" y="32" width="134" height="32" rx="4" fill="var(--c)" opacity=".85"/><circle cx="34" cy="48" r="9" fill="#fff"/><rect x="50" y="42" width="60" height="5" rx="2.5" fill="#fff"/><rect x="50" y="52" width="40" height="4" rx="2" fill="#fff" opacity=".7"/>' +
      '<rect x="16" y="70" width="40" height="30" rx="3" fill="var(--line)"/><rect x="60" y="70" width="40" height="30" rx="3" fill="var(--line)"/><rect x="104" y="70" width="46" height="30" rx="3" fill="var(--line)"/>' +
      '<rect x="100" y="104" width="52" height="11" rx="5.5" fill="var(--ok)"/><circle class="pls" cx="108" cy="109.5" r="2.5" fill="#fff"/>' + tx(130, 112.5, 7.5, 'Live', 'fill="#fff" font-weight="700" text-anchor="middle"') +
      '<rect x="170" y="20" width="42" height="90" rx="9" fill="var(--card)" stroke="var(--c)" stroke-width="2.5"/><rect x="184" y="24" width="14" height="3" rx="1.5" fill="var(--c)"/><rect x="176" y="34" width="30" height="20" rx="3" fill="var(--c)" opacity=".85"/><rect x="176" y="60" width="30" height="10" rx="2" fill="var(--line)"/><rect x="176" y="74" width="30" height="10" rx="2" fill="var(--line)"/>' + tx(191, 100, 8, '📱', 'text-anchor="middle"'),
    J: '<ellipse class="flw" cx="110" cy="65" rx="80" ry="42" fill="none" stroke="var(--c)" stroke-width="2.5"/>' +
      [[110, 23, '✏️'], [190, 65, '💾'], [110, 107, '☁️'], [30, 65, '🚀']].map(function (n, i) { return '<g class="fi" style="--d:' + (i * .4) + 's"><circle cx="' + n[0] + '" cy="' + n[1] + '" r="12" fill="var(--card)" stroke="var(--c)" stroke-width="2.5"/><text x="' + n[0] + '" y="' + (n[1] + 4.5) + '" font-size="12" text-anchor="middle">' + n[2] + '</text></g>'; }).join('') +
      tx(110, 66, 15, '~30 s', 'fill="var(--ink)" font-weight="800" text-anchor="middle"') + tx(110, 80, 8.5, 'déploiement auto', 'fill="var(--ink)" text-anchor="middle"')
  };

  /* ---------- Données du parcours ---------- */
  var PL = { pc: ['💻', 'Mon ordinateur', 'VS Code + Git', '#007acc'], gh: ['🐙', 'GitHub', 'Le dépôt en ligne', '#6e40c9'], rd: ['🚀', 'Render', 'Le site publié', '#0b7a6b'] };
  var WORLD = {
    pc: [['📁 Dossier portfolio', 0], ['📄 index.html + style.css', 2], ['💾 Commits Git', 4]],
    gh: [['📦 Dépôt « portfolio »', 5], ['☁️ Fichiers en ligne', 6]],
    rd: [['⚙️ Static Site connecté', 7], ['🌍 URL publique', 8]]
  };
  var D = [
    { l: 'A', p: 'pc', t: 'Créer le dossier', d: 'Un dossier portfolio avec index.html, css/ et img/.', tip: 'Noms en minuscules, sans espace ni accent.', c: 'portfolio/\n├── index.html\n├── css/style.css\n└── img/', s: 's1', n: 'Étape 1' },
    { l: 'B', p: 'pc', t: 'Installer les outils', d: 'VS Code, Git, puis les comptes GitHub et Render.', tip: 'Configurez Git une seule fois : votre nom et votre e-mail.', c: 'git --version\ngit config --global user.name "Prénom Nom"\ngit config --global user.email "vous@exemple.com"', k: 1, s: 's2', n: 'Étape 2' },
    { l: 'C', p: 'pc', t: 'Écrire la page', d: 'Dans VS Code : index.html avec Bootstrap, testé avec Live Server.', tip: 'Le fichier doit s’appeler index.html (pas index.php) pour Render Static Site.', c: 'Clic droit › Open with Live Server', s: 's3', n: 'Étapes 3 à 5' },
    { l: 'D', p: 'pc', t: 'Personnaliser', d: 'Couleurs, photo, textes et projets.', tip: 'Enregistrez avec Ctrl + S avant de continuer.', c: 'css/style.css  ›  --couleur-principale', s: 's6', n: 'Étape 6' },
    { l: 'E', p: 'pc', t: 'Sauvegarder avec Git', d: 'Créer le dépôt local et le premier commit.', tip: 'Tapez bien « git add . » : un espace avant le point.', c: 'git init\ngit add .\ngit commit -m "Initial commit"\ngit branch -M main', k: 1, s: 's7', n: 'Étape 7' },
    { l: 'F', p: 'gh', t: 'Créer le dépôt GitHub', d: 'Sur github.com : nom « portfolio », Public.', tip: 'Dépôt vide : ne cochez ni README ni .gitignore.', c: 'github.com  ›  New repository', s: 's8', n: 'Étape 8' },
    { l: 'G', p: 'gh', t: 'Envoyer le code', d: 'Relier le dossier à GitHub, puis pousser.', tip: 'Connectez-vous avec le compte qui possède le dépôt (sinon erreur 403).', c: 'git remote add origin https://github.com/VOTRE-PSEUDO/portfolio.git\ngit push -u origin main', k: 1, s: 's8', n: 'Étape 8' },
    { l: 'H', p: 'rd', t: 'Connecter Render', d: 'New + › Static Site › dépôt portfolio › branche main.', tip: 'Connectez Render au même compte GitHub que le dépôt.', c: 'Build Command : (vide)\nPublish Directory : .', s: 's9', n: 'Étape 9' },
    { l: 'I', p: 'rd', t: 'Site en ligne', d: 'Render publie en ~30 s. Ouvrez l’URL et testez sur téléphone.', tip: 'Copiez l’URL exacte affichée par Render : elle peut avoir un suffixe.', c: 'https://nom-du-service-xxxx.onrender.com', s: 's9', n: 'Étape 9' },
    { l: 'J', p: 'all', t: 'Mettre à jour (la boucle)', d: 'Modifier, add, commit, push : Render redéploie tout seul.', tip: 'Attendez ~30 s, puis rechargez avec Ctrl + F5.', c: 'git add .\ngit commit -m "Ajout du projet 4"\ngit push', k: 1, s: 's9', n: 'Étape 9' }
  ];

  var az = document.getElementById('az');
  if (az) {
    var order = ['pc', 'gh', 'rd'], h = '<div class="az-pl">';
    order.forEach(function (k, j) {
      var P = PL[k];
      h += (j ? '<i class="az-ar" aria-hidden="true"></i>' : '') +
        '<div class="az-p" data-p="' + k + '" style="--c:' + P[3] + '"><span class="az-pi">' + P[0] + '</span><b>' + P[1] + '</b><small>' + P[2] + '</small><ul>' +
        WORLD[k].map(function (w) { return '<li data-f="' + w[1] + '">' + w[0] + '</li>'; }).join('') + '</ul></div>';
    });
    h += '</div><div class="az-tr" role="group" aria-label="Étapes de A à J">' +
      D.map(function (x, i) { return '<button type="button" data-i="' + i + '" aria-label="Étape ' + x.l + ' : ' + esc(x.t) + '">' + x.l + '</button>'; }).join('') +
      '</div><div class="az-bar"><i></i></div><div class="az-cd" aria-live="polite"></div>' +
      '<div class="az-ct"><button type="button" data-a="prev" aria-label="Étape précédente">‹ Précédent</button><button type="button" data-a="play" aria-label="Lecture automatique"></button><button type="button" data-a="next" aria-label="Étape suivante">Suivant ›</button></div>';
    az.innerHTML = h;

    var pls = az.querySelectorAll('.az-p'), btns = az.querySelectorAll('.az-tr button'),
        bar = az.querySelector('.az-bar i'), card = az.querySelector('.az-cd'), playBtn = az.querySelector('[data-a="play"]'),
        cur = 0, timer = null, userPaused = false, copyT = null;

    function show(i) {
      cur = i; var x = D[i], col = x.p === 'all' ? '#d6335b' : PL[x.p][3];
      pls.forEach(function (p) {
        p.classList.toggle('on', x.p === 'all' || p.dataset.p === x.p);
        p.querySelectorAll('li').forEach(function (li) { li.classList.toggle('show', i >= +li.dataset.f); });
      });
      btns.forEach(function (b, k) { b.classList.toggle('act', k === i); b.classList.toggle('done', k < i); });
      bar.style.width = ((i + 1) / D.length * 100) + '%';
      var where = x.p === 'all' ? '💻 → 🐙 → 🚀' : PL[x.p][0] + ' ' + PL[x.p][1];
      card.innerHTML = '<div class="az-ill" style="--c:' + col + '"><svg viewBox="0 0 220 130" role="img" aria-label="Illustration de l’étape ' + x.l + ' : ' + esc(x.t) + '">' + ILL[x.l] + '</svg></div>' +
        '<div class="az-b" style="--c:' + col + '"><div class="az-h"><span class="az-l">' + x.l + '</span><div><h4>' + esc(x.t) + '</h4><span class="az-chip">' + where + '</span></div></div>' +
        '<p>' + esc(x.d) + '</p><div class="az-tip">💡 ' + esc(x.tip) + '</div><pre>' + esc(x.c) + '</pre><div class="az-row"><a href="#' + x.s + '">' + x.n + ' ›</a>' +
        (x.k ? '<button type="button" class="az-cp">📋 Copier</button>' : '') + '</div></div>';
      var cp = card.querySelector('.az-cp');
      if (cp) cp.addEventListener('click', function () {
        function ok() { cp.textContent = '✅ Copié'; clearTimeout(copyT); copyT = setTimeout(function () { cp.textContent = '📋 Copier'; }, 1500); }
        if (navigator.clipboard) navigator.clipboard.writeText(x.c).then(ok, function () {});
        else { var t = document.createElement('textarea'); t.value = x.c; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} t.remove(); ok(); }
      });
    }
    function label() { playBtn.textContent = timer ? '⏸ Pause' : '▶ Lecture'; }
    function stop() { clearInterval(timer); timer = null; label(); }
    function start() { if (reduce || timer) return; timer = setInterval(function () { show((cur + 1) % D.length); }, 5000); label(); }
    btns.forEach(function (b) { b.addEventListener('click', function () { userPaused = true; stop(); show(+b.dataset.i); }); });
    az.querySelector('[data-a="prev"]').addEventListener('click', function () { userPaused = true; stop(); show((cur + D.length - 1) % D.length); });
    az.querySelector('[data-a="next"]').addEventListener('click', function () { userPaused = true; stop(); show((cur + 1) % D.length); });
    playBtn.addEventListener('click', function () { if (timer) { userPaused = true; stop(); } else { userPaused = false; start(); } });
    show(0); label();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting && !userPaused) start(); else if (!e.isIntersecting) stop(); });
      }, { threshold: .35 }).observe(az);
    } else if (!reduce) start();
  }

  /* ---------- Boucle de mise à jour ---------- */
  var loop = document.querySelector('.azloop svg');
  if (loop) {
    var ns = [].slice.call(loop.querySelectorAll('.ln')), k = 0, t = null;
    function hl() { ns.forEach(function (n, i) { n.classList.toggle('act', i === k); }); }
    hl();
    if (!reduce && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !t) t = setInterval(function () { k = (k + 1) % ns.length; hl(); }, 1300);
          else if (!e.isIntersecting) { clearInterval(t); t = null; }
        });
      }, { threshold: .4 }).observe(loop);
    }
  }
})();