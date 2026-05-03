
/* â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گ
   MANSOUR MOHAMED â€” FLUTTER PORTFOLIO
   script.js
â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گ */

/* â”€â”€ Loader â”€â”€ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = '';
    startTyped();
    initCanvas();
  }, 2000);
});
document.body.style.overflow = 'hidden';

/* â”€â”€ Custom Cursor â”€â”€ */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .project-card, .service-card, .contact-link, .skill-pill').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('expand'));
  el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
});

/* â”€â”€ Navbar Scroll â”€â”€ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* â”€â”€ Mobile Menu â”€â”€ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* â”€â”€ Theme Toggle â”€â”€ */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const langToggle = document.getElementById('lang-toggle');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Restore theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  isDark = false;
  document.documentElement.setAttribute('data-theme', 'light');
  themeIcon.className = 'fa-solid fa-moon';
}

/* â”€â”€ i18n + RTL/LTR + Audience Mode â”€â”€ */
const typedEl = document.getElementById('typed');
let pIdx = 0, cIdx = 0, deleting = false;

const translations = {
  ar: {
    "loader.loading": "ط¬ط§ط±ظچ ط§ظ„طھط­ظ…ظٹظ„...",
    "nav.home": "ط§ظ„ط±ط¦ظٹط³ظٹط©",
    "nav.about": "ط¹ظ†ظٹ",
    "nav.projects": "ط§ظ„ظ…ط´ط§ط±ظٹط¹",
    "nav.services": "ط§ظ„ط®ط¯ظ…ط§طھ",
    "nav.resume": "ط§ظ„ط³ظٹط±ط© ط§ظ„ط°ط§طھظٹط©",
    "nav.contact": "طھظˆط§طµظ„",
    "hero.badge": "ظ…طھط§ط­ ظ„ظ„ط¹ظ…ظ„ ط§ظ„ط­ط±",
    "hero.tagline": "ظ…ط·ظˆظ‘ط± طھط·ط¨ظٹظ‚ط§طھ Flutter ظ„ظ„ظ…ط´ط§ط±ظٹط¹ ظˆط§ظ„ط´ط±ظƒط§طھ ظˆط§ظ„ط¹ظ…ظ„ ط§ظ„ط­ط±",
    "hero.hireMe": "ظˆط¸ظ‘ظپظ†ظٹ",
    "hero.viewResume": "ط¹ط±ط¶ ط§ظ„ط³ظٹط±ط© ط§ظ„ط°ط§طھظٹط©",
    "hero.getQuote": "ط§ط­طµظ„ ط¹ظ„ظ‰ ط¹ط±ط¶ ط³ط¹ط±",
    "hero.scroll": "ظ…ط±ظ‘ط± ظ„ظ„ط§ط³طھظƒط´ط§ظپ",
    "hero.openToWork": "ظ…طھط§ط­ ظ„ظپط±طµ ط§ظ„ط¹ظ…ظ„",
    "mode.job": "طھظˆط¸ظٹظپ ط¨ط¯ظˆط§ظ…",
    "mode.freelance": "طھظˆط¸ظٹظپ ط­ط±",
    "about.label": "ط¹ظ†ظٹ",
    "about.badgeRole": "Developer",
    "about.badgeProjects": "ظ…ط´ط§ط±ظٹط¹ ظ…ظƒطھظ…ظ„ط©",
    "about.heading": "ط£ط­ظˆظ‘ظ„ ط§ظ„ط£ظپظƒط§ط± ط¥ظ„ظ‰<br/><em>طھط·ط¨ظٹظ‚ط§طھ ط±ط§ط¦ط¹ط©</em>",
    "about.skills": "ط§ظ„ظ…ظ‡ط§ط±ط§طھ ط§ظ„ط£ط³ط§ط³ظٹط©",
    "about.resumeBtn": "ط§ظ„ط³ظٹط±ط© ط§ظ„ط°ط§طھظٹط©",
    "projects.label": "ظ…ط´ط§ط±ظٹط¹ظٹ",
    "projects.heading": "ظ…ط´ط§ط±ظٹط¹ظٹ",
    "projects.sub": "ط¨ط¹ط¶ ط§ظ„طھط·ط¨ظٹظ‚ط§طھ ط§ظ„طھظٹ ط¨ظ†ظٹطھظ‡ط§ ط£ط«ظ†ط§ط، طھط¹ظ„ظ… Flutter ظˆظ…ظ…ط§ط±ط³طھظ‡.",
    "projects.live": "ط¹ط±ط¶ ظ…ط¨ط§ط´ط±",
    "services.label": "ظ…ط§ط°ط§ ط£ظپط¹ظ„",
    "services.heading": "ط®ط¯ظ…ط§طھظٹ",
    "services.sub": "طھط·ظˆظٹط± ظ…ظˆط¨ط§ظٹظ„ ظ…طھظƒط§ظ…ظ„ ظ…طµظ…ظ‘ظ… ط®طµظٹطµط§ظ‹ ظ„ط§ط­طھظٹط§ط¬ط§طھظƒ.",
    "caseStudy.label": "ط¯ط±ط§ط³ط© ط­ط§ظ„ط© ظ…ظ…ظٹط²ط©",
    "caseStudy.heading": "ظ…ط´ط±ظˆط¹ ظ…ظ…ظٹط²: طھط·ط¨ظٹظ‚ ط¹ظٹط§ط¯ط§طھ ط§ظ„ط£ط³ظ†ط§ظ†",
    "caseStudy.challengeTitle": "ط§ظ„طھط­ط¯ظٹ",
    "caseStudy.challengeDesc": "ط§ظ„ط¹ظٹط§ط¯ط© ظƒط§ظ†طھ طھط¹ط§ظ†ظٹ ظ…ظ† ظپظˆط¶ظ‰ ظپظٹ ط¥ط¯ط§ط±ط© ط§ظ„ظ…ظˆط§ط¹ظٹط¯ ظˆطھظƒط±ط§ط± ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط±ط¶ظ‰ ظˆطھط£ط®ط± ط§ظ„ط®ط¯ظ…ط©.",
    "caseStudy.solutionTitle": "ط§ظ„ط­ظ„",
    "caseStudy.solutionDesc": "ط¨ظ†ظٹطھ طھط·ط¨ظٹظ‚ Flutter ظ…طھظƒط§ظ…ظ„ ظ„ظ„ط­ط¬ظˆط²ط§طھطŒ ظ…طھط§ط¨ط¹ط© ط§ظ„ظ…ط±ط¶ظ‰طŒ ظˆطھط°ظƒظٹط± طھظ„ظ‚ط§ط¦ظٹ ط¨ط§ظ„ظ…ظˆط§ط¹ظٹط¯ ظ…ط¹ ظ„ظˆط­ط© طھط­ظƒظ… ظˆط§ط¶ط­ط©.",
    "caseStudy.resultTitle": "ط§ظ„ظ†طھط§ط¦ط¬",
    "caseStudy.metric1": "طھط­ط³ظ† ط³ط±ط¹ط© ط§ظ„ط­ط¬ط²",
    "caseStudy.metric2": "طھظ‚ظ„ظٹظ„ ط¥ظ‡ط¯ط§ط± ط§ظ„ظ…ظˆط§ط¹ظٹط¯",
    "caseStudy.metric3": "ط±ط¶ط§ ط§ظ„ظ…ط³طھط®ط¯ظ…ظٹظ†",
    "github.label": "GitHub",
    "github.heading": "ظ…ط³ط§ظ‡ظ…ط§طھ GitHub",
    "github.sub": "ط¹ط±ط¶ ظ†ط´ط§ط·ظƒ ط§ظ„ط¨ط±ظ…ط¬ظٹ ط§ظ„ظٹظˆظ…ظٹ ظٹط¹ط·ظٹ ط§ظ†ط·ط¨ط§ط¹ط§ظ‹ ط§ط­طھط±ط§ظپظٹط§ظ‹ ظ„ط£طµط­ط§ط¨ ط§ظ„ط¹ظ…ظ„.",
    "github.less": "ط£ظ‚ظ„",
    "github.more": "ط£ظƒط«ط±",
    "github.viewProfile": "ط¹ط±ط¶ ظ…ظ„ظپ GitHub",
    "pricing.label": "ط§ظ„ط£ط³ط¹ط§ط±",
    "pricing.heading": "ط¨ط§ظ‚ط§طھ طھظ†ط§ط³ط¨ ط§ط­طھظٹط§ط¬ظƒ",
    "pricing.basic": "ط§ظ„ط¨ط¯ط§ظٹط©",
    "pricing.basicDesc": "MVP طµط؛ظٹط± ط£ظˆ ط´ط§ط´ط©/ظ…ظٹط²ط© ظˆط§ط­ط¯ط©.",
    "pricing.pro": "ط§ظ„ظ†ظ…ظˆ",
    "pricing.proDesc": "طھط·ط¨ظٹظ‚ ظ…طھظƒط§ظ…ظ„ ظ…ط¹ Backend ظˆطھظˆط«ظٹظ‚.",
    "pricing.custom": "ظ…ط®طµطµ",
    "pricing.customPrice": "ط¹ط±ط¶ ط®ط§طµ",
    "pricing.customDesc": "ظ…ط´ط§ط±ظٹط¹ ط§ظ„ط´ط±ظƒط§طھ ظˆط§ظ„ظ…ظ†طھط¬ط§طھ ط·ظˆظٹظ„ط© ط§ظ„ظ…ط¯ظ‰.",
    "process.label": "ط§ظ„ط¹ظ…ظ„ظٹط©",
    "process.heading": "ظƒظٹظپ ط£ظ†ظپط° ظ…ط´ط±ظˆط¹ظƒ",
    "process.step1": "ط§ظƒطھط´ط§ظپ ط§ظ„ظ…طھط·ظ„ط¨ط§طھ",
    "process.step2": "ط§ظ„طھط®ط·ظٹط·",
    "process.step3": "ط§ظ„طھظ†ظپظٹط°",
    "process.step4": "ط§ظ„ط¥ط·ظ„ط§ظ‚",
    "resume.label": "ط§ظ„ط³ظٹط±ط© ط§ظ„ط°ط§طھظٹط©",
    "resume.heading": "ط¬ط§ظ‡ط² ظ„ظپط±طµ ط§ظ„ط¹ظ…ظ„",
    "resume.sub": "ظٹظ…ظƒظ†ظƒ طھظ†ط²ظٹظ„ ط§ظ„ط³ظٹط±ط© ط§ظ„ط°ط§طھظٹط© ط£ظˆ ط²ظٹط§ط±ط© ط§ظ„ظ…ظ„ظپط§طھ ط§ظ„ظ…ظ‡ظ†ظٹط© ظ…ط¨ط§ط´ط±ط©.",
    "resume.download": "طھظ†ط²ظٹظ„ ط§ظ„ط³ظٹط±ط© ط§ظ„ط°ط§طھظٹط©",
    "contact.label": "طھظˆط§طµظ„ ظ…ط¹ظٹ",
    "contact.heading": "ظ„ظ†ط¨ظ†ظٹ ط´ظٹط¦ط§ظ‹<br/><em>ط±ط§ط¦ط¹ط§ظ‹ ظ…ط¹ط§ظ‹</em>",
    "contact.sub": "ظ‡ظ„ ظ„ط¯ظٹظƒ ظ…ط´ط±ظˆط¹ ظپظٹ ط°ظ‡ظ†ظƒطں ظٹط³ط¹ط¯ظ†ظٹ ط£ظ† ط£ط³ظ…ط¹ ط¹ظ†ظ‡.",
    "contact.submit": "ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ظ„ط©",
    "contact.success": "طھظ… ط¥ط±ط³ط§ظ„ ط±ط³ط§ظ„طھظƒ ط¨ظ†ط¬ط§ط­.",
    "contact.error": "طھط¹ط°ظ‘ط± ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ظ„ط©. ط­ط§ظˆظ„ ظ…ط±ط© ط£ط®ط±ظ‰."
  },
  en: {
    "loader.loading": "Loading...",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.services": "Services",
    "nav.resume": "Resume",
    "nav.contact": "Contact",
    "hero.badge": "Available for freelance work",
    "hero.tagline": "Flutter Developer for Mobile Apps, Freelance Projects & Startups",
    "hero.hireMe": "Hire Me",
    "hero.viewResume": "View Resume",
    "hero.getQuote": "Get a Quote",
    "hero.scroll": "Scroll to explore",
    "hero.openToWork": "Open To Work",
    "mode.job": "Hire Me for a Job",
    "mode.freelance": "Hire Me for Freelance",
    "about.label": "About",
    "about.badgeRole": "Developer",
    "about.badgeProjects": "Completed Projects",
    "about.heading": "I turn ideas into<br/><em>great apps</em>",
    "about.skills": "Core Skills",
    "about.resumeBtn": "Resume",
    "projects.label": "Projects",
    "projects.heading": "Featured Projects",
    "projects.sub": "Apps I built while mastering and practicing Flutter.",
    "projects.live": "Live Demo",
    "services.label": "What I Do",
    "services.heading": "Services",
    "services.sub": "Complete mobile development tailored to your goals.",
    "caseStudy.label": "Featured Case Study",
    "caseStudy.heading": "Case Study: Dental Clinic App",
    "caseStudy.challengeTitle": "Challenge",
    "caseStudy.challengeDesc": "The clinic struggled with appointment chaos, duplicated records, and delayed service.",
    "caseStudy.solutionTitle": "Solution",
    "caseStudy.solutionDesc": "I built a full Flutter app for bookings, patient tracking, and reminders with a clean dashboard.",
    "caseStudy.resultTitle": "Results",
    "caseStudy.metric1": "Faster booking flow",
    "caseStudy.metric2": "Fewer missed appointments",
    "caseStudy.metric3": "User satisfaction",
    "github.label": "GitHub",
    "github.heading": "GitHub Contributions",
    "github.sub": "Showing your coding consistency builds trust with hiring teams.",
    "github.less": "Less",
    "github.more": "More",
    "github.viewProfile": "View GitHub Profile",
    "pricing.label": "Pricing",
    "pricing.heading": "Packages for Different Needs",
    "pricing.basic": "Starter",
    "pricing.basicDesc": "Small MVP or one feature/screen.",
    "pricing.pro": "Growth",
    "pricing.proDesc": "Full app with backend integration and docs.",
    "pricing.custom": "Custom",
    "pricing.customPrice": "Custom Quote",
    "pricing.customDesc": "Long-term product and enterprise engagements.",
    "process.label": "Process",
    "process.heading": "How I Build Your Product",
    "process.step1": "Discovery",
    "process.step2": "Planning",
    "process.step3": "Build",
    "process.step4": "Launch",
    "resume.label": "Resume",
    "resume.heading": "Ready for Job Opportunities",
    "resume.sub": "Download my resume or view professional profiles directly.",
    "resume.download": "Download Resume",
    "contact.label": "Contact",
    "contact.heading": "Let's build something<br/><em>great together</em>",
    "contact.sub": "Have a project idea? I\'d love to hear it.",
    "contact.submit": "Send Message",
    "contact.success": "Message sent successfully.",
    "contact.error": "Could not send message. Please try again."
  }
};

const typedPhrases = {
  ar: ['> ظ…ط·ظˆط± Flutter', '> ظ…ظ‡ظ†ط¯ط³ طھط·ط¨ظٹظ‚ط§طھ ظ…ظˆط¨ط§ظٹظ„', '> طµط§ظ†ط¹ ظˆط§ط¬ظ‡ط§طھ ظ…ط³طھط®ط¯ظ…', '> ط´ط؛ظˆظپ ط¨ط§ظ„طھط·ط¨ظٹظ‚ط§طھ'],
  en: ['> Flutter Developer', '> Mobile App Engineer', '> UI Builder', '> Product-minded Coder']
};

let currentLang = localStorage.getItem('lang') || 'ar';
let currentMode = localStorage.getItem('audienceMode') || 'job';

function applyLanguage(lang) {
  const dict = translations[lang];
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) el.innerHTML = dict[key];
  });
  localStorage.setItem('lang', lang);
  currentLang = lang;
  pIdx = 0; cIdx = 0; deleting = false;
  typedEl.textContent = '';
}

function applyAudienceMode(mode) {
  currentMode = mode;
  localStorage.setItem('audienceMode', mode);
  document.querySelectorAll('.audience-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  document.querySelectorAll('.mode-only').forEach(el => {
    const shouldShow = el.classList.contains(`mode-${mode}`);
    el.classList.toggle('active', shouldShow);
  });
}

langToggle.addEventListener('click', () => {
  applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
});
document.querySelectorAll('.audience-btn').forEach(btn => {
  btn.addEventListener('click', () => applyAudienceMode(btn.dataset.mode));
});
applyLanguage(currentLang);
applyAudienceMode(currentMode);

/* â”€â”€ Typed Effect â”€â”€ */
function startTyped() {
  typedEl.textContent = '';
  typeLoop();
}
function typeLoop() {
  const phrases = typedPhrases[currentLang] || typedPhrases.ar;
  const current = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
    setTimeout(typeLoop, 75);
  } else {
    typedEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 40);
  }
}

/* â”€â”€ Particle Canvas â”€â”€ */
function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [], W, H, raf;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.6 + 0.2;
      const colors = ['84,212,255', '167,139,250', '244,114,182'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(84,212,255,${(1 - dist/120) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(animate);
  }
  animate();
}

/* â”€â”€ Scroll Reveal â”€â”€ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Don't unobserve to keep them visible
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// Trigger hero immediately after loader
setTimeout(() => {
  document.querySelectorAll('#hero .reveal-up, #hero .reveal-right').forEach(el => {
    setTimeout(() => el.classList.add('visible'), parseFloat(getComputedStyle(el).getPropertyValue('--d') || 0) * 1000);
  });
}, 2100);

/* â”€â”€ Skills animation trigger â”€â”€ */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-pill').forEach((pill, i) => {
        setTimeout(() => pill.classList.add('visible'), i * 60);
      });
    }
  });
}, { threshold: 0.2 });
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid.closest('#about'));

/* â”€â”€ Contact Form â”€â”€ */
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const contactSuccess = document.getElementById('contact-success');
const contactError = document.getElementById('contact-error');

// TODO: Replace with your EmailJS configuration values
const EMAILJS_PUBLIC_KEY = 'TODO_EMAILJS_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'TODO_EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'TODO_EMAILJS_TEMPLATE_ID';

if (!EMAILJS_PUBLIC_KEY.includes('TODO')) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const originalContent = btn.innerHTML;
  const sendingText = currentLang === 'ar' ? 'ط¬ط§ط±ظچ ط§ظ„ط¥ط±ط³ط§ظ„...' : 'Sending...';
  btn.innerHTML = `<span>${sendingText}</span><i class="fa-solid fa-spinner fa-spin"></i>`;
  btn.disabled = true;
  formSuccess.classList.remove('show');
  contactSuccess.classList.remove('show');
  contactError.classList.remove('show');

  if (
    EMAILJS_PUBLIC_KEY.includes('TODO') ||
    EMAILJS_SERVICE_ID.includes('TODO') ||
    EMAILJS_TEMPLATE_ID.includes('TODO')
  ) {
    btn.innerHTML = originalContent;
    btn.disabled = false;
    contactError.classList.add('show');
    return;
  }

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    .then(() => {
      btn.innerHTML = originalContent;
      btn.disabled = false;
      contactSuccess.classList.add('show');
      form.reset();
      setTimeout(() => contactSuccess.classList.remove('show'), 5000);
    })
    .catch(() => {
      btn.innerHTML = originalContent;
      btn.disabled = false;
      contactError.classList.add('show');
      setTimeout(() => contactError.classList.remove('show'), 5000);
    });
});

/* â”€â”€ Back to Top â”€â”€ */
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* â”€â”€ Active Nav Links â”€â”€ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

/* â”€â”€ Footer Year â”€â”€ */
document.getElementById('year').textContent = new Date().getFullYear();

/* â”€â”€ Smooth anchor scroll â”€â”€ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

  
