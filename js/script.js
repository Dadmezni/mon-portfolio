/* ============================================
   PORTFOLIO — Dhiaa Mezni
   Vanilla JS — no dependencies
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------
     1. MOBILE MENU (burger toggle)
     -------------------------------------------- */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
        navLinks.classList.remove('open');
        burger.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------
     2. SCROLL REVEAL (fade-in on scroll)
     -------------------------------------------- */
  const revealElements = document.querySelectorAll(
    '.section, .project-card, .skill-card, .timeline-item, .stat, .contact-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------
     3. ACTIVE NAV LINK ON SCROLL
     -------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navItems.length) {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(link => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${id}`
              );
            });
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
      }
    );

    sections.forEach(section => activeObserver.observe(section));
  }

  /* --------------------------------------------
     4. SMOOTH SCROLL (fallback for older browsers)
     -------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  /* --------------------------------------------
     5. DYNAMIC YEAR IN FOOTER
     -------------------------------------------- */
  const yearEls = document.querySelectorAll('.footer-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => (el.textContent = currentYear));
    /* --------------------------------------------
     6. CONTACT FORM (Formspree AJAX submit)
     -------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.querySelector('.form-status');

  if (contactForm && formStatus) {
    const submitBtn = contactForm.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Show loading state
      submitBtn.disabled = true;
      btnText.hidden = true;
      btnLoading.hidden = false;
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          contactForm.reset();
          formStatus.textContent = '✅ Message sent! I will get back to you soon.';
          formStatus.classList.add('success');
        } else {
          const data = await response.json().catch(() => ({}));
          const errorMsg =
            data.errors?.map(err => err.message).join(', ') ||
            'Something went wrong. Please try again.';
          formStatus.textContent = `❌ ${errorMsg}`;
          formStatus.classList.add('error');
        }
      } catch (error) {
        formStatus.textContent = '❌ Network error. Please check your connection.';
        formStatus.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        btnText.hidden = false;
        btnLoading.hidden = true;
      }
    });
  }
    /* --------------------------------------------
     7. LIGHTBOX (project images zoom)
     -------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  const triggers = Array.from(document.querySelectorAll('.lightbox-trigger'));

  if (lightbox && triggers.length) {
    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      const trigger = triggers[index];
      const fullSrc = trigger.getAttribute('data-full') || trigger.querySelector('img').src;
      const caption = trigger.getAttribute('data-caption') || '';

      lightboxImg.src = fullSrc;
      lightboxImg.alt = caption;
      lightboxCaption.textContent = caption;

      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      // Reset src to free memory
      setTimeout(() => {
        lightboxImg.src = '';
      }, 300);
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % triggers.length;
      updateLightboxContent();
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + triggers.length) % triggers.length;
      updateLightboxContent();
    }

    function updateLightboxContent() {
      const trigger = triggers[currentIndex];
      const fullSrc = trigger.getAttribute('data-full') || trigger.querySelector('img').src;
      const caption = trigger.getAttribute('data-caption') || '';

      // Fade animation between images
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = fullSrc;
        lightboxImg.alt = caption;
        lightboxCaption.textContent = caption;
        lightboxImg.style.opacity = '1';
      }, 150);
    }

    // Open on click
    triggers.forEach((trigger, index) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
      });
    });

    // Close
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      // Close only if clicking outside content (not on nav buttons)
      if (e.target === lightbox) closeLightbox();
    });

    // Navigation
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showNext();
    });
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrev();
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });

    // Swipe support (mobile)
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? showPrev() : showNext();
      }
    }, { passive: true });
  }

  // Add transition for smooth image swap
  if (lightboxImg) {
    lightboxImg.style.transition = 'opacity 0.25s ease';
  }
});