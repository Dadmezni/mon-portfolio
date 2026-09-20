/* ============================================
   i18n — Dhiaa Mezni Portfolio
   FR / EN switcher with localStorage memory
   ============================================ */

const translations = {
  /* ============ ENGLISH ============ */
  en: {
    // Nav
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.services": "Services",
    "nav.certifications": "Certifications",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "👋 Hi, I'm",
    "hero.role": 'Full Stack Developer <span class="accent">&</span> IT Teacher',
    "hero.desc":
      'I build scalable web applications with <strong>Laravel</strong>, <strong>PHP</strong> and <strong>ReactJS</strong>, and I teach these skills to the next generation of developers.',
    "hero.ctaProjects": "View my projects",
    "hero.ctaContact": "Get in touch",
    "hero.location": "📍 Jendouba, Tunisia",
    "hero.languages": "🌐 EN · FR · AR",

    // About
    "about.tag": "01 — About",
    "about.title": "A developer who loves to teach",
    "about.p1":
      "Full Stack Developer and Computer Science Teacher with over <strong>15 years of experience</strong> across web development, teaching, and technical team leadership.",
    "about.p2":
      "I've designed e-learning platforms, marketplaces, booking portals and internal business apps — always with the same standard: clean, performant, maintainable code.",
    "about.p3":
      "On the teaching side, I've trained dozens of students in programming fundamentals and guided their first real-world projects.",
    "about.stat1": "Years of experience",
    "about.stat2": "Projects delivered",
    "about.stat3": "Years teaching",
    "about.stat4": "Languages spoken",

    // Skills
    "skills.tag": "02 — Skills",
    "skills.title": "Technical stack",
    "skills.backend": "Backend",
    "skills.frontend": "Frontend",
    "skills.databases": "Databases",
    "skills.tools": "Tools & Methods",

    // Experience
    "exp.tag": "03 — Experience",
    "exp.title": "Professional experience",

    // Services
    "services.tag": "04 — Services",
    "services.title": "What I can do for you",
    "services.lead":
      "Whether you need a full web application, a custom platform, or training for your team — I bring 15+ years of experience to every project.",
    "services.s1.title": "Web Application Development",
    "services.s1.desc":
      "Custom full-stack applications built with Laravel, ReactJS and MySQL. From MVP to production-ready platforms.",
    "services.s1.li1": "SaaS platforms",
    "services.s1.li2": "Internal business tools",
    "services.s1.li3": "Marketplaces",
    "services.s2.title": "Website Design & Development",
    "services.s2.desc":
      "Modern, responsive websites — from landing pages to complex corporate sites. Fast, SEO-friendly and built to last.",
    "services.s2.li1": "Corporate websites",
    "services.s2.li2": "Portfolios & landing pages",
    "services.s2.li3": "E-commerce",
    "services.s3.title": "API Development & Integration",
    "services.s3.desc":
      "REST APIs, third-party integrations, payment gateways, and data sync between your systems.",
    "services.s3.li1": "REST API design",
    "services.s3.li2": "Third-party integrations",
    "services.s3.li3": "Payment gateways",
    "services.s4.title": "IT Training & Teaching",
    "services.s4.desc":
      "Custom training for students, teams or companies — from programming fundamentals to advanced Laravel & React.",
    "services.s4.li1": "1-on-1 mentoring",
    "services.s4.li2": "Team workshops",
    "services.s4.li3": "Corporate training",
    "services.s5.title": "Technical Consulting",
    "services.s5.desc":
      "Architecture reviews, tech stack choices, code audits and help scaling your existing projects.",
    "services.s5.li1": "Code audits",
    "services.s5.li2": "Architecture reviews",
    "services.s5.li3": "Tech stack advice",
    "services.s6.title": "Maintenance & Support",
    "services.s6.desc":
      "Bug fixing, performance optimization, security updates and ongoing maintenance for existing apps.",
    "services.s6.li1": "Bug fixing",
    "services.s6.li2": "Performance tuning",
    "services.s6.li3": "Security updates",
    "services.ctaText": "Need something custom? Let's talk about your project.",
    "services.ctaBtn": "Start a project",

    // Certifications
    "cert.tag": "05 — Certifications",
    "cert.title": "Training & Certificates",

    // Projects
    "proj.tag": "06 — Projects",
    "proj.title": "Selected work",

    // Contact
    "contact.tag": "07 — Contact",
    "contact.title": "Let's work together",
    "contact.lead":
      "Got a project in mind, a freelance mission, or a teaching opportunity? Drop me a line — I reply fast.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.linkedin": "LinkedIn",
    "contact.site": "Current site",
    "contact.formName": "Name",
    "contact.formEmail": "Email",
    "contact.formSubject": "Subject",
    "contact.formMessage": "Message",
    "contact.formNamePh": "Your name",
    "contact.formEmailPh": "you@example.com",
    "contact.formSubjectPh": "What is this about?",
    "contact.formMessagePh": "Tell me about your project...",
    "contact.formSubmit": "Send message",
    "contact.formSending": "Sending…",
    "contact.formSuccess": "✅ Message sent! I will get back to you soon.",
    "contact.formError": "❌ Something went wrong. Please try again.",

    // Footer
    "footer.text": "Full Stack Developer & IT Teacher",
    "footer.loc": "Jendouba, Tunisia 🇹🇳",
  },

  /* ============ FRANÇAIS ============ */
  fr: {
    // Nav
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.experience": "Parcours",
    "nav.services": "Services",
    "nav.certifications": "Certifications",
    "nav.projects": "Projets",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "👋 Salut, je suis",
    "hero.role": 'Développeur Full Stack <span class="accent">&</span> Formateur IT',
    "hero.desc":
      'Je conçois des applications web scalables avec <strong>Laravel</strong>, <strong>PHP</strong> et <strong>ReactJS</strong>, et je transmets ces compétences à la nouvelle génération de développeurs.',
    "hero.ctaProjects": "Voir mes projets",
    "hero.ctaContact": "Me contacter",
    "hero.location": "📍 Jendouba, Tunisie",
    "hero.languages": "🌐 FR · EN · AR",

    // About
    "about.tag": "01 — À propos",
    "about.title": "Un développeur qui aime transmettre",
    "about.p1":
      "Développeur Full Stack et enseignant en informatique, je cumule plus de <strong>15 ans d'expérience</strong> entre développement web, formation et direction d'équipes techniques.",
    "about.p2":
      "J'ai conçu des plateformes e-learning, des marketplaces, des portails de réservation et des applications métiers — toujours avec la même exigence : du code clair, performant et maintenable.",
    "about.p3":
      "Côté pédagogie, j'ai formé des dizaines d'étudiants aux fondamentaux de la programmation et accompagné leurs premiers projets réels.",
    "about.stat1": "Années d'expérience",
    "about.stat2": "Projets livrés",
    "about.stat3": "Ans d'enseignement",
    "about.stat4": "Langues parlées",

    // Skills
    "skills.tag": "02 — Compétences",
    "skills.title": "Stack technique",
    "skills.backend": "Backend",
    "skills.frontend": "Frontend",
    "skills.databases": "Bases de données",
    "skills.tools": "Outils & Méthodes",

    // Experience
    "exp.tag": "03 — Parcours",
    "exp.title": "Expérience professionnelle",

    // Services
    "services.tag": "04 — Services",
    "services.title": "Ce que je peux faire pour vous",
    "services.lead":
      "Que vous ayez besoin d'une application web complète, d'une plateforme sur mesure ou d'une formation pour votre équipe — j'apporte plus de 15 ans d'expérience à chaque projet.",
    "services.s1.title": "Développement d'applications web",
    "services.s1.desc":
      "Applications full-stack sur mesure avec Laravel, ReactJS et MySQL. Du MVP à la plateforme prête pour la production.",
    "services.s1.li1": "Plateformes SaaS",
    "services.s1.li2": "Outils métiers internes",
    "services.s1.li3": "Marketplaces",
    "services.s2.title": "Conception & développement de sites web",
    "services.s2.desc":
      "Sites modernes et responsives — de la landing page au site corporate complexe. Rapides, optimisés SEO et durables.",
    "services.s2.li1": "Sites corporate",
    "services.s2.li2": "Portfolios & landing pages",
    "services.s2.li3": "E-commerce",
    "services.s3.title": "Développement & intégration d'API",
    "services.s3.desc":
      "APIs REST, intégrations tierces, passerelles de paiement et synchronisation de données entre vos systèmes.",
    "services.s3.li1": "Conception d'API REST",
    "services.s3.li2": "Intégrations tierces",
    "services.s3.li3": "Passerelles de paiement",
    "services.s4.title": "Formation & Enseignement IT",
    "services.s4.desc":
      "Formations sur mesure pour étudiants, équipes ou entreprises — des fondamentaux de la programmation au Laravel & React avancé.",
    "services.s4.li1": "Mentorat individuel",
    "services.s4.li2": "Ateliers d'équipe",
    "services.s4.li3": "Formation en entreprise",
    "services.s5.title": "Conseil technique",
    "services.s5.desc":
      "Revues d'architecture, choix de stack technique, audits de code et aide au passage à l'échelle de vos projets.",
    "services.s5.li1": "Audits de code",
    "services.s5.li2": "Revues d'architecture",
    "services.s5.li3": "Conseil sur la stack",
    "services.s6.title": "Maintenance & Support",
    "services.s6.desc":
      "Correction de bugs, optimisation des performances, mises à jour de sécurité et maintenance continue.",
    "services.s6.li1": "Correction de bugs",
    "services.s6.li2": "Optimisation des performances",
    "services.s6.li3": "Mises à jour de sécurité",
    "services.ctaText": "Besoin de quelque chose de sur mesure ? Parlons de votre projet.",
    "services.ctaBtn": "Démarrer un projet",

    // Certifications
    "cert.tag": "05 — Certifications",
    "cert.title": "Formations & Certificats",

    // Projects
    "proj.tag": "06 — Projets",
    "proj.title": "Réalisations sélectionnées",

    // Contact
    "contact.tag": "07 — Contact",
    "contact.title": "Travaillons ensemble",
    "contact.lead":
      "Un projet en tête, une mission freelance ou une opportunité d'enseignement ? Écrivez-moi, je réponds rapidement.",
    "contact.email": "Email",
    "contact.phone": "Téléphone",
    "contact.linkedin": "LinkedIn",
    "contact.site": "Site actuel",
    "contact.formName": "Nom",
    "contact.formEmail": "Email",
    "contact.formSubject": "Sujet",
    "contact.formMessage": "Message",
    "contact.formNamePh": "Votre nom",
    "contact.formEmailPh": "vous@exemple.com",
    "contact.formSubjectPh": "De quoi s'agit-il ?",
    "contact.formMessagePh": "Parlez-moi de votre projet...",
    "contact.formSubmit": "Envoyer le message",
    "contact.formSending": "Envoi…",
    "contact.formSuccess": "✅ Message envoyé ! Je vous réponds bientôt.",
    "contact.formError": "❌ Une erreur est survenue. Merci de réessayer.",

    // Footer
    "footer.text": "Développeur Full Stack & Formateur IT",
    "footer.loc": "Jendouba, Tunisie 🇹🇳",
  },
};

/* ============================================
   LANGUAGE SWITCHER
   ============================================ */

function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  // Set <html lang="...">
  document.documentElement.lang = lang;

  // Text content (data-i18n)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // HTML content (data-i18n-html) — for strings with tags like <strong>
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Placeholders (data-i18n-placeholder)
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key] !== undefined) el.setAttribute("placeholder", t[key]);
  });

  // Update the toggle button label (show the OTHER language)
  const toggleLabel = document.querySelector(".lang-current");
  if (toggleLabel) toggleLabel.textContent = lang === "en" ? "FR" : "EN";

  // Persist choice
  try {
    localStorage.setItem("portfolio-lang", lang);
  } catch (e) {}
}

function initI18n() {
  // Load saved language, or default to EN
  let savedLang = "en";
  try {
    savedLang = localStorage.getItem("portfolio-lang") || "en";
  } catch (e) {}

  applyLanguage(savedLang);

  const toggle = document.getElementById("lang-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.lang || "en";
      applyLanguage(current === "en" ? "fr" : "en");
    });
  }
}

// Export for use in script.js (optional)
window.i18n = { applyLanguage, initI18n, translations };

// Auto-init when DOM is ready
document.addEventListener("DOMContentLoaded", initI18n);