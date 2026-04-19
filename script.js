/* ============================================================
   RITIK MOHADIKAR PORTFOLIO - script.js
   Handles: Loader, Typing, Counters, Skill Bars, Particles,
            Scroll Progress, Navbar, Back-to-Top, Contact Form
   ============================================================ */

'use strict';

/* ---- Loader ---- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  document.body.classList.add('loading');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    // Reveal sidebar after load
    document.getElementById('socialSidebar').classList.add('visible');
  }, 1800);
});

/* ---- Scroll Progress Bar ---- */
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
});

/* ---- Navbar Scroll Effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- Active Nav Link on Scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

/* ---- Mobile Nav Toggle ---- */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  navToggle.classList.toggle('open');
});
// Close on link click
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* ---- Back to Top ---- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Typing Animation ---- */
const typingEl = document.getElementById('typedText');
const roles = [
  'AWS Cloud Engineer',
  'DevOps Practitioner',
  'Cloud Engineer',
  'Infrastructure Engineer',
  'Terraform Engineer',
  'Automation Engineer'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  typingTimeout = setTimeout(typeEffect, speed);
}
typeEffect();

/* ---- Particle System ---- */
const particlesContainer = document.getElementById('particles');
const colors = ['#4fc3f7', '#00e5ff', '#69f0ae', '#ff9800', '#ce93d8', '#ef5350'];

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  const size = Math.random() * 3 + 1;
  const x = Math.random() * 100;
  const dx = (Math.random() - 0.5) * 100;
  const duration = Math.random() * 12 + 8;
  const delay = Math.random() * 8;
  const color = colors[Math.floor(Math.random() * colors.length)];

  particle.style.cssText = `
    left: ${x}%;
    width: ${size}px; height: ${size}px;
    background: ${color};
    --dx: ${dx}px;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    opacity: 0;
  `;
  particlesContainer.appendChild(particle);
  setTimeout(() => particle.remove(), (duration + delay) * 1000 + 500);
}

// Create initial particles
for (let i = 0; i < 30; i++) createParticle();
// Continuously spawn particles
setInterval(createParticle, 600);

/* ---- Intersection Observer (Trigger animations on scroll) ---- */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

/* Animated Counters */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const duration = 1800;
  const step = Math.ceil(duration / target);
  const increment = Math.max(1, Math.ceil(target / (duration / 20)));

  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 20);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.counter-num').forEach(animateCounter);
      counterObserver.disconnect();
    }
  });
}, observerOptions);

const aboutSection = document.getElementById('about');
if (aboutSection) counterObserver.observe(aboutSection);

/* Skill Bar Animations */
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const width = bar.dataset.width + '%';
        setTimeout(() => { bar.style.width = width; }, 100);
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(cat => skillBarObserver.observe(cat));

/* Fade-in animations for cards */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Add fade-in CSS dynamically
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
  .glass-card, .project-card, .cert-card, .achievement-card,
  .timeline-content, .education-box {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease, background 0.3s ease,
                border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .glass-card.fade-in-visible, .project-card.fade-in-visible,
  .cert-card.fade-in-visible, .achievement-card.fade-in-visible,
  .timeline-content.fade-in-visible, .education-box.fade-in-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(fadeStyle);

const allCards = document.querySelectorAll(
  '.glass-card, .project-card, .cert-card, .achievement-card, .timeline-content, .education-box'
);
allCards.forEach((card, i) => {
  card.style.transitionDelay = `${(i % 4) * 0.1}s`;
  fadeObserver.observe(card);
});

/* ---- Profile Image Fallback ---- */
const profileImg = document.getElementById('profileImg');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    const parent = profileImg.parentElement;
    const fallback = document.createElement('div');
    fallback.style.cssText = `
      width: 100%; height: 100%;
      background: linear-gradient(135deg, rgba(79,195,247,0.2), rgba(105,240,174,0.2));
      display: flex; align-items: center; justify-content: center;
      font-size: 6rem; color: rgba(79,195,247,0.5);
    `;
    fallback.innerHTML = '<i class="fas fa-user"></i>';
    parent.appendChild(fallback);
  });
}

/* ---- Contact Form ---- */
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.form-btn');
  const name = contactForm.querySelector('#name').value.trim();
  const email = contactForm.querySelector('#email').value.trim();
  const message = contactForm.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    showFormMessage('error', '⚠️ Please fill in all required fields.');
    return;
  }

  if (!isValidEmail(email)) {
    showFormMessage('error', '⚠️ Please enter a valid email address.');
    return;
  }

  // Simulate sending
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    showFormMessage('success', '✅ Message sent! I\'ll get back to you soon.');
    contactForm.reset();
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
  }, 1800);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(type, msg) {
  formMsg.className = 'form-message ' + type;
  formMsg.textContent = msg;
  setTimeout(() => { formMsg.className = 'form-message'; formMsg.textContent = ''; }, 5000);
}

/* ---- Smooth Scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ---- Navbar hamburger animation ---- */
const hamburgerStyle = document.createElement('style');
hamburgerStyle.textContent = `
  .nav-toggle.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-toggle.open span:nth-child(2) { opacity: 0; }
  .nav-toggle.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
`;
document.head.appendChild(hamburgerStyle);

console.log('🚀 Portfolio initialized - Ritik Mohadikar | AWS Cloud Engineer');
