document.addEventListener('DOMContentLoaded', () => {
  // ── Typing effect ──
  const phrases = [
    '> Building systems that scale...',
    '> Shipping products users depend on...',
    '> From microservices to mobile apps...',
    '> while(alive) { code(); }',
  ];
  const typedEl = document.getElementById('typed-text');
  const cursorEl = document.getElementById('cursor');
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
  type();

  // ── Mobile nav toggle ──
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');

  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });

  // ── Nav background on scroll ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.borderBottomColor = 'var(--border-hover)';
    } else {
      nav.style.borderBottomColor = 'var(--border)';
    }
  });

  // ── Contact form (placeholder handler) ──
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit span');
    btn.textContent = '✓ message_sent';
    btn.parentElement.style.background = 'var(--green)';
    setTimeout(() => {
      btn.textContent = '$ send_message';
      btn.parentElement.style.background = '';
      form.reset();
    }, 3000);
  });

  // ── Active nav link highlight ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--accent)';
      }
    });
  });
});
