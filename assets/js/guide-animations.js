/* guide-animations.js
   Remplace les petites bandes d'icônes de chaque étape par une scène animée :
   icônes SVG tracées, étape active mise en avant, barre de progression et légende explicative.
   Utilisation : ajouter <script src="guide-animations.js"></script> juste avant </body>. */
(function () {
  var css = `
.sc{margin:14px 0 18px;padding:16px 16px 12px;border-radius:16px;border:1px solid var(--line);
  background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 10%,var(--card)),var(--card));
  box-shadow:0 8px 24px rgba(20,35,92,.08)}
.sc-track{display:grid;grid-template-columns:repeat(auto-fit,minmax(112px,1fr));gap:12px;position:relative}
.sc-node{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 6px 10px;
  border-radius:14px;border:2px solid transparent;background:transparent;cursor:pointer;font:inherit;color:var(--txt);
  transition:background .35s,border-color .35s,transform .35s,box-shadow .35s}
.sc-node:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.sc-ic{position:relative;width:64px;height:64px;border-radius:18px;display:grid;place-items:center;
  background:var(--card);border:2px solid var(--line);color:var(--accent);transition:all .35s}
.sc-ic svg{width:34px;height:34px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.sc-ic svg *{stroke-dasharray:60;stroke-dashoffset:0}
.sc-num{position:absolute;top:-8px;left:-8px;width:22px;height:22px;border-radius:50%;background:var(--line);color:var(--ink);
  font:700 12px/22px system-ui,sans-serif;text-align:center;transition:all .35s}
.sc-t{font-weight:700;font-size:13px;color:var(--ink);text-align:center;line-height:1.3}
.sc-node.done .sc-ic{border-color:var(--ok);color:var(--ok)}
.sc-node.done .sc-num{background:var(--ok);color:#fff}
.sc-node.act{background:var(--card);border-color:var(--accent);transform:translateY(-4px);
  box-shadow:0 12px 28px color-mix(in srgb,var(--accent) 28%,transparent)}
.sc-node.act .sc-ic{background:var(--accent);color:#fff;border-color:var(--accent)}
.sc-node.act .sc-ic svg *{animation:sc-draw 1s ease-out both}
.sc-node.act .sc-ic:after{content:"";position:absolute;inset:-6px;border-radius:22px;border:2px solid var(--accent);
  animation:sc-ring 1.6s ease-out infinite}
.sc-node.act .sc-num{background:#ffd93b;color:#14235c}
@keyframes sc-draw{from{stroke-dashoffset:60}to{stroke-dashoffset:0}}
@keyframes sc-ring{from{opacity:.7;transform:scale(.9)}to{opacity:0;transform:scale(1.25)}}
.sc-bar{height:6px;margin:14px 2px 10px;border-radius:99px;background:var(--line);overflow:hidden}
.sc-bar i{display:block;height:100%;width:0;border-radius:inherit;transition:width .6s ease;
  background:linear-gradient(90deg,var(--accent),var(--ok));background-size:200% 100%;animation:sc-sh 2.4s linear infinite}
@keyframes sc-sh{to{background-position:-200% 0}}
.sc-cap{display:flex;gap:10px;align-items:flex-start;min-height:48px;padding:10px 12px;border-radius:10px;
  background:var(--card);border:1px solid var(--line);color:var(--ink);font-size:14.5px;line-height:1.5}
.sc-cap b{flex:none;padding:1px 9px;border-radius:99px;background:var(--accent);color:#fff;font-size:12px;line-height:22px}
.sc-cap span{animation:sc-fade .5s both}
@keyframes sc-fade{from{opacity:0;transform:translateY(6px)}}
@media (prefers-reduced-motion:reduce){.sc-node.act .sc-ic svg *,.sc-node.act .sc-ic:after,.sc-bar i,.sc-cap span{animation:none}
  .sc-node,.sc-ic,.sc-bar i{transition:none}}
`;
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var P = {
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',
    scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M4 12h16"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    layout: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    code: '<path d="M8 8l-5 4 5 4"/><path d="M16 8l5 4-5 4"/><path d="M14 5l-4 14"/>',
    git: '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 8v8"/><path d="M18 10c0 4-4 4-10 7"/>',
    cloud: '<path d="M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 .5 9.5z"/><path d="M12 17v-6"/><path d="M9.5 13.5L12 11l2.5 2.5"/>',
    server: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    save: '<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v5h7V3"/><rect x="8" y="13" width="8" height="8"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3 3 3 15 0 18c-3-3-3-15 0-18"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 0 0 3-3c0-5-4-11-8-11z"/><circle cx="7.5" cy="11" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16.5" cy="9" r="1"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M3 17l5-5 4 4 3-3 6 6"/>',
    plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 8v4l3 2"/>',
    rocket: '<path d="M12 15l-3-3a22 22 0 0 1 2-4 12 12 0 0 1 9-5c0 3-1 7-5 11a22 22 0 0 1-3 2z"/><path d="M9 12H4s.5-3 2-4 4 0 4 0"/><path d="M12 15v5s3-.5 4-2 0-4 0-4"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
    box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'
  };

  var S = {
    s1: [['target', 'Objectif', 'Un site personnel qui montre qui vous êtes, ce que vous savez faire et vos projets.'],
         ['folder', 'Structure', 'Un dossier « portfolio » contenant index.html, css/, img/ et README.md.'],
         ['layout', 'Résultat', 'Une page en sections : navbar, présentation, compétences, projets, contact.']],
    s2: [['code', 'VS Code', 'L\u2019éditeur dans lequel vous écrivez et testez votre code (avec Live Server).'],
         ['git', 'Git', 'Garde l\u2019historique de vos fichiers, version après version.'],
         ['cloud', 'GitHub', 'Stocke votre projet en ligne et le rend partageable.'],
         ['server', 'Render', 'Hébergera votre site pour qu\u2019il soit visible par tous.']],
    s3: [['pen', 'Écrire', 'Dans index.html, on place la structure : head (infos) et body (ce qui s\u2019affiche).'],
         ['save', 'Enregistrer', 'Ctrl + S sauvegarde le fichier.'],
         ['globe', 'Voir', 'Live Server rafraîchit le navigateur automatiquement.']],
    s4: [['link', 'Lien CDN', 'Ajoutez le CSS dans le head et le JS avant </body>.'],
         ['layout', 'Classes', 'container, row, col-md-6… la grille s\u2019organise avec des classes.'],
         ['phone', 'Responsive', 'Sur mobile, les colonnes s\u2019empilent automatiquement.']],
    s5: [['list', 'Navbar', 'Le menu fixe en haut avec le bouton burger sur mobile.'],
         ['user', 'Hero', 'Photo, titre et boutons d\u2019action : la première impression.'],
         ['layout', 'Projets', 'Une carte par projet, avec image, badges et lien GitHub.'],
         ['mail', 'Contact', 'Un formulaire pour que l\u2019on puisse vous écrire.']],
    s6: [['palette', 'Couleurs', 'Changez la variable --couleur-principale dans style.css.'],
         ['image', 'Photo', 'Remplacez img/photo.jpg par la vôtre.'],
         ['pen', 'Textes', 'Écrivez votre présentation et vos projets.'],
         ['phone', 'Test mobile', 'F12 puis l\u2019icône appareil pour vérifier l\u2019affichage.']],
    s7: [['pen', 'Modifier', 'Vous changez vos fichiers dans le dossier.'],
         ['plus', 'git add', 'Prépare les fichiers à enregistrer (staging).'],
         ['save', 'git commit', 'Crée un point de sauvegarde avec un message clair.'],
         ['history', 'Historique', 'git log liste toutes vos versions ; vous pouvez revenir en arrière.']],
    s8: [['folder', 'Créer le dépôt', 'Sur github.com : New repository, nom « portfolio », Public.'],
         ['link', 'Remote', 'git remote add origin relie votre dossier à GitHub.'],
         ['cloud', 'Push', 'git push -u origin main envoie vos commits en ligne.'],
         ['check', 'Vérifier', 'Actualisez GitHub : vos fichiers apparaissent.']],
    s9: [['server', 'Static Site', 'Sur Render : New + puis Static Site (pas Web Service).'],
         ['link', 'Connecter', 'Choisissez le dépôt « portfolio » et la branche main.'],
         ['rocket', 'Déployer', 'Render construit et publie le site à chaque git push.'],
         ['globe', 'En ligne', 'Votre URL .onrender.com est publique, en ~30 secondes.']],
    s10: [['sliders', 'Settings', 'Dans le dépôt GitHub : Settings puis Pages.'],
          ['rocket', 'Pages', 'Source : branche main, dossier / (root), puis Save.'],
          ['globe', 'URL', 'Après 1 à 3 minutes : pseudo.github.io/portfolio.']],
    s11: [['check', 'Checklist', 'Sections complètes, 3 projets, images avec alt, 8 commits ou plus.'],
          ['box', 'Rendu', 'Vous remettez l\u2019URL du dépôt et l\u2019URL Render publique.'],
          ['star', 'Réussite', 'Un portfolio en ligne, versionné et professionnel.']],
    cvia: [['file', 'CV en PDF', 'Vous envoyez votre CV sur le site de l\u2019entreprise.'],
           ['scan', 'Extraction', 'Le logiciel lit le texte. Images, barres et icônes sont ignorées.'],
           ['search', 'Comparaison', 'Il cherche dans votre CV les mots-clés de l\u2019offre.'],
           ['list', 'Classement', 'Les CV sont classés selon leur correspondance avec l\u2019offre.'],
           ['user', 'Recruteur', 'Un humain lit les meilleurs CV et décide.']]
  };

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.step .vis').forEach(function (v) { v.remove(); });

  Object.keys(S).forEach(function (id) {
    var step = document.getElementById(id), goal = step && step.querySelector('.goal');
    if (!goal) return;
    var items = S[id], n = items.length, cur = 0, timer = null;
    var sc = document.createElement('div');
    sc.className = 'sc';
    sc.setAttribute('role', 'group');
    sc.setAttribute('aria-label', 'Schéma animé des étapes');
    sc.innerHTML = '<div class="sc-track">' + items.map(function (it, i) {
      return '<button type="button" class="sc-node" data-i="' + i + '"><span class="sc-ic"><span class="sc-num">' + (i + 1) +
        '</span><svg viewBox="0 0 24 24" aria-hidden="true">' +
        P[it[0]].replace(/<(path|circle|rect)/g, '<$1 pathLength="60"') + '</svg></span><span class="sc-t">' + it[1] + '</span></button>';
    }).join('') + '</div><div class="sc-bar"><i></i></div><div class="sc-cap" aria-live="polite"><b></b><span></span></div>';
    goal.after(sc);

    var nodes = sc.querySelectorAll('.sc-node'), bar = sc.querySelector('.sc-bar i'),
        capB = sc.querySelector('.sc-cap b'), capS = sc.querySelector('.sc-cap span');

    function show(i) {
      cur = i;
      nodes.forEach(function (nd, k) {
        nd.classList.toggle('act', k === i);
        nd.classList.toggle('done', k < i);
      });
      bar.style.width = ((i + 1) / n * 100) + '%';
      capB.textContent = (i + 1) + ' / ' + n;
      capS.textContent = items[i][1] + ' : ' + items[i][2];
      capS.style.animation = 'none'; void capS.offsetWidth; capS.style.animation = '';
    }
    function play() {
      if (reduce || timer) return;
      timer = setInterval(function () { show((cur + 1) % n); }, 2800);
    }
    function stop() { clearInterval(timer); timer = null; }

    nodes.forEach(function (nd) {
      nd.addEventListener('click', function () { stop(); show(+nd.dataset.i); play(); });
    });
    show(0);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { e.isIntersecting ? play() : stop(); });
      }, { threshold: .3 }).observe(sc);
    } else play();
  });
})();