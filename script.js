document.addEventListener('DOMContentLoaded', () => {
  // ── Typing effect ──
  const phrases = [
    '> Building systems that scale...',
    '> Shipping products users depend on...',
    '> From microservices to mobile apps...',
    '> while(alive) { code(); }',
  ];
  const typedEl = document.getElementById('typed-text');
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 50);
    } else {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 30);
    }
  }
  if (typedEl) type();

  // ── Mobile nav toggle ──
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');

  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    toggle.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  // ── Theme toggle (day = light mode, night = dark mode) ──
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const shell = themeToggle.querySelector('.dnt-shell');
    const root = document.documentElement;

    const setTheme = (light) => {
      root.classList.toggle('light', light);
      if (shell) shell.classList.toggle('night', !light);
      themeToggle.setAttribute('aria-pressed', String(light));
      themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    };

    // Always start in dark mode; light only applies when the user toggles.
    setTheme(false);

    themeToggle.addEventListener('click', () => {
      setTheme(!root.classList.contains('light'));
    });
  }

  // ── Nav state + scroll progress + active link (single scroll handler) ──
  const nav = document.getElementById('nav');
  const progress = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY;

    // Nav background
    nav.classList.toggle('scrolled', scrollY > 40);

    // Progress bar
    if (progress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progress.style.width = pct + '%';
    }

    // Active section
    let current = '';
    sections.forEach((section) => {
      if (scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  // ── Scroll reveal (IntersectionObserver) ──
  const revealEls = document.querySelectorAll(
    '.section, .hero-stats, .timeline-item, .project-card, .achievement-card, .hero-badge'
  );

  if ('IntersectionObserver' in window) {
    revealEls.forEach((el) => el.classList.add('reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  // ── Contact form (placeholder handler) ──
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit span');
    const original = btn.textContent;
    btn.textContent = '✓ message_sent';
    btn.parentElement.style.background = 'var(--green)';
    setTimeout(() => {
      btn.textContent = original;
      btn.parentElement.style.background = '';
      form.reset();
    }, 3000);
  });
});
