/* ===== MENU PRO : sous-menus, burger mobile, lien actif ===== */
(function () {
  'use strict';

  var nav = document.getElementById('main-nav');
  var burger = document.querySelector('.burger');
  if (!nav || !burger) return;

  var items = Array.prototype.slice.call(nav.querySelectorAll('.has-sub'));
  var mq = window.matchMedia('(max-width: 960px)');
  var isMobile = function () { return mq.matches; };

  function setOpen(item, open) {
    item.classList.toggle('is-open', open);
    var btn = item.querySelector('.menu-toggle');
    if (btn) btn.setAttribute('aria-expanded', String(open));
  }

  function closeAll(except) {
    items.forEach(function (i) { if (i !== except) setOpen(i, false); });
  }

  function closeMobile() {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-locked');
  }

  /* Sous-menus : clic (mobile + desktop) et survol (desktop) */
  items.forEach(function (item) {
    var btn = item.querySelector('.menu-toggle');
    var timer;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !item.classList.contains('is-open');
      closeAll(item);
      setOpen(item, willOpen);
    });

    item.addEventListener('mouseenter', function () {
      if (isMobile()) return;
      clearTimeout(timer);
      closeAll(item);
      setOpen(item, true);
    });

    item.addEventListener('mouseleave', function () {
      if (isMobile()) return;
      timer = setTimeout(function () { setOpen(item, false); }, 150);
    });

    /* Fermer quand le focus clavier quitte le sous-menu */
    item.addEventListener('focusout', function (e) {
      if (isMobile()) return;
      if (!item.contains(e.relatedTarget)) setOpen(item, false);
    });
  });

  /* Clic extérieur */
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) closeAll();
  });

  /* Échap */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openItem = items.filter(function (i) { return i.classList.contains('is-open'); })[0];
    closeAll();
    if (openItem) openItem.querySelector('.menu-toggle').focus();
    closeMobile();
  });

  /* Burger */
  burger.addEventListener('click', function () {
    var open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-locked', open);
    if (!open) closeAll();
  });

  /* Clic sur un lien : on referme tout */
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      closeAll();
      closeMobile();
    }
  });

  /* Passage mobile -> desktop */
  var onBreakpoint = function () {
    if (!isMobile()) { closeMobile(); closeAll(); }
  };
  if (mq.addEventListener) mq.addEventListener('change', onBreakpoint);
  else window.addEventListener('resize', onBreakpoint);

  /* Lien actif selon la section visible */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;

        nav.querySelectorAll('.menu-link.active').forEach(function (l) {
          l.classList.remove('active');
        });

        links.forEach(function (a) {
          if (a.getAttribute('href') !== id) return;
          var top = a.closest('.menu-item').querySelector(':scope > .menu-link');
          if (top) top.classList.add('active');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }
})();


/* ===== AMÉLIORATIONS : progression, navbar compacte, retour en haut ===== */
(function () {
  'use strict';

  var navbar = document.querySelector('.navbar');

  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  var top = document.createElement('button');
  top.className = 'to-top';
  top.type = 'button';
  top.setAttribute('aria-label', 'Retour en haut');
  top.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>';
  document.body.appendChild(top);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  top.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  var ticking = false;
  function update() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    if (navbar) navbar.classList.toggle('is-scrolled', y > 10);
    top.classList.toggle('is-visible', y > 600);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();