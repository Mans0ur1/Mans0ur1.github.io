window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
        document.body.style.overflow = "";
        hasBooted = true;
        startTyped();
        initCanvas();
      }, 1600);
    });
    document.body.style.overflow = "hidden";

    

    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const langToggle = document.getElementById("lang-toggle");
    const typedEl = document.getElementById("typed");
    const form = document.getElementById("contact-form");
    const contactSuccess = document.getElementById("contact-success");
    const contactError = document.getElementById("contact-error");
    const audienceInput = document.getElementById("audience-mode-input");
    const languageInput = document.getElementById("language-input");
    const metaDescription = document.querySelector('meta[name="description"]');

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let currentLang = localStorage.getItem("lang") || "en";
    let currentMode = localStorage.getItem("audienceMode") || "job";
    let isDark = (localStorage.getItem("theme") || "dark") === "dark";
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let typingTimer;
    let hasBooted = false;

    const EMAILJS_PUBLIC_KEY = "OjIOhndBCMjrh0I0_";
    const EMAILJS_SERVICE_ID = "service_v05z27v";
    const EMAILJS_TEMPLATE_ID = "template_w66d901";

    if (!EMAILJS_PUBLIC_KEY.includes("TODO")) {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    (function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    })();

    function bindCursorTargets() {
      document.querySelectorAll("a, button, .project-card, .service-card, .contact-link, .skill-pill").forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("expand"));
        el.addEventListener("mouseleave", () => ring.classList.remove("expand"));
      });
    }

    bindCursorTargets();

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
    });

    document.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });

    themeToggle.addEventListener("click", () => {
      isDark = !isDark;
      applyTheme();
    });

    function applyTheme() {
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
      themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    function setLangToggleLabel() {
      langToggle.textContent = currentLang === "ar" ? "EN" : "AR";
    }

    function translateTextNodes(dict) {
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (dict[key]) {
          element.textContent = dict[key];
        }
      });

      document.querySelectorAll("[data-i18n-html]").forEach((element) => {
        const key = element.getAttribute("data-i18n-html");
        if (dict[key]) {
          element.innerHTML = dict[key];
        }
      });

      document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.getAttribute("data-i18n-placeholder");
        if (dict[key]) {
          element.setAttribute("placeholder", dict[key]);
        }
      });

      document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
        const [attr, key] = element.getAttribute("data-i18n-attr").split(":");
        if (dict[key]) {
          element.setAttribute(attr, dict[key]);
        }
      });
    }

    const calendarDict = [
      ['Less', 'أقل'], ['More', 'أكثر'],
      ['Learn how we count contributions', 'تعرف على كيفية حساب المساهمات'],
      ['contributions in the last year', 'مساهمة في العام الماضي'],
      ['Jan', 'يناير'], ['Feb', 'فبراير'], ['Mar', 'مارس'], ['Apr', 'أبريل'], ['May', 'مايو'], ['Jun', 'يونيو'],
      ['Jul', 'يوليو'], ['Aug', 'أغسطس'], ['Sep', 'سبتمبر'], ['Oct', 'أكتوبر'], ['Nov', 'نوفمبر'], ['Dec', 'ديسمبر'],
      ['Sun', 'الأحد'], ['Mon', 'الاثنين'], ['Tue', 'الثلاثاء'], ['Wed', 'الأربعاء'], ['Thu', 'الخميس'], ['Fri', 'الجمعة'], ['Sat', 'السبت']
    ];

    function updateCalendarLanguage(isAr) {
      const cal = document.querySelector('.calendar');
      if (!cal) return;

      const walker = document.createTreeWalker(cal, NodeFilter.SHOW_TEXT, null, false);
      let node;
      while ((node = walker.nextNode())) {
        calendarDict.forEach(pair => {
          const [en, ar] = pair;
          if (isAr && node.nodeValue.includes(en)) {
            node.nodeValue = node.nodeValue.replace(en, ar);
          } else if (!isAr && node.nodeValue.includes(ar)) {
            node.nodeValue = node.nodeValue.replace(ar, en);
          }
        });
      }

      cal.querySelectorAll('[data-original-title], [title]').forEach(el => {
        ['data-original-title', 'title'].forEach(attr => {
          let val = el.getAttribute(attr);
          if (val) {
            if (isAr) {
              val = val.replace('No contributions', 'لا توجد مساهمات').replace('contributions', 'مساهمات').replace('contribution', 'مساهمة').replace('on ', 'في ');
              calendarDict.forEach(pair => { val = val.replace(pair[0], pair[1]); });
            } else {
              val = val.replace('لا توجد مساهمات', 'No contributions').replace('مساهمات', 'contributions').replace('مساهمة', 'contribution').replace('في ', 'on ');
              calendarDict.forEach(pair => { val = val.replace(pair[1], pair[0]); });
            }
            el.setAttribute(attr, val);
          }
        });
      });
    }

    function applyLanguage(lang) {
      const dict = translations[lang];
      currentLang = lang;
      localStorage.setItem("lang", lang);

      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.body.classList.toggle("lang-ar", lang === "ar");
      document.title = dict["meta.title"];
      metaDescription.setAttribute("content", dict["meta.description"]);

      translateTextNodes(dict);
      setLangToggleLabel();
      languageInput.value = lang;

      phraseIndex = 0;
      charIndex = 0;
      deleting = false;
      typedEl.textContent = "";
      clearTimeout(typingTimer);
      if (hasBooted) {
        startTyped();
      }
      updateCalendarLanguage(lang === "ar");
    }

    function applyAudienceMode(mode) {
      currentMode = mode;
      localStorage.setItem("audienceMode", mode);
      audienceInput.value = mode;

      document.querySelectorAll(".audience-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.mode === mode);
      });

      document.querySelectorAll(".mode-only, .mode-inline, .mode-flex").forEach((element) => {
        const shouldShow = element.classList.contains(`mode-${mode}`);
        element.classList.toggle("active", shouldShow);
      });
    }

    langToggle.addEventListener("click", () => {
      applyLanguage(currentLang === "ar" ? "en" : "ar");
    });

    document.querySelectorAll(".audience-btn").forEach((button) => {
      button.addEventListener("click", () => applyAudienceMode(button.dataset.mode));
    });

    function startTyped() {
      typeLoop();
    }

    function typeLoop() {
      const phrases = typedPhrases[currentLang] || typedPhrases.en;
      const currentPhrase = phrases[phraseIndex];

      if (!deleting) {
        typedEl.textContent = currentPhrase.slice(0, ++charIndex);
        if (charIndex === currentPhrase.length) {
          deleting = true;
          typingTimer = setTimeout(typeLoop, 1800);
          return;
        }
        typingTimer = setTimeout(typeLoop, 70);
      } else {
        typedEl.textContent = currentPhrase.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typingTimer = setTimeout(typeLoop, 320);
          return;
        }
        typingTimer = setTimeout(typeLoop, 35);
      }
    }

    function initCanvas() {
      const canvas = document.getElementById("hero-canvas");
      const ctx = canvas.getContext("2d");
      let width = 0;
      let height = 0;
      let animationFrame;
      const particles = [];

      function resizeCanvas() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }

      class Particle {
        constructor() {
          this.reset();
        }

        reset() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.radius = Math.random() * 1.6 + 0.5;
          this.vx = (Math.random() - 0.5) * 0.28;
          this.vy = (Math.random() - 0.5) * 0.28;
          this.alpha = Math.random() * 0.55 + 0.18;
          const colors = ["84,212,255", "159,122,234", "244,114,182"];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.reset();
          }
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
          ctx.fill();
        }
      }

      function createParticles() {
        particles.length = 0;
        for (let index = 0; index < 115; index += 1) {
          particles.push(new Particle());
        }
      }

      function drawConnections() {
        for (let i = 0; i < particles.length; i += 1) {
          for (let j = i + 1; j < particles.length; j += 1) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(84,212,255, ${(1 - distance / 120) * 0.1})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      function animate() {
        ctx.clearRect(0, 0, width, height);
        drawConnections();
        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });
        animationFrame = requestAnimationFrame(animate);
      }

      resizeCanvas();
      createParticles();
      animate();
      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("beforeunload", () => cancelAnimationFrame(animationFrame));
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((element) => {
      revealObserver.observe(element);
    });

    setTimeout(() => {
      document.querySelectorAll("#hero .reveal-up, #hero .reveal-right").forEach((element) => {
        const delay = parseFloat(getComputedStyle(element).getPropertyValue("--d") || 0) * 1000;
        setTimeout(() => element.classList.add("visible"), delay);
      });
    }, 1700);

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".skill-pill").forEach((pill, index) => {
              setTimeout(() => pill.classList.add("visible"), index * 55);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      skillObserver.observe(aboutSection);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      const originalContent = submitButton.innerHTML;
      const dict = translations[currentLang];

      submitButton.innerHTML = `<span>${dict["contact.sending"]}</span><i class="fa-solid fa-spinner fa-spin"></i>`;
      submitButton.disabled = true;
      contactSuccess.classList.remove("show");
      contactError.classList.remove("show");

      const isConfigured =
        !EMAILJS_PUBLIC_KEY.includes("TODO") &&
        !EMAILJS_SERVICE_ID.includes("TODO") &&
        !EMAILJS_TEMPLATE_ID.includes("TODO");

      if (!isConfigured) {
        submitButton.innerHTML = originalContent;
        submitButton.disabled = false;
        contactError.classList.add("show");
        return;
      }

      emailjs
        .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then(() => {
          submitButton.innerHTML = originalContent;
          submitButton.disabled = false;
          contactSuccess.classList.add("show");
          form.reset();
          audienceInput.value = currentMode;
          languageInput.value = currentLang;
          setTimeout(() => contactSuccess.classList.remove("show"), 5000);
        })
        .catch(() => {
          submitButton.innerHTML = originalContent;
          submitButton.disabled = false;
          contactError.classList.add("show");
          setTimeout(() => contactError.classList.remove("show"), 5000);
        });
    });

    document.getElementById("back-to-top").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const sectionNodes = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener(
      "scroll",
      () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
        document.getElementById("back-to-top").classList.toggle("visible", window.scrollY > 400);

        let currentSection = "";
        sectionNodes.forEach((section) => {
          if (window.scrollY >= section.offsetTop - 120) {
            currentSection = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.toggle("active-link", link.getAttribute("href") === `#${currentSection}`);
        });
      },
      { passive: true }
    );

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      });
    });

    document.getElementById("year").textContent = new Date().getFullYear();

    applyTheme();
    applyLanguage(currentLang);
    applyAudienceMode(currentMode);

    GitHubCalendar(".calendar", "Mans0ur1", { responsive: true, tooltips: true }).then(() => {
      updateCalendarLanguage(currentLang === 'ar');
    });