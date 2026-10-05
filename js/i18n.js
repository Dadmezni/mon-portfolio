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
    "nav.recommendations": "Testimonials",
    "nav.services": "Services",
    "nav.certifications": "Certifications",
    "nav.projects": "Projects",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "👋 Hi, I'm",
    "hero.role": 'Full Stack Laravel Developer <span class="accent">&</span> IT Trainer',
    "hero.proof": "HR teams described a strategic project as \"a genuine success\" and recognized my contribution as exceptional.",
    "hero.desc":
      'I build web applications with <strong>Laravel</strong>, <strong>PHP</strong> and <strong>ReactJS</strong>—from service platforms to internal business tools. I also teach practical web development.',
    "hero.ctaProjects": "View my projects",
    "hero.ctaTraining": "Explore my training",
    "hero.ctaContact": "Get in touch",
    "hero.location": "📍 Jendouba, Tunisia",
    "hero.languages": "🌐 EN · FR · AR",

    // About
    "about.tag": "01 — About",
    "about.title": "A developer who loves to teach",
    "about.p1":
      "Full Stack Developer and IT trainer with professional experience across web development, teaching, and technical team leadership.",
    "about.p2":
      "I've designed e-learning platforms, marketplaces, booking portals and internal business apps — always with the same standard: clean, performant, maintainable code.",
    "about.p3":
      "On the teaching side, I've trained dozens of students in programming fundamentals and guided their first real-world projects.",
    "about.stat1": "Professional work since",
    "about.stat2": "Projects featured",
    "about.stat3": "Years teaching (2017–2021)",
    "about.stat4": "Languages spoken",

    // Skills
    "skills.tag": "02 — Skills",
    "skills.title": "Technical stack",
    "skills.backend": "Backend",
    "skills.frontend": "Frontend",
    "skills.databases": "Databases",
    "skills.tools": "Tools & Methods",
    "skills.core": "Core stack",
    "skills.web": "Web foundations",
    "skills.additional": "Additional technologies",

    // Experience
    "exp.tag": "03 — Experience",
    "exp.title": "Professional experience",
    // Recommendations
    "recommendations.tag": "Recommendations",
    "recommendations.title": "What project leads say",
    "recommendations.lead": "Feedback shared by HR managers and project leads on delivered tools and project contributions.",
    "recommendations.ninebox.project": "Promotion assessment - Nine Box",
    "recommendations.ninebox.quote": "\u201cDhia tested the promotion assessment. It works and consistently places the employee in the Nine Box tool according to the manager\u2019s evaluation.\u201d",
    "recommendations.ninebox.author": "Charfeddine Nsira - HR Manager",
    "recommendations.dashboard.project": "Recruitment & Development Dashboard",
    "recommendations.dashboard.quote": "\u201cYour dedication and skills have been truly remarkable.\u201d",
    "recommendations.dashboard.author": "Marwen Kahlaoui - Project Manager",
    "recommendations.matrix.project": "Skill Matrix Staff Application",
    "recommendations.matrix.quote": "\u201cThe Evaluation Skills Staff Application is ready and functional.\u201d",
    "recommendations.matrix.author": "Inaam Dhoulbi - HR Development",
    "recommendations.evidence": "Validation feedback - email addresses removed",

    // Services
    "services.tag": "04 — Services",
    "services.title": "What I can do for you",
    "services.lead":
      "Whether you need a web application, a custom platform, or practical training for your team, I can help you move the project forward.",
    "services.offer.dev": "Web application development",
    "services.offer.dev.desc": "Build useful web products around your business needs, from a focused application to a larger platform.",
    "services.offer.dev.1": "Laravel applications",
    "services.offer.dev.2": "REST APIs",
    "services.offer.dev.3": "React interfaces",
    "services.offer.training": "IT training and mentoring",
    "services.offer.training.desc": "Practical guidance for learners and teams, from programming fundamentals to building web projects.",
    "services.offer.training.1": "PHP and MySQL",
    "services.offer.training.2": "Laravel and React",
    "services.offer.training.3": "Project mentoring",
    "services.offer.support": "Support and improvement",
    "services.offer.support.desc": "Improve an existing application with focused technical support and ongoing care.",
    "services.offer.support.1": "Bug fixing",
    "services.offer.support.2": "Performance and maintenance",
    "services.offer.support.3": "Code and architecture review",
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
    "proj.title": "Project gallery",
    "proj.lead": "A visual overview of web applications and platforms I have built. Select an image to view it larger.",
    "gallery.tag": "07 — Gallery",
    "gallery.title": "Moments in pictures",
    "gallery.lead": "A few snapshots from my work and activities.",
    "proj.p1.badge": "Marketplace",
    "proj.p1.desc": "A services marketplace designed to connect customers with providers and follow orders through the platform.",
    "proj.p2.badge": "Travel",
    "proj.p2.desc": "A responsive travel and booking experience that brings destination information and booking services together.",
    "proj.p3.badge": "E-learning",
    "proj.p3.desc": "An educational portal for publishing learning content and supporting student progress online.",
    "proj.p4.badge": "Services",
    "proj.p4.desc": "A web platform that organizes online service requests and their management in one place.",
    "proj.p5.badge": "Internal tool",
    "proj.p5.desc": "An onboarding application to organize employee arrival steps and related internal workflows.",
    "proj.p6.badge": "Emergency",
    "proj.p6.desc": "An internal application built to support emergency response coordination and workflows.",
    // Case studies
    "case.challenge": "Challenge:",
    "case.role": "My role:",
    "case.result": "Result:",
    "case.feedback": "See the feedback \u2192",
    "case.ninebox.label": "Validated project",
    "case.ninebox.title": "Promotion Assessment - Nine Box",
    "case.ninebox.challenge": "Help HR assess employee potential using the manager\u2019s evaluation.",
    "case.ninebox.role": "Functional testing and validation.",
    "case.ninebox.result": "The tool worked and consistently mapped employees to the Nine Box.",
    "case.matrix.label": "Validated project",
    "case.matrix.title": "Skill Matrix Staff Application",
    "case.matrix.challenge": "Assess staff skills and identify development needs.",
    "case.matrix.role": "Tested the skills matrix as part of HR department testing.",
    "case.matrix.result": "The application was reported ready and functional, with a gap analysis and development plan.",
    "case.dashboard.label": "Recognized contribution",
    "case.dashboard.title": "Recruitment & Development Dashboard",
    "case.dashboard.challenge": "Support recruitment and development workflows with a dedicated dashboard.",
    "case.dashboard.role": "Contributed to the project delivery.",
    "case.dashboard.result": "The project was described as a success, with my contribution recognized by the project manager and HR.",

    // Training highlights
    "training.tag": "Learn and build",
    "training.title": "Practical training resources",
    "training.lead": "Explore courses and learning materials created from my work in web development and IT teaching.",
    "training.laravel.title": "Laravel development",
    "training.laravel.desc": "A step-by-step course covering Laravel foundations and application structure.",
    "training.ai.title": "AI for developers",
    "training.ai.desc": "Explore AI concepts, embeddings, prompts and RAG through practical learning resources.",
    "training.web.title": "Web development foundations",
    "training.web.desc": "Learn Bootstrap and follow a guide to creating and publishing a portfolio.",
    "training.open": "Explore the course →",

    // Contact
    "contact.tag": "08 — Contact",
    "contact.title": "Let's work together",
    "contact.lead":
      "Got a project in mind, a freelance mission, or a teaching opportunity? Drop me a line — I reply fast.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappCta": "Send me a message",
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
    "footer.text": "Full Stack Laravel Developer & IT Trainer",
    "footer.loc": "Jendouba, Tunisia 🇹🇳",
  },

  /* ============ FRANÇAIS ============ */
  fr: {
    // Nav
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.experience": "Parcours",
    "nav.recommendations": "T\u00e9moignages",
    "nav.services": "Services",
    "nav.certifications": "Certifications",
    "nav.projects": "Projets",
    "nav.gallery": "Galerie",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "👋 Salut, je suis",
    "hero.role": 'Développeur Full Stack Laravel <span class="accent">&</span> Formateur IT',
    "hero.proof": "Les RH ont qualifi\u00e9 un projet strat\u00e9gique de \"v\u00e9ritable succ\u00e8s\" et salu\u00e9 ma contribution.",
    "hero.desc":
      'Je développe des applications web avec <strong>Laravel</strong>, <strong>PHP</strong> et <strong>ReactJS</strong> : plateformes de services et outils métiers. Je forme aussi à la pratique du développement web.',
    "hero.ctaProjects": "Voir mes projets",
    "hero.ctaTraining": "Découvrir mes formations",
    "hero.ctaContact": "Me contacter",
    "hero.location": "📍 Jendouba, Tunisie",
    "hero.languages": "🌐 FR · EN · AR",

    // About
    "about.tag": "01 — À propos",
    "about.title": "Un développeur qui aime transmettre",
    "about.p1":
      "Développeur Full Stack et formateur IT, j'ai une expérience professionnelle en développement web, formation et encadrement d'équipes techniques.",
    "about.p2":
      "J'ai conçu des plateformes e-learning, des marketplaces, des portails de réservation et des applications métiers — toujours avec la même exigence : du code clair, performant et maintenable.",
    "about.p3":
      "Côté pédagogie, j'ai formé des dizaines d'étudiants aux fondamentaux de la programmation et accompagné leurs premiers projets réels.",
    "about.stat1": "Parcours professionnel depuis",
    "about.stat2": "Projets présentés",
    "about.stat3": "Ans d'enseignement (2017–2021)",
    "about.stat4": "Langues parlées",

    // Skills
    "skills.tag": "02 — Compétences",
    "skills.title": "Stack technique",
    "skills.backend": "Backend",
    "skills.frontend": "Frontend",
    "skills.databases": "Bases de données",
    "skills.tools": "Outils & Méthodes",
    "skills.core": "Stack principale",
    "skills.web": "Bases du web",
    "skills.additional": "Technologies complémentaires",

    // Experience
    "exp.tag": "03 — Parcours",
    "exp.title": "Expérience professionnelle",
    // Recommandations
    "recommendations.tag": "T\u00e9moignages",
    "recommendations.title": "Le retour des responsables de projet",
    "recommendations.lead": "Des retours de responsables RH et de chefs de projet sur les outils livr\u00e9s et ma contribution.",
    "recommendations.ninebox.project": "Bilan d\u2019\u00e9valuation Promotion - Nine Box",
    "recommendations.ninebox.quote": "\u00ab Dhia a test\u00e9 le bilan d\u2019\u00e9valuation Promotion. Il fonctionne et d\u00e9tecte syst\u00e9matiquement le collaborateur dans le Nine Box selon l\u2019\u00e9valuation du N+1. \u00bb",
    "recommendations.ninebox.author": "Charfeddine Nsira - Responsable RH",
    "recommendations.dashboard.project": "Dashboard Recrutement & D\u00e9veloppement",
    "recommendations.dashboard.quote": "\u00ab Ton d\u00e9vouement et tes comp\u00e9tences ont\u00e9t\u00e9 vraiment remarquables. \u00bb",
    "recommendations.dashboard.author": "Marwen Kahlaoui - Chef de projet",
    "recommendations.matrix.project": "Skill Matrix Staff Application",
    "recommendations.matrix.quote": "\u00ab L\u2019application d\u2019\u00e9valuation des comp\u00e9tences est pr\u00eate et fonctionnelle. \u00bb",
    "recommendations.matrix.author": "Inaam Dhoulbi - D\u00e9veloppement RH",
    "recommendations.evidence": "Extrait du retour de validation - adresses e-mail masqu\u00e9es",

    // Services
    "services.tag": "04 — Services",
    "services.title": "Ce que je peux faire pour vous",
    "services.lead":
      "Pour une application web, une plateforme sur mesure ou une formation pratique de votre équipe, je peux vous aider à faire avancer votre projet.",
    "services.offer.dev": "Développement d'applications web",
    "services.offer.dev.desc": "Création de solutions web adaptées à vos besoins, d'une application ciblée à une plateforme plus complète.",
    "services.offer.dev.1": "Applications Laravel",
    "services.offer.dev.2": "API REST",
    "services.offer.dev.3": "Interfaces React",
    "services.offer.training": "Formation et accompagnement IT",
    "services.offer.training.desc": "Un accompagnement pratique pour les apprenants et les équipes, des bases de la programmation aux projets web.",
    "services.offer.training.1": "PHP et MySQL",
    "services.offer.training.2": "Laravel et React",
    "services.offer.training.3": "Accompagnement de projets",
    "services.offer.support": "Support et amélioration",
    "services.offer.support.desc": "Faites évoluer une application existante avec un support technique ciblé et un suivi régulier.",
    "services.offer.support.1": "Correction de bugs",
    "services.offer.support.2": "Performance et maintenance",
    "services.offer.support.3": "Revue de code et d'architecture",
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
    "proj.title": "Galerie de projets",
    "proj.lead": "Un aperçu visuel des applications et plateformes web que j’ai réalisées. Cliquez sur une image pour l’agrandir.",
    "gallery.tag": "07 — Galerie",
    "gallery.title": "Quelques moments en images",
    "gallery.lead": "Quelques photos de mon travail et de mes activités.",
    "proj.p1.badge": "Marketplace",
    "proj.p1.desc": "Une marketplace de services pour mettre en relation clients et prestataires et suivre les commandes sur la plateforme.",
    "proj.p2.badge": "Voyage",
    "proj.p2.desc": "Une expérience responsive de voyage et de réservation qui réunit informations sur les destinations et services de réservation.",
    "proj.p3.badge": "E-learning",
    "proj.p3.desc": "Un portail éducatif pour publier des contenus de formation et accompagner le suivi des étudiants en ligne.",
    "proj.p4.badge": "Services",
    "proj.p4.desc": "Une plateforme web qui centralise les demandes de services en ligne et leur gestion.",
    "proj.p5.badge": "Outil interne",
    "proj.p5.desc": "Une application d'intégration pour organiser les étapes d'arrivée des employés et les processus internes associés.",
    "proj.p6.badge": "Urgence",
    "proj.p6.desc": "Une application interne conçue pour faciliter la coordination des interventions et des processus d'urgence.",
    // \u00c9tudes de cas
    "case.challenge": "D\u00e9fi :",
    "case.role": "Mon r\u00f4le :",
    "case.result": "R\u00e9sultat :",
    "case.feedback": "Voir le retour \u2192",
    "case.ninebox.label": "Projet valid\u00e9",
    "case.ninebox.title": "Bilan d\u2019\u00e9valuation Promotion - Nine Box",
    "case.ninebox.challenge": "Aider les RH \u00e0 \u00e9valuer le potentiel des collaborateurs selon l\u2019\u00e9valuation du responsable.",
    "case.ninebox.role": "Tests fonctionnels et validation.",
    "case.ninebox.result": "L\u2019outil fonctionnait et positionnait les collaborateurs dans le Nine Box.",
    "case.matrix.label": "Projet valid\u00e9",
    "case.matrix.title": "Skill Matrix Staff Application",
    "case.matrix.challenge": "\u00c9valuer les comp\u00e9tences des collaborateurs et rep\u00e9rer les besoins de d\u00e9veloppement.",
    "case.matrix.role": "Tests de la matrice de comp\u00e9tences avec le d\u00e9partement RH.",
    "case.matrix.result": "L\u2019application a \u00e9t\u00e9 d\u00e9clar\u00e9e pr\u00eate et fonctionnelle, avec une analyse des \u00e9carts et un plan de d\u00e9veloppement.",
    "case.dashboard.label": "Contribution reconnue",
    "case.dashboard.title": "Dashboard Recrutement & D\u00e9veloppement",
    "case.dashboard.challenge": "Soutenir les processus de recrutement et de d\u00e9veloppement avec un tableau de bord d\u00e9di\u00e9.",
    "case.dashboard.role": "Contribution \u00e0 la livraison du projet.",
    "case.dashboard.result": "Le projet a \u00e9t\u00e9 qualifi\u00e9 de succ\u00e8s, et ma contribution salu\u00e9e par le chef de projet et les RH.",

    // Mise en avant des formations
    "training.tag": "Apprendre et créer",
    "training.title": "Des ressources de formation pratiques",
    "training.lead": "Découvrez des cours et supports créés à partir de mon expérience en développement web et en formation informatique.",
    "training.laravel.title": "Développement avec Laravel",
    "training.laravel.desc": "Un cours progressif sur les bases de Laravel et la structure d'une application.",
    "training.ai.title": "L'IA pour les développeurs",
    "training.ai.desc": "Explorez les concepts d'IA, les embeddings, les prompts et le RAG avec des ressources pratiques.",
    "training.web.title": "Les bases du développement web",
    "training.web.desc": "Apprenez Bootstrap et suivez un guide pour créer et publier un portfolio.",
    "training.open": "Découvrir le cours →",

    // Contact
    "contact.tag": "08 — Contact",
    "contact.title": "Travaillons ensemble",
    "contact.lead":
      "Un projet en tête, une mission freelance ou une opportunité d'enseignement ? Écrivez-moi, je réponds rapidement.",
    "contact.email": "Email",
    "contact.phone": "Téléphone",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappCta": "M'écrire sur WhatsApp",
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
    "footer.text": "Développeur Full Stack Laravel & Formateur IT",
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
