// ---------- mobile nav toggle ----------
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('nav.links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---------- mark active nav link ----------
const current = document.body.dataset.page;
document.querySelectorAll('nav.links a').forEach(a => {
  if (a.dataset.page === current) a.classList.add('active');
});

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ---------- hero typing effect (index page only) ----------
const typeEl = document.querySelector('[data-typing]');
if (typeEl) {
  const lines = JSON.parse(typeEl.dataset.typing);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    typeEl.textContent = lines[lines.length - 1];
  } else {
    let lineIndex = 0, charIndex = 0, deleting = false;
    const cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    cursor.textContent = '_';

    function tick() {
      const full = lines[lineIndex];
      if (!deleting) {
        charIndex++;
        typeEl.textContent = full.slice(0, charIndex);
        if (charIndex === full.length) {
          deleting = lineIndex < lines.length - 1;
          setTimeout(tick, deleting ? 1100 : 0);
          return;
        }
      } else {
        charIndex--;
        typeEl.textContent = full.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          lineIndex++;
        }
      }
      typeEl.appendChild(cursor);
      setTimeout(tick, deleting ? 22 : 42);
    }
    tick();
  }
}

// ---------- contact form (opens WhatsApp with a pre-filled message) ----------
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const contact = contactForm.contact.value.trim();
    const message = contactForm.message.value.trim();
    const text = `مرحبًا محمد، اسمي ${name}.\nوسيلة تواصل بديلة: ${contact}\n\n${message}`;
    window.open(`https://wa.me/201000220606?text=${encodeURIComponent(text)}`, '_blank');
  });
}
