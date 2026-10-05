/* guide-clarity.js
   Rend le guide plus lisible sans ajouter de texte :
   - listes numérotées -> étapes visuelles cliquables (cocher au fur et à mesure)
   - fiche « Je fais / J'utilise / J'obtiens » par étape
   - longs paragraphes d'introduction repliés
   - défis à valider + barre de progression mémorisée dans le navigateur */
(function () {
  var css = `
ol.stpl{list-style:none;padding:0;margin:12px 0;display:grid;gap:8px}
ol.stpl>li{position:relative;display:flex;gap:12px;align-items:flex-start;margin:0;padding:10px 12px;border:1px solid var(--line);
  border-radius:12px;background:var(--bg);cursor:pointer;transition:background .25s,border-color .25s,transform .2s;counter-increment:s;user-select:none}
ol.stpl>li:hover{transform:translateX(3px);border-color:var(--accent)}
ol.stpl>li:before{content:counter(s);flex:none;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;
  background:var(--accent);color:#fff;font:700 14px/30px system-ui,sans-serif;text-align:center;transition:background .25s}
ol.stpl>li.done{background:color-mix(in srgb,var(--ok) 12%,var(--card));border-color:var(--ok)}
ol.stpl>li.done:before{content:"✓";background:var(--ok)}
ol.stpl>li.done>*,ol.stpl>li.done{color:var(--txt)}
ol.stpl>li.done{opacity:.85}
.stpl-hint{font-size:12px;margin:-4px 0 6px;color:var(--txt);opacity:.7}
.brief{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:12px 0}
.brief div{padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:var(--card);border-top:4px solid var(--c)}
.brief small{display:block;font:700 11px system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:var(--c)}
.brief b{display:block;margin-top:2px;color:var(--ink);font-size:15px;line-height:1.35}
.more{margin:8px 0}
.more summary{font-weight:600}
.ck{list-style:none;padding:0}
.ck li{display:flex;gap:10px;align-items:center;padding:6px 10px;margin:6px 0;border:1px solid var(--line);border-radius:10px;cursor:pointer;background:var(--bg)}
.ck li:before{content:"";flex:none;width:20px;height:20px;border-radius:6px;border:2px solid var(--accent);display:grid;place-items:center;font:700 13px/16px system-ui,sans-serif;color:#fff}
.ck li.done{border-color:var(--ok)}
.ck li.done:before{content:"✓";background:var(--ok);border-color:var(--ok)}
.chbtn{margin-top:8px;padding:6px 14px;border-radius:8px;border:2px solid var(--ok);background:transparent;color:var(--ok);font:700 14px system-ui,sans-serif;cursor:pointer}
.chbtn[aria-pressed="true"]{background:var(--ok);color:#fff}
#prog{position:sticky;top:52px;z-index:6;margin:0 14px;padding:8px 14px;border-radius:12px;background:var(--card);border:1px solid var(--line);
  display:flex;gap:12px;align-items:center;font:600 13px system-ui,sans-serif;color:var(--ink);box-shadow:0 4px 12px rgba(20,35,92,.08)}
#prog .pb{flex:1;height:8px;border-radius:99px;background:var(--line);overflow:hidden}
#prog .pb i{display:block;height:100%;width:0;border-radius:inherit;background:linear-gradient(90deg,var(--accent),var(--ok));transition:width .5s}
nav#nav a.ok:after{content:" ✓";color:var(--ok);font-weight:800}
@media (prefers-reduced-motion:reduce){ol.stpl>li,#prog .pb i{transition:none}}
`;
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var KEY = 'guide-portfolio-progress-v1', saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {} }

  var BRIEF = {
    s1: ['Planifier les sections', 'Un dossier + 3 fichiers', 'Un plan clair'],
    s2: ['Installer les outils', 'VS Code · Git · comptes', 'Poste prêt à coder'],
    s3: ['Écrire une première page', 'index.html + Live Server', 'Page qui se met à jour seule'],
    s4: ['Ajouter Bootstrap', 'Lien CDN + classes', 'Mise en page responsive'],
    s5: ['Coller la version complète', 'index.html', 'Portfolio en 5 sections'],
    s6: ['Personnaliser', 'css/style.css', 'Un design à vous'],
    s7: ['Sauvegarder l\u2019historique', 'git add · git commit', 'Versions datées'],
    s8: ['Envoyer en ligne', 'git remote · git push', 'Code visible sur GitHub'],
    s9: ['Publier le site', 'Render · Static Site', 'URL publique automatique'],
    s10: ['Doubler l\u2019hébergement', 'GitHub Pages', 'Une 2e URL publique'],
    s11: ['Vérifier et rendre', 'Checklist + barème', 'Note sur 20']
  };
  var COL = ['var(--accent)', '#ee8a1f', 'var(--ok)'], LAB = ['Je fais', 'J\u2019utilise', 'J\u2019obtiens'];

  var steps = [].slice.call(document.querySelectorAll('.step'));

  steps.forEach(function (s) {
    var id = s.id;

    /* 1. Fiche synthèse (après le schéma animé s'il existe, sinon après l'objectif) */
    if (BRIEF[id]) {
      var b = document.createElement('div'); b.className = 'brief';
      b.innerHTML = BRIEF[id].map(function (t, i) {
        return '<div style="--c:' + COL[i] + '"><small>' + LAB[i] + '</small><b>' + t + '</b></div>';
      }).join('');
      var anchor = s.querySelector('.sc') || s.querySelector('.goal');
      anchor.after(b);
    }

    /* 2. Long paragraphe d'introduction replié */
    var p = s.querySelector('.goal'), nxt = p && p.nextElementSibling;
    while (nxt && !(nxt.tagName === 'P')) nxt = nxt.nextElementSibling;
    if (nxt && nxt.textContent.length > 140 && nxt.previousElementSibling !== null) {
      var d = document.createElement('details'); d.className = 'more';
      d.innerHTML = '<summary>💡 Pourquoi ? (lire)</summary>';
      nxt.before(d); d.appendChild(nxt);
    }

    /* 3. Listes numérotées -> étapes cliquables */
    s.querySelectorAll(':scope > ol').forEach(function (ol, k) {
      ol.classList.add('stpl');
      var start = parseInt(ol.getAttribute('start') || '1', 10);
      ol.style.counterReset = 's ' + (start - 1);
      if (k === 0) {
        var h = document.createElement('p'); h.className = 'stpl-hint';
        h.textContent = 'Cliquez sur une étape pour la cocher.';
        ol.before(h);
      }
      [].slice.call(ol.children).forEach(function (li, i) {
        var key = id + '-ol' + k + '-' + i;
        if (saved[key]) li.classList.add('done');
        li.addEventListener('click', function (e) {
          if (e.target.closest('a,button,code')) return;
          li.classList.toggle('done'); saved[key] = li.classList.contains('done'); save();
        });
      });
    });
  });

  /* 4. Checklist de l'étape 11 */
  var s11 = document.getElementById('s11');
  if (s11) {
    var ul = s11.querySelector(':scope > ul');
    if (ul) {
      ul.classList.add('ck');
      [].slice.call(ul.children).forEach(function (li, i) {
        var key = 's11-ck-' + i;
        if (saved[key]) li.classList.add('done');
        li.addEventListener('click', function () {
          li.classList.toggle('done'); saved[key] = li.classList.contains('done'); save();
        });
      });
    }
  }

  /* 5. Défis à valider + progression */
  var bar = document.createElement('div');
  bar.id = 'prog';
  bar.innerHTML = '<span>Ma progression : <span id="pcount">0</span>/' + steps.filter(function (s) { return s.querySelector('.challenge'); }).length +
    ' défis</span><div class="pb"><i></i></div>';
  var nav = document.getElementById('nav');
  nav.after(bar);

  function refresh() {
    var total = 0, done = 0;
    steps.forEach(function (s) {
      var c = s.querySelector('.challenge'); if (!c) return;
      total++;
      var ok = !!saved['ch-' + s.id]; if (ok) done++;
      var a = nav.querySelector('a[href="#' + s.id + '"]'); if (a) a.classList.toggle('ok', ok);
    });
    bar.querySelector('#pcount').textContent = done;
    bar.querySelector('i').style.width = (total ? done / total * 100 : 0) + '%';
  }
  steps.forEach(function (s) {
    var c = s.querySelector('.challenge'); if (!c) return;
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'chbtn';
    function paint() { var on = !!saved['ch-' + s.id]; btn.setAttribute('aria-pressed', on); btn.textContent = on ? '✓ Défi réussi' : 'Marquer comme réussi'; }
    btn.addEventListener('click', function () { saved['ch-' + s.id] = !saved['ch-' + s.id]; save(); paint(); refresh(); });
    c.appendChild(btn); paint();
  });
  refresh();
})();