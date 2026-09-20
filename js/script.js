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
});